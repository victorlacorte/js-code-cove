import { pipe } from "@local/utils";
/**
 * Coderbyte coding challenge: String Expression
 *
 * Using the JS language, have the function StringExpression(str) read the str
 * parameter being passed which will contain the written out version of the
 * numbers 0-9 and the words "minus" or "plus" and convert the expression into
 * an actual final number written out as well. For example: if str is
 * "foursixminustwotwoplusonezero" then this converts to "46 - 22 + 10" which
 * evaluates to 34 and your program should return the final string threefour.
 * If your final answer is negative it should include the word "negative."
 *
 * Sample test cases:
 *
 * Input:  "foursixminustwotwoplusonezero"
 * Output: "threefour"
 *
 * Input:  "onezeropluseight"
 * Output: "oneeight"
 *
 * Input:  "oneminusoneone"
 * Output: "negativeonezero"
 */

// tokenize the input:
// foursixminustwotwoplusonezero -> "four", "six", "minus", "two", "two", "plus", "one", "zero"

const writtenNumberRecord = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const writtenTokenRecord = {
  ...writtenNumberRecord,
  plus: "+",
  minus: "-",
};

const numericWrittenRecord = Object.fromEntries(
  Object.entries(writtenNumberRecord).map(([key, val]) => [val, key]),
);

/**
 * @param {string} expression
 */
export function tokenizeExpression(expression, separator = "$") {
  for (const [key, val] of Object.entries(writtenTokenRecord)) {
    expression = expression.replaceAll(key, `${val}${separator}`);
  }

  return expression;
}

// '4$6$-$2$2$plus1$0$'.split('$') -> [ '4', '6', '-', '2', '2', '+', '1', '0', '' ] -> ? -> [ 46, '-', 22, '+', 10 ]
/**
 * @param {string} expression
 */
export function parseTokenizedExpression(expression, separator = "$") {
  const parsed = expression
    .split(separator)
    .filter((token) => token.length > 0)
    .reduce((acc, curr) => {
      if (acc.length == 0) {
        return [curr];
      }

      if (["+", "-"].includes(curr)) {
        return acc.concat(curr);
      }

      const latestToken = acc.at(-1);

      if (latestToken === undefined) {
        throw new Error(`${acc}, ${curr}`);
      }

      return acc.slice(0, -1).concat(`${latestToken}${curr}`);
    }, /** @type {Array<string>} */ ([]));

  return parsed.map((entry) => Number.parseInt(entry));
}

/**
 * @param {Array<number>} parsedExpression
 */
function calculateResult(parsedExpression) {
  return parsedExpression.reduce((acc, curr) => acc + curr);
}

// 34 -> 'threefour'
/**
 * @param {number} result
 */
export function translateResult(result) {
  return String(result)
    .split("")
    .map((token) => (token === "-" ? "negative" : numericWrittenRecord[token]))
    .join("");
}

/**
 * @param {string} expression
 */
export function parseExpression(expression) {
  return pipe(
    tokenizeExpression,
    parseTokenizedExpression,
    calculateResult,
    translateResult,
  )(expression);
}
