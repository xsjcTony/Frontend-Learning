/*
namespace Validation {
  export let name: string = 'Aelita'
}

namespace Validation {
  export let age: number = 24
}

console.log(Validation.name)
console.log(Validation.age)
*/


// 与 class 合并
/*
class Person {
  say (): void {
    console.log('Hello World!')
  }
}

namespace Person {
  export const hi = (): void => {
    console.log('hi')
  }
}

Person.hi()
const p = new Person()
p.say()
*/


// 与 function 合并
/*
function getCounter (): void {
  getCounter.count++
  console.log(getCounter.count)
}

namespace getCounter {
  export let count: number = 0
}

getCounter() // 1
getCounter() // 2
getCounter() // 3
*/


// 与 enum 合并
/*
enum Gender {
  Male,
  Female
}

namespace Gender {
  export const Unisex: number = 666
}

console.log(Gender)
*/
