// 数值枚举
/*
const num = 666
const getNum = (): number => {
  return 888
}

enum Gender3 {
  Male = 3, // 字面量 (常量的一种)
  Female = num, // 常量
  Unisex = 8, // 必须要手动赋值, 因为前面一个成员不是数值字面量
  Unknown = getNum() // 计算结果
}

console.log(Gender3.Male) // 3
console.log(Gender3.Female) // 666
console.log(Gender3.Unisex) // 8
console.log(Gender3.Unknown) // 888
// 反向映射
console.log(Gender3[3]) // Male
console.log(Gender3[666]) // Female
console.log(Gender3[8]) // Unisex
console.log(Gender3[888]) // Unknown
*/


// 字符串枚举
/*
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = Up // 内部的其他枚举值
}

console.log(Direction.Up) // "UP"
console.log(Direction.Down) // "DOWN"
console.log(Direction.Left) // "LEFT"
console.log(Direction.Right) // "UP"
*/


// 异构枚举
/*
enum Direction2 {
  Up = 'UP', // 字符串字面量
  Down = 6, // 数值字面量, 由于跟在 字符串字面量 成员之后, 所以必须手动赋值
  Left, // 根据上一个成员的 6 自动递增到 7, 不强制手动赋值
  Right = Up // 内部的其他枚举值
}

console.log(Direction2.Up) // "UP"
console.log(Direction2.Down) // 6
console.log(Direction2.Left) // 7
console.log(Direction2.Right) // "UP"
*/
