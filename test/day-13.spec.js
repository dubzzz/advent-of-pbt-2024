// @ts-check
import { test, fc } from "@fast-check/vitest";
import buildSantaURLOfChild from "../src/advent-day-13.mjs";

test.prop([
  fc.string({ unit: "grapheme" }),
  fc.string({ unit: "grapheme" }),
  fc.nat(),
])("day #13: can create an url", (firstName, lastName, birthDateTimestamp) => {
  buildSantaURLOfChild(firstName, lastName, birthDateTimestamp);
});
