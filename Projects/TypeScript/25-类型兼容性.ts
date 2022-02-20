/*
interface TestInterface3 {
  name: string
  children: {
    age: number
  }
}

let t1 = { name: 'Aelita', children: { age: 18 } } // OK
let t2 = { name: 'Tony', children: { age: 'abc' } } // 会递归检查, age类型不对, 无法兼容
let t3 = { name: 'Ash' } // 没有 children, 无法兼容
let t4 = { name: 'Lily', children: { age: 18 }, gender: 'female' } // OK, 可以多但不可以少

let t: TestInterface3
t = t1 // OK
t = t2 // 报错
t = t3 // 报错
t = t4 // OK
*/
