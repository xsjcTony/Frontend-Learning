// const str = 'http://root:123456@www.it666.com:80/index.html?name=Tony&age=24#banner'
//
// const url = new URL(str)
// console.log(url.searchParams.get('name'))
// console.log(url.searchParams.get('age'))
// console.log(url.searchParams.get('abc'))

const http = require('http')

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + req.headers.host)
  res.end(url.searchParams.get('name') + ' / ' + url.searchParams.get('age'))
}).listen(3000)
