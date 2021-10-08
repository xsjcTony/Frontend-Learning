const http = require('http')
const path = require('path')
const ss = require('./20-StaticServer')

const server = http.createServer((req, res) => {
  const rootPath = path.join(__dirname, 'www')
  ss.StaticServer(req, res, rootPath)
}).listen(3000)
