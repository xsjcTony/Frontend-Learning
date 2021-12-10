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
    - 使用 `REPL` : (Read, Eval, Print, Loop) 交互式解释器
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

## 常用



### Buffer

> [Buffer | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html)

定义

- `global` 对象上的一个类
- 专门用于存储字节数据 (二进制数据)
- 在 `global` 全局对象中, 直接使用即可

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

- `toString()` : 将二进制数据转换成字符串并返回

    ```js
    const buffer = Buffer.from([97, 98, 99])
    console.log(buffer.toString()) // abc
    ```

- `write()` : 往 `Buffer` 中写入数据

    - `string` : 需要写入的数据
    - `offset` : (Optional) 开始存储数据的位置 (索引), 默认为 `0`
    - `length` : (Optional) 存储数据的字节数, 默认为 `buffer.length - offset`
    - `encoding` : (Optional) 编码方式, 默认为 `utf-8` , 一般不需要修改
    - 返回值: 成功写入的字节数

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
    - 返回值: 新的 `Buffer`

    ```js
    const buffer1 = Buffer.from('abcdefg')
    const buffer2 = buffer1.slice(2, 4)
    console.log(buffer2) // <Buffer 63 64>
    console.log(buffer2.toString()) // cd
    ```

常用静态方法

- `Buffer.isEncoding()` : 检查是否支持某种编码格式

    - `string` : 需要检查的编码格式
    - 返回值: 支持返回 `true` , 不支持返回 `false`

    ```js
    console.log(Buffer.isEncoding('utf8')) // true
    console.log(Buffer.isEncoding('utf-8')) // true
    console.log(Buffer.isEncoding('gbk')) // false
    console.log(Buffer.isEncoding('')) // false
    ```

- `Buffer.isBuffer()` : 检查对象是否是 `Buffer`

    - `obj` : 需要检查的对象
    - 返回值: 是返回 `true` , 不是返回 `false`

    ```js
    const obj1 = {}
    const obj2 = Buffer.alloc(5)
    console.log(Buffer.isBuffer(obj1)) // false
    console.log(Buffer.isBuffer(obj2)) // true
    ```

- `Buffer.byteLength()` : 获取 `Buffer` 实际字节长度

    - `string` : 需要计算长度的数值
    - 返回值: 实际字节长度
    - 注意点
        - 一个汉字需要三个字节
        - 一般使用 `buffer.length` 直接获取

    ```js
    const buffer = Buffer.from('123')
    console.log(Buffer.byteLength(buffer)) // 3
    ```

- `Buffer.concat()` : 拼接多个 `Buffer`

    - `list` : 包含所有需要拼接的 `Buffer` 的 `数组` 
    - 返回值: 新的拼接好的 `Buffer`

    ```js
    const buffer1 = Buffer.from('123')
    const buffer2 = Buffer.from('abc')
    const buffer3 = Buffer.from('xxx')
    const res = Buffer.concat([buffer1, buffer2, buffer3])
    console.log(res) // <Buffer 31 32 33 61 62 63 78 78 78>
    console.log(res.toString()) // 123abcxxx
    ```

    

### Path

> [Path | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/path.html)

定义

- 用于处理路径

- 不在 `global` 全局对象中, 使用前需要手动导入

    ```js
    const path = require('path') // 导入系统模块不写路径
    ```

常用属性

- `path.sep` : 获取当前操作系统中路径的分隔符

    ```js
    const path = require('path')
    // Linux
    console.log(path.sep) // /
    // Windows
    console.log(path.sep) // \
    ```

- `path.delimiter` : 获取当前操作系统中环境变量的分隔符

    ```js
    const path = require('path')
    // Linux
    console.log(path.delimiter) // :
    // Windows
    console.log(path.delimiter) // ;
    ```

常用方法

- `path.basename()` : 获取路径的最后一个组成部分

    - `path` : 路径
    - `extension` : (Optional) 需要去掉的扩展名

    ```js
    const path = require('path')
    console.log(path.basename('a/b/c/d')) // d
    console.log(path.basename('a/b/c/d/index.html')) // index.html
    console.log(path.basename('a/b/c/d/index.html', '.html')) // index
    ```

