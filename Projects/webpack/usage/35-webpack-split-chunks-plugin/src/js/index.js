// 同步加载
// import $ from 'jquery'; // npm install jquery
// import _ from 'lodash'; // npm install lodash
//
// $('html').css({ width: '100%', height: '100%' });
// $('body').css({ width: '100%', height: '100%', background: 'red' });
//
// const str = _.join(['1', '2', '3'], '+');
// console.log(str); // 1+2+3

// 异步加载
// const oBtn = document.querySelector('button');
// oBtn.onclick = function() {
//     getComponment().then(($div) => {
//         document.body.appendChild($div[0]);
//     });
// };
// async function getComponment() {
//     const { default: $ } = await import(/* webpackChunkName: "jquery" */ 'jquery');
//     const $div = $('<div>我是div</div>');
//     return $div;
// }

/*
默认情况下如果所有的模块都是从node_modules中导入的,
那么会将所有从node_modules中导入的模块打包到同一个文件中去
* */
/*
如果当前文件中导入的模块有的是从node_modules中导入的, 有的不是从node_modules中导入的
那么就会将所有从node_modules中导入的打包到一个文件中
那么就会将所有不是从node_modules中导入的,中导入的打包到另一个文件中
* */


// import $ from 'jquery' // npm install jquery
// import _ from 'lodash' // npm install lodash
// import { add, minus } from './custom.js'
// import { hello, hi } from './custom2.js'
//
// $('html').css({ width: '100%', height: '100%' })
// $('body').css({ width: '100%', height: '100%', background: 'red' })

// const str = _.join(['1', '2', '3'], '+')
// console.log(str) // 1+2+3

/*
默认情况下如果所有的模块都不是从node_modules中导入的,
那么会将所有不是从node_modules中导入的模块打包到同一个文件中去
* */
import { add, minus } from './custom.js'
import { hello, hi } from './custom2.js'

const res1 = add(10, 5)
console.log(res1)
const res2 = minus(10, 5)
console.log(res2)
hello()
hi()
