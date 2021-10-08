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
