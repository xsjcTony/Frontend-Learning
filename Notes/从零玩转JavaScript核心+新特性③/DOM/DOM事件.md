# 事件 (Event)



## 定义

- 用户和浏览器的交互行为

---

## 绑定事件

格式

```
element.eventName = function () {}
```

事件名称列表

> [HTML DOM Event Object | w3schools](https://www.w3schools.com/jsref/dom_obj_event.asp)

注意点

- 如果给元素添加了和系统同名的 `Event` , 人为添加的 `Event` 不会覆盖系统添加的 `Event`
- 想要覆盖系统 `Event` , 需要在 `Function` 最后添加 `return false;`

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>事件</title>
</head>
<body>
<button>我是按钮</button>
<a href="https://www.baidu.com">我是a标签</a>

<script>
  let btn = document.querySelector("button");
  let a = document.querySelector("a");

  btn.onclick = function() {
    alert("按钮被点击了"); // 点击按钮时弹出对话框
  }
  a.onclick = function () {
	  alert("a标签被点击了"); // 点击链接时弹出对话框
	  return false; // 覆盖系统的跳转页面事件
  }
</script>
</body>
</html>
```

---

## 计时器 (Interval)



### 重复执行的定时器

格式

```js
setInterval(function () {}, interval) // 本质是window.setInterval()
clearInterval(id) // 通过id清除定时器
```

注意点

- 本质是 `window.setInterval()` , 所以 `window` 可以省略
- 会重复执行
- 会返回一个 `Number` , 代表当前定时器 `id` 的整数
- 通过 `clearInterval(id)` 来取消

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>定时器</title>
</head>
<body>
<button id="start">开始</button>
<button id="close">结束</button>

<script>
  let startButton = document.querySelector("#start");
  let closeButton = document.querySelector("#close");

  // 重复执行的定时器
  let id = null; // 新建一个可以给两个function访问的变量来存储id

	startButton.onclick = function () { // 绑定"开始"按钮的点击事件
		id = setInterval(function () { // 创建一个定时器, 每1000ms执行一次第一个参数, 并返回一个定时器id
			console.log("随便写点");
		}, 1000);
	}
	closeButton.onclick = function () { // 绑定"结束"按钮的点击事件
		clearInterval(id); // 通过id清除定时器
	}
</script>
</body>
</html>
```



### 执行一次的定时器

格式

格式

```js
setTimeout(function () {}, timeout) // 本质是window.setTimeout()
clearInterval(id) // 通过id清除定时器
```

注意点

- 本质是 `window.setTimeout()` , 所以 `window` 可以省略
- 只会执行一次
- 会返回一个 `Number` , 代表当前定时器 `id` 的整数
- 通过 `clearTimeout(id)` 来取消

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>定时器</title>
</head>
<body>
<button id="start">开始</button>
<button id="close">结束</button>

<script>
  let startButton = document.querySelector("#start");
  let closeButton = document.querySelector("#close");

	// 只执行一次的定时器
  let id = null; // 新建一个可以给两个function访问的变量来存储id
  
  startButton.onclick = function () { // 绑定"开始"按钮的点击事件
	  id = setTimeout(function () { // 创建一个定时器, 等待1000ms后执行一次第一个参数, 并返回一个定时器id
		  console.log("随便写点");
	  }, 1000);
  }
  closeButton.onclick = function () { // 绑定"结束"按钮的点击事件
	  clearTimeout(id); // 通过id清除定时器
  }
</script>
</body>
</html>
```

---

