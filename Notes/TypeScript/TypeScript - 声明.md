# TypeScript - 声明



## 基本概念

- `TypeScript` 默认情况下是不认识引入的第三方 `JavaScript` 库的
- 使用时需要通过 `TypeScript 声明` 来告诉 `TypeScript` 这个库是什么, 怎么用

---

## 基本格式

- 使用 `declare` 关键字
- `声明` 中不能出现 `实现`

```TypeScript
// 声明 jQuery
declare const $: (selector: string) => {
  width (): number
  height (): number
  ajax (url: string, config: {}): void
}

$('.main').height()
$('.main').width()
```

---

## 声明文件

- `TypeScript` 不推荐将 `声明` 和 `使用` 写在一个文件中
- `声明` 应写在单独的一个 `声明文件` 中
- `xxx.d.ts` 即为一个 `声明文件` , 扩展名为 `.d.ts`
- 可以在 `tsconfig` 中加上强制查找 `.d.ts` 的配置

```json
"include": [
  "./**/*.ts",
  "./**/*.d.ts"
]
```

```TypeScript
declare const myName

declare function say (name: string, age: number): void

declare class Person {
  name: string
  age: number

  constructor (name: string, age: number)

  say (): void
}
```

---

## 声明文件模板

[TypeScript: Documentation - Templates](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html)

- `TypeScript` 声明文件的规范为 `@types/xxx`
- 常用的库一般都有编写好的 `声明文件`

```shell
npm i -D @types/jquery
```

























































