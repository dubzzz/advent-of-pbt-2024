// @ts-check
import { test, fc } from "@fast-check/vitest";
import findOptimalJourney from "../src/advent-day-18.mjs";
import { expect } from "vitest";

const townArb = fc.record({
  name: fc.string(),
  x: fc.nat(1_000),
  y: fc.nat(1_000),
});

function distance(townA, townB) {
  return Math.abs(townA.x - townB.x) + Math.abs(townA.y - townB.y);
}

function pathDistance(path) {
  let totalDistance = 0;
  for (let i = 1; i < path.length; ++i) {
    totalDistance += distance(path[i - 1], path[i]);
  }
  return totalDistance;
}

test.prop([fc.uniqueArray(townArb, { selector: (town) => town.name })])(
  "day #17: find optimal journey",
  (towns) => {
    const dummyDistance = pathDistance([
      { name: "Santa place", x: 0, y: 0 },
      ...towns,
      { name: "Santa place", x: 0, y: 0 },
    ]);
    const path = findOptimalJourney(towns);
    expect(pathDistance(path)).toBeLessThanOrEqual(dummyDistance);
  }
);
