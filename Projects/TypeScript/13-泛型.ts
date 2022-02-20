/*
const getArray = <Type>(value: Type, items: number = 5): Type[] => {
  return new Array(items).fill(value)
}

let arr = getArray('abc', 3)
// let arr = getArray<string>('abc', 3)
const res = arr.map(item => item.length)
console.log(res)
*/

// 泛型约束
/*
interface Lengthwise {
  length: number,
}

const logLength = <T extends Lengthwise>(arg: T): T => {
  console.log(arg.length)
  return arg
}

logLength('string')
*/

// 类型参数 in 泛型约束
/*
const getProps = <T, Key extends keyof T>(obj: T, key: Key): any => {
  return obj[key]
}
let obj = {
  a: 'a',
  b: 'b'
}
console.log(getProps(obj, 'a'))
console.log(getProps(obj, 'b'))
console.log(getProps(obj, 'c')) // 报错: Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'
*/
