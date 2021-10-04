# NodeJS



> [Node.js](https://nodejs.org/en/)



## 定义

- 基于 `Chrome V8` 引擎的JavaScript `运行环境`

- `Chrome V8` 引擎: 一款专门解释和执行JavaScript代码的虚拟机, 任何程序只要集成了该引擎都可以执行JavaScript代码
- 运行环境: 特定事物的生存环境, `NodeJS` 是JavaScript应用程序的生存环境
- 提供了操作系统底层的API, 可以用JavaScript编写出在网页中无法实现的功能 (打包工具, 网站服务器等)

---

## 搭建多版本共存环境

> [coreybutler/nvm-windows: A node.js version management utility for Windows. Ironically written in Go.](https://github.com/coreybutler/nvm-windows)

命令

- `nvm version` : 查看当前 `nvm` 版本
- `nvm install *versionNumber*` : 安装指定版本的 `NodeJS`
- `nvm uninstall *versionNumber*` : 卸载指定版本的 `NodeJS`
- `nvm use *versionNumber*` : 使用指定版本的 `NodeJS`
- `nvm list` : 查看所有已安装的 `NodeJS` 版本

步骤

1. 新建一个目录, 绝对路径不能带有空格
2. 将 `v1.1.7` 的 `no-setup` 版本下载至其中并解压 ( `v1.1.8` 有点问题)
3. <span style="color: yellow;">以管理员身份</span>运行 `install.cmd` , 并直接回车
4. 将 `settings.txt` 另存到 `nvm` 目录下
5. 将 `root` 和 `path` 分别设置为指定路径 <span style="color: yellow; font-weight: 700;">( `path` 必须本身不存在)</span>
6. 在 `系统环境变量` 中修改 `NVM_HOME` 和 `NVM_SYMLINK` 为指定路径
7. 在 `Path` 中添加 `%NVM_HOME%` 和 `%NVM_SYMLINK%`
8. <span style="color: yellow;">以管理员身份</span>打开命令提示符, 安装对应版本并使用想使用的版本

---

## 程序执行方式

- 可以直接在命令行工具中编写并执行JavaScript代码
    - 使用 `REPL` : 9Read, Eval, Print, Loop) 交互式解释器
- 可以在命令行工具中直接执行JavaScript文件中的代码
    - 在JavaScript代码文件的目录中打开命令行工具, 输入 `node *fileName*`
    - `WebStorm` 中配置好之后也可以直接运行 (右键 => `run`) <span style="color: yellow;">(企业开发中常用方式)</span>

---

## Node环境和浏览器环境的区别

| 不同点         | 浏览器       | NodeJS         |
| -------------- | ------------ | -------------- |
| 内置的全局对象 | window       | global         |
| this的默认指向 | window       | {} (空对象)    |
| API            | 有 DOM / BOM | 没有 DOM / BOM |

---

## 模块



### 概念

定义

- 用于防止命名重复以及提升代码可维护性

浏览器中的模块

- 一个类
- 一个立即执行函数

- 没有标准规范

NodeJS中的模块

- 采用 `CommonJS` 规范实现了模块系统

`CommonJS` 规范

- 一个 `.js` 文件就是一个模块
- 每个文件中的变量 / 函数都是私有的, 其他文件不可见
- 每个文件中的变量 / 函数必须通过 `exports` 导出之后, 其他文件才能使用
- 想要使用其他文件暴露的变量 / 函数必须通过 `require` 导入之后, 才可以使用



### 自定义模块



#### `exports` (导出)

定义

- 本身是一个对象

- 用于暴露一些变量 / 函数让别的模块使用

```js
// fileA.js
const name = 'Tony'
function sum (a, b) {
  return a + b
}

exports.str = name
exports.fn = sum
```

暴露方法

- `exports.xxx` : 自定义一个键值 `xxx` , 并给其赋值, 不可以直接赋值给 `exports`
- `module.exports.xxx` : 与上一种方式格式相同, 但可以直接赋值给 `module.exports` , <span style="color: yellow;">企业开发中禁止直接赋值, 只会面试的时候问</span>
- `global.xxx` : 相当于浏览器中的 `window.xxx` 暴露用法, 但是也需要使用 `require` 在其他文件中导入, <span style="color: yellow; font-weight: 700;">企业开发中禁止使用, 不符合 `CommonJS` 规范</span>



#### `require()` (导入)

- 用于导入其他模块中暴露出来的变量 / 函数给当前模块使用

```js
// fileB.js
const aModule = requires('./fileA')

console.log(name) // ReferenceError
console.log(sum(10, 20)) // ReferenceError

console.log(aModule.str) // Tony
console.log(aModule.fn(10, 20)) // 30
```

注意点

- 导入自定义模块
    - 导入 `自定义模块` 必须加上路径
        - `/` : `绝对路径`
        - `./` : `相对路径`
    - 不写扩展名 (不指定导入模块的类型)的情况下会依次查找
        - `.js` 文件
        - `.json` 文件
        - `.node` 文件
        - 都找不到则报错
    - 无论导入哪一种, 到入职后都会转换成 `JavaScript对象` 并返回
- 导入系统模块
    - 不用添加路径
    - 会直接到环境变量配置的路径中查找
- 导入第三方模块
    - 不用添加路径
    - 会按照 `module.paths` 数组中的路径依次查找

---

## 包 (package)



### 定义

- 在模块化开发中, 一个模块一般只完成一个特定的功能, 而有些比较复杂的功能需要多个模块组成
- `包` 用来维护多个模块之间的关系
- 一个 `模块` 是一个 `文件`
- 一个 `包` 可以有一个或多个 `模块`



### npm (Node Package Manager)

> [npm](https://www.npmjs.com/)

定义

- `NodeJS` 中的包管理工具
- 搭建完 `NodeJS` 后已经自动安装
- 可以快速安装 / 删除 / 发布 / 升级一些包
- 类似于 `软件管家` 类程序

全局安装 (安装好后任何这台电脑上的项目都可以使用, 存储在全局 `node_modules` 中)

- `npm install -g *packageName*` : 安装指定的包 (默认为最新版本)
    - `npm install -g *packageName@versionNumber*` : 安装指定的包的指定版本
- `npm uninstall -g *packageName*` : 卸载指定的包
- `npm update -g *packageName*` : 更新指定的包
    - 如果更新出错, 也可以使用安装命令直接安装最新版本

本地安装 (安装好后只有当前项目可以使用, 存储在当前项目的 `node_modules` 中)

- 需要初始化 `package.json` 文件才能在本地该项目下使用包
    - `npm init -y` : 初始化 `package.json` 文件
    - `npm install` : 根据 `package.json` 中的 `dependencies` 以及 `devDependencies` 安装所有需要的包
        - `npm install --development` : 和 `npm install` 一样
        - `npm install --production` : 只根据 `package.json` 中的 `dependencies` 安装成品需要的包
- `npm install *packageName*` : 安装指定的包 (默认为最新版本)
    - `npm install *packageName@versionNumber*` : 安装指定的包的指定版本
    - `npm install *packageName* --save` : 安装上线阶段也需要的包, 和不加一个效果
    - `npm install *packageName* --save-dev` : 安装只有在开发阶段才需要的包
- `npm uninstall *packageName*` : 卸载指定的包
- `npm update *packageName*` : 更新指定的包
    - 如果更新出错, 也可以使用安装命令直接安装最新版本

---

## global全局对象

> [Global objects | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html)



### 散件

`__dirname`

- 当前JavaScript文件所处的 `目录`

`__filename`

- 当前JavaScript文件的 `绝对路径`

`setTimeout()` / `clearTimeout()`

- 和浏览器中的一样

`setInterval()` / `clearInterval()`

- 和浏览器中的一样

`console` 

- 和浏览器中的一样



### Buffer

> [Buffer | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html)

定义

- `global` 对象上的一个类
- 专门用于存储字节数据 (二进制数据)

本质

- `Buffer` 本质上就是一个 `数组`
- 可以通过 `索引` 来操作 `Buffer` 中的值

```js
const buffer = Buffer.from([1, 3, 5])
console.log(buffer) // <Buffer 01 03 05>

buffer[0] = 7
console.log(buffer) // <Buffer 07 03 05>
```

创建 `Buffer` 对象

- `Buffer.alloc()`

    - `size` : 要开辟的存储空间的大小 (单位为 `Byte` )
    - `fill` : (Optional) 想要预先存储在这块存储空间中的内容
    - `encoding` : (Optional) 编码方式, 默认为 `utf-8` , 一般不需要修改

    - 注意点
        - 通过 `console.log()` 输出 `Buffer` , 会自动将存储的内容 ( `二进制` ) 转换成 `16进制` 再输出

    ```js
    const buffer = Buffer.alloc(5, 17)
    console.log(buffer) // <Buffer 11 11 11 11 11>
    ```

- `Buffer.from()`

    - `string` : 根据 `数组` / `字符串` 中的数据转换为 `二进制` 并存进 `Buffer` 中
    - `encoding` : (Optional) 编码方式, 默认为 `utf-8` , 一般不需要修改

    ```js
    const buffer = Buffer.from('abc')
    console.log(buffer) // <Buffer 61 62 63>
    ```

常用实例方法

- `toString()` : 将二进制数据转换成字符串

    ```js
    const buffer = Buffer.from([97, 98, 99])
    console.log(buffer.toString()) // abc
    ```

- `write()` : 往 `Buffer` 中写入数据

    - `string` : 需要写入的数据
    - `offset` : (Optional) 开始存储数据的位置 (索引), 默认为 `0`
    - `length` : (Optional) 存储数据的字节数, 默认为 `buffer.length - offset`
    - `encoding` : (Optional) 编码方式, 默认为 `utf-8` , 一般不需要修改

    ```js
    const buffer = Buffer.alloc(5)
    console.log(buffer) // <Buffer 00 00 00 00 00>
    
    buffer.write('abcdefg', 2, 2)
    console.log(buffer) // <Buffer 00 00 61 62 00>
    console.log(buffer.toString()) // ab
    ```

- `slice()` : 根据现有的 `Buffer` 剪切出一个新的 `Buffer`

    - `start` : (Optional) 开始截取的索引位置 (包含), 默认为 `0`
    - `end` : (Optional) 结束截取的索引位置 (不包含), 默认为 `buffer.length`

    ```js
    const buffer1 = Buffer.from('abcdefg')
    const buffer2 = buffer1.slice(2, 4)
    console.log(buffer2) // <Buffer 63 64>
    console.log(buffer2.toString()) // cd
    ```

常用静态方法



