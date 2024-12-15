// @ts-check
import { test, fc } from "@fast-check/vitest";
import respace from "../src/advent-day-08.mjs";
import { expect } from "vitest";

const encyclopediaArbitrary = fc.uniqueArray(
  fc.string({
    unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz"),
    minLength: 1,
  })
);
const encyclopediaAndMessageArbitrary = encyclopediaArbitrary.chain(
  (encyclopedia) =>
    fc.record({
      encyclopedia: fc.constant(encyclopedia),
      words: fc.shuffledSubarray(encyclopedia), // do not cover duplicated words
    })
);

test.prop([encyclopediaAndMessageArbitrary])(
  "day #8: should always be able to respace a message made of known words",
  ({ encyclopedia, words }) => {
    expect(respace(words.join(""), encyclopedia)).toBe(words.join(" "));
  }
);
