// console.log(Buffer.isEncoding('utf8'))
// console.log(Buffer.isEncoding('utf-8'))
// console.log(Buffer.isEncoding('gbk'))
// console.log(Buffer.isEncoding(''))

// const obj1 = {}
// const obj2 = Buffer.alloc(5)
// console.log(Buffer.isBuffer(obj1))
// console.log(Buffer.isBuffer(obj2))

// const buffer = Buffer.from('123')
// console.log(Buffer.byteLength(buffer))

const buffer1 = Buffer.from('123')
const buffer2 = Buffer.from('abc')
const buffer3 = Buffer.from('xxx')
const res = Buffer.concat([buffer1, buffer2, buffer3])
console.log(res)
console.log(res.toString())