"use strict";
/*
interface TestInterface1 {
  name: string
  age: number
}
interface TestInterface2 {
  readonly name?: string
  readonly age?: number
}

type ReadonlyTestInterface<T> = {
  -readonly [P in keyof T]-?: T[P]
}

type MyType = ReadonlyTestInterface<TestInterface2>

type MyType2 = Readonly<TestInterface1>
type MyType3 = Partial<TestInterface1>
type MyType4 = Partial<Readonly<TestInterface1>>
*/
// Pick
/*
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
*/
// Record
/*
type AnimalKind = 'dog' | 'cat'
interface AnimalInfo {
  name: string
  age: number
}
type Animal = Record<AnimalKind, AnimalInfo>
/!*
{
  dog: {
    name: string
    age: number
  }
  cat: {
    name: string
    age: number
  }
}
*!/
*/
// 拆包
/*
interface MyInterface {
  name: string
  age: number
}

type MyType<T> = {
  +readonly [P in keyof T]: T[P]
}
type Test = MyType<MyInterface>

type UnMyType<T> = {
  -readonly [P in keyof T]: T[P]
}
type Test2 = UnMyType<Test>
*/
