const name = 'Tony'
const age = 24

function say () {
  console.log('hi')
}

export { name, age, say }

class Person {
  constructor () {
    this.name = 'Lily'
    this.age = 18
  }
}

export default Person

const test = 'test'
export { test }