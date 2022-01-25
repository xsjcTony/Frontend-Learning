# 服务端 - 原生NodeJS



## 搭建基本的Web服务器

[HTTP | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/http.html)

[URL | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/url.html)

```js
// app.js

import http from 'http'
import { URL, URLSearchParams } from 'url'

const server = http.createServer()

server.on('request', (req, res) => {
  // get request method
  const method = req.method.toLowerCase()

  const url = new URL(req.url, 'http://127.0.0.7:3000/')

  // GET
  if (method === 'get') {

    // routes
    if (url.pathname === '/login') {
      console.log(url.searchParams)
    } else if (url.pathname === '/register') {
      console.log(url.searchParams)
    }
  }
  // POST
  else if (method === 'post') {
    // get POST parameters
    let params = ''
    req.on('data', (chunk) => {
      params += chunk
    })
    
    req.on('end', () => {
      params = new URLSearchParams(params)

      // routes
      if (url.pathname === '/login') {
        console.log('deal with POST login', params)
      } else if (url.pathname === '/register') {
        console.log('deal with POST register', params)
      }
    })
  }

}).listen(3000)
```



### 返回静态资源

```js
// staticServer.js

import { URL } from 'url'
import path from 'path'
import fs from 'fs'
import fsPromise from 'fs/promises'
import mime from './mime.cjs'

/**
 * 读取静态资源
 * @param req 请求对象
 * @param res 响应对象
 * @param rootPath 静态资源所在目录
 */
export async function readFile (req, res, rootPath) {
  // get static asset path
  const url = new URL(req.url, 'http://127.0.0.7:3000/')
  const filePath = path.join(rootPath, url.pathname)
  const type = mime[path.extname(filePath)].startsWith('text') ? `${ mime[path.extname(filePath)] }; charset=utf-8` : mime[path.extname(filePath)]

  // return if the file does not exist
  if (!fs.existsSync(filePath)) { return }

  // define response head
  res.writeHead(200, {
    'Content-Type': type
  })

  // load & return static asset
  try {
    const content = await fsPromise.readFile(filePath)
    res.end(content)
  } catch (err) {
    res.end('Server Error', err)
  }
}
```



### 返回动态网页

- 使用 `ejs` [ejs - npm](https://www.npmjs.com/package/ejs)

```js
// dynamicServer.js

import ejs from 'ejs'

export function renderHTML (req, res, fileName) {
  ejs.renderFile(fileName, req.data, (err, str) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(str)
  })
}
```

---

