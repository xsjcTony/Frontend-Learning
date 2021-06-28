# 技巧



## `let self = this`

- 将当前的 `this` 存储进变量 `self` 中, 以便 `this` 更改后可以继续使用

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

