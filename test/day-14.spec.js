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
