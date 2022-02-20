/*
// 定义命名空间
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/
  // 通过 export 暴露给外界使用
  export const LettersValidator = (value: string) => {
    return lettersRegexp.test(value)
  }
}

const lettersRegexp = 1 // OK, 不会污染全局空间

// 使用命名空间
console.log(Validation.LettersValidator('abc'))
*/
