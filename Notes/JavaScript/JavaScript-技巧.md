# JavaScript - 技巧



## 对象 (Object)



### `let self = this`

- 将当前的 `this` 存储进变量 `self` 中, 以便 `this` 更改后可以继续使用



### `Object.keys()`

- 会返回一个数组, 包含了该对象的属性名称, 顺序和普通 `loop` 的顺序一样
- 只有实现了 `Iterator` 接口的才能使用



### 阻止对象被修改

- 使用 `Object.freeze({})` 来创建对象即可
- 修改对象时
    - 普通模式不会报错, 但对象也不会被修改
    - `use strict` 模式会报错

```js
const obj = Object.freeze({
  name: 'Tony'
})
obj.name = 'Lily' // 无效 / 报错
```



### 判断对象是否为空

- 判断 `Object.getOwnPropertyNames(obj)` 的 `length` 是否为 `0`

- 判断 `Object.keys(obj)` 的 `length` 是否为 `0`

---

## 数组 (Array)



### `数组` 转换为 `伪数组`

- 通过 `[].push.apply(obj, arr)` 将 `arr` 中的数据通过数组的形式传入 `obj` 中, 即可将 `obj` 变为 `伪数组`
- `arr` 可以是 `数组` / 或 `伪数组`

```js
let arr = [1, 3, 5];
let obj = {};
[].push.apply(obj, arr);
console.log(obj); // {0: 1, 1: 3, 2: 5, length: 3}
```



### `伪数组` 转换为 `数组`

- 操作自定义 `伪数组` 时, 一律先转换为 `数组`

- 通过 `Array.from()` 将 `伪数组` 转换为 `数组`

```js
let obj = { 0: 1, 1: 3, 2: 5, length: 3 }
let arr = Array.from(obj)
console.log(arr) // [1, 3, 5]
```

---

## 函数 (Function)



### 函数柯里化 (Currying)

- 一种优化代码的方式

- 将 `function (a, b, c)` 优化为 `function (a)(b)(c)`

```js
function demo (a, b) {
  return a + b
}
demo(10, 20) // 30

// 可以通过柯里化变成

function demo (a) {
  return function (b) {
    return a + b
  }
}
demo(10)(20) // 30

```



---

## 随机 (Random)



### 随机生成一个字母

