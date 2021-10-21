import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

const code = `function square(n) {
  return n * n;
}`

const ast = parser.parse(code)

traverse.default(ast, {
  enter (path) {
    console.log(path.node.type)
  }
})

const res = generate.default(ast)
console.log(res)
