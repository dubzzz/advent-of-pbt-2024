// @ts-check
import { test, fc } from "@fast-check/vitest";
import sortLetters from "../src/advent-day-01.mjs";

const nameArb = fc.string({
  unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz"),
  minLength: 1,
});
const letterArb = fc.record({
  name: nameArb,
  age: fc.integer({ min: 7, max: 77 }),
});

test.prop([fc.array(letterArb)])(
  "day #1: should properly sort letters",
  (unsortedLetters) => {
    const letters = sortLetters(unsortedLetters);
    for (let i = 1; i < letters.length; ++i) {
      const prev = letters[i - 1];
      const curr = letters[i];
      if (prev.age < curr.age) continue; // properly ordered
      if (prev.age > curr.age) throw new Error("Invalid on age");
      if (prev.name > curr.name) throw new Error("Invalid on name");
    }
  }
);
