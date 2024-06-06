type AnyFn = (...args: any) => any;

//type PipedArgs<F, Acc extends Array<AnyFn> = []> = F extends [
//  (...args: infer A) => infer B,
//]
//  ? [...Acc, (...args: A) => B]
//  : F extends [(args: infer A) => any, ...infer Tail]
//    ? Tail extends [(args: infer B) => any, ...Array<any>]
//      ? PipedArgs<Tail, [...Acc, (args: A) => B]>
//      : Acc
//    : Acc;

type LastReturnType<F> = F extends [...Array<any>, (...args: any) => infer R]
  ? R
  : never;

export declare function pipe<F extends Array<AnyFn>>(
  //...fns: PipedArgs<F>
  ...fns: F
): <Arg>(
  arg: Arg extends Parameters<F[0]>[0] ? Arg : never,
) => LastReturnType<F>;
