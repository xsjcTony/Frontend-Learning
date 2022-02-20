"use strict";
/*
let getRandomValue = (): string | number => {
  return (Math.random() >= 0.5) ? 'abc' : 123.456
}

function isString (value: string | number): value is string {
  return typeof value === 'string'
}

let value12 = getRandomValue()

console.log(value12)
*/
// type predicate
/*
if (isString(value12)) {
  console.log(value12.length)
} else {
  console.log(value12.toFixed())
}
*/
// typeof
/*
if (typeof value12 === 'string') {
  console.log(value12.length)
} else {
  console.log(value12.toFixed())
}
*/
