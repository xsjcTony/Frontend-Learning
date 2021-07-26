# jQuery - 基础 (Basic)



> [jQuery](https://jquery.com/)



## 定义

- 一款 `JavaScript` 库
- 简化原生 `JavaScript` 的操作

---

## 使用方法



### 引入文件

1. 下载 `jQuery` 库

2. 引入 `jQuery` 库

```html
<script src="js/jquery-1.12.4.js"></script>
```

- 或者使用 `CDN`

- > [jquery CDN by jsDelivr](https://www.jsdelivr.com/package/npm/jquery)

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.js" integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU=" crossorigin="anonymous"></script>
```

---

## 入口函数



### 定义

相当于原生JS的 `window.onload = function () {}`



### 格式

```js
$(function () {}) // 推荐
jQuery(function () {}) // 不推荐, 因为要写的更多
$(document).ready(function () {}) // 不推荐, 因为要写的更多
jQuery(document).ready(function () {}) // 不推荐, 因为要写的更多
```



### 和原生JS入口函数的区别

- 加载模式
    - 原生JavaScript会等到DOM元素以及图片加载完毕才会执行
    - jQuery会等到DOM元素加载完毕立即执行, 不会等到图片也加载完毕
- 多个入口函数
    - 原生JavaScript编写多个入口函数, 后编写的会覆盖先编写的
    - jQuery中编写多个入口函数, 后编写的不会覆盖先编写的, 会相继执行



### `$` 符号冲突问题

- 如果其他框架也使用了 `$` 符号, 则在所有jQuery代码之前释放 `$` 符号的使用权

```js
jQuery.noConflict(); // 必须在所有jQuery代码之前
// 之后所有$使用jQuery代替
jQuery(function () {});
```

- 或使用自定义的字符代替 `$`

```js
let tony = jQuery.noConflict(); // 必须在所有jQuery代码之前
// 之后所有$使用自定义的tony代替
tony(function () {
  alert("hello Tony");
});
```

---

## 核心函数



### 格式

```js
// 代表调用了jQuery的核心函数
$()
jQuery()
```



### 可以接收的参数



#### 一个 `function`

- 等同于 `入口函数`

#### 一个 `String`

- 字符串选择器

    - 返回一个jQuery对象, 其中保存了根据选择器找到的DOM元素

    ```js
    $(".box1") // class名称为box1的DOM元素
    $("#box2") // id名称为#box2的DOM元素
    ```

- 代码片段

    - 返回一个jQuery对象, 其中保存了根据代码片段创建的DOM元素

    ```js
    $("<p>我是段落</p>") // 创建了一个DOM元素p, 内容是"我是段落"
    ```

#### 一个 `DOM` 元素

- 会被包装成一个jQuery对象返回

---

## jQuery对象



### 定义

- 是一个伪数组
- 有 `0` 到 `length - 1` 的属性, 并且有 `length` 属性



### 常用方法



#### `.index()`

- 返回当前 `DOM` 元素在其兄弟组成的 `jQuery对象` 中的索引



#### `.eq(index)`

- 获取 `jQuery对象` 中的第 `index` 个 `DOM` 元素并包装成一个新的 `jQuery对象` 之后返回



#### `.siblings()`

- 获取除了当前 `DOM` 元素之外的所有兄弟元素, 包装成一个 `jQuery对象` 之后返回
- 一般用来做排它



#### `.children([selector])`

- 获取当前 `jQuery对象` 中的所有 `DOM` 元素的子元素
- 可以选择性的传入 `selector` 来过滤结果
- 该方法只会随着 `DOM Tree` 往下找一层, `.find()` 会找到底为止



#### `.parent([selector])`

- 获取当前 `jQuery对象` 中的所有 `DOM` 元素的父元素
- 可以选择性的传入 `selector` 来过滤结果
- 该方法只会随着 `DOM Tree` 往上找一层, `.parents()` 会找到底为止

---

## 静态方法



### `$.each()`

作用

- 遍历 `数组` 或 `伪数组` 中的每一个元素并执行 `回调函数`

格式

```js
$.each(arr, function (index, element) {})
```

参数

- `arr` : 需要遍历的 `数组` 或 `伪数组`
- `function (index, element) {}` : 遍历执行的 `回调函数`
- `index` : 当前遍历至的索引
- `value` : 当前遍历至的数值

返回值

- 遍历的 `数组` 或 `伪数组`

注意点

- 在回调函数中使用 `return false;` 可以提前结束 `$.each()` 的循环



### `$.map()`

作用

- 遍历 `数组` 或 `伪数组` 中的每一个元素并执行 `回调函数` 并将返回值存入一个新的 `数组`

格式

```js
$.map(arr, function (element, index) {})
```

参数

- `arr` : 需要遍历的 `数组` 或 `伪数组`
- `function (element, index) {}` : 遍历执行的 `回调函数`
- `value` : 当前遍历至的数值
- `index` : 当前遍历至的索引

返回值

- 默认为 `[]`
- 其中可存放 `回调函数` 的返回值



### `$.trim()`

作用

- 将 `字符串` 开始和结束的 `空格` 去掉并返回一个新 `字符串`

格式

```js
$.trim(str)
```

参数

- `str` : 需要去除空格的 `字符串`

返回值

- 去除空格之后的新 `字符串`



### `$.isWindow()`

作用

- 判断对象是否为 `window`

格式

```js
$.isWindow(obj)
```

参数

- `obj` : 需要判断的对象

返回值

- `true` : 是 `window`
- `false` : 不是 `window`



### `$.isArray()`

作用

- 判断对象是否为 `数组`

格式

```js
$.isArray(obj)
```

参数

- `obj` : 需要判断的对象

返回值

- `true` : 是 `数组`
- `false` : 不是 `数组`

注意点

- 只有 `真数组` 才会返回 `true` , `伪数组` 会返回 `false`



### `$.isFunction()`

作用

- 判断对象是否为 `函数`

格式

```js
$.isFunction(obj)
```

参数

- `obj` : 需要判断的对象

返回值

- `true` : 是 `函数`
- `false` : 不是 `函数`

注意点

- `jQuery` 本质是一个函数

    ```js
    $.isFunction(jQuery) // true
    ```

    

### `$.holdReady()`

作用

- 暂停 `ready` (入口函数) 的执行

格式

```js
$.holdReady(true)
$.holdReady(false)
```

参数

- `true` : 暂停 `ready` 的执行
- `false` : 回复 `ready` 的执行

---

## 选择器



### 内容选择器



#### `:empty`

作用

- 找到没有子节点 (文本内容和子元素) 的指定元素

格式

```js
$("div:empty") // 找到<div></div>, 哪怕换行也不行, 因为换行会被当做一个空格
```



#### `:parent`

作用

- 找到有子节点 (文本内容和子元素) 的指定元素

格式

```js
$("div:parent"); // 找到除了<div></div>之外的div, 即有子节点, 哪怕是换行
```



#### `:contains(text)`

作用

- 找到包含指定文本内容的指定元素

格式

```js
$("div:contains('123')") // 找到文本内容包含123的div
```

注意点

- 内外括号要使用不同的 `引号`



#### `:has(selector)`

作用

- 找到包含指定子元素 (通过选择器找到) 的指定元素

格式

```js
$("div:has('span')") // 找到子元素包含span的div
```

注意点

- 内外括号要使用不同的 `引号`

---

## 属性节点



### 定义

- 在编写 `HTML` 代码时, 在标签中添加的属性
- 只用 `DOM` 元素才有
- 保存在 `DOM` 元素的 `attributes` 属性中



### jQuery - 属性节点CRUD操作

赋值 / 新增

- 选择器找到多少个元素就会赋值多少个属性节点
- 如果属性节点不存在, 会自动新增

```js
jQueryObj.attr("attribute", "value")
```

获取

- 只会返回选择器找到的第一个元素的属性节点的值

```js
jQueryObj.attr("attribute")
```

删除

- 选择器找到多少个元素就会删除多少个属性节点
- 如想删除多个属性节点, 使用 `空格` 在字符串中将属性节点名称隔开

```js
jQueryObj.removeAttr("attribute1 attribute2");
```

注意点

- 只有 `jQuery对象` 才能使用



### jQuery - 普通属性CRUD操作

方法

- `prop`
- `removeProp`

注意点

- 使用方法和注意点和 `attr` / `removeAttr` 完全相同
- 针对 `DOM` 元素的 `属性` 进行操作
- `prop` / `removeProp` 也可以用来操作 `属性节点`



### `attr` / `prop` 操作 `属性节点` 的取舍

- 操作属性节点时, 具有 `true` / `false` 两个属性的属性节点, 如 `checked` / `selected` / `disabled` 使用 `prop()`
- 其他的使用 `attr()`

```html
<input type="checkbox">

<script src="js/jquery.js"></script>
<script>
	console.log($(input).prop("checked")); // true / false
  console.log($(input).attr("checked")); // checked / undefined
</script>
```



### `class` - CRUD操作



添加

```js
jQueryObj.addClass("class1 class2")
```

删除

```js
jQueryObj.removeClass("class1 class2")
```

切换

- 如果类名存在, 则删除
- 如果类名不存在, 则添加

```js
jQueryObj.toggleClass("class1 class2")
```

注意点

- 只有 `jQuery对象` 才能使用

- 如果要操作多个类名, 使用 `空格` 在 `字符串` 中将类名隔开



### 文本 - CRUD操作



html

- 相当于原生JavaScript的 `innerHTML`

```js
jQueryObj.html("<p>123</p>") // 设置, html标签的文本会被编译成标签之后再添加/修改
jQueryObj.html() // 获取
```

text

- 相当于原生JavaScript的 `innerText`

```js
jQueryObj.text("<p>123</p>") // 设置, 字符串会被当做纯文本添加/修改
jQueryObj.text() // 获取
```

text

- 一般用于 `input` / `select` / `typearea` 等元素
- 和原生JavaScript的 `value` 属性差不多

```js
jQueryObj.val("123") // 设置, 字符串会被当做纯文本添加/修改
```

注意点

- 只有 `jQuery对象` 才能使用



### `CSS` 相关 - CRUD操作



#### 样式操作

逐个设置

```js
jQueryObj.css("attribute", "value")
```

链式设置

- 可以无限链接
- 如果大于3步, 建议分开另起, 否则影响阅读性

```js
jQueryObj.css("attribute", "value").css("attribute2", "value2").css("attribute3", "value3")
```

批量设置

- 通过对象传入
- 更简单更直观
- `数字` 默认单位为 `px` , 如果想用其他单位需要使用 `字符串`
- <span style="color: yellow"><推荐></span> 企业开发中推荐使用

```js
jQueryObj.css({
  attribute1: "value1",
  attribute2: "value2",
  attribute3: "value3"
});
```

获取

```js
jQueryObj.css("atrribute") // 比如 $("div").css("width") 就会获取div样式中width属性的值
```



#### 位置&尺寸操作



##### `width()` /  `height()`

定义

- 元素的宽高
- 单位默认为 `px`

获取

```js
jQueryObj.width() // 返回一个Number表示该元素的宽度, 单位为px
jQueryObj.height() // 返回一个Number表示该元素的高度, 单位为px
```

设置

```js
jQueryObj.width("value") // 将元素宽度设置为value, 默认单位为px, 也可以加单位比如10rem
jQueryObj.height("value") // 将元素高度设置为value, 默认单位为px, 也可以加单位比如10rem
```



##### `offset()`

定义

- 元素距离 `document` ( 浏览器中是 `window` )的距离
- 单位默认为 `px`

获取

```js
jQueryObj.offset() // 返回一个对象, 包含top和left属性, 单位为px
jQueryObj.offset().top // 返回元素距离document的垂直距离, 单位为px
jQueryObj.offset().left // 返回元素距离document的水平距离, 单位为px
```

设置

```js
// 设置元素距离document的偏移位, 单位默认为px
jQueryObj.offset({
  top: value,
  left: value
})
```



##### `position()`

定义

- 元素距离定位祖先的偏移位
- 单位为 `px`

获取

```js
jQueryObj.position() // 返回一个对象, 包含top和left属性, 单位为px
jQueryObj.position().top // 返回元素距离定位祖先的垂直距离, 单位为px
jQueryObj.position().left // 返回元素距离定位祖先的水平距离, 单位为px
```

设置

- `position()` 方法只能获取不能设置, 可以使用 `.css()` 或其他方法设置



##### `scrollTop()` / `scrollLeft()`

定义

- 元素滚动的偏移位
- 单位为 `px`

获取

```js
jQueryObj.scrollTop() // 返回一个数值, 包含元素内容滚动出去的垂直距离, 单位为px
jQueryObj.scrollLeft() // 返回一个数值, 包含元素内容滚动出去的水平距离, 单位为px
```

设置

```js
jQueryObj.scrollTop(value) // 接收一个数字, 设置元素内容滚动出去的垂直距离, 单位为px
jQueryObj.scrollLeft(value) // 接收一个数字, 设置元素内容滚动出去的垂直距离, 单位为px
```



整个网页的偏移位

获取

- `IE浏览器` 要使用 `$("body")`
- 非 `IE浏览器` 要使用 `$("html")`
- 兼容性写法是两个相加

```js
$("body").scrollTop() + $("html").scrollTop() // 整个网页滚动出去的垂直距离, 单位为px, 兼容IE和非IE浏览器
$("body").scrollLeft() + $("html").scrollLeft() // 整个网页滚动出去的水平距离, 单位为px, 兼容IE和非IE浏览器
```

设置

- 兼容性写法是 `$("html, body")`

```js
$("html, body").scrollTop(value) // 接收一个数字, 设置
```

---

## 事件



### 事件绑定

注意点

- 在 `jQuery` 中, 如果 `jQuery对象` 中不止一个元素, 那么在绑定事件时会遍历所有元素都为其绑定事件



#### <span style="color: yellow;"><推荐></span> `eventName(fn)`

格式

```js
jQueryObj.eventName(function () {})
```

注意点

- `IDE` 有提示, 易排错

- 并非所有原生JavaScript的 `事件` 都能使用, 不能使用就用下面那种
- 同类型的 `事件` 不会覆盖
- 不同类型的 `事件` 也不会覆盖



#### `on(eventName, fn)`

格式

```js
jQueryObj.on("eventName", function () {}}
```

注意点

- 字符串方式, `IDE` 无提示, 难排错
- 所有原生JavaScript的 `事件` 都能使用
- 同类型的 `事件` 不会覆盖
- 不同类型的 `事件` 也不会覆盖



### 事件移除 (解绑)

格式

```js
jQueryObj.off() // 移除该元素的所有事件
jQueryObj.off("eventName") // 移除该元素的所有指定类型eventName的事件
jQueryObj.off("eventName", fn) // 移除钙元素的指定类型eventName的指定事件fn
```



### 事件冒泡

定义

- 子元素在响应事件时, 父元素也会响应事件
- 一般企业开发中不需要事件冒泡

阻止 

- 在子元素的事件回调函数中加入 `return false;` ( 同时也会阻止 `默认行为` )
- 在子元素的事件回调函数中加入 `event.stopPropagation();` ( 同原生JavaScript )



### 默认行为

定义

- 元素无需添加就有的默认事件

阻止

- 在元素的事件回调函数中加入 `return false;` ( 同时也会阻止 `事件冒泡` )
- 在元素的事件回调函数中加入 `event.preventDefault();` ( 同原生JavaScript )



### `return false` 注意点

- 在 `jQuery` 中, 在事件的回调函数中加入 `return false` 相当于同时做了以下三件事情
    - `event.stopPropagation();`
    - `event.preventDefault();`
    - 停止了事件的执行
- 在原生JavaScript中, `return false` 只会做后面两条, 不会做第一条



### 自动触发事件

格式

```js
jQueryObj.trigger("eventName")
jQueryObj.triggerHandler("eventName")
```

注意点

- `trigger()` 会触发 `事件冒泡` 和 `默认行为`
- `triggerHandler()` 不会触发 `事件冒泡` 和 `默认行为`
- 企业开发中根据需求来选择



<span style="color: cyan;"><面试题></span> `<a>` 的 `trigger()` 注意点

- `<a>` 标签比较特殊, 使用 `trigger()` 触发 `<a>` 的事件时, 不会触发其 `默认行为` , 即不会自动跳转到 `href` 指定的页面
- 想要触发 `<a>` 的默认行为, 需要将文本包装到子元素中, 使用 `子元素.trigger()` 通过 `事件冒泡` 触发 `<a>` 的 `默认行为`

```html
<a href="https://www.google.com/"><span>google</span></a>

<script src="js/jquery.js"></script>
<script>
	$("span").click(function () {
    alert("span clicked.");
  });
  $("span").trigger("click"); // 这样才能触发<a>标签的默认行为
</script>
```



### 自定义事件

格式

- 通过 `on(eventName, fn)` 绑定, 再通过 `trigger()` / `triggerHandler()` 触发

```js
// bind event
jQueryObj.on("customEventName", function () {
  // do something
});

// trigger event
jQueryObj.trigger("customEventName");
// or use
jQueryObj.triggerHandler("customEventName");
```



### 事件命名空间 (Event namespace)

定义

- 让代码阅读者知道这个事件时属于谁的 / 谁添加的

格式

- 事件必须通过 `on(eventName, fn)` 来绑定
- 在 `eventName` 之后添加 `.xxx` 即为命名空间

```js
// bind
jQueryObj.on("eventName.tony", function () {});
jQueryObj.on("eventName.lily", function () {});

// trigger
jQueryObj.trigger("eventName"); // 两个都会触发
jQueryObj.trigger("eventName.tony"); // 只会触发第一个
```

注意点

- 不影响用户手动触发 ( 都会触发 )
- 想要触发属于某个命名空间的事件必须使用 `trigger()` 或 `triggerHandler()`
- 使用 `trigger()` 的话, 父元素所有相同命名空间的指定事件类型也会被触发



### 事件委托

定义

- 找一个在 `入口函数` 执行之前就有的元素来监听之后动态添加的一些元素的某些事件

格式

```js
jQueryObj.delegate("selector", "eventName", function () {})
```

注意点

- `回调函数` 中的 `this` 是触发事件的元素, 而不是帮助监听的元素



### 同时监听移入移出事件

格式

```js
jQueryObj.hover(fnEnter, [fnLeave])
```

注意点

- 本质就是 `mouseenter()` 和 `mouseleave()` , 分别调用 `fnEnter` 和 `fnLeave`
- 也可以只传入一个参数, 会作为移入移出时的公共 `回调函数`

---

## 动画效果



### 动画队列

- `jQuery` 的动画有一个队列, 在之前的动画没有完成时, 后面新增的动画会排入队列中, 在前一个动画执行完毕之后才会根据队列顺序执行下一个动画, 直到队列中的动画执行完毕为止



#### `.stop()`

格式

- `clearQueue` 默认为 `false` , 可选 `true` , 代表是否清空动画队列
- `jumpToEnd` 默认为 `false` , 可选 `true` , 代表是否立即完成当前动画

```js
jQueryObj.stop([clearQueue] [, jumpToEnd]) // 停止未完成的动画
```



#### `.delay()`

格式

- `duration` 代表延迟事件, 单位为 `ms`

```js
jQueryObj.delay(duration)
```



### 显示 / 隐藏

> [Basics | jQuery API Documentation](https://api.jquery.com/category/effects/basics/)

动画

- 从左上角起始 / 消失

格式

- `duration` 为动画持续时长, 单位为 `ms`
- `fn` 是动画执行完毕之后执行的回调函数

```js
jQueryObj.show([duration], [fn]) // 将元素显示出来, 不传参数为立即显示
jQueryObj.hide([duration], [fn]) // 将元素隐藏, 不传参数为立即隐藏
jQueryObj.toggle([duration], [fn]) // 元素未显示则显示, 显示则隐藏
```



### 展开 / 收起

> [Sliding | jQuery API Documentation](https://api.jquery.com/category/effects/sliding/)

动画

- 从上方起始 / 消失

格式

- `duration` 为动画持续时长, 单位为 `ms`
- `fn` 是动画执行完毕之后执行的回调函数

```js
jQueryObj.slideDown([duration], [fn]) // 将元素显示出来, 不传参数为立即显示
jQueryObj.slideUp([duration], [fn]) // 将元素隐藏, 不传参数为立即隐藏
jQueryObj.slideToggle([duration], [fn]) // 元素未显示则显示, 显示则隐藏
```



### 淡入 / 淡出 / 淡入到

> [Fading | jQuery API Documentation](https://api.jquery.com/category/effects/fading/)

动画

- 透明度的改变

格式

- `duration` 为动画持续时长, 单位为 `ms`
- `opacity` 为透明度, 介于 `0` 到 `1` 之间
- `fn` 是动画执行完毕之后执行的回调函数

```js
jQueryObj.fadeIn([duration], [fn]) // 将元素显示出来, 不传参数为立即显示
jQueryObj.fadeOut([duration], [fn]) // 将元素隐藏, 不传参数为立即隐藏
jQueryObj.fadeToggle([duration], [fn]) // 元素未显示则显示, 显示则隐藏
jQueryObj.fadeTo([duration], [opacity], [fn]) // 将元素设置至指定的透明度
```



### 自定义动画

> [Custom | jQuery API Documentation](https://api.jquery.com/category/effects/custom-effects/)

格式

- `properties` 为需要执行动画的属性的集合, 用对象 `{}` 表达

- `duration` 为动画持续时长, 单位为 `ms`
- `easing` 是动画的节奏, 默认为 `swing` ( 中间快两头慢 ), `jQuery` 默认还提供 `linear` ( 匀速 )
- `fn` 是动画执行完毕之后执行的回调函数

```js
jQueryObj.animate(properties, [duration], [easing], [fn])
```

累加属性

- `properties` 中可以使用累加属性, 即为在通过 `+=` 或 `-=` 运算符在当前数值基础上修改

```js
jQueryObj.animate({
  width: "++100"
}, 1000);
```

关键字

- `properties` 中可以使用关键字, 分别为 `show` / `hide` / `toggle` , 用法和显示 / 隐藏动画相同

```js
jQueryObj.animate({
  width: "toggle"
}, 1000);
```



### 全局动画设置



#### 开启 / 关闭

格式

- `true` 代表关闭页面上所有动画, 所有动画效果会立即执行完毕
- `false` 代表开启所有动画效果 ( 默认 )

```js
jQuery.fx.off = true; // 关闭所有动画, 所有效果会立即执行完毕
jQuery.fx.off = false; // 开启所有动画
```



#### 动画帧数

格式

- 每一帧动画间隔的时间, 单位为 `ms`
- 数值越大动画越卡, 数值越小动画越流畅

```js
jQuery.fx.interval = 13;
```

---

## 节点



### 添加节点

#### 内部插入

定义

- 将节点添加到指定元素的子节点中

添加到子节点的最后

```js
parent.append(child)
child.appendTo(parent)
```

添加到子节点的最前

```js
parent.prepend(child)
child.prependTo(parent)
```



#### 外部插入

定义

- 将节点添加到指定元素的之前或之后, 作为兄弟节点

添加到指定元素之后

```js
node.after(newNode)
newNode.insertAfter(node)
```

添加到指定元素之前

```js
node.before(newNode)
newNode.insertBefore(node)
```



### 删除节点



- 删除指定节点

```js
node.remove()
```

- 删除指定节点内的所有子节点 ( 文本 + 子元素 )

```js
node.empty()
```

- 删除指定节点, 但保留其相关的 `jQuery` 数据, 多用于会重新添加的节点

```js
node.detach()
```



### 替换节点

- 替换指定节点为另一指定节点

```js
node.replaceWith(newNode)
newNode.replaceAll(node)
```



### 复制节点

#### 浅复制

- 只复制元素, 不包括其事件

```js
node.clone(false)
```

#### 深复制

- 复制元素, 包括其事件

```js
node.clone(true)
```





### 注意点

- 所有操作的节点或元素均为 `jQuery对象`
- 如果 `jQuery对象` 中有多个 `DOM` 元素, 那么都会被遍历并执行相应CRUD方法
