# Zepto



> [Zepto.js: the aerogel-weight jQuery-compatible JavaScript library](https://zeptojs.com/)
>
> [Zepto.js: 轻量且兼容 jQuery API 的 JavaScript 工具库 | Zepto.js 中文网](https://zeptojs.bootcss.com/)



## 定义

- 一个轻量级的针对现代高级浏览器的 `JavaScript` 库
- 约等于专门用于移动端的轻量级 `jQuery`

---

## 使用方法



### 引入文件

1. 下载 `Zepto` 库

2. 引入 `Zepto` 库

```html
<script src="js/zepto.js"></script>
```



### 使用 `CDN`

- > [zepto - Libraries - cdnjs](https://cdnjs.com/libraries/zepto)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.js" integrity="sha512-wq5c217NlwsLqaLisr94LAkhrGiTqBSmJDwHyA3nmoBEbswI7nFZ5TtuDiRsLgq1bOaZKmqaWs8M213ESYAe6g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

---

## 模块化开发

- `Zepto` 的开发采用了模块化的方式, 不同的功能被放入了不同的模块中
- 在使用的过程中需要按需导入模块
- `cdn` 或官网下载的 `zepto.js` 中默认包含在列表的 `default` 中打钩的模块, 在 `github` 下载的则不包含, 全部需要手动导入



### 列表

| module                                                       | default | description                                                  |
| ------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| [zepto](https://github.com/madrobby/zepto/blob/master/src/zepto.js#files) | ✔       | Core module; contains most methods                           |
| [event](https://github.com/madrobby/zepto/blob/master/src/event.js#files) | ✔       | Event handling via `on()` & `off()`                          |
| [ajax](https://github.com/madrobby/zepto/blob/master/src/ajax.js#files) | ✔       | XMLHttpRequest and JSONP functionality                       |
| [form](https://github.com/madrobby/zepto/blob/master/src/form.js#files) | ✔       | Serialize & submit web forms                                 |
| [ie](https://github.com/madrobby/zepto/blob/master/src/ie.js#files) | ✔       | Add support for Internet Explorer 10+ on desktop and Windows Phone 8. |
| [detect](https://github.com/madrobby/zepto/blob/master/src/detect.js#files) |         | Provides `$.os` and `$.browser` information                  |
| [fx](https://github.com/madrobby/zepto/blob/master/src/fx.js#files) |         | The `animate()` method                                       |
| [fx_methods](https://github.com/madrobby/zepto/blob/master/src/fx_methods.js#files) |         | Animated `show`, `hide`, `toggle`, and `fade*()` methods.    |
| [assets](https://github.com/madrobby/zepto/blob/master/src/assets.js#files) |         | Experimental support for cleaning up iOS memory after removing image elements from the DOM. |
| [data](https://github.com/madrobby/zepto/blob/master/src/data.js#files) |         | A full-blown `data()` method, capable of storing arbitrary objects in memory. |
| [deferred](https://github.com/madrobby/zepto/blob/master/src/deferred.js#files) |         | Provides `$.Deferred` promises API. Depends on the "callbacks" module. When included, [`$.ajax()`](https://zeptojs.com/#$.ajax) supports a promise interface for chaining callbacks. |
| [callbacks](https://github.com/madrobby/zepto/blob/master/src/callbacks.js#files) |         | Provides `$.Callbacks` for use in "deferred" module.         |
| [selector](https://github.com/madrobby/zepto/blob/master/src/selector.js#files) |         | Experimental [jQuery CSS extensions](http://api.jquery.com/category/selectors/jquery-selector-extensions/) support for functionality such as `$('div:first')` and `el.is(':visible')`. |
| [touch](https://github.com/madrobby/zepto/blob/master/src/touch.js#files) |         | Fires tap– and swipe–related events on touch devices. This works with both `touch` (iOS, Android) and `pointer` events (Windows Phone). |
| [gesture](https://github.com/madrobby/zepto/blob/master/src/gesture.js#files) |         | Fires pinch gesture events on touch devices                  |
| [stack](https://github.com/madrobby/zepto/blob/master/src/stack.js#files) |         | Provides `andSelf` & `end()` chaining methods                |
| [ios3](https://github.com/madrobby/zepto/blob/master/src/ios3.js#files) |         | String.prototype.trim and Array.prototype.reduce methods (if they are missing) for compatibility with iOS 3.x. |



### 选择器

- 若想使用 `jQuery` 中定义的一些非 `css` 自带的选择器, 则需要引入 `selector` 模块
- 其他基本的 `css` 自带的选择器则不需要引入



### 动画

- 要使用 `animate()` 动画方法, 则需要导入 `fx` 模块
- 由于不需要兼容低级浏览器, `Zepto` 直接使用了 `css3` 的 `transition` 属性来完成动画
- 若需要使用 `show` / `hide` / `toggle` / `fade*()` 方法的动画形式, 则需要导入 `fx_method` 模块
- `Zepto` 没有 `stop()` , 所以如果想要使用需要自行添加

---

## 事件



### tap

定义

- `Zepto` 特有的事件
- 移动端的 `click` 事件, 解决了原生 `click` 事件100~300ms的延迟问题
- 移动端也支持 `click` 事件, 但是由于移动端事件很多 (单击 / 双击 / 轻扫 / 捏合 / 拖拽等等), 如果使用 `click` , 系统要花费100~300ms的事件来判断到底是什么事件, 移动端响应速度要求很高, 所以监听点击事件, 需要使用 `tap` , 而不用 `click`
- PC端无效, 移动端专用
- 原理是原生JavaScript移动端的 `touch` 事件, 详见 `DOM事件` Notes

使用

- 首先需要导入 `touch` 模块才能使用

```js
$('div').tap(function () {
  console.log('clicked')
})
```

原理

- 基于原生 `touch` 事件优化

- 只有一根手指
- 按下和离开的事件不能太久, 约为 `100ms`
- 按下和离开距离不能太远, 约为 `5px`

封装

```js
(function (window) {
  function Tap(dom, fn) {
    // return if dom is not a DOM Element
    if (!dom instanceof HTMLElement) {
      throw new Error(`${dom} is not a DOM Element.`)
    }

    let startX = 0
    let startY = 0
    let startTime = 0

    dom.ontouchstart = function (event) {
      // return if more than one finger is pressed
      if (event.targetTouches.length > 1) {
        return
      }
      // get finger position
      startX = event.targetTouches[0].clientX
      startY = event.targetTouches[0].clientY
      // set time on press down
      startTime = Date.now()
    }
    dom.ontouchend = function (event) {
      // return if more than one finger raised up
      if (event.changedTouches.length > 1) {
        return
      }
      // return if finger moved more than 5px
      let endX = event.changedTouches[0].clientX
      let endY = event.changedTouches[0].clientY
      if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY)) {
        return
      }
      // return if time during finger on screen is more than 50ms
      if ((Date.now() - startTime) > 100) {
        return
      }
      fn && fn();
    }
  }

  window.Tap = Tap
})(window)
```



### swipe

定义

- 手指快速的往上 / 下 / 左 / 右滑动

使用

- 首先需要导入 `touch` 模块才能使用

```js
// 任意方向
$('div').swipe(function () {
  console.log('swiped')
})
$('div').swipeLeft(function () {
  console.log('swiped left')
})
$('div').swipeRight(function () {
  console.log('swiped right')
})
$('div').swipeUp(function () {
  console.log('swiped up')
})
$('div').swipeDown(function () {
  console.log('swiped down')
})
```

---

## 扩展方法

- 和 `jQuery` 一样使用 `extend` 来添加方法, 格式如下

```js
;(function ($) {
  $.extend($.fn, {
    foo: function () {
      // do something
    }
  })
})(Zepto)
```



