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