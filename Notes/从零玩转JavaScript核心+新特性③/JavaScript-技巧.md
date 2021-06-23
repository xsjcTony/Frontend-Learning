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

## 事件 (Event)



> [HTML DOM Event Object | w3schools](https://www.w3schools.com/jsref/dom_obj_event.asp)



### 覆盖系统默认事件

- 在自定义事件中使用 `return false` 覆盖系统对应默认事件行为

```js
submitButton.onclick () => {
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
element.onmouseover = () => {}
element.onmouseenter = () => {} // 建议初学者使用

// 移出事件
element.onmouseout = () => {}
element.onmouseleave = () => {} // 建议初学者使用
```



### 监听鼠标移动

```js
element.onmousemove = () => {}
```





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





---

## 元素属性



### 元素属性和取值相同

- 在JavaScript中, 元素属性和取值相同, `element.attributeName` 就会返回 `true` , 反之返回 `false`

```html
<form>
  <input type="submit" disabled="disabled"> <!-- 或 disabled -->
</form>

<script>
	let submitButton = document.querySelector("input");
  console.log(submitButton.disabled);
</script>
```

