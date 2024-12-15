// @ts-check
import { test, fc } from "@fast-check/vitest";
import simplifyLocation from "../src/advent-day-07.mjs";
import { expect } from "vitest";

const pathElementArbitrary = fc.oneof(
  fc.constant(""), // responsible for: //
  fc.constant("."), // responsible for: /.
  fc.constant(".."), // responsible for: /..
  fc.nat().map(String) // responsible for: /<folder>
);

test.prop([fc.array(pathElementArbitrary)])(
  "day #7: should make a path having the minimal depth",
  (pathElements) => {
    const path = `/${pathElements.join("/")}`;
    const simplified = simplifyLocation(path)

    fc.pre(path !== simplified) // we only consider scenario coming with simplified versions of the path

    let expectedFinalElements = 0;
    for (const element of pathElements) {
      switch (element) {
        case "":
        case ".":
          break; // no change of the expected final path
        case "..":
          expectedFinalElements -= 1; // decrease expected depth by one
          break;
        default:
          expectedFinalElements += 1; // increase expected depth by one
          break;
      }
    }
    expect(simplified.split('/')).toHaveLength(expectedFinalElements+1)
  }
);
