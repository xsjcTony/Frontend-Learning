import '../css/index.css'
import addSpan from './test'

let btn = document.createElement('button')
btn.innerText = '添加内容'
document.body.appendChild(btn)

let index = 0
btn.onclick = function () {
  let p = document.createElement('p')
  p.innerText = '我是第' + index + '个段落'
  index++
  document.body.appendChild(p)
}

addSpan()

if (module.hot) {
  module.hot.accept('./test.js', function () {
    let span = document.querySelector('span')
    document.body.removeChild(span)
    addSpan()
  })
}
