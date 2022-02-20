// 继承接口
/*
interface PersonInterface {
  name: string
  say (): void
}

class Person6 implements PersonInterface {
  name: string = 'Aelita'
  say (): void {
    console.log(`Hello ${ this.name }`)
  }
}

const p6 = new Person6
p6.say()
*/

// 接口继承类
/*
class Person7 {
  name: string = 'Aelita'
  age: number = 24
  say (): void {
    console.log(`Hello ${ this.name }`)
  }
}

class Person8 {
  name: string = 'Aelita'
  age: number = 24
  say (): void {
    console.log(`Hello ${ this.name }`)
  }
}

interface PersonInterface2 extends Person7, Person8 {
  gender: string
}
*/
