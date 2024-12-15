// @ts-check
import { test, fc } from "@fast-check/vitest";
import findPlaceForSanta from "../src/advent-day-11.mjs";
import { expect } from "vitest";

const maxDimension = 1000;
const marketDimensionsArbitrary = fc.record({
  width: fc.integer({ min: 1, max: maxDimension }),
  height: fc.integer({ min: 1, max: maxDimension }),
});
const inputsArbitrary = marketDimensionsArbitrary.chain(({ width, height }) =>
  fc.record({
    rawMap: fc.array(
      fc.array(fc.boolean(), { minLength: width, maxLength: width }),
      { minLength: height, maxLength: height }
    ),
    requestedArea: fc.record({
      width: fc.integer({ min: 1, max: width }),
      height: fc.integer({ min: 1, max: height }),
    }),
  })
);

test.prop([inputsArbitrary])(
  "day #11: should find a place for Santa as there is one by construct (top left)",
  ({ rawMap, requestedArea }) => {
    const map = structuredClone(rawMap);
    for (let j = 0; j !== requestedArea.height; ++j) {
      for (let i = 0; i !== requestedArea.width; ++i) {
        map[j][i] = true;
      }
    }
    expect(findPlaceForSanta(map, requestedArea)).toBeDefined();
  }
);

test.prop([inputsArbitrary])(
  "day #11: should find a place where Santa fits (when finding one)",
  ({ rawMap, requestedArea }) => {
    const out = findPlaceForSanta(rawMap, requestedArea);
    fc.pre(out !== undefined);
    for (let j = 0; j !== requestedArea.height; ++j) {
      for (let i = 0; i !== requestedArea.width; ++i) {
        expect(rawMap[out.y + j][out.x + i]).toBe(true);
      }
    }
  }
);
