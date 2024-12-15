// @ts-check
import { test, fc } from "@fast-check/vitest";
import isProbablyEnchantedWord from "../src/advent-day-10.mjs";
import { expect } from "vitest";

const letterArbitrary = fc.string({
  unit: "grapheme",
  minLength: 1,
  maxLength: 1,
});

const nonEnchantedStartEndCouple = fc
  .array(letterArbitrary, { minLength: 1 })
  .chain((start) =>
    fc.record({
      start: fc.constant(start),
      end: fc
        .array(letterArbitrary, {
          minLength: start.length,
          maxLength: start.length,
        })
        .filter((value) => value.reverse().join("") !== start.join("")),
    })
  );

test.prop([fc.array(letterArbitrary), letterArbitrary])(
  "day #10: should detect enchanted words with odd number of letters",
  (start, middle) => {
    const word = `${start.join("")}${middle}${start.reverse().join("")}`;
    expect(isProbablyEnchantedWord(word)).toBe(true);
  }
);

test.prop([fc.array(letterArbitrary)])(
  "day #10: should detect enchanted words with even number of letters",
  (start) => {
    const word = `${start.join("")}${start.reverse().join("")}`;
    expect(isProbablyEnchantedWord(word)).toBe(true);
  }
);

test.prop([nonEnchantedStartEndCouple, letterArbitrary])(
  "day #10: should detect non enchanted words with odd number of letters",
  ({ start, end }, middle) => {
    const word = `${start.join("")}${middle}${end.join("")}`;
    expect(isProbablyEnchantedWord(word)).toBe(false);
  }
);

test.prop([nonEnchantedStartEndCouple])(
  "day #10: should detect non enchanted words with even number of letters",
  ({ start, end }) => {
    const word = `${start.join("")}${end.join("")}`;
    expect(isProbablyEnchantedWord(word)).toBe(false);
  }
);
