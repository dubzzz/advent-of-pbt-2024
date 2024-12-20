// @ts-check
import { test, fc } from "@fast-check/vitest";
import createShelf from "../src/advent-day-15.mjs";
import { expect } from "vitest";

class PutCommand {
  check() {
    return true;
  }
  run(m, r) {
    const rOut = r.put();
    if (rOut !== -1) {
      m.push(rOut);
    }
  }
  toString() {
    return `put`;
  }
}

class PopCommand {
  check() {
    return true;
  }
  run(m, r) {
    const rOut = r.pop();
    expect(rOut).toBe(m.splice(0, 1)[0] ?? -1);
  }
  toString() {
    return `pop`;
  }
}

class IsEmptyCommand {
  check() {
    return true;
  }
  run(m, r) {
    expect(r.isEmpty()).toBe(m.length === 0);
  }
  toString() {
    return `isEmpty`;
  }
}

test.prop([
  fc.commands(
    [
      fc.constant(new PutCommand()),
      fc.constant(new PopCommand()),
      fc.constant(new IsEmptyCommand()),
    ],
    {
      size: "+1",
    }
  ),
])("day #15: behave correctly", (cmds) => {
  const s = () => ({ model: [], real: createShelf() });
  fc.modelRun(s, cmds);
});
