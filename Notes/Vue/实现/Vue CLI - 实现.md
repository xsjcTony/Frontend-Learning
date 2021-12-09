# Vue CLI - 实现



## 分析

- `Vue CLI` 是一个 `全局包`

---

## 创建全局包

1. 使用 `npm init -y` 新建一个 `包`
2. 建立文件 `/bin/index.js`
3. 在文件开头添加 `#! /usr/bin/env node` 来指定文件使用 `node.js` 执行
4. 在 `package.json` 中添加 `bin` 属性, 指定 `vue` 命令到 `/bin/index.js`

```js
// /bin/index.js
#! /usr/bin/env node

// ...
```

```json
// package.json
{
  // ...
  "bin":  {
    "aue": "./bin/index.js"
  },
  // ...
}
```

---

## 版本 & 帮助

- 任何程序都应当包含 `--version` 版本命令以及 `--help` 帮助命令
