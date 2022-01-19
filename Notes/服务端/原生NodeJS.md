# 服务端 - 原生NodeJS



## 搭建基本的Web服务器

[HTTP | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/http.html)

[URL | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/url.html)

```js
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

