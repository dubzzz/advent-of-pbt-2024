// @ts-check
import { test, fc } from "@fast-check/vitest";
import fastPostOfficeFinderEmulator from "../src/advent-day-04.mjs";
import { expect } from "vitest";

test.prop([
  fc.record({
    x: fc.integer({ min: 0, max: 9999 }),
    y: fc.integer({ min: 0, max: 999 }),
  }),
  fc.record({
    x: fc.integer({ min: 0, max: 9999 }),
    y: fc.integer({ min: 0, max: 999 }),
  }),
])("day #4: should find the box in a timely manner", (initial, box) => {
  expect(fastPostOfficeFinderEmulator(initial, box)).toBeLessThanOrEqual(14);
});
