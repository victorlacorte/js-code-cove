/**
 * @type {import('./utils.types.ts').pipe}
 */
export function pipe(...fns) {
  return (arg) => fns.reduce((acc, curr) => curr(acc), arg);
}
