# ScrollReveal



> [ScrollReveal - OFFICIAL SITE](https://scrollrevealjs.org/)
>
> [jlmakes/scrollreveal: Animate elements as they scroll into view. - GITHUB](https://github.com/jlmakes/scrollreveal)



## 定义

- 滚动动画库
- 兼容PC和移动设备
- 动画可以播放一次或无限次
- 无依赖
- 定制性高, 方便快捷



## 基本使用

- 引入 `scrollreveal.js`

```html
<script src="path/to/scrollreveal.js"></script>
```

- 初始化 `ScrollReveal`
- 调用 `reveal()` 方法, 传入要执行动画的元素的 `selector`

```js
const scrollReveal = ScrollReveal()
scrollReveal.reveal('div')
```



## 高级使用



### 配置

- 在初始化时, 可以传入对象, 主要用到的有以下属性

| 属性 (Attribute) | 类型 (Type)     | 默认值 (Default)             | 描述 (Description)                                           |
| ---------------- | --------------- | ---------------------------- | ------------------------------------------------------------ |
| reset            | boolean         | false                        | 在容器边界内来回滚动时都产生动画效果                         |
| duration         | number          | 600                          | 动画持续时间, 单位为 `ms`                                    |
| delay            | number          | 0                            | 动画延迟时间, 单位为 `ms`                                    |
| rotate           | object / number | { x: 0, y: 0, z: 0 }         | 动画开始的角度, 单位为 `deg`                                 |
| opacity          | number          | 0                            | 动画开始的透明度                                             |
| scale            | number          | 1                            | 动画开始的缩放值                                             |
| distance         | string          | '0px'                        | 动画开始的位置, 任何 `css` 单位值都可以                      |
| origin           | string          | 'bottom'                     | 动画的方向, 可选 `'top'` / `'right'` / `'bottom'` / `'left'` |
| easing           | string          | 'cubic-bezier(0.5, 0, 0, 1)' | 动画是否缓动, 可选 `'ease'` / `'ease-out'` / `'ease-in-out'` / 任何有效的 `css` `easing` 值 |



### 回调函数

- 在符合条件时被调用的回调函数

| 事件名称 (Event Name) | 参数 (arguments)   | 描述 (Description)   |
| --------------------- | ------------------ | -------------------- |
| beforeReveal          | 正在执行动画的元素 | 动画开始之前         |
| afterReveal           | 正在执行动画的元素 | 动画结束之后         |
| beforeReset           | 正在执行动画的元素 | 元素重置动画开始之前 |
| afterReset            | 正在执行动画的元素 | 元素充值动画结束之后 |

