# Velocity



> [OFFICIAL SITE - Velocity.js](http://velocityjs.org/)
>
> [GITHUB - julianshapiro/velocity: Accelerated JavaScript animation.](https://github.com/julianshapiro/velocity)
>
> [Velocity.js 中文文档](http://shouce.jb51.net/velocity/index.html)



## 定义

- 轻量级的基于 `JavaScript` 的动画库
- 简单易用
- 性能高
- 功能丰富
- 能和 `jQuery` / `Zepto` 完美协作
- 有和 `$.animate()` 相同的 `API` 
- 无依赖

---

## 基本使用



### 单独使用

- 引入相关 `js` 文件

```html
<script src="path/to/velocity.js"></script>
```

- 调用构造函数, 接收三个参数
    - 需要执行动画的元素, 是一个元素
    - 需要执行动画的属性和值, 是一个对象, <span style="color: yellow;">`0` 要添加单位</span>
    - 动画参数, 是一个对象

```js
const div = document.querySelector('.box')

Velocity(div, {
  height: '300px'
}, {
  duration: 3000
})
```



### 配合 `jQuery` / `Zepto` 的使用

- 引入相关 `js` 文件 (先导入 `jQuery` )

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/velocity.js"></script>
```

- 调用 `velocity()` 方法

```js
$('.box').velocity({
  height: '300px'
}, {
  duration: 3000
})
```

---

## 动画配置

- `duration` : 动画时长, 单位为 `ms`
- `delay` : 延迟执行的时长, 单位为 `ms`
- `loop` : 动画循环次数 (初始位置 -> 指定位置 -> 初始位置 算做一次, 每个动画都会应用delay)
- `easing` : 动画节奏
- `display` : 动画结束之后的 `display` 模式
- `visibility` : 动画结束之后的 `visibility` 模式
- `queue` : 动画队列 (默认不执行, 可以通过 `dequeue()` 方法执行)

```js
$('.box').velocity({
  marginLeft: '500px'
}, {
  duration: 3000,
  delay: 2000,
  loop: 2,
  easing: 'easeInOutQuint',
  // display: 'none',
  visibility: 'hidden',
  queue: 'a'
}).velocity({
  marginTop: '500px'
}, {
  duration: 3000,
  queue: 'b'
})

$('.box').dequeue('a')
setTimeout(function () {
  $('.box').dequeue('b')
}, 3000)
```

---

## 事件

- `begin` / `complete` : 开始 / 结束时触发
    - 参数 / `this` 为当前正在执行动画的元素

```js
$('.box').velocity({
  marginLeft: '500px'
}, {
  duration: 3000,
  begin: function (element) {
    console.log('begin', element)
  },
  complete: function (element) {
    console.log('complete', element)
  },
})
```

- `progress` : 执行过程中触发
    - 参数包括
        - `elements` : 正在执行动画的元素
        - `complete` : 动画执行到百分之 `*` , 为 `0~1` 的小数, 不带单位
        - `remaining` : 动画过程还剩多少时间, 单位为 `ms`
        - `start` : 动画开始的绝对时间, 为 `Unix time`
        - `tweenValue` : 动画执行过程中, 两个属性之间的补间值

---



