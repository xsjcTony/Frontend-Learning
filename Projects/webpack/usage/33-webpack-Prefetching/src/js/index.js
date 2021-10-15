/*
//同步加载模块代码

import $ from 'jquery'

const btn = document.querySelector('button')
btn.onclick = function () {
  const div = getComponent()
  document.body.appendChild(div.get(0))
}

function getComponent () {
  return $('<div>我是div</div>')
}
*/

// 异步加载模块代码
const btn = document.querySelector('button')
btn.onclick = function () {
  getComponent().then((div) => {
    document.body.appendChild(div.get(0))
  })
}

/*
function getComponent () {
  return import('jquery').then(({ 'default': $ }) => $('<div>我是div</div>'))
}
*/

async function getComponent () {
  const { 'default': $ } = await import(/* webpackPrefetch: true *//* webpackChunkName: 'jquery' */ 'jquery')
  return $('<div>我是div</div>')
}
