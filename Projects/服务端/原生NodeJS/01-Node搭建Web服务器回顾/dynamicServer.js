import ejs from 'ejs'

export function renderHTML (req, res, fileName) {
  ejs.renderFile(fileName, req.data, (err, str) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(str)
  })
}
