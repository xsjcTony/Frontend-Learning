/*
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.enumerable = true
}

class Person {
  sayName (): void {
    console.log('My name is Aelita')
  }

  @test
  sayAge (): void {
    console.log('My age is 24')
  }

  static say (): void {
    console.log('Hello World')
  }
}

const p = new Person()
for (const key in p) {
  console.log(key) // sayAge
}
*/


/*
function test (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = function (): void {
    console.log('My name is Tony')
  }
}

class Person {
  @test
  sayName (): void {
    console.log('My name is Aelita')
  }
}

const p = new Person()
p.sayName()
*/
