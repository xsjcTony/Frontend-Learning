const babel = require('@babel/core')
const util = require('util') // 用于完整浏览对象和彩色打印

const code = `
  console.log('Tony')
  let sum = 10 + 66
  let minus = 66 - 33
  console.log('it666')
`
const ast = babel.parse(code)

babel.traverse(ast, {
  // 删除包含 sum 的这句话
  Identifier (path) {
    if (path.node.name === 'sum') {
      console.log(path.parentPath.parentPath.node.type)
      path.parentPath.parentPath.remove()
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

console.log('\n-----------------------------------------------------------------\n')

// AST => 代码
const { code: result } = babel.transformFromAstSync(ast)
console.log(result)