- `path.dirname()` : 获取路径当中的路径 (除了最后一个部分)

    - `path` : 路径

    ```js
    const path = require('path')
    console.log(path.dirname('a/b/c/d')) // a/b/c
    console.log(path.dirname('a/b/c/d/index.html')) // a/b/c/d
    ```

- `path.extname()` : 获取路径当中最后一个组成部分的扩展名 (带 `.` )

    - `path` : 路径

    ```js
    const path = require('path')
    console.log(path.extname('a/b/c/d')) // 
    console.log(path.extname('a/b/c/d/index.html')) // .html
    ```

- `path.isAbsolute()` : 判断路径是否是 `绝对路径`

    - `path` : 路径
    - 返回值: 是返回 `true` , 不是返回 `false`
    - 注意点
        - 需要区分操作系统
            - `Linux` 中, `/` 开头就是绝对路径, 斜杠是 `/`
            - `Windows` 中, `盘符` 开头就是绝对路径, 斜杠是 `\` , 需要写两个 `\\` 才行

    ```js
    const path = require('path')
    // Linux
    console.log(path.isAbsolute('/a/b/c/d/index.html')) // true
    console.log(path.isAbsolute('./a/b/c/d/index.html')) // false
    // Windows
    console.log(path.isAbsolute('c:\\a\\b\\c\\d\\index.html')) // true
    console.log(path.isAbsolute('a\\b\\c\\d\\index.html')) // false
    ```

- `path.parse()` : 将路径转换成对象

    - `path` : 路径

    ```js
    const path = require('path')
    console.log(path.parse('/a/b/c/d/index.html'))
    /*
    {
      root: '/',
      dir: '/a/b/c/d',
      base: 'index.html',
      ext: '.html',
      name: 'index'
    }
    */
    ```

- `path.format()` : 将对象转换成路径

    - `pathObject` : 用于转换的对象, 必须符合格式

    ```js
    const path = require('path')
    const obj = {
      root: '/',
      dir: '/a/b/c/d',
      base: 'index.html',
      ext: '.html',
      name: 'index'
    }
    console.log(path.format(obj)) // /a/b/c/d\index.html
    ```

- `path.join()` : 拼接路径

    - `...paths` : 用于拼接的路径, 每一个都是 `string`
    - 注意点
        - 如果参数中没有最前面没有 `/` , 那么会自动添加
        - `..` 会去到前面生成的路径的上一级

    ```js
    const path = require('path')
    console.log(path.join('/a/b', 'c')) // \a\b\c
    console.log(path.join('/a/b', 'c', '..')) // \a\b
    console.log(path.join('/a/b', 'c', '../')) // \a\b\
    console.log(path.join('/a/b', 'c', '../../')) // \a\
    ```

- `path.normalize()` : 规范化路径 (将不标准的路径转换成标准路径)

    - `path` : 路径

    ```js
    const path = require('path')
    console.log(path.normalize('/a//b///c////d/////index.html')) // \a\b\c\d\index.html
    ```

- `path.relative()` : 计算起始位置到终点位置的 `相对路径`

    - `from` : 起始位置
    - `to` : 终点位置

    ```js
    const path = require('path')
    console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')) // ..\..\impl\bbb
    ```

- `path.resolve()` : 计算根据参数路径生成的 `绝对路径`

    - `...paths` : 用于拼接的路径, 每一个都是 `string`
    - 注意点
        - 如果后面的参数有 `绝对路径` , 那么前面的会直接被忽略

    ```js
    const path = require('path')
    console.log(path.resolve('/foo/bar', './baz'))
    ```



### File System

> [File system | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html)

定义

- 用于与文件交互

- 不在 `global` 全局对象中, 使用前需要手动导入

    ```js
    const fs = require('fs') // 导入系统模块不写路径
    ```

文件相关方法

- `fs.stat()` : 获取文件信息 (异步版本)

    - `path` : 文件路径
    - `callback` : 回调函数, 包含两个参数
        - `err` : 若获取失败则错误存储在其中
        - `stats` : 若获取成功则信息存储在其中

    ```js
    const fs = require('fs')
    
    fs.stat(__filename, function (err, stats) {
      // console.error(err)
      console.log(stats)
      /*
      Stats {
        dev: 4278049841,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 6192449488291152,
        size: 122,
        blocks: 0,
        atimeMs: 1633429793935.5742,
        mtimeMs: 1633429793935.5742,
        ctimeMs: 1633429793935.5742,
        birthtimeMs: 1633429604069.7131,
        atime: 2021-10-05T10:29:53.936Z,
        mtime: 2021-10-05T10:29:53.936Z,
        ctime: 2021-10-05T10:29:53.936Z,
        birthtime: 2021-10-05T10:26:44.070Z
      }
    	*/
      console.log(stats.isFile()) // true // 判断是否为文件
      console.log(stats.isDirectory()) // false // 判断是否为文件夹
    })
    ```

    - `fs.statSync()` : 获取文件信息 (同步版本), 通过返回值的方式获取 `err` 或 `stats`

        ```js
        const fs = require('fs')
        
        const stats = fs.statSync(__filename)
        console.log(stats)
        ```

- `fs.readFile()` : 读取文件 (异步版本) / `fs.readFileSync()` 同步版本

    - `path` : 文件路径
    - `encoding` : (Optional) 编码格式, 默认为 `null` , 不指定的话会放到 `Buffer` 当中返回, `utf-8` 会转换为字符串返回
    - `callback` : 回调函数

- `fs.writeFile()` : 向文件中写入数据 (完全覆盖) (异步版本) / `fs.writeFileSync()` 同步版本

    - `path` : 文件路径
    - `encoding` : (Optional) 写入数据的编码格式, 默认为 `utf-8`
    - `callback` : 回调函数

    ```js
    const fs = require('fs')
    const path = require('path')
    
    fs.writeFile(path.join(__dirname, 'Tony.txt'), 'Tony loves Lily', 'utf-8', function (err) {
      if (err) {
        throw new Error('failed write file')
      } else {
        console.log('write file success')
      }
    })
    ```

- `fs.appendFile()` : 向文件中写入数据 (追加数据) (异步版本) / `fs.appendFileSync()` 同步版本

    - `path` : 文件路径
    - `encoding` : (Optional) 写入数据的编码格式, 默认为 `utf-8`
    - `callback` : 回调函数

- `fs.createReadStream()` : 分批读取 (应用于大文件, 防止内存爆炸)

    - `path` : 文件路径
    - `options` : (Optional) 可选配置
        - `encoding` : 编码格式, 默认为 `null` , 不指定的话会放到 `Buffer` 当中返回, `utf-8` 会转换为字符串返回
        - `highWaterMark` : 每次读取的字节数, 默认为 `64KB` (64 * 1024)

    - 返回值: `fs.ReadStream`
    - 通过 `事件` 来读取数据, 常用的有
        - `open` : 读取流创建成功, 和文件建立联系
        - `error` : 读取流创建失败
        - `data` : 读取流从文件中读取到了数据
        - `close` : 读取流读取数据完毕, 和文件断开关系

    ```
    Tony loves Lily
    ```

    ```js
    const fs = require('fs')
    const path = require('path')
    
    const readStream = fs.createReadStream(path.join(__dirname, 'Tony.txt'), { encoding: 'utf-8', highWaterMark: 2 })
    readStream.on('open', function () {
      console.log('read stream created successfully')
    })
    readStream.on('error', function () {
      console.log('read stream create failed')
    })
    readStream.on('data', function (data) {
      console.log('loaded data from read stream', data)
    })
    readStream.on('close', function () {
      console.log('data read complete, read stream closed')
    })
    
    /*
    read stream created successfully
    loaded data from read stream To
    loaded data from read stream ny
    loaded data from read stream  l
    loaded data from read stream ov
    loaded data from read stream es
    loaded data from read stream  L
    loaded data from read stream il
    loaded data from read stream y
    data read complete, read stream closed
    */
    ```

- `fs.createWriteStream()` : 分批写入 (应用于大文件, 防止内存爆炸)

    - `path` : 文件路径
    - `options` : (Optional) 可选配置
        - `encoding` : 编码格式, 默认为 `utf-8`

    - 返回值: `fs.writeStream`
    - `事件` 
        - `open` : 写入流创建成功, 和文件建立联系
        - `error` :写入流创建失败
        - `close` : 写入流写入数据完毕, 和文件断开关系
    - 通过 `writeStream.write()` 写入内容
    - 写入完毕之后通过 `writeStream.end()` 关闭写入流

    ```js
    const fs = require('fs')
    const path = require('path')
    
    const writeStream = fs.createWriteStream(path.join(__dirname, 'Lily.txt'), { encoding: 'utf-8' })
    
    writeStream.on('open', function () {
    
    })
    writeStream.on('error', function () {
    
    })
    writeStream.on('close', function () {
    
    })
    writeStream.write('12345')
    writeStream.write('abcde')
    writeStream.end()
    ```

- 拷贝文件
    - `readStream.pipe(writeStream)` : 将数据从读取流写入到写入流

    ```js
    const fs = require('fs')
    const path = require('path')
    
    const readPath = path.join(__dirname, 'test.mp4')
    const writePath = path.join(__dirname, 'abc.mp4')
    
    const readStream = fs.createReadStream(readPath)
    const writeStream = fs.createWriteStream(writePath)
    
    readStream.pipe(writeStream) // 写入完毕会自动关闭写入流
    ```

目录相关方法

- `fs.mkdir()` : 创建目录 (异步版本) / `fs.mkdirSync()` 同步版本

    - `path` : 文件夹路径
    - `callback` : 回调函数, 有一个 `err` 参数

    ```js
    const fs = require('fs')
    const path = require('path')
    
    fs.mkdir(path.join(__dirname, 'abc'), (err) => {
      if (err) {
        throw new Error('create directory failed')
      } else {
        console.log('create directory success')
      }
    })
    ```

- `fs.rmdir()` : 删除目录 (异步版本) / `fs.rmdirSync()` 同步版本

    - `path` : 文件夹路径
    - `callback` : 回调函数, 有一个 `err` 参数

    ```js
    const fs = require('fs')
    const path = require('path')
    
    fs.rmdir(path.join(__dirname, 'abc'), (err) => {
      if (err) {
        throw new Error('create directory failed')
      } else {
        console.log('create directory success')
      }
    })
    ```

- `fs.readdir()` : 读取目录 (异步版本) / `fs.readdirSync()` 同步版本

    - `path` : 文件夹路径
    - `callback` : 回调函数, 有 `err` / `files` 两个参数

    ```js
    const fs = require('fs')
    const path = require('path')
    
    fs.readdir(__dirname, (err, files) => {
      if (err) {
        throw new Error('read directory failed')
      } else {
        files.forEach((file) => {
          const filePath = path.join(__dirname, file)
          const stats = fs.statSync(filePath)
          if (stats.isFile()) {
            console.log(file, 'file')
          } else if (stats.isDirectory()) {
            console.log(file, 'directory')
          }
        })
      }
    })
    ```



### HTTP

定义

- 用于构建web服务器

- 接收 / 响应浏览器请求

- 不在 `global` 全局对象中, 使用前需要手动导入

    ```js
    const http = require('http') // 导入系统模块不写路径
    ```

搭建一个简易的web服务器

1. 创建服务器实例对象

    ```js
    const server = http.createServer()
    ```

2. 注册监听请求

    - `writeHead()` 方法告诉浏览器返回的数据类型, 使用字符集编码
    - `end()` 方法用于返回数据并结束请求 / `write()` 方法用于返回多次数据 (本质是存储之后一起返回), 需要在最后加上 `end()`

    ```js
    server.on('request', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      // res.end('response data')
      res.write('1')
      res.write('2')
      res.end()
    })
    ```

3. 指定监听的端口

    ```js
    server.listen(3000)
    ```

- 简写 (链式编程)

    ```js
    const http = require('http')
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('response data')
    }).listen(3000)
    ```

路径分发 (路由)

- 根据不同请求路径返回不同的数据

- 通过监听请求方法中的 `request` 对象, 可以获取当前请求的路径

- `request` 对象本质是 `http.IncomingMessage` 类的实例

- `respond` 对象本质是 `http.ServerResponse` 类的实例

- 通过判断请求路径的地址就可以实现不同请求路径返回不同的数据

    ```js
    const http = require('http')
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      if (req.url.startsWith('/index')) {
        // res.end('index1')
        res.write('index1')
        res.write('index2')
        res.end()
      } else if (req.url.startsWith('/login')) {
        res.end('login')
      } else {
        res.end('no data')
      }
    }).listen(3000)
    ```

返回静态资源

- 加载除了文本类型外的其他资源不能在 `readFile()` 中写 `utf-8` , 但是文本一定要加
- 如果服务器在响应数据的时候没有指定响应头, 那么有的浏览器上响应的数据可能无法显示

    ```js
    const http = require('http')
    const path = require('path')
    const fs = require('fs')
    const mime = require('./mime.json')
    
    const server = http.createServer((req, res) => {
      readFile(req, res)
    }).listen(3000)
    
    function readFile (req, res) {
      const filePath = path.join(__dirname, 'www', req.url)
      const extension = path.extname(filePath)
      let type = mime[extension]
    
      if (type.startsWith('text')) {
        type += '; charset=utf-8'
      }
    
      fs.readFile(filePath, (err, data) => {
        res.writeHead(200, { 'Content-Type': type })
    
        if (err) {
          res.end('Server Error')
        }
        res.end(data)
      })
    }
    ```

区分请求种类

- `req.method` : 发送请求的种类

    ```js
    const http = require('http')
    
    const server = http.createServer((req, res) => {
      if (req.method.toLowerCase() === 'get') {
        // get
      } else if (req.method.toLowerCase() === 'post') {
        // post
      }
    }).listen(3000)
    
    ```



### URL

定义

- 用于处理 `url` 相关事物

- 使用 `new URL()` 即可, 无需导入

    ```js
    const url = new URL('https://www.baidu.com/') // 无需导入
    ```

URL的组成

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

获取 `GET` 请求参数

- `url.searchParams.get(key)` : 返回请求中 `key` 的 `value` , `key` 不存在则返回 `null`

    ```js
    const url = new URL('http://root:123456@www.it666.com:80/index.html?name=Tony&age=24#banner')
    console.log(url.searchParams.get('name')) // Tony
    console.log(url.searchParams.get('age')) // 24
    console.log(url.searchParams.get('abc')) // null
    ```

获取 `POST` 请求参数

- 在 `NodeJS` 中, `POST` 请求的参数不能一次性拿到, 必须分批获取

    ```js
    const http = require('http')
    
    const server = http.createServer((req, res) => {
      let params = ''
      
      req.on('data', (chunk) => {
        params += chunk
      })
      
      req.on('end', () => {
        const myParams = new URLSearchParams(params)
        res.end(myParams.get('userName') + ' / ' + myParams.get('password'))
      })
    }).listen(3000)
    ```



### VM

定义

- 一个可以执行JavaScript代码的虚拟环境

- 并不是一个安全的环境, 不能用来执行不信任的代码

- 不在 `global` 全局对象中, 使用前需要手动导入

    ```js
    const vm = require('vm')
    ```

环境

- 执行字符串中的代码的环境

| 环境                  | 本地变量 | 全局变量 |
| --------------------- | -------- | -------- |
| vm.runInThisContext() | 不能访问 | 可以访问 |
| vm.runInNewContext()  | 不能访问 | 不能访问 |

- `vm.runInNewContext()` 相对安全一些



### process

- `process.argv` : 命令行参数 `数组` ( `string[]` )
  - 第一项: `nodeJS` 的路径
  - 第二项: 当前执行的 `JavaScript` 文件的路径
  - 其余为命令行参数, 以 `空格` 作为分隔
- `process.env` : 当前系统环境变量
  - `USERPROFILE` : 当前用户目录 (windows)

- `process.platform` : 当前系统平台
  - `win32` : Windows
  - `darwin` : MacOS




### util

- `util.promisify()` : 将把 `err` 作为第一个参数的回调函数作为最后一个参数的方法转换成返回 `Promise` 的版本

---

## 包 (Package)



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
- `npm adduser` : 用于添加用户信息
- `npm publish` : 发布当前的包
- `npm link` : 将当前包注册为全局包



### 自定义包



#### 基本流程

1. 新建一个包文件夹
2. 在 `包` 根目录创建 `package.json` 文件
3. 在 `包` 中编写业务逻辑代码
4. 将 `包` 上传到 `npm` 官网
    - `npm adduser`
    - `npm publish`



#### `package.json` 属性详解

基本属性


- `name` : 包的名称, 必须是唯一的, 由小写英文字母, 数字和下划线组成, 不能包含空格
- `description` : 包的简要说明
- `version` : 符合语义化版本识别规范的版本字符串
    + 主版本号 : 当你做了不兼容的 API 修改
    + 子版本号 : 当你做了向下兼容的功能性新增
    + 修订号 : 当你做了向下兼容的问题修正
- `keywords` : 关键字 `数组` , 通常用于搜索
- `author` : 包的作者
- `maintainers` : 维护者 `数组` , 每个元素要包含name, email (可选), web (可选) 字段
- `contributors` : 贡献者 `数组` , 格式与 `maintainers` 相同。包的 `author` 应该是贡献者数组的第一个元素
- `bugs` : 提交bug的地址, 可以是网站或者电子邮件地址
- `license` : 开源协议 (许可证)
- `licenses` : 许可证 `数组` , 每个元素要包含type (许可证名称) 和url (链接到许可证文本的地址)字段
- `repositories` : 仓库托管地址数组, 每个元素要包含type (仓库类型，如git), url (仓库的地址) 和path (相对于仓库的路径, 可选)字段
- `dependencies` : 生产环境包的依赖, 一个关联 `数组` , 由包的 `名称` 和 `版本号` 组成
- `devDependencies` : 开发环境包的依赖, 一个关联 `数组` , 由包的 `名称` 和 `版本号` 组成

核心属性

- `main` : 指定包的 `入口文件`
    - 不指定的情况下默认为 `index.js` 
    - 如果找不到 `入口文件` 就会报错
- `scripts` : 用于保存命令行指令, 是一个 `对象`
    - 使用 `npm run xxx` 即可运行事先保存好的命令, 用于简化操作
    - 如果 `key` 叫做 `test` / `start` , 那么可以不写 `run` , `npm run test` / `npm run start` 和 `npm test` / `npm start` 效果相同

全局包专用属性

- `bin` : 用于将命令行指令映射到文件
    - 比如 `"lily": "index.js"` 即意为在安装完毕之后在命令行直接输入 `lily` 就会运行 `index.js` 文件



#### 自定义全局包

- 给 `package.json` 文件添加 `bin` 属性映射命令到文件
- 在文件最上方添加 `#! /usr/bin/env node` 意为在环境中查找 `node` 运行命令指向的文件


---

## global全局对象

> [Global objects | Node.js v14.18.0 Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html)



`__dirname`

- 当前JavaScript文件所处的 `目录`
- 可以直接使用, 但本质上不属于 `global` , 原因见原理笔记

`__filename`

- 当前JavaScript文件的 `绝对路径`
- 可以直接使用, 但本质上不属于 `global` , 原因见原理笔记

`setTimeout()` / `clearTimeout()`

- 和浏览器中的一样

`setInterval()` / `clearInterval()`

- 和浏览器中的一样

`console` 

- 和浏览器中的一样

`process`

- 掌管当前NodeJS进程的模块
- `process.argv` : 以 `数组` 的形式包含了命令行参数信息, 以空格分割
    - 若命令为 `node xxx.js zzz aaa`
    - 则第一项为 `node.exe` 的安装位置的 `绝对路径`
    - 第二项为当前执行 `xxx.js` 文件的 `绝对路径`
    - 第三 / 四项分别为 `zzz` 和 `aaa`
    - 以此类推
- `process.cwd()` : 当前的工作路径, 也就是执行命令的路径

