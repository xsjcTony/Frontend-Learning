/*
class Caches<T> {
  arr: T[] = []
  add (value: T): T {
    this.arr.push(value)
    return value
  }
  all (): T[] {
    return this.arr
  }
}

const cache = new Caches<number>()
cache.add(1)
cache.add(3)
cache.add(5)
console.log(cache.all) // [1, 3, 5]
*/

// 接口合并
/*
interface TestInterface {
  name: string
}
interface TestInterface {
  age: number
}
/!*
相当于
interface TestInterface {
  name: string
  age: number
}
*!/
*/
