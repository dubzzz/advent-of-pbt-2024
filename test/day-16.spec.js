// @ts-check
import { test, fc } from "@fast-check/vitest";
import santaCode from "../src/advent-day-16.mjs";
import { expect } from "vitest";

test.prop([fc.integer({ min: 1, max: 2 ** 31 - 1 })])(
  "day #16: only differ by one bit from previous one",
  (current) => {
    const codeCurrent = santaCode(current).toString(2);
    const codePrevious = santaCode(current - 1)
      .toString(2)
      .padStart(codeCurrent.length, "0");
    let diffCount = 0;
    for (let i = 0; i !== codeCurrent.length; ++i) {
      if (codeCurrent[i] !== codePrevious[i]) {
        ++diffCount;
      }
    }
    expect(diffCount).toBe(1);
  }
);
