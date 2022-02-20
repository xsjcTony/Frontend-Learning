// 普通装饰器
/*
function test (target) {
  console.log('test')
}

@test
class Person {}
*/


// 装饰器工厂
/*
function demo () {
  console.log('set up')
  return (target) => {
    console.log('test')
  }
}

@demo()
class Person {}
*/


// 装饰器组合
/*
function test (target) {
  console.log('test')
}

function demo () {
  console.log('demo setup')
  return (target) => {
    console.log('demo in')
  }
}

function abc (target) {
  console.log('abc')
}

function def () {
  console.log('def setup')
  return (target) => {
    console.log('def in')
  }
}

@test
@demo()
@def()
@abc
class Person {}
/!*
输出结果:
demo setup
def setup
def in
abc
demo in
test
*!/
*/
