import http from 'http'
import { URL, URLSearchParams, fileURLToPath } from 'url'
import path from 'path'
import * as staticServer from './staticServer.js'
import * as dynamicServer from './dynamicServer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootPath = path.join(__dirname, 'www')


const server = http.createServer()

server.on('request', (req, res) => {
  // static server
  /*
  staticServer.readFile(req, res, rootPath)
  */


  // get request method
  const method = req.method.toLowerCase()

  const url = new URL(req.url, 'http://127.0.0.7:3000/')

  // GET
  if (method === 'get') {

    // routes
    if (url.pathname === '/login') {

      // return text or JSON
      /*
      res.writeHead(200, {
        // 'Content-Type': 'text/plain; charset=utf-8'
        'Content-Type': 'application/json'
      })
      //res.end('知播渔 www.it666.com')
      res.end(JSON.stringify({ name: 'Tony', age: 24 }))
      */

      // return dynamic HTML page
      req.data = { msg: '我是动态数据' }
      dynamicServer.renderHTML(req, res, './views/index.html')

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
