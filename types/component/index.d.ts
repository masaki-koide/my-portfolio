type FirstArgumentType<T extends Function> = T extends (...args: infer A) => any ? A[0] : never
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> 
declare type PropsTypeFromFC<T extends Function> = Omit<FirstArgumentType<T>, 'children'>
