// 条件类型
/*
type MyType<T> = T extends string ? string: any
type res = MyType<boolean>
*/

// 分布式条件类型
/*
type MyType<T> = T extends any ? T : never
type res = MyType<string | number | boolean>
*/
/*
type MyType<T, U> = T extends U ? never : T
type res = MyType<string | number | boolean, number>
*/
// type res = NonNullable<string | null | boolean | undefined>
// type res = ReturnType<() => number>
// ConstructorParameters
/*
class Person {
  constructor (name: string, age: number) {}
}
type res = ConstructorParameters<typeof Person>
*/
// Parameters
/*
declare function say (name: string, age: number, gender: boolean): void
type res = Parameters<typeof say>
*/

// infer
type MyType<T> = T extends Array<infer U> ? U : T
type res = MyType<string | number[]> // string | number
