# Swiper



> [Swiper - The Most Modern Mobile Touch Slider](https://swiperjs.com/)
>
> [Swiper中文网-轮播图幻灯片js插件,H5页面前端开发](https://www.swiper.com.cn/)



## 定义

- 滑动特效插件
- 支持PC, 平板电脑, 手机等移动终端
- 纯 `JavaScript` 打造, 无依赖

---

## 基本使用

- 引入 `Swiper` 相关 `js` 和 `css` 文件

```html
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css">
<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
```

- 搭建结构 (只要是三层结构即可)

```html
<!-- Slider main container -->
<div class="swiper-container">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

- 创建 `Swiper对象`

```js
const swiper = new Swiper('.swiper-container')
```

---

## 高级使用



### 分页器 (pagination)

添加分页器

- 添加类名为 `swiper-pagination` 的元素

```html
<div class="swiper-pagination"></div>
```

- 初始化 `Swiper对象` 时传入一个对象, 包含 `pagination: { el: '.swiper-pagination' }`

```js
const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination'
  }
})
```

自定义分页器样式

- 在对象中指定样式对应的类名, 然后在 `css` 中编写修改 `bulletClass: 'className'`

```js
const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    bulletClass: 'my-bullet',
    bulletActiveClass: 'my-bullet-active'
  }
})
```





### 导航按钮

添加导航按钮

- 添加类名为 `swiper-button-prev` 和 `swiper-button-next` 的元素

```html
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
```

- 初始化 `Swiper对象` 时传入一个对象, 包含 `navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }`

```js
const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
```

自定义分页器样式

- 在 `css` 中修改 `.swiper-button-prev` 和 `.swiper-button-next` 的样式



### 无限循环轮播

- 初始化 `Swiper对象` 时传入一个对象, 包含 `loop: true`

```js
const swiper = new Swiper('.swiper-container', {
  loop: true
})
```



### 自动轮播

- 初始化 `Swiper对象` 时传入一个对象, 包含 `autoplay: true`

```js
const swiper = new Swiper('.swiper-container', {
  autoplay: true
})
```

自定义切换时间

- 将 `true` 换成对象, 包含 `delay: number` , 单位为 `ms`

```js
const swiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 1000 // 1 second
  }
})
```



### 切换动画时间

- 初始化 `Swiper对象` 时传入一个对象, 包含 `speed: time` , 单位为 `ms`

```js
const swiper = new Swiper('.swiper-container', {
  speed: 500 // 0.5 second
})
```

---

## Animate

> [Swiper使用方法 > swiperAnimate 使用方法](https://www.swiper.com.cn/usage/animate/index.html)

定义

- 非官方文件
- 由Swiper中文网开发
- 可以做各种动画
- 包含 `css` 和 `js` 两个文件

基本使用

- 在需要运动的元素上面增加类名 `ani` , 并指定如下参数
    - `swiper-animate-effect` ：切换效果
    - `swiper-animate-duration` ：(Optional) 动画持续时间, 单位为 `s`
    - `swiper-animate-delay` ：(Optional) 动画延迟时间, 单位为 `s`

```html
<div class="swiper-slide">
		<p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">content</p>
</div>
```

- 初始化时隐藏元素并在需要的时刻开始动画

```js
const mySwiper = new Swiper('.swiper-container', {
  on: {
    init: function () {
      swiperAnimateCache(this) // 隐藏动画元素 
      swiperAnimate(this) // 初始化完成开始动画
    }, 
    slideChangeTransitionEnd: function () { 
      swiperAnimate(this) // 每个slide切换结束时也运行当前slide动画
    } 
  }
}) 
```

---

## 其他



### swiper内容实时改变

- 只要swiper的内容会被改变 (从服务器获取等), 则需要加上如下

```js
const swiper = new Swiper('.swiper-container', {
  observer: true,
  observeParents: true,
  observeSlideChildren: true
})
```



### 修复动态添加内容后 `loop` 失效

```js
mySwiper.loopCreate()
mySwiper.slideToLoop(0)
```



### swiper被隐藏 (display: none) 无法触发事件

- 可以通过其他方式, 比如定位偏移出屏幕的方式来隐藏, 避免 `swiper` 元素使用 `display: none`
