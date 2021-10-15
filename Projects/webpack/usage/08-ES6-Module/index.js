/*
// import { name } from './a'
// import { str } from './a'
import { name as str } from './a'

console.log(name)
console.log(str)
*/

/*
// import name from './b'
import str from './b'

// console.log(name)
console.log(str)
*/

// import Person, { name, age, say, test } from './c'
import Person from './c'
import { name, age, say, test } from './c'

const p = new Person()
console.log(p)

console.log(name)
console.log(age)
say()
console.log(test)
