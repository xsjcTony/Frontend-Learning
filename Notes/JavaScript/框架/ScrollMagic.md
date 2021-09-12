# ScrollMagic



> [OFFICIAL SITE - ScrollMagic ♥ Demo](https://scrollmagic.io/)
>
> [GITHUB - janpaepke/ScrollMagic: The javascript library for magical scroll interactions.](https://github.com/janpaepke/ScrollMagic)



## 定义

- 滚动特效插件
- 让动画和滚动条的动作同步
- 为网站添加视差效果

---

## 特点

- 优化性能
- 轻量级
- 灵活可扩展
- 兼容移动设备
- 强大的事件管理
- 支持响应式网页设计
- 面向对象
- 链式编程
- 代码可读性强
- 支持两个方向的滚动
- 支持在 `div` 容器中滚动
- 完善的调试和日志记录功能

---

## 基本使用

- 引入相关 `js` 文件

```html
<script src="path/to/ScrollMagic.js"></script>
```

- 创建一个控制器对象

```js
const controller = new ScrollMagic.Controller()
```

- 创建一个场景对象

```js
const scene = new ScrollMagic.Scene()
```

- 将场景添加到控制器中

```js
controller.addScene(scene)
```

---

## 场景对象 (Scene)



> [ScrollMagic Class: Scene](https://scrollmagic.io/docs/ScrollMagic.Scene.html)



### 配置

- 新建场景对象的时候可以传入一个参数, 是一个对象, 包含了各项配置
    - `offset` : 从什么位置开始当前的场景, 在 `trigger` 系列之后计算
    - `duration` : 当前场景的有效范围
        - `100%` 代表视口高度
    - `triggerElement` : 当前场景从哪一个元素开始, 通过选择器找到
    - `triggerHook` : 当前场景从指定元素相对于视口的什么位置开始
        - `onEnter` : 从下方开始进入视口
        - `onCenter` : 到达视口垂直居中的位置
        - `onLeave` : 从上方开始离开视口
    - `reserve` : 决定向上滚动时是否要反向执行
        - `true` : (默认) 执行
        - `false` : 不执行



### 方法

- `setPin()` : 设置需要固定的元素, 接收两个参数
    - 需要固定的元素, 通过选择器找到
    - 配置对象 (Optional), 包含
        - `pushFollowers` : 是否要将该元素之后的元素往后推, `true` 为往后推, `false` 为不往后推

---

## 结合 `GSAP` 使用

定义

- 适合动画和滚动条同步的时候使用

文件引入

- 引入 `GSAP` 相关文件

```html
<script src="path/to/TweenMax.js"></script>
```

- 引入桥接文件

```html
<script src="animation.gsap.js"></script>
```

使用

- 给场景通过 `setTween()` 添加动画
- 可以接收 `TweenMax` 对象也可以直接传入 `(元素选择器, 时长, 动画属性和值)`

```js
/*
const tweenMax = TweenMax.to('.animate', 3, {
  width: 200,
  height: 200
})

scene.setTween(tweenMax)
*/

scene.setTween('.animate', 3, {
  width: 200,
  height: 200
})
```

---

## 结合 `Velocity` 使用

版本

- 只支持 `v1.x` , `v2.x` 无法使用

定义

- 适合动画和滚动条不同步的时候使用

文件引入

- 引入 `Velocity` 相关文件

```html
<script src="path/to/velocity.js"></script>
```

- 引入桥接文件

```html
<script src="animation.velocity.js"></script>
```

使用

- <span style="color: yellow;">场景不能包括 `duration`</span>

- 给场景通过 `setVelocity()` 添加动画
- 传入 `(元素选择器, 动画属性和值, 动画配置)`

```js
scene.setVelocity('.animate', {
  width: '200px',
  height: '200px'
}, {
  duration: 3000
})
```

---

## 事件

事件格式

```js
scene.on('xxx', function (event) {})
```

事件

- `start` : 滚动至进入场景的位置时触发
- `end` : 滚动至离开场景的位置时触发
- `progress` : 在场景中滚动时会不断触发