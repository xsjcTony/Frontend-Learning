# TypeScript - 数据类型



## 基本概念

- `TypeScript` 支持与 `JavaScript` 几乎相同的数据类型
- 除此之外还提供了 `枚举` 类型 ( `enum` )
- `JavaScript` 也支持的数据类型的内部用法和 `JavaScript` 一样

---

## 赋值关系表 (Assignability Table)

| Assignability |  any  | unknown | object | void  | undefined | null  | never |
| :-----------: | :---: | :-----: | :----: | :---: | :-------: | :---: | ----- |
|     any →     |       |  **✓**  | **✓**  | **✓** |   **✓**   | **✓** | ✕     |
|   unknown →   | **✓** |         |   ✕    |   ✕   |     ✕     |   ✕   | ✕     |
|   object →    | **✓** |  **✓**  |        |   ✕   |     ✕     |   ✕   | ✕     |
|    void →     | **✓** |  **✓**  |   ✕    |       |     ✕     |   ✕   | ✕     |
|  undefined →  | **✓** |  **✓**  |   ✓    | **✓** |           |   ✓   | ✕     |
|    null →     | **✓** |  **✓**  |   ✓    |   ✓   |     ✓     |       | ✕     |
|    never →    | **✓** |  **✓**  | **✓**  | **✓** |   **✓**   | **✓** |       |

---

## 基本数据类型



### 数值 number

```typescript
let val: number
val = 123
val = 0x11
```



### 布尔 boolean

```TypeScript
let val: boolean
val = true
```



### 字符串 string

```TypeScript
let val: string
val = '123'
val = `anotherVariable = ${ anotherVariable }`
```



### 数组 Array []

- 有两种方式可以定义 `数组`

```TypeScript
let arr1: Array<number> // 只能存储 number 的数组
let arr2: string[] // 只能存储 string 的数组
```

#### 只读数组 (ReadonlyArray)

- 只能被赋值一次的特殊 `数组`
- `TypeScript` 中对于 `数组` 类型的扩展
- 有两种格式

```TypeScript
let arr: ReadonlyArray<number> = [1, 3, 5] // 格式一
arr.push(7) // 会报错
let arr2: readonly string[] = [1, 3, 5] // 格式二
```



### 联合 |

- 表示这个变量可以是列举出的数据中的任何一种

```TypeScript
let val: number | string | boolean // val 既可以是 number, 也可以是 string, 还可以是 boolean
```



### 元祖 [tuple]

- `TypeScript` 中对于 `数组` 类型的扩展
- 用于 `确定长度` 并且对于每个元素 `确定数据类型` 的数组

```TypeScript
let tuple: [string, number, boolean] // 只能存储三个元素 (不能多也不能少), 第一个必须是 string, 第二个必须是 number, 第三个必须是 boolean
```

#### 只读元祖

- 只能被赋值一次的特殊 `元祖`

```TypeScript
let tuple: readonly [string, number, boolean]
```



### 任意 any

- 可以存储任意类型的数据
- `any` 可以赋值给任意数据类型
- 本质上是跳过了类型检查
- 慎用

```typescript
let val: any
val = 123
val = '123'
val = true
val = [1, 3, 5]
```



### unknown

- 和 `any` 一样, 可以存储任意类型的数据
- `unknown` 不能赋值给除了 `any` 以外的任何其他类型
- 不能做任何操作
- 比 `any` 更安全

```TypeScript
function safeParse(s: string): unknown {
  return JSON.parse(s)
}
```



### void

- 与 `any` 相反, 表示没有任何类型
- 一般用于函数返回值
- 只有 `null` / `undefined` / `never` / `any` 类型可以赋值给 `void` 类型 (与 `tsconfig` 中的 `strict` 模式相关)

```TypeScript
function test1 (): void {
  console.log('hello world')
}

let test2 = (): void => {
  console.log('hello world')
}
```



### never

- 表示不存在的类型
- 一般用于抛出异常或根本没有返回值的函数
- 也出现于 `联合` 类型的收束中

```TypeScript
function demo (): never {
  throw new Error('err')
}

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```



### object

- 表示除了 `primitive` 类型之外的任意值, 包括 `function`
- 多用 `接口` ( `interface` ) 来表示
- <span style="color: #f90">和 `{}` 的含义不相同</span>
- <span style="color: #f90">和 `Object` 的含义不相同, `Object` 基本上永远不会用到</span>

```TypeScript
let obj: object
obj = { name: 'Tony', age: 24 }
```

---

## 类型断言 (Type Assertions)

定义

- 将一种类型强制转换为另一种类型
- 告诉编译器, 你别TM帮我检查了, I know what I'm doing

转换方式

- `<newType>variable` : 在 `.tsx` 中不适用
- `variable as newType` : 企业开发中推荐

```TypeScript
const str: any = 'it666'
// 方式一 (.tsx文件中不能用)
console.log(<string>str.length)
// 方式二 (企业开发推荐)
console.log((str as string).length)
```

---

