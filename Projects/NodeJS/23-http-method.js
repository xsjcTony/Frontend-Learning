const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method.toLowerCase() === 'get') {
    // get
  } else if (req.method.toLowerCase() === 'post') {
    // post
  }
}).listen(3000)
