/*
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.set = (value: string) => {
    target.myName = value
  }
  descriptor.get = (): string => {
    return target.myName
  }
}

class Person {
  private _name: string

  constructor (name: string) {
    this._name = name
  }

  @test
  set name (value: string) {
    this._name = value
  }

  get name (): string {
    return this._name
  }
}

const p = new Person('Aelita')
console.log(p.name)
p.name = 'zs'
console.log(p.name)
*/
