/**
 * Make some of object properties optional
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>


/**
 * Create a fixed-length Tuple with given type / 根据指定类型创建一个定长元祖 <br>
 * ---
 * ## Type paremeters:
 * `Type`: the type of elements in tuple / 元祖中元素的类型 <br>
 * `Length`: the length of tuple / 元祖的长度 <br>
 * `InitialTuple`: the initial value of tuple, within elements' type can be differ from `Type` / 初始值, 其中元素的类型可以与Type不同 <br>
 * ---
 * ## Example:
 * `Tuple<number, 6>` => `[number, number, number, number, number, number]` <br>
 * `Tuple<string, 4, [boolean, number]>` => `[boolean, number, string, string]`
 */
type Tuple<Type, Length extends number, InitialTuple extends unknown[] = []> =
  InitialTuple['length'] extends Length
    ? InitialTuple
    : Tuple<Type, Length, [...InitialTuple, Type]>

type A = Tuple<string, 6, [boolean, number]>

declare const t: A // [boolean, number, string, string, string, string]
const el1 = t[10] // TS2493: Tuple type '[boolean, number, string, string, string, string]' of length '6' has no element at index '10'.
const el2 = t[0] // boolean
const el3 = t[1] // number
const el4 = t[4] // string
