const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

const persons = {
  'lisi': {
    name: 'lisi',
    gender: 'male',
    age: 33
  },
  'zhangsan': {
    name: 'zhangsan',
    gender: 'female',
    age: 18
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/index') && req.method.toLowerCase() === 'get') {
    fs.readFile(path.join(__dirname, url.parse(req.url).pathname), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Page not found')
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(content)
    })
  } else if (req.url.startsWith('/info') && req.method.toLowerCase() === 'post') {
    let params = ''
    req.on('data', (chunk) => {
      params += chunk
    })
    req.on('end', () => {
      const filePath = path.join(__dirname, req.url)
      const myParams = new URLSearchParams(params)
      const person = persons[myParams.get('userName')]

      /*
      fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end('Page not found')
        }

        content = content.replace('!!!name!!!', person?.name)
        content = content.replace('!!!gender!!!', person?.gender)
        content = content.replace('!!!age!!!', person?.age)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(content)
      })
      */

      const html = template(filePath, person)
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(html)
    })
  }
}).listen(3000)
