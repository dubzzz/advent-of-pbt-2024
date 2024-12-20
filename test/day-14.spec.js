// @ts-check
import { test, fc } from "@fast-check/vitest";
import buildCompressor from "../src/advent-day-14.mjs";
import { expect } from "vitest";

test.prop([fc.string({ unit: "binary" })])(
  "day #14: could revert itself",
  (text) => {
    const compressor = buildCompressor();
    expect(compressor.decompress(compressor.compress(text))).toBe(text);
  }
);

test.prop([
  fc.array(
    fc.record({
      count: fc.integer({ min: 1, max: 10000 }),
      char: fc.string({ unit: "grapheme-ascii", minLength: 1, maxLength: 1 }),
    })
  ),
])(
  "day #14: could revert itself with strings having lots of repeats",
  (textDetails) => {
    const compressor = buildCompressor();
    const text = textDetails.map((e) => e.char.repeat(e.count)).join("");
    expect(compressor.decompress(compressor.compress(text))).toBe(text);
  }
);
