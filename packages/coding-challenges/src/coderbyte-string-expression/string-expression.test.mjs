import { each } from "@local/utils";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  parseExpression,
  parseTokenizedExpression,
  tokenizeExpression,
  translateResult,
} from "./string-expression.mjs";

describe.only("parseExpression", () => {
  each([
    ["foursixminustwotwoplusonezero", "threefour"],
    ["onezeropluseight", "oneeight"],
    ["oneminusoneone", "negativeonezero"],
  ])((input, output) => {
    it(`parseExpression(${input}) = ${output}`, () => {
      assert.equal(parseExpression(input), output);
    });
  });
});

it("tokenizeExpression", () => {
  assert.deepEqual(
    tokenizeExpression("foursixminustwotwoplusonezero"),
    "4$6$-$2$2$+$1$0$",
  );
});

it("parseTokenizedExpression", () => {
  assert.deepEqual(parseTokenizedExpression("4$6$-$2$2$+$1$0$"), [46, -22, 10]);
});

it("translateResult", () => {
  assert.deepEqual(translateResult(34), "threefour");
});
