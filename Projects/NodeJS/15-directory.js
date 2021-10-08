const fs = require('fs')
const path = require('path')

const str = path.join(__dirname, 'abc')

// fs.mkdir(str, (err) => {
//   if (err) {
//     throw new Error('create directory failed')
//   } else {
//     console.log('create directory success')
//   }
// })

// fs.rmdir(str, (err) => {
//   if (err) {
//     throw new Error('create directory failed')
//   } else {
//     console.log('create directory success')
//   }
// })

fs.readdir(__dirname, (err, files) => {
  if (err) {
    throw new Error('read directory failed')
  } else {
    files.forEach((file) => {
      const filePath = path.join(__dirname, file)
      const stats = fs.statSync(filePath)
      if (stats.isFile()) {
        console.log(file, 'file')
      } else if (stats.isDirectory()) {
        console.log(file, 'directory')
      }
    })
  }
})