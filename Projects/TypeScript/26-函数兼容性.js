"use strict";
// 参数个数
/*
let fn1 = (x: number) => 0
let fn2 = (x: number, y: number) => 0
fn1 = fn2 // 报错
fn2 = fn1 // OK
*/
// 参数类型
/*
let fn1 = (x: number) => 0
let fn2 = (x: number) => 0
let fn3 = (x: string) => 0
fn1 = fn2 // OK
fn2 = fn1 // OK
fn1 = fn3 // 报错
fn3 = fn1 // 报错
*/
/*
let fn1 = (x: number) => 0
let fn2 = (x: number | string) => 0
fn1 = fn2 // OK
fn2 = fn1 // 报错
*/
// 返回值
/*
let fn1 = (): number => 123
let fn2 = (): number => 456
let fn3 = (): string => 'abc'
fn1 = fn2 // OK
fn2 = fn1 // OK
fn1 = fn3 // 报错
fn3 = fn1 // 报错
*/
/*
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });
x = y; // OK
y = x; // Error, because x() lacks a location property
*/
// 函数重载
/*
function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: any, y: any): number | string {
  return x + y
}

function sub(x: number, y: number): number
function sub(x: any, y: any): number {
  return x - y
}

let fn1 = add
fn1 = sub // 报错

let fn2 = sub
fn2 = add // OK
*/
