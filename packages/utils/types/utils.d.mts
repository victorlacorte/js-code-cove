export function pipe<F extends ((...args: any) => any)[]>(...fns: F): <Arg>(arg: Arg extends Parameters<F[0]>[0] ? Arg : never) => F extends [...any[], (...args: any) => infer R] ? R : never;
