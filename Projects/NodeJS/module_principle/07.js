const path = require('path')
const fs = require('fs')

fs.readFile(path.join(__dirname, '07-b.js'), () => {
  setTimeout(() => { console.log('setTimeout') })
  setImmediate(() => { console.log('setImmediate') })
})