> [Key Code Table](http://www.foreui.com/articles/Key_Code_Table.htm)

- 每个字母对应一个 `65 ~ 90` 中的一个数字, 所以生成随机数再用 `String.fromCharCode()` 转换成字母即可

```js
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let num = getRandomIntInclusive(65, 90);
String.fromCharCode(num); // 65 ~ 90 is character [A-Z]'s keycode
```



### 生成随机整数

- 包含 `min` 不包含 `max`

```js
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
```

- 包含 `min` 包含 `max`

```js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
```

---





---

## 优化



### 参数太多的优化方法

- 优化前

```js
class Snake {
  constructor(width, height, headImg, bodyImg) {
    this.width = width;
    this.height = height;
    this.headImg = headImg;
    this.bodyImg = bodyImg;
  }
}

let snake = new Snake(100, 100, "images/head.png", "images/body.png");
```

- 优化后

```js
class Snake {
	constructor(snakeParameters) {
		snakeParameters = snakeParameters || {};
		this.width = snakeParameters.width || 100;
		this.height = snakeParameters.height || 100;
		this.headImg = snakeParameters.headImg || "images/head.png";
		this.bodyImg = snakeParameters.bodyImg || "images/body.png";
  }
}

let snakeParameters = {
	width: 100,
	height: 100,
	headImg: "images/head.png",
	bodyImg: "images/body.png"
}
let snake = new Snake(snakeParameters);
```



### 排它思想

清除其他非选中颜色的样式, 值设置当前选中元素样式

- <span style="color: yellow">>=ES6</span>

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>排它思想</title>
	<style>
		* {
			margin: 0;
			padding: 0;
		}

		ul {
			width: 400px;
			border: 1px solid #000000;
			margin: 100px auto;
			list-style: none;
		}

		ul > li {
			cursor: pointer;
		}

		.current {
			background: red;
		}
	</style>
</head>
<body>
<ul>
	<li class="current">我是第1个li</li>
	<li>我是第2个li</li>
	<li>我是第3个li</li>
	<li>我是第4个li</li>
	<li>我是第5个li</li>
</ul>

<script>
	let prevIndex = 0;
	let lis = document.querySelectorAll("li");

	for(let i = 0; i < lis.length; i++) {
		lis[i].onclick = () => {
      // 排它
			lis[prevIndex].className = "";
      // 设置选中样式
			lis[i].className = "current";
      // 重新记录被选中的索引
			prevIndex = i;
		}
	}
</script>
</body>
</html>
```

- <span style="color: yellow"><ES6</span>

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>排它思想</title>
	<style>
		* {
			margin: 0;
			padding: 0;
		}

		ul {
			width: 400px;
			border: 1px solid #000000;
			margin: 100px auto;
			list-style: none;
		}

		ul > li {
			cursor: pointer;
		}

		.current {
			background: red;
		}
	</style>
</head>
<body>
<ul>
	<li class="current">我是第1个li</li>
	<li>我是第2个li</li>
	<li>我是第3个li</li>
	<li>我是第4个li</li>
	<li>我是第5个li</li>
</ul>

<script>
	let prevIndex = 0;
	let lis = document.querySelectorAll("li");

	for(var i = 0; i < lis.length; i++) {
		(function (index) {
			lis[index].onclick = () => {
				// 排它
				lis[prevIndex].className = "";
				// 设置选中样式
				lis[index].className = "current";
				// 重新记录被选中的索引
				prevIndex = index;
			}
		})(i);
	}
</script>
</body>
</html>
```



### 不占用全局命名空间的方法

- 将使用的变量和函数全部封装到一个立即执行的函数当中, 并将函数绑定到window

```js
(function () {
  let a = 1;
  function printAB(b) {
    console.log(a + b);
  }
  window.printAB = printAB; 
})()
```



### 函数防抖 (debounce)

- 优化高频率执行 JavaScript 代码的一种手段, 让被调用的函数在依次连续的高频操作过程中<span style="color: yellow;">只被调用一次</span>
- 减少代码执行次数, 提升网页性能
- 应用场景多为 `oninput` / `onmousemove` / `onscroll` / `onresize`

封装好的函数防抖

```js
function debounce(fn, delay) {
	let timerId = null;
	return function () {
		let self = this;
		let args = arguments;

		timerId && clearTimeout(timerId);
		timerId = setTimeout(function () {
			fn.apply(self, args);
		}, delay || 1000);
	}
}
```



### 函数节流 (throttle)

- 优化高频率执行 JavaScript 代码的一种手段, 让被调用的函数在依次连续的高频操作过程中<span style="color: yellow;">减少执行的次数</span>
- 减少代码执行次数, 提升网页性能
- 应用场景多为 `oninput` / `onmousemove` / `onscroll` / `onresize`

封装好的函数节流

```js
function throttle(fn, delay) {
	let timerId = null;
	let flag = true;
	return function () {
		if(!flag) {
			return;
		}
		flag = false;

		let self = this;
		let args = arguments;

		timerId && clearTimeout(timerId);
		timerId = setTimeout(function () {
			flag = true;
			fn.apply(self, args);
		}, delay || 500);
	}
}
```



### 图片预加载 (Image preload)

- `img.onload` 表示图片已经加载完了

封装好的预加载函数

```js
function preLoadImage(url, fn) {
	let img = document.createElement("img");
	img.src = url;
	img.onload = function () {
		fn(img);
	}
}

function preLoadImages(urls, fn) {
	let imageCount = urls.length;
	let loadedCount = 0;
	let images = [];
	for(let i = 0; i < imageCount; i++) {
		let url = urls[i];
		preLoadImage(url, function (img) {
			images.push(img);
			loadedCount++;
			if(loadedCount === imageCount) {
				fn(images);
				}
			})
		}
	}
```



### 代替 `window.onload` 的方案

- `window.onload` 会等到 `DOM元素` 以及所有资源 ( 图片等 ) 加载完毕才会执行, 因此性能不好
- 使用 `DOMContentLoaded` 代替可以使性能更好 (<span style="color: yellow;">>=IE9</span>)
- 低级版本浏览器见如下代码

```js
document.addEventListener("DOMContentLoaded", function () {}); // >=IE9
document.attachEvent("onreadystatechange", function () { // <IE9
  if(document.readyState === "complete") {}
});
```



---

## 动画



### 匀速动画

```js
function linearAnimation(ele, target) {
	// clear existing interval
	clearInterval(timerId);

	timerId = setInterval(() => {
		// get current position
		let begin = parseInt(ele.style.marginLeft) || 0;
		// create variable for step
		let step = (begin - target) > 0 ? -40 : 40;
		// calculate new location
		begin += step;
		if(Math.abs(target - begin) <= Math.abs(step)) {
			clearInterval(timerId);
			begin = target;
		}
		// set new position
		ele.style.marginLeft = begin + "px";
	}, 100);
}
```



### 缓动动画

```js
function easeAnimation(ele, target) {
	// clear existing interval
	clearInterval(timerId);

	timerId = setInterval(() => {
		// get current position
		let begin = parseInt(ele.style.marginLeft) || 0;
		// create variable for step
		// (target - begin) * coefficient (0~1)
		let step = (target - begin) * 0.3;
		// calculate new location
		begin += step;
		if(Math.abs(Math.floor(step)) <= 1) {
			clearInterval(timerId);
			begin = target;
		}
		// set new position
		ele.style.marginLeft = begin + "px";
	}, 100);
}
```



---

## 网页相关



### 电商大图预览

计算 `event.offsetX/Y`

- 直接调用会有flick问题

公式
- 鼠标到元素左边的距离 = `event.pageX` - `element.offsetLeft`
- 鼠标到元素上边的距离 = `event.pageY` - `element.offsetTop`

![event_offset_no_flick](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\event_offset_no_flick.png)

计算大图移动距离

公式
- 蒙版移动的距离 / 蒙版最大能移动的距离 = 大图移动的距离 / 大图最大能移动的距离
- 大图最大能移动的距离 = 大盒子的宽 / 高 - 大图的宽 / 高
- 大图移动的距离 = 蒙版移动的距离 / 蒙版最大能移动的距离 * 大图最大能移动的距离

![online_shopping_large_image_preview](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\online_shopping_large_image_preview.png)



### 广告处于垂直中间

公式

- top值 = (网页可视区域高度 - 广告高度) / 2

![ad_middle_top_calculation](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\ad_middle_top_calculation.png)



### 顶部吸附

获取网页滚动高度, 当高度超出临界值时, 设置需要吸附的元素的样式

- `position: fixed`
- `top: 0`



### 返回顶部

`window.scrollTo(x, y)`

- `x` 表示让网页在水平方向滚动到的位置
- `y` 表示让网页在垂直方向滚动到的位置



### 滚动条

公式

- 滚动条公式
    - 滚动条高度 / 滚动条滚动范围 = 容器的高度 / 内容的范围
    - 滚动条高度 = 容器的高度 / 内容的范围 * 滚动条滚动范围

- 内容滚动公式

    - 滚动条滚动的距离 / 滚动条滚动范围 = 内容滚动的距离 / 内容最大滚动范围
    - 内容滚动的距离 = 滚动条滚动的距离 / 滚动条滚动范围 * 内容最大滚动范围

- `onmouseup` 结束移动的调用者要使用 `document`

    ```js
    document.onmouseup = function () {
      progressBar.onmousemove = null;
    }
    ```




### 流式布局 (Waterfall)

1. 计算每一行的列数
2. 遍历元素添加满第一行
3. 将第一行每一个元素的高度存储到一个 `Array` 中
4. 遍历余下元素, 寻找高度最低的一列, 将下一个元素插入
5. 将元素定位设置成 `absolute` , `left` 采用上一行元素的 `offsetLeft` , `top` 采用 `Array` 中的高度值
6. 将 `Array` 中的高度加上当前元素的高度
7. 重复 `4~6` 遍历完所有元素为止

![](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\waterfall.png)



### 到达底部再加载

- 当参照物元素 `offsetHeight` 的一半 + 该元素的 `offsetTop` < 滚动出去的范围 + 页面高度时, 执行加载
- 建议给 `onscroll` 添加防抖

![load_at_bottom](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\load_at_bottom.png)



### 进度条

公式

- 鼠标点击的位置的 `offsetX` / 进度条的宽度 = 当前播放的时间 / 总时长
- 当前播放的时间 = 鼠标点击的位置的 `offsetX` / 进度条的宽度 * 总时长

数据的取舍

- `点击事件` / `移动事件` 都需要使用 鼠标位置距离可视区域左边/上方的距离 减去 进度条距离可视区域左边/上方的距离 来计算, 不然会有奇怪的flick现象
- 类似上方 "电商大图预览"



### 将超出指定行数范围的文字用 `...` 代替

> [josephschmitt/Clamp.js: Clamps an HTML element by adding ellipsis to it if the content inside is too long.](https://github.com/josephschmitt/Clamp.js/)



### 显示访问网站的地名

- 引入如下 `<script>` 标签然后取用其结果

```html
<script src="pv.sohu.com/cityjson"></script> <!-- var returnCitySN = {"cip": "119.147.179.60", "cid": "440000", "cname": "广东省"}; -->
<script>
	console.log(returnCitySN.cname); // 将这个通过DOM填入元素中
</script>
```



---

## JSON



---

## window



### 获取网页路径

```js
window.location.pathname // 包含文件名
window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/")) // 不包含文件名
```



---

## document



### 获取网页域名

```js
document.domain
```



---

## DOM 相关



### 创建 `<img>` 元素

- 本质相当于 `document.createElement("img")`

```js
let img = new Image(width, height);
img.src = url;
```



### 下载文件

- 动态创建一个 `<a>` 标签
- 根据获取到的 `blob` 创建并指定 `href` 链接
- 指定 `download` 属性, 可选 `文件名`
- 点击 `<a>` 标签
- 使用完毕后释放 `blob` 链接

```js
const res = await exportAllUsersAPI() // axios 返回值, 为buffer数据
const file = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

const url = URL.createObjectURL(file)
const link = document.createElement('a')
link.setAttribute('href', url)
link.setAttribute('target', '_blank')
link.setAttribute('rel', 'noopener noreferrer')
link.setAttribute('download', 'users')
link.click()

setTimeout(() => {
  URL.revokeObjectURL(url)
}, 1000)
```



---

## 网络请求相关



### 根地址

- 在企业开发中, 一般开发阶段和部署阶段的服务器是不一样的, 因此为了避免大批量的更改请求地址, 需要统一设置一个根地址
- 在发送请求的时候, 只写相对路径即可
- 在 `axios` 中, 可以通过 `axios.defaults.baseURL` 来设置

---

## 模块化



### `require(module)()` 在 `ESM` 中的写法

```js
// 假设有一个模块文件 a.js
export default (app) => { /* ... */ }
// 或
module.exports = (app) => { /* ... */ }

// 那么在另一个文件中想导入并立即执行的import书写方式为
(await import('./a.js')).default(app)
// 等价的 require 写法为
require('./a.js')(app)
```



---

## 正则表达式



### 非空字符串

- 也不能只包含 `空格`

```js
/^(?!\s*$).+/
```



---

## 其他



### 渲染模式

共分两种

- 标准模式 ( `CSS1Compat` )
- 混杂模式 ( `BackCompat` )

查询方式

```js
document.compatMode
```

