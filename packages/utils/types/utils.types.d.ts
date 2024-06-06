type AnyFn = (...args: any) => any;
type LastReturnType<F> = F extends [...Array<any>, (...args: any) => infer R] ? R : never;
export declare function pipe<F extends Array<AnyFn>>(...fns: F): <Arg>(arg: Arg extends Parameters<F[0]>[0] ? Arg : never) => LastReturnType<F>;
export {};
