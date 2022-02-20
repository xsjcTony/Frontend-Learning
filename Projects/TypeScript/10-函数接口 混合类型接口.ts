'use strict'

// function interface
/*
interface Sum {
  (a: number, b?: number): number
}

let sum: Sum = function (x: number, y: number): number {
  return x + y
}
*/

// 混合接口
/*
interface Count {
  (): void
  count: number
}

let getCounter = ((): Count => {
  let fn = <Count>function () {
    fn.count++
    console.log(fn.count)
  }
  fn.count = 0
  return fn
})()

getCounter()
getCounter()
getCounter()

let demo = <Count>(() => {
  demo.count++
  console.log(demo.count)
})
demo.count = 0
demo()
demo()
demo()
*/
