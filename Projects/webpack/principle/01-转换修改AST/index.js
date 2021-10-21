const babel = require('@babel/core')
const util = require('util') // 用于完整浏览对象和彩色打印

// 代码 => AST
const code = `let sum = 10 + 66;`
const ast = babel.parseSync(code)

// 打印 + 空行
console.log('\n-----------------------------------------------------------------\n')
console.log(util.inspect(ast, {
  depth: null, // 完整展开对象
  colors: true, // 根据数据类型添加色彩
  breakLength: 180 // 换行展示的数据长度
}))
console.log('\n-----------------------------------------------------------------\n')

// 遍历+修改 AST
babel.traverse(ast, {
  enter (path) {
    // console.log(util.inspect(path.node.type, { colors: true }))
    if (path.node.type === 'Identifier') {
      path.node.name = 'add'
      path.stop()
    }
  }
})

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
