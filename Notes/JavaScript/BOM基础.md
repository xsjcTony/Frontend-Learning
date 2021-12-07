# BOM基础 (BOM Basic)



> [Window - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window)



## 定义

一套操作浏览器的 `API`

---

## 常见对象



`window`

- 整个浏览器窗口
- BOM中的顶级对象 (全局)



`Navigator`

- 当前浏览器信息
- 判断用户使用的浏览器



`Location`

- 浏览器地址栏信息
- 能设置或获取当前地址信息



`History`

- 代表浏览器的历史信息
- 实现刷新 / 上一步 / 下一步
- 出于隐私考虑只能拿到当前的历史记录



`Screen`

- 用户的屏幕信息
- 显示器的宽 / 高等

---

## `Navigator`



> [Navigator - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)



### 获取浏览器种类

```js
let agent = window.navigator.userAgent;

if(/chrome/i.test(agent)) {
	alert("currently using Chrome");
}
else if(/firefox/i.test(agent)) {
	alert("currently using Firefox");
}
else if(/msie/i.test(agent)) {
	alert("currently using low version IE");
}
else if("ActiveXObject" in window) {
	alert("currently using high version IE");
}
```

---

## `Location`



> [Location - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)



### 获取当前地址栏的地址

```js
window.location.href
```



### 设置当前地址栏的地址

```js
window.location.href = "https://www.google.com"
```



### 重新加载界面 (刷新)

```js
window.location.reload();
```



### 强制重新加载界面 (强制刷新)

```js
window.location.reload(true);
```



### 获取当前路径

```js
window.loaction.pathname
```



---

## `History`



> [History - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/History)



### 前进

- 必须要有可以前进的页面

```js
window.history.forward(); // 前进1个页面
window.history.go(n); // 前进n个页面
```



### 后退

- 必须要有可以后退的页面

```js
window.history.back(); // 后退1个页面
window.history.go(-n); // 后退n个页面
```



### 刷新

```js
window.history.go(0); // 0代表刷新, 正数代表前进的页面数量, 负数代表后退的页面数量
```



### pushState

- 给浏览器的 `history` 添加一层, 并跳转
- 三个参数
  - 一个可以 `被序列化` 的包含要跳转至的页面的 `状态 (state) ` 的 `对象`
  - 跳转后的 `title` , 由于会被浏览器忽略, 所以传 `null`
  - 要跳转至的 `URL`

---

## `Screen`



> [Screen - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen)



---

## `window`



> [Window - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window)



### 网页可视区域宽高

- window.innerWidth / innerHeight <span style="color: yellow;">(>=IE9)</span>
- document.documentElement / body.clientWidth / clientHeight <span style="color: yellow;">(<IE9)</span>
- document.documentElement.clientWidth / clientHeight 方法只作用于 `标准模式` ( `CSS1Compat` )
- document.body.clientWidth / clientHeight 方法只作用于 `混杂模式` ( `BackCompat` )

```js
window.innerWidth // 可视区域宽度 // >=IE9
window.innerHeight // 可视区域高度 // >=IE9
document.documentElement.clientWidth // 可视区域宽度 // <IE9标准模式
document.documentElement.clientHeight // 可视区域高度 // <IE9标准模式
document.body.clientWidth // 可视区域宽度 // <IE9混杂模式
document.body.clientHeight // 可视区域高度 // <IE9混杂模式
```

- 封装好的兼容性写法

```js
function getScreen() {
	let width, height;

	if(window.innerWidth) {
		width = window.innerWidth;
		height = window.innerHeight;
	}
	else if(document.compatMode === "BackCompat") {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	else {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	}

	return {
		width: width,
		height: height
	}
}
```



### 网页滚动距离

- <span style="color: yellow;">>=IE9</span>

```js
window.onscroll = () => {
  console.log(window.pageXOffset); // 水平滚动距离
  console.log(window.pageYOffset); // 垂直滚动距离
}
```

- <span style="color: yellow;"><IE9</span> `标准模式`

```js
window.onscroll = () => {
  console.log(document.documentElement.scrollLeft); // 水平滚动距离
  console.log(document.documentElement.scrollTop); // 垂直滚动距离
}
```

- <span style="color: yellow;"><IE9</span> `混杂模式`

```js
window.onscroll = () => {
  console.log(document.body.scrollLeft); // 水平滚动距离
  console.log(document.body.scrollTop); // 垂直滚动距离
}
```

- 封装好的兼容性写法

```js
function getPageScroll() {
	let x, y

		if(window.innerWidth) {
		x = window.pageXOffset;
		y = window.pageYOffset;
	}
else if(document.compatMode === "BackCompat") {
		x = document.body.scrollLeft;
		y = document.body.scrollTop;
	}
	else {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
	}

	return {
		x: x,
		y: y
	}
}
```

