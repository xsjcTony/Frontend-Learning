// const buffer = Buffer.from([97, 98, 99])
// console.log(buffer.toString())

// const buffer = Buffer.alloc(5)
// console.log(buffer)
// buffer.write('abcdefg')
// console.log(buffer.toString())

const buffer1 = Buffer.from('abcdefg')
const buffer2 = buffer1.slice(2, 4)
console.log(buffer2)
console.log(buffer2.toString())