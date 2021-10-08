// const buffer = Buffer.alloc(5)
// console.log(buffer)

// const buffer = Buffer.alloc(5, 1)
// console.log(buffer)

// const buffer = Buffer.from('abc')
// console.log(buffer)

const buffer = Buffer.from([1, 3, 5])
console.log(buffer)
buffer[0] = 7
console.log(buffer)