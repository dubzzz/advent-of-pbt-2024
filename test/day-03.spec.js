// @ts-check
import { test, fc } from "@fast-check/vitest";
import isWordIncludedInLetter from "../src/advent-day-03.mjs";
import { expect } from "vitest";

test.prop([fc.string(), fc.string(), fc.string()])(
  "day #3: should always find the word when part of the text",
  (a, b, c) => {
    const text = a + b + c;
    const word = b;
    expect(isWordIncludedInLetter(text, word)).toBe(true);
  }
);
