const fs = require('fs')
const path = require('path')

const readPath = path.join(__dirname, 'test.mp4')
const writePath = path.join(__dirname, 'abc.mp4')

const readStream = fs.createReadStream(readPath)
const writeStream = fs.createWriteStream(writePath)

readStream.pipe(writeStream)

// pipe内部实现:
/*
readStream.on('data', (data) => {
  writeStream.write(data)
})
readStream.on('close', () => {
  writeStream.end()
})
*/





