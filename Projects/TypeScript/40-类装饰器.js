"use strict";
// 正常装饰器
/*
function test (target: Function) {
  target.personName = 'Aelita' // 静态属性
  target.prototype.name = 'Tony' // 实例属性
  target.prototype.say = function (): void { // 实例方法
    console.log(`my name is ${ target.prototype.name }`)
  }
}

@test
class Person {}

const p = new Person()
console.log(p.name)
p.say()
console.log(Person.personName)
*/
// 返回类的装饰器
/*
function test2 <T extends { new (...args: any[]): object }>(target: T) {
  return class extends target {
    name: string = 'Tony' // 会覆盖原有的 name
    age: number = 24
  }
}

@test
class Person {
  name = 'Aelita'
}

const p = new Person()
console.log(p) // Person { name: 'Tony', age: 24 }
*/
