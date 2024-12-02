// @ts-check
import { test, fc } from "@fast-check/vitest";
import dropLettersFromDuplicatedSenders from "../src/advent-day-02.mjs";
import { expect } from "vitest";

const letterArb = fc.record({
  id: fc.string(),
});

test.prop([fc.uniqueArray(letterArb, { selector: (letter) => letter.id })])(
  "day #2: should not drop any letter if all have different ids",
  (lettersWithDistinctIds) => {
    const letters = dropLettersFromDuplicatedSenders(lettersWithDistinctIds);
    expect(letters).toEqual(lettersWithDistinctIds);
  }
);

test.prop([letterArb])(
  "day #2: should not drop any letter when receiving only one",
  (letter) => {
    const letters = dropLettersFromDuplicatedSenders([letter]);
    expect(letters).toEqual([letter]);
  }
);
