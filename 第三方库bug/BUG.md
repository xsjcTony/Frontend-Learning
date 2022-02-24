# 第三方库的一些BUG



## egg-validate

[egg-validate - npm](https://www.npmjs.com/package/egg-validate)

版本

- `v2.0.2`

`index.d.ts` 中的类型错误

- `Application.validator.validate` 的返回结果缺少 `undefined`

- 由于调用 `parameter` 第三方库, 其中在没有 `errors` 时, 会返回 `undefined` , 在 `egg-validate` 中没有指明

  ```js
  // parameter 中的返回方式
  if (errors.length) {
    return errors
  }
  ```

```TypeScript
// egg-validate 的 index.d.ts
declare module 'egg' {
  export interface Application {
    validator: {
      addRule: (type: string, check: RegExp | CheckHandlerFunc) => void;
      validate: (rules: any, data: any) => ValidateError[] | undefined; // 原版缺少 undefined
    };
  }
}
```

