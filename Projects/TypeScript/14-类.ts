/*
class Person {
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }

  name: string
  age: number

  say (): void {
    console.log(`My name is ${ this.name } and my age is ${ this.age }`)
  }

  static food: string

  static eat (): void {
    console.log(`I'm eating ${ this.food }`)
  }
}

const person = new Person('Tony', 24)
person.say()
Person.food = '🧇'
Person.eat()
*/

// 继承
/*
class Student extends Person {
  constructor (name: string, age: number, book: string) {
    super(name, age) // super() 必须在任何 this. 之前调用
    this.book = book
  }

  book: string

  say () {
    console.log(`I'm a student ${ this.name }`)
  }

  static eat () {
    console.log(`I'm a student, eating ${ this.food }`)
  }
}

const student = new Student('zs', 18, 'TypeScript')
student.say()
Student.food = '🥮'
Student.eat()

class Base {
  greet () {
    console.log('Hello, world!')
  }
}

class Derived extends Base {
  // Make this parameter required
  greet (name?: string) {
    if (name === undefined) {
      super.greet()
    } else {
      console.log(`Hello, ${ name.toUpperCase() }`)
    }
  }
}

const b: Base = new Derived()
b.greet()
*/
