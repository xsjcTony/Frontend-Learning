# 元素 & 节点 (Element & Node)



## 格式相关

- 在JavaScript中, `html` 标签也称之为 `DOM` 元素

- 使用 `document` 的时候前面不用加 `window`

    ```js
    console.log(window.document === document); // true
    ```


---

## 节点 (Node)



> [Node - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node)



### 定义

- `DOM` 对象以 `树` 的形式保存页面上所有的内容
- `html` 页面的每一部分都是 `Node` ( 标签 (元素) , 文本 , 属性 , 换行等)



### 图示

![DOM树](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\dom_tree.gif)



### 属性



> [Node Properties - Web APIs | MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Node#properties)



#### `Node.ChildNodes`

- 返回一个 `伪数组` 包含该节点的所有子节点
- 返回类型 `NodeList []`
- `read-only`
- 若没有子节点则返回 `NodeList []`



#### `Node.nodeType`

- 返回一个整数, 如下表

| Name                                                         | Value |
| ------------------------------------------------------------ | ----- |
| ELEMENT_NODE                                                 | 1     |
| <span style="color: red">ATTRIBUTE_NODE (Deprecated)</span>  | 2     |
| TEXT_NODE                                                    | 3     |
| CDATA_SECTION_NODE                                           | 4     |
| <span style="color: red">ENTITY_REFERENCE_NODE (Deprecated)</span> | 5     |
| <span style="color: red">ENTITY_NODE (Deprecated)</span>     | 6     |
| PROCESSING_INSTRUCTION_NODE                                  | 7     |
| COMMENT_NODE                                                 | 8     |
| DOCUMENT_NODE                                                | 9     |
| DOCUMENT_TYPE_NODE                                           | 10    |
| DOCUMENT_FRAGMENT_NODE                                       | 11    |
| <span style="color: red">NOTATION_NODE (Deprecated)</span>   | 12    |

- 返回类型 `Number`
- `read-only`



#### `Node.firstChild`

- 返回该 `Node` 的第一个子节点
- 返回类型 `Node`
- `read-only`
- 若没有子节点则返回 `null`



#### `Node.lastChild`

- 返回该 `Node` 的最后一个子节点
- 返回类型 `Node`
- `read-only`
- 若没有子节点则返回 `null`



#### `Node.parentElement`

- 返回该 `Node` 的父元素
- 返回类型 `Element`
- `read-only`
- 若没有父元素则返回 `null`
- FireFox9以下不支持



#### `Node.parentNode`

- 返回该 `Node` 的父节点
- 返回类型 `Node`
- `read-only`
- 若没有父元素则返回 `null`



#### `Node.previousSibling`

- 返回该 `Node` 的上一个节点
- 返回类型 `Node`
- `read-only`
- 若没有上一个节点则返回 `null`



#### `Node.nextSibling`

- 返回该 `Node` 的下一个节点
- 返回类型 `Node`
- `read-only`
- 若没有下一个节点则返回 `null`



#### `Node.textContent`

- 返回该 `Node` 内的所有文本内容
- 返回类型 `String`
- 不包含标签
- 包含空格
- 设置新数值时会作为纯文本添加



### 方法



#### `Node.appendChild(childNode)`

> [Node.appendChild() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

将 `childNode` <span style="color: yellow">添加</span> 到该节点的 `子节点 `的最后位置



#### `Node.insertBefore(newNode, referenceNode)`

> [Node.insertBefore() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)

将 `newNode` <span style="color: yellow">添加</span>到该节点的 `子节点` 中指定的 `referenceNode` 之前



#### `Node.removeChild(childNode)`

> [Node.removeChild() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)

将 `子节点` 中的 `childNode` <span style="color: yellow">删除</span>



#### `Node.cloneNode(deep)`

> [Node.cloneNode() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)

返回一个当前 `Node` 的复制品, 是否复制 `子节点` 取决于 `deep`







---

## 元素 (Element)



> [Element - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element)



### 定义

- 标签
- 是 `Node` 的子类



### 属性



> [Element Properties - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element#properties)



#### `Element.children`

- 返回一个 `伪数组` 包含该元素的所有子元素
- 返回类型 `HTMLCollection []`
- `read-only`
- 若没有子元素则返回 `HTMLCollection []`



#### `Element.firstElementChild`

- 返回该 `Element` 的第一个子元素
- 返回类型 `Element`
- `read-only`
- 若没有子元素则返回 `null`



#### `Element.lastElementChild`

- 返回该 `Element` 的最后一个子元素
- 返回类型 `Element`
- `read-only`
- 若没有子元素则返回 `null`



#### `Element.previousElementSibling`

- 返回该 `Element` 的上一个元素
- 返回类型 `Element`
- `read-only`
- 若没有上一个元素则返回 `null`



#### `Element.nextElementSibling`

- 返回该 `Element` 的下一个元素
- 返回类型 `Element`
- `read-only`
- 若没有下一个元素则返回 `null`



#### `Element.innerHTML`

- 返回该 `Element` 的内容
- 返回类型 `DOMString`
- 包含标签
- 包含空格
- 设置新数值时会把标签文本转换成标签之后再添加



#### `HTMLElement.innerText`

- 返回该 `Element` 的内容 (包含子元素中的文本内容)
- 返回类型 `DOMString`
- 不包含标签
- 不包含空格
- `HTMLElement` 继承 `Element`
- 设置新数值时会作为纯文本添加





### 方法



> [Element - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element#methods)



#### `Element.getAttribute(attributeName)`

> [Element.getAttribute() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)

返回该元素的 `attributeName` 属性的数值



#### `Element.setAttribute(attributeName, newValue)`

> [Element.setAttribute() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

<span style="color: yellow">修改 </span>或 <span style="color: yellow">新增</span> 该元素的 `attributeName` 属性的数值为 `newValue`



#### `Element.removeAttribute(attributeName)`

> [Element.removeAttribute() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)

<span style="color: yellow">删除 </span>该元素的 `attributeName` 属性



---

## 获取元素



###  通过 `id`



格式

```js
document.getElementById("idName")
```



注意点

- 返回的是一个 `Object` , 因为 `id` 不能重复, 所以会返回寻找的元素
- 若 `id` 不存在则返回 `null`



示例

```html
<!DOCTYPE html>
<html lang="">
<head>
	<meta charset="UTF-8">
	<title>通过id获取元素</title>
</head>
<body>
<div id="box">我是div</div>

<script>
	let div = document.getElementById("box");
	console.log(div); // <div id="box">I'm div</div>
	console.log(typeof div); // object

	let divNull = document.getElementById("123");
	console.log(divNull); // null
</script>
</body>
</html>
```



### 通过 `class`



格式

```js
document.getElementsByClassName("className")
```



注意点

- 返回的是一个 `伪数组` , 因为 `class` 名称可以重复, 所以会返回所有符合条件的元素
- 若为该 `class` 名称的元素不存在, 则返回 `HTMLCollection []`



示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>通过class获取元素</title>
</head>
<body>
<div class="father"></div>
<div class="father">我是div</div>

<script>
  let divs = document.getElementsByClassName("father");
  console.log(divs); // HTMLCollection(2) [div.father, div.father]

  let divsNull = document.getElementsByClassName("123");
  console.log(divsNull); // HTMLCollection []
</script>
</body>
</html>
```



### 通过 `name`



格式

```js
document.getElementsByName("nameName")
```



注意点

- 返回的是一个 `伪数组` , 因为 `name` 名称可以重复, 所以会返回所有符合条件的元素
- 若为该 `name` 名称的元素不存在, 则返回 `NodeList []`



示例

````html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>通过name获取元素</title>
</head>
<body>
<div class="father">
  <form>
    <input type="text" name="test">
    <input type="password" name="test">
  </form>
</div>

<script>
  let divs = document.getElementsByName("test");
  console.log(divs); // NodeList(2) [input, input]

  let divsNull = document.getElementsByName("123");
  console.log(divsNull); // NodeList []
</script>
</body>
</html>
````



### 通过 `标签名称`



格式

```js
document.getElementsByTagName("tagName")
```



注意点

- 返回的是一个 `伪数组` , 因为 `标签名称` 名称可以重复, 所以会返回所有符合条件的元素
- 若为该 `标签名称` 名称的元素不存在, 则返回 `HTMLCollection []`



示例

````html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>通过标签名称获取元素</title>
</head>
<body>
<div class="father">我是div1</div>
<div class="father">我是div2</div>
<div>我是div3</div>

<script>
  let divs = document.getElementsByTagName("div");
  console.log(divs); // HTMLCollection(3) [div.father, div.father, div]

  let divsNull = document.getElementsByTagName("123");
  console.log(divsNull); // HTMLCollection []
</script>
</body>
</html>
````



### <span style="color: yellow"><推荐></span> 通过 `选择器`



#### `querySelector()`



格式

```js
document.querySelector("selector")
```



注意点

- `选择器` 格式和 `css` 中相同
- `querySelector` 只会返回根据 `选择器` 找到的第一个元素

- 返回的是一个 `Object`
- 若元素不存在则返回 `null`
- `选择器` 格式错误会报错



示例

````html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>通过选择器获取元素1</title>
</head>
<body>
<div class="father">
  <form>
    <input type="text" name="test">
    <input type="password" name="test">
  </form>
</div>
<div class="father" id="box">我是div</div>

<script>
  let div1 = document.querySelector("#box");
  let div2 = document.querySelector(".father");
  let div3 = document.querySelector("div>form");

  console.log(div1); // <div class="father" id="box">我是div</div>
  console.log(div2); // ▶<div class="father">...</div>
  console.log(div3); // ▶<form>...</form>

  let divNull = document.querySelector(".null");
  console.log(divNull); // null
</script>
</body>
</html>
````



#### `querySelectorAll()`



格式

```js
document.querySelectorAll("selector")
```



注意点

- `选择器` 格式和 `css` 中相同
- `querySelectorAll` 返回的是一个 `伪数组` , 包含所有符合条件的元素

- 若元素不存在则返回 `NodeList []`
- `选择器` 格式错误会报错



示例

````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>通过选择器获取元素2</title>
</head>
<body>
<div class="father">
  <form>
    <input type="text" name="test">
    <input type="password" name="test">
  </form>
</div>
<div class="father" id="box">我是div</div>

<script>
  let div1 = document.querySelectorAll("#box");
  let div2 = document.querySelectorAll(".father");
  let div3 = document.querySelectorAll("div>form");

  console.log(div1); // ▶ NodeList [div#box.father]
  console.log(div2); // ▶ NodeList(2) [div.father, div#box.father]
  console.log(div3); // ▶ NodeList [form]

  let divNull = document.querySelector(".null");
  console.log(divNull); // null
</script>
</body>
</html>
````



### 获取元素的所有子元素



格式

```js
element.children
```



注意点

- 返回的是一个 `伪数组` , 包含所有的子元素
- 若没有子元素则返回 `HTMLCollection []`



示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>获取元素的所有子元素</title>
</head>
<body>
<div>
  <h1>1</h1>
  <h2>2</h2>
  <p class="item">3</p>
  <p>4</p>
  <span>5</span>
</div>

<script>
  let div = document.querySelector("div");
  console.log(div.children); // ▶ HTMLCollection(5) [h1, h2, p.item, p, span]
</script>
</body>
</html>
```



### 获取元素所有子节点



格式

```js
node.childNodes
```



注意点

- 返回的是一个 `伪数组` , 包含所有的子节点
- 若没有子节点则返回 `NodeList []`




示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>获取元素的所有子节点</title>
</head>
<body>
<div>
  <h1>1</h1>
  <h2>2</h2>
  <p class="item">3</p>
  <p>4</p>
  <span>5</span>
</div>

<script>
  let div = document.querySelector("div");

  for(let node of div.childNodes) { // div.childNodes即为全部的子节点, for of循环用来迭代对象
    if(node.nodeType === Node.ELEMENT_NODE){ // 判断子节点是否是元素
      console.log(node);
    }
  }
  console.log(div.children[0] === div.childNodes[1]); // true // 子节点中的元素节点就是子元素
</script>
</body>
</html>
```



### 获取父元素的兼容性写法



格式

```js
let parentElement = child.parentElement || child.parentNode; // 逻辑或 || 若前面为true则返回前面, 若前面为false则返回后面
```



注意点

- 一般针对FireFox9以下



示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>获取父元素兼容性写法</title>
</head>
<body>
<div>
  <h1>1</h1>
  <h2>2</h2>
  <p class="item">3</p>
  <p>4</p>
  <span>5</span>
</div>

<script>
  let child = document.querySelector(".item");
  let parentElement = child.parentElement || child.parentNode;
  console.log(parentElement);
</script>
</body>
</html>
```

---

## 节点增删改查 (Node CRUD)



注意点

- 删除 `Node` 时只能通过对应的 `父节点` 来删除, 不能自己删除自己



示例

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>节点增删改查</title>
</head>
<body>
<div>
  <h1>我是标题</h1>
  <p>我是段落</p>
</div>

<script>
  // 创建节点(元素
  let span = document.createElement("span"); // <span></span>

  // 添加节点
  let div = document.querySelector("div");
  div.appendChild(span); // 将元素添加到该节点的子节点中的最后位置

  // 插入节点
  let h1 = document.querySelector("h1");
  div.insertBefore(span, h1); // 将元素添加到h1标签之前

  // 删除节点
  span.parentNode.removeChild(span); // 删除span
  div.parentNode.removeChild(div); // 删除div

  // 克隆节点
  let newDiv = div.cloneNode(true) // true代表包含子元素的克隆
</script>
</body>
</html>
```

---

## 属性增删改查 (Attribute CRUD)



### 获取元素属性 (Read)

格式

```js
element.attributeName // 无法获得自定义属性的取值
element.getAttribute("attributeName") // 可以获得自定义属性的取值
```

注意点

- 第一种方式无法获得自定义属性的取值, 第二种可以

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>属性查找</title>
</head>
<body>
<img src="images/1.jpg" alt="我是alt222" title="我是title" nj="666">

<script>
  let img = document.querySelector("img");

  let alt = img.alt; // 我是alt222
  let nj = img.getAttribute("nj"); // 666
</script>
</body>
</html>
```



### 修改元素属性 (Update)

格式

```js
element.attributeName = "newValue" // 无法修改自定义属性的取值
element.setAttribute("attributeName", "newValue") // 可以修改自定义属性的取值
```

注意点

- 第一种方式无法修改自定义属性的取值, 第二种可以

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>属性修改</title>
</head>
<body>
<img src="images/1.jpg" alt="我是alt222" title="我是title" nj="666">

<script>
  let img = document.querySelector("img");

  // 修改元素属性
	img.title = "新的title"; // title="新的title"
	img.setAttribute("nj", "123"); // nj="123"
</script>
</body>
</html>
```



### 修改元素新增 (Create)

格式

```js
element.setAttribute("attributeName", "newValue") // 属性不存在即为新增
```

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>属性新增</title>
</head>
<body>
<img src="images/1.jpg" alt="我是alt222" title="我是title" nj="666">

<script>
  let img = document.querySelector("img");

  // 新增元素属性
  img.setAttribute("tony", "lily"); // tony="lily"
</script>
</body>
</html>
```



### 删除元素属性 (Delete)

格式

```js
element.attributeName = "" // 无法清空自定义属性的取值, 会留下属性名称
element.removeAttribute("attributeName") // 可以删除自定义属性, 整个属性都会被删除
```

注意点

- 第一种方式清空自定义属性的取值, 而且会留下属性名称
- 第二种方式可以删除自定义属性, 并且整个属性都会被删除

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>属性删除</title>
</head>
<body>
<img src="" alt="我是alt222" title="我是title" nj="666">

<script>
	let img = document.querySelector("img");

	// 删除元素属性
	img.alt = ""; // alt
	img.removeAttribute("nj"); // nj被删除
</script>
</body>
</html>
```

---

## 元素内容操作 (Element Content CRUD)



### 获取元素内容

格式

```js
element.innerHTML // 包含标签, 包含空格
element.innerText // 不包含标签, 不包含空格
element.textContent // 不包含标签, 包含空格
```

注意点

- `innerHTML` 包含标签, 不包含空格
- `innerText` 不包含标签, 不包含空格
- `textContent` 不包含标签, 包含空格

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>元素内容增删改查</title>
</head>
<body>
<div>
  我是div
  <h1>我是标题</h1>
  <p>我是段落</p>
</div>

<script>
  let div = document.querySelector("div");

  // 获取元素内容
  console.log(div.innerHTML); // 包含标签, 包含空格
  console.log(div.innerText); // 不包含标签, 不包含空格
  console.log(div.textContent); // 不包含标签, 包含空格
</script>
</body>
</html>
```



### 设置元素内容

格式

```js
element.innerHTML = value // 会把标签文本转换成标签之后再添加
element.innerText = value // 纯文本添加
element.textContent = value // 纯文本添加
```

注意点

- `innerHTML` 会把标签文本转换成标签之后再添加
- `innerText` / `textContent` 均为纯文本添加
- `innerText` / `textContent` 一般结合使用用于解决兼容性问题

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>元素内容增删改查</title>
</head>
<body>
<div>
  我是div
  <h1>我是标题</h1>
  <p>我是段落</p>
</div>

<script>
  let div = document.querySelector("div");

  // 设置元素内容
  div.innerHTML = "<span>我是span</span>"; // 会把标签文本转换成标签之后再添加
  div.innerText = "<span>我是span</span>"; // 纯文本添加
  div.textContent = "<span>我是span</span>"; // 纯文本添加

  // innerText和textContent结合使用, 解决兼容性问题
  let setText = (obj, text) => {
  	if("textContent" in obj) {
  		obj.textContent = text;
	  }
  	else {
  		obj.innerText = text;
	  }
  }

  setText(div, "Tony loves Lily");
</script>
</body>
</html>
```



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



---

## 元素样式操作 (Element CSS CRUD)



### 获取元素样式

格式

```js
element.style // 行内
element.style.cssProperty
getComputedStyle(element) // >=IE9 // 行内+CSS
getComputedStyle(element.cssProperty)

element.currentStyle // <IE9
```

注意点

- 通过 `element.style` 属性只能获取行内样式的属性值, 找不到 `CSS` 设置的属性值
- `getComputedStyle()` 本质是 `window.getComputedStyle()` , 对象中保存了所有 `CSS` 设置的样式和属性值 (包含浏览器默认)
- 通过 `getComputedStyle()` 既能获取 `CSS` 设置的样式, 也能获取行内设置的样式
- 通过 `getComputedStyle()` 获取的元素宽高不包括 `border` 和 `padding`
- `getComputedStyle()` 只支持 <span style="color: yellow;">>=IE9</span>
- `element.currentStyle` 特性同 `getComputedStyle()`, 但只支持 <span style="color: yellow;"><IE9</span>

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>操作元素样式</title>
	<style>
		.box {
			width: 200px;
			height: 200px;
			background-color: red;
		}
	</style>
</head>
<body>
<div></div>

<script>
	let div = document.querySelector("div");

	// 获取元素样式
	console.log(div.style.width); // 300px // 通过element.style属性只能获取行内样式的属性值, 找不到CSS设置的属性值
	console.log(getComputedStyle(div).width); // 300px // 本质是window.getComputedStyle, 对象中保存了所有CSS设置的样式和属性值(包含浏览器默认)
</script>
</body>
</html>
```





### 设置元素样式

格式

```js
element.className = value // 将预先写好的css代码通过给予class名称应用到元素上
element.style.cssProperty = value // 通过element.style.cssProperty的方式修改, 将css中的"-"换成驼峰命名法
```

注意点

- 通过第二种方式添加的都是行内样式, 会覆盖掉同名的 `CSS` 样式

> 样式名称参考: [CSS Properties Reference - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)

示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>操作元素样式</title>
	<style>
		.box {
			width: 200px;
			height: 200px;
			background-color: red;
		}
	</style>
</head>
<body>
<div></div>

<script>
	let div = document.querySelector("div");
  
  // 设置元素样式
	div.className = "box"; // 将预先写好的css代码通过给予class名称应用到元素上

	// 通过element.style.cssProperty的方式修改, 将css中的"-"换成驼峰命名法
	div.style.width = "300px";
	div.style.height = "300px";
	div.style.backgroundColor = "blue";
</script>
</body>
</html>
```

---

## 三大家族 `offset` / `client`



### 元素 `offset` 属性



offset宽高

- 包含 `border` 和 `padding` 
- 可以获取 `CSS` 和行内样式
- 只能获取, 不能设置

```js
element.offsetWidth // 包含border和padding的宽度
element.offsetHeight // 包含border和padding的高度
```



offsetTop / Left

- 元素到第一个定位祖先元素之间的偏移位
- 如果没有祖先元素是定位的, 那么就是到 `body` 的偏移位

```js
element.offsetTop
element.offsetLeft
```



offsetParent

- 元素的第一个定位祖先元素
- 如果没有祖先元素是定位的, 那么就是 `body`

```js
element.offsetParent 
```



### 元素 `client` 属性



client宽高

- 包含 `padding` , 但不包含 `border` 
- 可以获取 `CSS` 和行内样式
- 只能获取, 不能设置

```js
element.clientWidth // 包含padding的宽度
element.clientHeight // 包含padding的高度
```



clientTop / Left

- `border` 宽度

```js
element.clientTop // 顶部边框宽度
element.clientLeft // 左边边框宽度
```



### 元素 `scroll` 属性



scroll宽高

- 内容没有超出元素范围时, `scroll` 宽高包含 `padding` , 等于 `client` 宽高
- 内容超出元素范围时, `scroll` 宽高包含 `padding` 再加上超出元素内容 (超出 `padding` ) 的宽高
- 只能获取, 不能设置

```js
element.scrollWidth // 包含padding和超出元素内容的宽度
element.scrollHeight // 包含padding和超出元素内容的高度
```



scrollTop/ Left

- 超出元素内容 (超出 `padding` ) 往上 / 左移动的范围

```js
element.scrollTop // 超出元素内容往上移动的范围
element.scrollLeft // 超出元素内容往左移动的范围
```



### 图示

![offset_client_width_height](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\offset_client_width_height.png)

![offset_client_top_left](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\offset_client_top_left.png)

![scroll_height_width](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\scroll_height_width.png)

![scroll_top_left](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\scroll_top_left.png)

---





