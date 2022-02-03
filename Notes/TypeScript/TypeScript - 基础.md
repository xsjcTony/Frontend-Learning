# TypeScript - 基础



> [TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)
>
> [typescript - npm](https://www.npmjs.com/package/typescript)



## 定义

- 简称 `TS`
- 是 `JavaScript` 的超集, 类似于 `less` / `sass` 和 `css` 的关系

---

## 特点

- `强类型` 语言, 提供了一套静态检测机制, 在编译时就能发现错误
- 支持最新的 `JavaScript` 新特性
- 支持后端语言中的特性
  - 枚举
  - 泛型
  - 类型转换
  - 命名空间
  - 声明文件
  - 类
  - 接口
  - ...
- 在 `TypeScript` 文件中可以直接编写 `JavaScript` 代码

---

## 安装

```shell
npm i -g typescript
```

---

## 基本格式

- 在一个变量后通过 `:` 来指定类型

```typescript
const val: string

function test (a: any[], b: number): number { /* ... */ }

let arrowFn = (a: unknown): unknown => { /* ... */ }
```