## 函数 (Function)

基本定义

- 大部分和 `JavaScript` 中相同
- 在 `TypeScript` 中需要给参数 / 返回值指定类型

```typescript
// 命名函数
function say1 (name: string): void {
  console.log(name)
}

// 匿名函数
let say2 = function (name: string): void {
  console.log(name)
}

// 箭头函数
let say3 = (name: string): void => {
  console.log(name)
}
```



### 完整格式

- 在 `TypeScript` 中, `函数` 的完整格式是由两部分组成的

  1. 定义一个函数

  2. 根据定义实现函数

- 第二部函数实现中, 类型可以不写, `TypeScript` 会根据函数定义自动推导出对应的数据类型

```typescript
// 定义函数
let add: (a: number, b: number) => number
// 根据定义实现函数
add = function (x: number, y: number): number {
  return x + y
}

// 一步到位写法 (实现中不写类型)
let add1: (a: number, b: number) => number = function (x, y) {
  return x + y
}
```



### 函数声明 type

- 利用 `type` 实现, 本质是使用了 `Type Aliases` [TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

```TypeScript
type Add = (a: number, b: number) => number
let add: Add = function (x, y) {
  return x + y
}
```



### 函数重载 (Function Overloads)

[TypeScript: Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

- 同名函数可以根据不同的参数实现不同的功能
- 格式为先定义两个以上的函数, 然后再统一实现
- <span style="color: #ff0;">能用 `联合类型` 解决的, 尽量不要用 `函数重载` , 比如下面代码示例中的, 参数数量相同但只是类型不同的情况, 换言之, 下面这个例子不是特别好, 只是可以作为格式参考</span>
- `实现签名` (即实现的函数) 对外是不可见的

```typescript
// 坏例子
function getArray(x: number): number[]
function getArray(str: string): string[]
function getArray(value: number | string): number[] | string[] {
  if (typeof value === 'number') {
    const arr: number[] = []
    for (let i = 0; i < value; i++) {
      arr.push(value)
    }
    return arr
  } else {
    return value.split('')
  }
}
```



### 可选参数 ?

[TypeScript: Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)

- 在可选的参数后面加上 `?` , 即意为该参数可传递也可不传递
- 类型为指定类型或 `undefined` , 在函数实现中需要处理为 `undefined` 即未传递的情况
- 也可以在 `函数重载` 中使用
- 可以有多个
- `可选参数` 后面除了 `可选参数` 不能跟其他参数
- <span style="color: #f90">永远**不要**在 `回调函数` 的定义中使用 `可选参数`</span>

```typescript
function add (x: number, y?: number, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

add(10) // 10
add(10, 20) // 30
add(10, 20, 30) // 60
```



### 默认参数

- 和 `ES6` 中相同

```typescript
function add (x: number, y: number = 10): number {
  return x + y
}

add(10) // 30
```



### 剩余参数

- 和 `ES6` 中相同

```TypeScript
function add (x: number, ...args: number[]): void {
  console.log(args)
}

add(10, 20, 30, 40) // [20, 30, 40]
```

---

## 泛型 (Generic)

[TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

定义

- 让代码变得更加健壮, 并且保持灵活性和可重用性
- 可以让用户指定的类型
- 可以避免 `any` 带来的一些问题



### 基本格式

- 在 `函数` 之前 / `类名` 之后使用 `<>` 包裹一个字符, 通常为 `T`
- 在实现 `函数` / `类` 时, 就可以使用这个字符作为类型
- 调用时, 在 `函数` / `类` 名之后加上 `<>` , 其中包含了想要指定的类型, 比如 `<string>`
  - 一般情况下会省略, 编译器会根据所给参数自动推断类型
- 可以指定多个 `泛型` 类型, 以 `,` 分隔

```typescript
// 例子中为 <Type>, 一般为 <T>
const getArray = <Type>(value: Type, items: number = 5): Type[] => {
  return new Array(items).fill(value)
}

let arr = getArray<string>('abc', 3)
let arr2 = getArray('abc', 3) // 一般情况下会省略 <string>
arr.map(item => item.length) // [3, 3, 3]
```



### 泛型约束 (Generic Constraint)

[TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

- 用于约束类型的一些性质, 比如必须拥有某些属性等等
- 创建一个 `接口` , 然后 `继承` 这个 `接口`

```typescript
interface Lengthwise {
  length: number
}

const logLength = <T extends Lengthwise>(arg: T): T => {
  console.log(arg.length)
  return arg
}

logLength(1) // 报错: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
logLength('I am a string, I have length property') // OK
```

#### 类型参数 (Type Parameter)

- 一个 `泛型` 被另一个 `泛型` 约束

```typescript
const getProps = <T, Key extends keyof T>(obj: T, key: Key): any => {
  return obj[key]
}
let obj = {
  a: 'a',
  b: 'b'
}
console.log(getProps(obj, 'a'))
console.log(getProps(obj, 'b'))
console.log(getProps(obj, 'c')) // 报错: Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'
```



### 泛型类 / 接口

- 见 `TypeScript - 类` 的 `泛型` 篇章

---

## 枚举 enum

[TypeScript: Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

- `TypeScript` 独有的类型
- 表示变量只能是固定的几个取值之一

```typescript
// 定义了一个名称叫做 Gender 的枚举类型, 取值分别是 Male 和 Female
enum Gender {
  Male,
  Female
}
const gender: Gender = Gender.Male // Male
```



### 数值枚举 (Numeric Enum)

- 给成员赋值 `数值`

- 底层实现的本质是 `数值` 类型, 所以赋值 `数值` 类型不会报错

- 取值在没有任何赋值的情况下, 默认为从上至下从 `0` 开始递增
- 可以手动指定每个取值的值
  - 手动指定之前的取值不受影响, 之后的会 `+1` 递增
  - 取值可以重复, 但先定义的会被覆盖, 无法通过 `EnumType[index]` 的方式获取到, 但是 `EnumType.Word` 依然会指向指定的数值
  - 取值可以是 `负数`
  - <span style="color: #ff0">如果某个枚举成员之前的一个成员取值不是 `数值字面量` , 那么必须要手动赋值</span>
- 数值枚举的取值可以是 `字面量` (数值, 可以视作 `常量` ) / `常量` / `计算结果` [Computed and constant members - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members)

```TypeScript
const num = 666
const getNum = (): number => {
  return 888
}
enum Gender {
  Male = 3, // 字面量 (常量的一种)
  Female = num, // 常量
  Unisex = 8, // 必须要手动赋值, 因为前面一个成员不是数值字面量
  Unknown = getNum() // 计算结果
}
console.log(Gender.Male) // 3
console.log(Gender.Female) // 666
console.log(Gender.Unisex) // 8
console.log(Gender.Unknown) // 888
```



### 反向映射 (Reverse Mapping)

- `数值枚举` 可以通过成员对应的 `取值` 拿到他的名称

```typescript
// 接上述例子
console.log(Gender[3]) // Male
console.log(Gender[666]) // Female
console.log(Gender[8]) // Unisex
console.log(Gender[888]) // Unknown
```



### 字符串枚举 (String Enum)

- 给成员赋值 `字符串`

注意点

- 在取值为 `字符串` 的成员之后的成员, 必须手动赋值
- 取值只能为 `字符串字面量` / `数值字面量` / 内部的其他枚举值, 不可以是 `常量` / `计算结果`
- `字符串枚举` **没有** `反向映射` , 无法根据 `取值` 获取到名称

```TypeScript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = Up // 内部的其他枚举值
}
console.log(Direction.Up) // "UP"
console.log(Direction.Down) // "DOWN"
console.log(Direction.Left) // "LEFT"
console.log(Direction.Right) // "UP"
```



### 异构枚举 (Heterogeneous Enum)

- 混合 `字符串枚举` / `数值枚举` 的枚举
- 一般不推荐使用, 除非真的想尝试从 `JavaScript` 的运行时行为中获取一些优势

```TypeScript
enum Direction {
  Up = 'UP', // 字符串字面量
  Down = 6, // 数值字面量, 由于跟在 字符串字面量 成员之后, 所以必须手动赋值
  Left, // 根据上一个成员的 6 自动递增到 7, 不强制手动赋值
  Right = Up // 内部的其他枚举值
}
console.log(Direction.Up) // "UP"
console.log(Direction.Down) // 6
console.log(Direction.Left) // 7
console.log(Direction.Right) // "UP"
```



### 枚举成员类型 (Enum Member Type)

- 以 `数值字面量` / `字符串字面量` 赋值的 `枚举成员` 可以作为类型使用
- <span style="color: #f90;">在企业开发中不要使用这个特性</span>
- `数值字面量` 可以赋值任意数值
- `字符串字面量` 只能赋值枚举成员的名称

```TypeScript
enum Gender {
  Male = 6,
  Female = 'Test'
}
interface TestInterface {
  age: Gender.Male,
  name: Gender.Female
}
class Person implements TestInterface {
  age: Gender.Male = 8 // 可以赋值任意数字
  name: Gender.Female = Gender4.Female // 只能赋值成员名称本身
}
```



### 联合枚举 (Union Enum)

- 枚举类型本身会自动变成枚举成员的联合

```TypeScript
enum Gender {
  Male,
  Female
}
// 会被视为
interface TestInterface {
  gender: Gender // gender: (Gender.Male | Gender.Female)
}
```



### 常量枚举 const

[const enums - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

- `常量枚举` 不会生成真实存在的对象
- 编译时会利用枚举成员的 `取值` 直接替换
- 可以减少文件体积
- 但是有一些陷阱, 具体见文档 [Const enum pitfalls - Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls)
- `常量枚举` 只能赋值 `字面量` 或其他枚举成员
- 可以通过 `preserveConstEnums` 选项来防止 `常量枚举` 在编译时被移除

```typescript
const enum Enum {
  A,
  B
}
```



























