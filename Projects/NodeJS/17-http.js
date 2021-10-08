const http = require('http')

// const server = http.createServer()
//
// server.on('request', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
//   res.end('知播渔')
// })
//
// server.listen(3000)

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('response data')
}).listen(3000)