/*
type MyString = string
let value13: MyString = 'abc'
*/

// 泛型
/*
type MyType<T> = { x: T, y: T }
let value14: MyType<number> = { x: 123, y: 456 }
*/

// 使用自己
/*
type MyType = {
  name: string
  children?: MyType
}
let value14: MyType = {
  name: 'one',
  children: {
    name: 'two',
    children: {
      name: 'three'
    }
  }
}
*/
