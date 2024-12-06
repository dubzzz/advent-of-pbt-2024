// @ts-check
import { test, fc } from "@fast-check/vitest";
import nextBarcode from "../src/advent-day-06.mjs";
import { expect } from "vitest";

const orderedUnits = [
  "\u{2709}\u{fe0f}",
  "\u{1f9fa}",
  "\u{1f384}",
  "\u{1f514}",
  "\u{1f56f}\u{fe0f}",
  "\u{2b50}",
  "\u{1f98c}",
  "\u{26c4}",
  "\u{1f6f7}",
  "\u{2744}\u{fe0f}",
  "\u{1f3bf}",
  "\u{2728}",
  "\u{1f929}",
  "\u{1f973}",
  "\u{1f388}",
  "\u{1fa80}",
  "\u{1f3ae}",
  "\u{1f3b2}",
  "\u{265f}\u{fe0f}",
  "\u{1f49d}",
  "\u{1f380}",
  "\u{1f9e6}",
  "\u{1f385}",
  "\u{1f936}",
  "\u{1f381}",
];

const barcodeArbitrary = fc
  .tuple(
    fc.constantFrom(...orderedUnits.slice(1)), // never a zero as heading unit
    fc.array(fc.constantFrom(...orderedUnits), { size: "+1" })
  )
  .map(([head, others]) => [head, ...others]);

test.prop([barcodeArbitrary])(
  "day #6: should properly increase the last figure of the barcode",
  (barcode) => {
    const next = nextBarcode(barcode);
    const indexLastInBarcode = orderedUnits.indexOf(barcode.at(-1));
    const indexLastInNext = orderedUnits.indexOf(next.at(-1));
    expect(indexLastInNext).toBe(
      (indexLastInBarcode + 1) % orderedUnits.length
    );
  }
);
