"use strict";
// 命名函数
/*
function say1 (name: string): void {
  console.log(name)
}
*/
// 匿名函数
/*
let say2 = function (name: string): void {
  console.log(name)
}
*/
/*
// 箭头函数
let say3 = (name: string): void => {
  console.log(name)
}
*/
// 完整格式
/*
// 定义函数
let add: (a: number, b: number) => number
// 根据定义实现函数
add = function (x: number, y: number): number {
  return x + y
}
*/
/*
let add1: (a: number, b: number) => number = function (x, y) {
  return x + y
}
*/
// 函数声明
/*
type Add = (a: number, b: number) => number
let add2: Add = function (x, y) {
  return x + y
}
*/
// 函数重载
/*
function getArray(x: number): number[] {
  const arr: number[] = []
  for (let i = 0; i < x; i++) {
    arr.push(x)
  }
  return arr
}
function getArray(str: string): string[] {
  return str.split('')
}
*/
/*
function getArray(x: number): number[]
function getArray(str: string): string[]
function getArray(value: number | string): number[] | string[] {
  if (typeof value === 'number') {
    const arr: number[] = []
    for (let i = 0; i < value; i++) {
      arr.push(value)
    }
    return arr
  } else {
    return value.split('')
  }
}
*/
// 可选参数
/*
function add3 (x: number, y?: number, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

add3(10)
add3(10, 20)
add3(10, 20, 30)
*/
// 默认参数
/*
function add4 (x: number, y: number = 10): number {
  return x + y
}

add4(10)
*/
// 剩余参数
/*
function add5 (x: number, ...args: number[]): void {
  console.log(x)
  console.log(args)
}

add5(10, 20, 30, 40)
*/
