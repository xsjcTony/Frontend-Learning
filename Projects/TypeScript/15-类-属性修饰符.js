"use strict";
// public
/*
class Person {
  constructor (name: string) {
    this.name = name
  }

  name: string

  say (): void {
    console.log(this.name) // 内部使用
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类中使用
  }
}

const s = new Student('Aelita')
s.say()
console.log(s.name) // 外部使用
*/
// protected
/*
class Person {
  constructor (name: string) {
    this.name = name
  }

  protected name: string

  say (): void {
    console.log(this.name) // 内部使用, OK
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类内部使用, OK
  }
}

const s = new Student('Aelita')
s.say()
console.log(s.name) // 外部使用, 报错
*/
// private
/*
class Person {
  constructor (name: string) {
    this.name = name
  }

  private name: string

  say (): void {
    console.log(this.name) // 内部使用, OK
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类内部使用, 报错
  }
}

const s = new Student('Aelita')
s.say()
console.log(s.name) // 外部使用, 报错
*/
// readonly
/*
class Demo {
  constructor (name: string) {
    // this.name = name // constructor 内修改, OK
  }

  public readonly name: string = 'init value, OK' // 可以设定默认值, 可以配合 public 等修饰符使用, 但是必须放在后面
  protected static readonly num: number = 4

  changeName () {
    name = 'Tony' // 尝试在 constructor 之外修改, 报错
  }
}

const d = new Demo('Aelita')
d.name = 'Tony' // 尝试在 constructor 之外修改, 报错
*/
