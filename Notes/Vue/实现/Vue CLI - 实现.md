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
- 通过 `Commander` 快速实现

```js
const { program } = require('commander')
const { version } = require('../package.json')

/* Deal with command line arguments */
// usage & version
program
  .version(`@aue/cli v${ version }`)
  .name('aue')
  .usage('<command> [options]')

// parse arguments
program.parse(process.argv)
```

---

## 指令 (command)

- 通过 `Commander` 实现

示例

```js
// create
program
  .command('create <app-name>')
  .alias('c')
  .description('create a new project powered by vue-cli-service')
  .action(() => {
    console.log('Creating Vue App')
  })
```



### create

本质

- 从网络上下载提前准备好的模板
- 再自动安装模板中的相关依赖实现

实现

1. 下载模板名称
2. 通过 `inquirer` 询问用户使用哪个模板
2. 下载用户选择的模板的所有版本号
2. 通过 `inquirer` 询问用户使用哪个版本
2. 根据模板名称和版本号下载模板
2. 将模板下载到 `用户目录` 中
2. 进行一些操作
2. 将处理过的模板拷贝到 `执行指令的目录` 中

