const fs = require('fs')
const path = require('path')

/*
fs.stat(__filename, function (err, stats) {
  // console.error(err)
  // console.log(stats)
  console.log(stats.isFile())
  console.log(stats.isDirectory())
})
*/

// fs.readFile(path.join(__dirname, '12-fileSystem.txt'), 'utf-8', function (err, data) {
//   if (err) {
//     throw new Error('failed load file')
//   }
//   console.log(data)
// })

fs.writeFile(path.join(__dirname, 'Tony.txt'), 'Tony loves Lily', 'utf-8', function (err) {
  if (err) {
    throw new Error('failed write file')
  } else {
    console.log('write file success')
  }
})