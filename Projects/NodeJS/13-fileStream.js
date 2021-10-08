const fs = require('fs')
const path = require('path')

/*
const readStream = fs.createReadStream(path.join(__dirname, 'Tony.txt'), { encoding: 'utf-8', highWaterMark: 2 })
readStream.on('open', function () {
  console.log('read stream created successfully')
})
readStream.on('error', function () {
  console.log('read stream create failed')
})
readStream.on('data', function (data) {
  console.log('loaded data from read stream', data)
})
readStream.on('close', function () {
  console.log('data read complete, read stream closed')
})

/!*
read stream created successfully
loaded data from read stream To
loaded data from read stream ny
loaded data from read stream  l
loaded data from read stream ov
loaded data from read stream es
loaded data from read stream  L
loaded data from read stream il
loaded data from read stream y
data read complete, read stream closed
*!/
*/

const writeStream = fs.createWriteStream(path.join(__dirname, 'Lily.txt'), { encoding: 'utf-8' })

writeStream.on('open', function () {

})
writeStream.on('error', function () {

})
writeStream.on('close', function () {

})
writeStream.write('12345')
writeStream.write('abcde')
writeStream.end()