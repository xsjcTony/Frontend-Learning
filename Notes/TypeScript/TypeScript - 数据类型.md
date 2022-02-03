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



### 枚举 enum

- `TypeScript` 独有的类型
- 表示变量只能是固定的几个取值之一

注意点

- 底层实现的本质是 `数值` 类型, 所以赋值 `数值` 类型不会报错
- 取值默认为从上至下从 `0` 开始递增
- 可以手动指定每个取值的值
  - 手动指定之前的取值不受影响, 之后的会 `+1` 递增
  - 取值可以重复
  - 取值可以是 `负数`
- 可以通过对应的 `数值` 拿到他的取值

```TypeScript
// 定义了一个名称叫做 Gender 的枚举类型, 取值分别是 Male 和 Female
enum Gender {
  Male
  Female
}
// 定义了一个变量 val, 这个变量只能保存 Male 或 Female
let val: Gender
val = Gender.Male // 赋值为 Male
val = 1 // 赋值 number 不会报错
console.log(Gender.Male) // 输出 0

// 自定义取值的值
enum Gender2 {
  Male,
  Female = 6,
  Unisex
}
console.log(Gender2.Male) // 0
console.log(Gender2.Female) // 6
console.log(Gender2.Unisex) // 7
console.log(Gender2[6]) // Male
console.log(Gender2[15]) // undefined
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

- 表示一个 `对象`
- 多用 `接口` ( `interface` ) 来表示

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



































