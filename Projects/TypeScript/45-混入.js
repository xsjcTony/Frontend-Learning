"use strict";
// 对象混入
/*
const obj1 = { name: 'lnj' }
const obj2 = { age: 34 }
Object.assign(obj1, obj2)
console.log(obj1) // { name: 'lnj', age: 34 }
console.log(obj2) // { age: 34 }
*/
// 类混入
/*
class Dog {
  name: string = 'dog'
  say (): void {
    console.log('wang wang')
  }
}

class Cat {
  age: number = 3
  run (): void {
    console.log('run run')
  }
}

class Animal {}

interface Animal extends Dog, Cat {
  name: string
  age: number
  say: () => void
  run: () => void
}

function myMixin(target: any, from: any[]) {
  from.forEach((item) => {
    Reflect.ownKeys(item.prototype).forEach((name) => {
      target.prototype[name] = item.prototype[name]
    })
  })
}
myMixin(Animal, [Dog, Cat])

const a = new Animal()
console.log(a)
a.say() // wang wang
a.run() // run run
console.log(a.name) // undefined
console.log(a.age) // undefined
*/
