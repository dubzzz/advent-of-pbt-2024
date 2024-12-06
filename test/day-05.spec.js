// @ts-check
import { test, fc } from "@fast-check/vitest";
import isSecurityKey from "../src/advent-day-05.mjs";
import { expect } from "vitest";

test.prop([
  fc.integer({ min: 2 }),
  fc.integer({ min: 2 }),
  fc.integer({ min: 2 }),
])(
  "day #5: should not consider the product of three integer (>=2) to be a security key",
  (a, b, c) => {
    fc.pre(a * b * c <= 2147483647);
    expect(isSecurityKey(num)).toBe(false);
  }
);
