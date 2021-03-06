# 事件 (Event)



## 定义

- 用户和浏览器的交互行为

---

## 绑定事件



### 事件名称列表

> [HTML DOM Event Object | w3schools](https://www.w3schools.com/jsref/dom_obj_event.asp)



### 方式一

格式

```js
element.eventName = function () {}
```

注意点

- 如果给元素添加了和系统同名的 `Event` , 人为添加的 `Event` 不会覆盖系统添加的 `Event`
- 想要覆盖系统 `Event` , 需要在 `Function` 最后添加 `return false`
- 后定义的 `Event` 会覆盖先定义的相同的 `Event` 

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



### 方式二

格式

```js
element.addEventListener("eventName", function () {})
```

注意点

- 相比于方式一, 事件名称不需要添加 `on`
- 相比于方式一, 后定义的 `Event` 不会覆盖先定义的
- <span style="color: yellow">>=IE9</span>

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

<script>
  let btn = document.querySelector("button");

  btn.addEventListener("click", function () {
    console.log("123");
  });
</script>
</body>
</html>
```



### 方式三

格式

```js
element.attachEvent("onEventName", function () {})
```

注意点

- 相比于方式二, <span style="color: yellow"><IE9</span>
- 和方式一相同, 事件名称需要添加 `on`
- 相比于方式一, 后定义的 `Event` 不会覆盖先定义的

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

<script>
  let btn = document.querySelector("button");

  btn.attachEvent("onclick", function () {
    console.log("123");
  });
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

## 事件对象



定义

- 注册的事件被触发时, 系统就会自动创建一个事件对象

注意点

- <span style="color: yellow;"><IE9</span> 要使用 `window.event`

示例

```js
let btn = document.querySelector("#btn")

btn.onclick = function (event) {
  event = event || window.event; // 兼容IE9以下的低级浏览器
  console.log(event); // event对象
  console.log(typeof event); // object
}
```



### 阻止事件默认行为

- <span style="color: yellow">>=IE9</span>

```js
element.eventName = (event) => {
  event.preventDefault();
}
```

- <span style="color: yellow"><IE9</span>

```js
element.eventName = (event) => {
  event.returnValue = false;
}
```

- <span style="color: yellow">兼容且推荐</span>

```js
element.eventName = (event) => {
  return false;
}
```



### 属性 (Attributes)

- `target`

	- 触发事件的元素
- `offsetX` / `offsetY`
  - 触发事件相对于当前元素的位置 (左上角为 `0` / `0 `)

- `clientX` / `clientY`
    - 触发事件相对于当前可视区域的位置 (左上角为 `0` / `0` )
    - 可视区域不包括滚动出去的范围
- `pageX` / `pageY` <span style="color: yellow">(>=IE9)</span>
    - 触发事件相对于整个页面的位置 (左上角为 `0` / `0 `)
    - 整个页面包括滚动出去的范围
- `screenX` / `screenY` <span style="color: yellow">(企业开发中一般用不上)</span>
    - 触发事件相对于整个显示器左上角的位置 (左上角为 `0` / `0` )





---

## 三个阶段



### 阶段

1. 事件捕获 (从外向内)
2. 执行事件
3. 事件冒泡 (从内向外)



特性

- 只有两个阶段会同时执行, 要么 `1` 和 `2` 或 `2` 和 `3`
- `1` 和 `3` 原理相同, 都是寻找谁触发了事件, 只是方向不一样



### 设置事件捕获

- 使用 `addEventListener` , 第三个参数 `true` 即为捕获, `false` 即为冒泡

```js
let father = document.querySelector(".father");
let son = document.querySelector(".son");

// 捕获
father.addEventListener("click", () => {
  console.log("father");
}, true);
son.addEventListener("click", () => {
  console.log("son");
}, true);

// 点击son
// 输出: "father", "son"

// 冒泡
father.addEventListener("click", () => {
  console.log("father");
}, false);
son.addEventListener("click", () => {
  console.log("son");
}, false);

// 点击son
// 输出: "son", "father"
```



### 阻止事件冒泡

- <span style="color: yellow">>=IE9</span> `event.stopPropagation()` 
- <span style="color: yellow"><IE9</span> `event.cancelBubble = true`

```js
let father = document.querySelector(".father");
let son = document.querySelector(".son");

father.onclick = () => {
  console.log("father");
}
son.onclick = () => {
  console.log("son");
}

// 点击son
// 输出: "son", "father"

// 阻止事件冒泡冒泡
father.onclick = () => {
  console.log("father");
}
son.onclick = (event) => {
  event = event || window.event; // 兼容
  if(event.cancelBubble) { // 兼容写法
    event.cancelBubble = true; // <IE9
  }
  else{
    event.stopPropagation(); // >=IE9
  }
  console.log("son");
}

// 点击son
// 输出: "son", "father"
```



### 注意点

- `element.onEventName` 设置方法不接收捕获参数, 默认为 `冒泡` ( `1` + `2` )
- `element.attachEvent()` 方法不接受捕获参数, 默认为 `冒泡` ( `1` + `2` )



### 图示

![事件执行三个阶段](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\event_three_parts.png)

---

## 各类事件



> [HTML DOM Event Object | w3schools](https://www.w3schools.com/jsref/dom_obj_event.asp)



### 覆盖系统默认事件

- 在自定义事件中使用 `return false` 覆盖系统对应默认事件行为

```js
submitButton.onclick = function () {
  // do something
  return false; // 阻止表单提交
}
```



### 监听键盘输入

```js
element.onkeydown = function (event) {
  console.log(event.code); // 输入的物理键
  console.log(event.key); // 输入的是什么东西
}
```



### 监听鼠标移入移出

```js
// 移入事件
element.onmouseover = function () {} // 父元素也会触发
element.onmouseenter = function () {} // 建议初学者使用

// 移出事件
element.onmouseout = function () {} // 父元素
element.onmouseleave = function () {} // 建议初学者使用
```

区别:

- `onmouseover` 和 `onmouseout` , 父元素的移入移出事件会被触发
- `onmouseenter` 和 `onmouseleave` , 父元素的移入移出事件不会被触发



### 监听鼠标移动

- 建议使用防抖 / 节流

```js
element.onmousemove = function () {}
```



### 监听鼠标按下 / 抬起

- 抬起多用于 `document.mouseup`

``` js
element.onmousedown = function () {} // 按下
element.onmouseup = function () {} // 抬起
```



### 监听元素内容滚动

- 建议使用防抖 / 节流

```js
element.onscroll = function () {}
```



### 监听宽高变化

- 建议使用防抖 / 节流

```js
element.onresize = function () {}
```



### 监听视频加载完毕

- `<video>` 元素可用

```js
videoElement.oncanplay = function () {}
```



### 添加事件的不同浏览器版本兼容

```js
function addEvent(element, name, fn) {
  if(element.attachEvent) { // <IE9
    element.attachEvent("on" + name, fn);
  }
  else { 
    element.addEventListener(name, fn);
  }
}
```



### 监听hash值变化

- 使用 `window.location.hash` 获取当前 `hash` 值, 带 `#`

```js
window.addEventListener('hashchange', () => { /* do something */ })
```



### 监听前进 / 后退

- 使用 `window.location.pathname` 获取当前 `路径`

```js
window.addEventListener('popstate', () => { /* do something */ })
```



---

## 移动端事件



### touch

定义

- 原生JavaScript为移动端新增的事件
- PC端无法使用
- 包含三种
    - `touchstart` : 手指按下
    - `touchmove` : 手指按下后在元素上移动
    - `touchend` : 手指抬起

示例

```js
let div = document.querySelector('div')
div.ontouchstart = function () {
  console.log('finger pressed down')
}
div.ontouchend = function () {
  console.log('finger raised up')
}
div.ontouchmove = function () {
  console.log('finger moving')
}
```

事件对象

- `touch` 事件对象中有很多属性, 比较重要的有如下三个
    - `touches` : 当前屏幕上所有的手指的列表
    - `targetTouches` : 当前元素中所有的手指的列表 <span style="color: yellow">(在企业开发中使用比较多)</span>
    - `changedTouches` :  新增 / 离开的所有手指的列表 (一般都是1个, 因为很难两个手指同时放下或者抬起)

手指位置

- 手指列表中的每一个 `Touch` (手指信息) 包含了一些位置信息
    - `target`
        - 触发事件的元素
    - `offsetX` / `offsetY`
        - 触发事件相对于当前元素的位置 (左上角为 `0` / `0 `)

    - `clientX` / `clientY` <span style="color: yellow">(webkit内核的浏览器 (Chrome, Edge) 有 `bug` , 会显示和 `pageX/Y` 一样的数据, 需要使用火狐等其他浏览器)</span>
        - 触发事件相对于当前可视区域的位置 (左上角为 `0` / `0` )
        - 可视区域不包括滚动出去的范围
        - 在 `webkit` 浏览器中可以使用 `pageX/Y - window.scrollX/Y` 来代替
    - `pageX` / `pageY`
        - 触发事件相对于整个页面的位置 (左上角为 `0` / `0 `)
        - 整个页面包括滚动出去的范围
    - `screenX` / `screenY` <span style="color: yellow">(企业开发中一般用不上)</span>
        - 触发事件相对于整个显示器左上角的位置 (左上角为 `0` / `0` )

![](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\mobile_page_client_screen_X_Y.png)



### 点透问题

定义

- 当一个元素覆盖了另一个元素 (无论是不是父子关系), 覆盖的元素监听 `touch` 事件, 而下面的元素监听 `click` 事件, 并且 `touch` 事件触发后覆盖的元素消失了, 那么就会触发下面的元素的 `click` 事件

原因

- 当手指触摸到屏幕的时候, 系统会生成 `touch` 和 `click` 两个事件
- `touch` 事件先执行, 执行完后从文档上消失了
- `click` 事件有 `100~300ms` 的延迟, 所以会后执行
- `click` 事件执行的时候, 触发该事件的元素已经消失了, 对应的位置现在是下面的元素, 所以就触发了下面的元素的 `click` 事件

解决方案

- 在 `touch` 事件中添加 `event.preventDefault()` 阻止事件扩散
- 新版本 `Zepto` 中的 `tap` 事件已经修复了该 `BUG`
- 使用 `Fastclick` 插件, 链接: [ftlabs/fastclick: Polyfill to remove click delays on browsers with touch UIs](https://github.com/ftlabs/fastclick)

