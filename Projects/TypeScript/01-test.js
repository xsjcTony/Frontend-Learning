let val
val = 123
val = '123'
val = true
val = [1, 3, 5]

function test (a, b) {
  return a.length + b
}

// const res = test([1, 3, 5], 10)
const res = test(1, 10)
console.log(res)
