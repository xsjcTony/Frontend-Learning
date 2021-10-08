const path = require('path')
const fs = require('fs')
const mime = require('./mime.json')

function readFile (req, res, rootPath) {
  const filePath = path.join(rootPath, req.url)
  const extension = path.extname(filePath)
  let type = mime[extension]

  if (type.startsWith('text')) {
    type += '; charset=utf-8'
  }

  fs.readFile(filePath, (err, data) => {
    res.writeHead(200, { 'Content-Type': type })

    if (err) {
      res.end('Server Error')
    }
    res.end(data)
  })
}

exports.StaticServer = readFile