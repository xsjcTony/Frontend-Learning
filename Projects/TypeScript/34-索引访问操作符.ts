/*
const obj = {
  name: 'Aelita',
  age: 24,
  bool: true
}

function getValues <T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  let arr: T[K][] = []
  keys.forEach((key: K) => {
    arr.push(obj[key])
  })
  return arr
}

let res = getValues(obj, ['name', 'bool'])
console.log(res)

interface TestInterface {
  a: string
  b: number,
  c: boolean,
  d: symbol,
  e: null,
  f: undefined,
  g: never
}
type MyType = TestInterface[keyof TestInterface]
*/
