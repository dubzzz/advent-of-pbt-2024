// @ts-check
import { test, fc } from "@fast-check/vitest";
import isValidEmail from "../src/advent-day-17.mjs";
import { expect } from "vitest";

test.prop([fc.emailAddress()])(
  "day #17: accept any valid email address",
  (emailAddress) => {
    expect(isValidEmail(emailAddress)).toBe(true);
  }
);
