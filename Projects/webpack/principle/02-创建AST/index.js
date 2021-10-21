const babel = require('@babel/core')
const t = require('@babel/types')
const util = require('util') // 用于完整浏览对象和彩色打印

const code = ``
const ast = babel.parse(code)

// 打印 + 空行
console.log('\n-----------------------------------------------------------------\n')
console.log(util.inspect(ast, {
  depth: null, // 完整展开对象
  colors: true, // 根据数据类型添加色彩
  breakLength: 180 // 换行展示的数据长度
}))
console.log('\n-----------------------------------------------------------------\n')

const left = t.numericLiteral(10)
const right = t.numericLiteral(66)
const init = t.binaryExpression('+', left, right)
const id = t.identifier('sum')
const variableDeclarator = t.variableDeclarator(id, init)
const variableDeclaration = t.variableDeclaration('let', [variableDeclarator])
ast.program.body.push(variableDeclaration)

// 打印 + 空行
console.log('\n-----------------------------------------------------------------\n')
console.log(util.inspect(ast, {
  depth: null, // 完整展开对象
  colors: true, // 根据数据类型添加色彩
  breakLength: 180 // 换行展示的数据长度
}))
console.log('\n-----------------------------------------------------------------\n')

// AST => 代码
const { code: result } = babel.transformFromAstSync(ast)
console.log(result)

