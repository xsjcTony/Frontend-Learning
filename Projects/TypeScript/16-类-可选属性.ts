// 可选属性
/*
class Person2 {
  name: string
  age?: number

  constructor (name: string, age?: number) {
    this.name = name
    this.age = age
  }
}

const p = new Person2('Aelita')
console.log(p)
*/

// 参数属性
/*
class Person3 {
  constructor (
    public name: string,
    protected age?: number
  ) {
    this.name = name
    this.age = age
  }
}

const p2 = new Person3('Aelita', 24)
console.log(p2)
*/
