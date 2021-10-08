const path = require('path')

// console.log(path.basename('a/b/c/d/index.html', '.html'))
// console.log(path.dirname('a/b/c/d/index.html'))
// console.log(path.extname('a/b/c/d/index.html'))
// console.log(path.isAbsolute('/a/b/c/d/index.html'))
// console.log(path.sep)
// console.log(path.delimiter)
// console.log(path.parse('/a/b/c/d/index.html'))
// const obj = {
//   root: '/',
//   dir: '/a/b/c/d',
//   base: 'index.html',
//   ext: '.html',
//   name: 'index'
// }
// console.log(path.format(obj))
// console.log(path.join('/a/b', 'c')) // \a\b\c
// console.log(path.join('/a/b', 'c', '..')) // \a\b
// console.log(path.join('/a/b', 'c', '../')) // \a\b\
// console.log(path.join('/a/b', 'c', '../../')) // \a\
// console.log(path.normalize('/a//b///c////d/////index.html')) // \a\b\c\d\index.html
// console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')) // ..\..\impl\bbb
console.log(path.resolve('/foo/bar', './baz'))