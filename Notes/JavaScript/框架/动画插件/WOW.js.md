# WOW.js



> [wow.js — Reveal Animations When Scrolling - OFFICIAL SITE](https://wowjs.uk/)
>
> [graingert/WOW: Reveal CSS animation as you scroll down a page - GITHUB](https://github.com/graingert/wow)



## 定义

- `Animate.css` 的插件
- 可以在页面滚动的过程中逐渐释放动画效果
- `WOW.js` + `Animate.css` 约等于 `Swiper` + `Swiper.animate`
- `Swiper` 更强大, 企业开发中的使用更多



## 基本使用

- 引入 `Animate.css`
- 引入 `wow.js`

```html
<link rel="stylesheet" href="path/to/animate.css">
<script src="path/to/wow.js"></script>
```

- 添加类名 `wow` (基类, 任何通过 `wow.js` 添加动画的元素都需要添加) 和 `动画名称`

```html
<div class="wow animate__slideInLeft"></div>
```

- 初始化 `WOW` , 传递对象, 包含 `animateClass: 'animate__animated`

```js
const wow = new WOW({
  animateClass: 'animate__animated'
})
wow.init()
```



## 高级使用



### 动画的时长 / 延迟 / 执行次数

- `data-wow-duration="1s"` : 动画时长1秒
- `data-wow-delay="1s"` : 动画延迟1秒
- `data-wow-iteration="5"` : 动画重复执行5次

```html
<div class="wow animate__slideInLeft" data-wow-duration="3s" data-wow-delay="1s" data-wow-iteration="2"></div>
```



### 动画开始执行的位置

- 通过类名 `data-wow-offset` 来设置页面滚动到哪儿之后再执行动画
- 数值为元素顶部距离可视区域底部的位置

![](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\data-wow-offset.png)

- 计算方式为 `整个window的高度` + `滚动出去的高度` - `元素的offsetTop`

```js
// data-wow-offset calculation
let div = document.querySelector('.test')
let windowHeight = window.innerHeight
let divOffsetTop = div.offsetTop
window.onscroll = function () {
  let offsetTop = document.documentElement.scrollTop
  let result = windowHeight + offsetTop - divOffsetTop
  console.log(result)
}
```

更改 `data-wow-offset` 的参照物

- 在初始化 `WOW` 时, 传递对象, 包含 `scrollContainer: 'selector'`

```js
const wow = new WOW({
  animateClass: 'animate__animated',
  scrollContainer: '.box'
})
wow.init()
```



### 各项配置

初始化 `WOW` 时, 传入的对象中可以包含的属性

- `boxClass` : 基类的名称 (默认为 `wow` )
- `animateClass` : 动画库的类名 (默认为 `animated` ), `Animate.css` v4.1+ 使用 `animate__animated`
- `offset` : 在全局统一设置 `data-wow-offset`
- `mobile` : 是否在移动端执行动画
- `live` : 是否异步加载内容
- `scrollContainer` : `data-wow-offset` 的参照物, 可以传入一个 `CSSselector`
- `callback` : 只要有元素执行动画就会调用的回调函数, 并且传入正在执行动画的元素



## 注意点

- `WOW.js` 添加动画只会执行一次

