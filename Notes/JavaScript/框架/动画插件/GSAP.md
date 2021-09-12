# GSAP (GreenSock Animation Platform) (v2.x)



> [OFFICIAL SITE: GSAP - GreenSock](https://greensock.com/gsap/)
>
> [GITHUB - greensock/GSAP: GreenSock's GSAP JavaScript animation library (including Draggable).](https://github.com/greensock/GSAP)
>
> [TweenMax中文网（GreenSock动画平台,GSAP)](https://www.tweenmax.com.cn/)



## 定义

- 一个从 `flash` 时代一直发展到今天的专业动画库
- 通过 `JavaScript` 实现动画
- 该笔记针对 `v2.x` 版本

---

## 优势

- 速度快
- 轻量
- 模块化
- 无依赖
- 灵活控制

---

## 版本

| 版本         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| TweenLite    | 核心部分, 可以实现大部分的动画效果                           |
| TimelineLite | 序列工具, 可以执行由多个动画组成的一个完整动画               |
| TimelineMax  | TimelineLite的扩展, 非轻量级的全能工具                       |
| TweenMax     | 最全最完整的库, <span style="color: yellow;">企业开发中推荐使用</span> |

---

## 基本使用

- 引入 `TweenMax.js` 文件

```html
<script src="path/to/TweenMax.js"></script>
```

---

## 单元素动画



### 创建TweenMax对象

- 接收三个参数
    - 需要执行动画的元素 (选择器)
    - 动画执行的时长, 单位为 `s`
    - 具体执行动画的属性和值 & 动画配置, 是一个对象

```js
new TweenMax('.box', 3, { x: 500 })
```



### 静态方法

`to()`

- 从当前位置到指定位置, 接收三个参数
    - 需要执行动画的元素 (选择器)
    - 动画执行的时长, 单位为 `s`
    - 具体执行动画的属性和值 & 动画配置, 是一个对象

```js
TweenMax.to('.box', 3, { x: 500 }) // 同 new TweenMax(), 从当前位置到指定位置
```

`from()`

- 从指定位置到当前位置, 接收三个参数
    - 需要执行动画的元素 (选择器)
    - 动画执行的时长, 单位为 `s`
    - 具体执行动画的属性和值 & 动画配置, 是一个对象

```js
TweenMax.from('.box', 3, { x: 500 }) // 从指定位置到当前位置
```

`fromTo()`

- 从第一个指定的位置到第二个指定的位置, 接收四个参数
    - 需要执行动画的元素 (选择器)
    - 动画执行的时长, 单位为 `s`
    - 初始位置的属性和值, 是一个对象
    - 结束位置的属性和值 & 动画配置, 是一个对象

```js
TweenMax.fromTo('.box', 3, { x: 500 }, { x: 200 }) // 从第一个指定的位置到第二个指定的位置
```

---

## 多元素动画



`staggerTo()`

- 从当前位置到指定位置, 接收三 / 四个参数, `staggerFrom()` 和 `staggerFromTo()` 效果同上
    - 需要执行动画的元素, 是一个数组 , 包含选择器
    - 动画执行的时长, 单位为 `s`
    - 具体执行动画的属性和值 & 动画配置, 是一个对象
    - 执行动画的间隔, 单位为 `s`

```js
TweenMax.staggerTo(['.box1', '.box2', '.box3'], 3, { x: 500 }, 3) // 从当前位置到指定位置
TweenMax.staggerFrom(['.box1', '.box2', '.box3'], 3, { x: 500 }, 3) // 从指定位置到当前位置
TweenMax.staggerFromTo(['.box1', '.box2', '.box3'], 3, { x: 500 }, { x: 200 }, 3) // 从第一个指定的位置到第二个指定的位置
```

---

## 动画配置 (常用)

- `delay` : 动画开始之前的延迟, 单位为 `s`
- `startAt` : 动画开始执行的位置, 是一个对象
- `css` : 动画结束的位置, 是一个对象
- `repeat` : 动画重复执行的次数
- `yoyo` : 动画重复执行是否往返, 无限执行则设置为 `-1`
- `repeatDelay` : 动画重复执行的延迟, 单位为 `s`
- `ease` : 执行动画的节奏
- `yoyoEase` : 往返动画执行的节奏

```js
new TweenMax('.box', 3, {
  delay: 2,
  startAt: {
    x: 100
  },
  css: {
    x: 500
  },
  repeat: 2,
  yoyo: true,
  repeatDelay: 3,
  ease: Bounce.easeOut,
  yoyoEase: Bounce.easeOut,
})
```

---

## 循环动画

- 配合 `stagger` 系列使用
- 动画配置中添加 `cycle`
- 是一个对象, `key` 为属性, `value` 为一个数组包含了需要循环的值

```js
const divs = document.querySelectorAll('.box')
TweenMax.staggerTo(divs, 3, {
  cycle: {
    height: [100, 150, 200],
    backgroundColor: ['#f00', '#0f0', '#00f']
  }
}, 3)
```

---

## 动画事件

定义

- 添加在动画配置中, 根据动画执行阶段执行事件

事件格式

- `on***` : 动画开始时执行
- `on***Params` : 传给 `on***` 中方法的参数
- `on***Scope` : 修改 `on***` 中方法的 `this`

示例

```js
const obj = { name: 'Tony' }
TweenMax.to('.box', 3, {
  x: 500,
  delay: 3,
  onStart: function (a, b, c) {
    console.log('动画开始了', a, b, c)
    console.log(this) // {name: "Tony"}
  },
  onStartParams: ['123', '456', '789'],
  onStartScope: obj
})
```

---

## 动画方法 (常用)

- `play()` : 执行动画
- `pause()` : 暂停动画
- `paused()` : 接收一个参数, 返回一个 `boolean` 
    - `true` : 执行动画
    - `false` : 暂停动画
    - 返回值: 正在执行为 `true` , 反之为 `false`

```js
tweenMax.paused(!tweenMax.paused()) // 切换 play / pause
```

- `restart()` : 重新开始动画

---

## 动画序列

- 创建 `TimelineMax` 对象

```js
const timelineMax = new TimelineMax()
```

- 通过 `add()` 方法添加动画, 动画默认会按顺序执行

```js
timelineMax.add(
  TweenMax.to('.box1', 3, { x: 500 })
)
timelineMax.add(
  TweenMax.to('.box2', 3, { x: 400 })
)
timelineMax.add(
  TweenMax.to('.box3', 3, { x: 300 })
)
```





