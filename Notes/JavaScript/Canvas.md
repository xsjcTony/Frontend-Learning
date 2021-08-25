# Canvas



> [Canvas API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
>
> [canvas API中文网 - Canvas API中文文档首页地图](https://www.canvasapi.cn/)



## 定义

- 一个 `HTML` 标签
- `HTML5` 新增
- 可以通过 `JavaScript` 在 `canvas` 标签上绘制各种图案

---

## 基本概念

- 创建 `canvas` 标签

```html
<canvas></canvas>
```

- `canvas` 标签有默认的宽度和高度
    - 宽度为 `300px`
    - 高度为 `150px`

- 获取绘图工具

```js
let canvas = document.querySelector('canavs')
let ctx = canvas.getContext('2d')
```

---

## 画布宽高



### 修改

- `canvas` 标签不能通过 `css` 修改宽高, 因为画布中的内容会被同比拉伸
- 通过 `行内样式` 修改宽高

```html
<canvas width="500" height="500"></canvas>
```



### 获取

- 通过绘图工具获取

```js
let canvas = document.querySelector('canavs')
let ctx = canvas.getContext('2d')
console.log(ctx.canvas.width) // 宽度
console.log(ctx.canvas.height) // 高度
```

---

## 绘制线条 (Draw Line)



### 绘制

- 设置路径起点

```js
ctx.moveTo(x, y)
```

- 设置路径终点
    - 可以设置多个, 会挨个连接

```js
ctx.lineTo(x, y)
```

- 连接起点和终点
    - 默认情况下只会从起点连接到终点, 不会连接终点到起点 (多个点的情况下)

```js
ctx.stroke()
```



### 直线默认的高度和颜色

- `canvas` 内默认的直线高度为 `1px` , 但实际显示是 `2px` , 因为系统会将线条垂直居中的位置和 `canvas` 中两个像素居中的位置对齐, 然后因为两个像素各占了一半, 所以会自动补齐
- `canvas` 内默认的直线颜色为 `黑色` , 但实际不是黑色, 因为系统会将线条垂直居中的位置和 `canvas` 中两个像素居中的位置对齐, 然后因为两个像素各占了一半, 所以会自动补齐, 补齐的部分是没有颜色的, 所以会和 `黑色` 混合, 最终颜色没有那么黑

Before:

![canvas_line_1](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_line_1.png)

After:

![canvas_line_2](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_line_2.png)

解决方案

- 将作为高的轴加或减0.5, 这样就会与像素对齐, 不会发生上述现象

```js
ctx.moveTo(50, 50.5)
ctx.lineTo(200, 50.5)
ctx.stroke()
```



### 相关属性

注意点

- 以下所有必须写在 `stroke()` 之前

属性

- 线条宽度

```js
ctx.lineWidth = 50
```

- 线条颜色

```js
// css颜色属性均可
ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)'
ctx.strokeStyle = 'blue'
```

- 线条两头样式

```js
// 只有这三种可选
ctx.lineCap = 'butt' // 默认, 无样式
ctx.lineCap = 'square' // 在两头加上方形 (线条边长)
ctx.lineCap = 'round' // 在两头加上半圆 (圆角包裹)
```



### 绘制虚线

- 设置虚线
    - `setLineDash()` 接收一个数组
    - 数组可以接收0~无限个 `number`
    - 虚线会按照数组内的长度按 实 虚 排序, 直到开始重复之前的规律
    - 无限复制每一段不重复的直到线条结束

```js
ctx.setLineDash([5, 10, 15])
```

- 获取不重复的长度
    - 返回一个数组
    - 比如 `setLineDash([5, 10, 15])` 的 `getLineDash()` 就会返回 `[5, 10, 15, 5, 10, 15]`

```js
ctx.getLineDash()
```



### 绘制多根线条

方法

1. 在开始绘制一条新的线条之前, 开启一个新的路径

```js
ctx.beginPath()
```

2. 重新设置样式, 不设置会复用上一根线条的样式

3. 调用 `stroke()` 绘制

示例

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

ctx.moveTo(50, 50)
ctx.lineTo(200, 50)
ctx.lineWidth = 20
ctx.strokeStyle = 'blue'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(50, 100)
ctx.lineTo(200, 100)
ctx.lineWidth = 10
ctx.strokeStyle = 'red'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(50, 150)
ctx.lineTo(200, 150)
ctx.lineWidth = 10
ctx.strokeStyle = 'green'
ctx.stroke()
```

注意点

- 如果样式重复, 那么可以不用开启新路径

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

ctx.moveTo(50, 50)
ctx.lineTo(200, 50)

ctx.moveTo(50, 100)
ctx.lineTo(200, 100)
ctx.lineWidth = 10
ctx.strokeStyle = 'red'
ctx.stroke()
```

---

## 绘制图形 (Draw Graph)



### 绘制

1. 使用 `moveTo()` 确定起点
2. 使用 `lineTo()` 设定其他点直到最后一个点 (终点)
3. 如果需要闭合图形 (从终点连接到起点) 则调用 `closePath()`
4. 调用 `stroke()`

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(200, 50)
ctx.lineTo(200, 200)
ctx.closePath()
ctx.stroke()
```



### 相关属性

注意点

- 以下所有必须写在 `stroke()` 之前
- 线条样式都可用

属性

- 相交线的拐点样式

```js
// 只有这三种可选
ctx.lineJoin = 'miter' // 默认, 指教
ctx.lineJoin = 'bevel' // 切片 (把直角的尖尖切掉)
ctx.lineJoin = 'round' // 圆角
```

---

## 填充图形 (Fill Graph)



### 填充

- 使用 `fill()`

```js
ctx.fill()
```



### 相关样式

注意点

- 以下所有必须写在 `fill()` 之前

属性

- 填充颜色

```js
// css颜色属性均可
ctx.fillStyle = 'rgba(255, 0, 255, 0.5)'
ctx.fillStyle = 'blue'
```



### 线性渐变 (Linear Gradient)

1. 创建一个 `linearGradient` 对象, 接收4个参数
    - `x0` : 起点的 `x轴` 坐标
    - `y0` : 起点的 `y轴` 坐标
    - `x1` : 终点的 `x轴` 坐标
    - `y1` : 终点的 `y轴` 坐标

```js
let linearGradient = ctx.createLinearGradient(100, 100, 300, 300) // (100, 100) 到 (300, 300), 左上角至右下角渐变
```

2. 调用对象的 `addColorStop()` 方法, 设置渐变颜色, 可以设置多个变色点, 接收2个参数
    - `offset` : 一个 `0` 至 `1` (包括) 的数字, 代表创建对象时的直线的 `0%` 至 `100%` 的位置
    - `color` : 该位置的颜色, 任何 `css` 的 `<color>` 值都可以使用

```js
linearGradient.addColorStop(0, 'green')
linearGradient.addColorStop(0.5, 'red')
linearGradient.addColorStop(1, 'blue')
```

3. 赋值给 `fillStyle`

```js
ctx.fillStyle = linearGradient
```



### 非零环绕规则

- 同一个路径画出来的图形中, 若有图形环绕, 则填充采用非零环绕规则
- 从一个填充区域内往外画线
    - 每经过一个顺时针画的图形则 `+1`
    - 每经过一个逆时针画的图形则 `-1`
- 最后结果若为 `0` , 则不填充, 其他任何数字都填充

![canvas_fill_rule_1](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_fill_rule_1.png)

![canavs_fill_rule_2](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_fill_rule_2.png)

---

## 矩形 (Rectangle)

- 除开使用绘制线条 / 图形的方法外, `矩形` 有自己的 `API`



### 绘制矩形

方法一

- `rect()` 方法接收四个参数
    - 左上角的 `x轴` 坐标
    - 左上角的 `y轴` 坐标
    - 宽度
    - 高度
- 需要调用 `stroke()` 或 `fill()`

```js
ctx.beginPath()
ctx.rect(100, 100, 200, 200)
ctx.rect(150, 150, 100, 100)
ctx.stroke()
// ctx.fill()
```

方法二

- `strokeRect()` 方法接收四个参数, 和 `rect()` 一样
- 自带 `beginPath()` 和 `stroke()`
- 空心矩形

```js
ctx.strokeRect(100, 100, 200, 200)
ctx.strokeStyle = 'blue'
ctx.strokeRect(150, 150, 100, 100)
```

方法三

- `fillRect()` 方法接收四个参数, 和 `rect()` 一样
- 自带 `beginPath()` 和 `fill()`
- 实心矩形

```js
ctx.fillRect(100, 100, 200, 200)
ctx.fillStyle = 'blue'
ctx.fillRect(150, 150, 100, 100)
```



### 清除矩形范围内的东西

- `clearRect()` 方法接收四个参数, 和 `rect()` 一样
- 会清除矩形内的所有东西

```js
ctx.clearRect(0, 0, 150, 150)
```

---

## 圆弧 (Arc)



### 基本概念

角度 vs 弧度

- 角度: 一个圆 `360°` , 一个半圆 `180°`
- 弧度: 一个圆 `2π` , 一个半圆 `π`

转换公式

- 1角度 = 1弧度 * 180 / π
- 1弧度 = 1角度 * π / 180

π的写法

```js
Math.PI
```



### 绘制圆弧 (Draw Arc)

- `arc()` 方法接收6个参数
    - `x` : 圆心的 `x轴` 坐标
    - `y` : 圆心的 `y轴` 坐标
    - `radius` : 半径长度
    - `startAngle` : 起始<span style="color: yellow">弧度 (不是角度)</span>
    - `startAngle` : 结束<span style="color: yellow">弧度 (不是角度)</span>
    - `antiClockwise` : (Optional) 一个 `Boolean` 值, 默认为 `false` 即为顺时针绘制, `true` 则为逆时针绘制

```js
ctx.arc(100, 100, 100, 0, Math.PI) // 下半圆
ctx.arc(100, 100, 100, 0, Math.PI, true) // 上半圆
```



### 绘制扇形 (Draw Sector)

1. 使用 `moveTo()` 将起始点设置为圆心
2. 使用 `arc()` 绘制圆弧
3. 使用 `clothPath()` 关闭路径
4. 使用 `stroke()` 或 `fill()` 绘制

```js
ctx.moveTo(100, 100)
ctx.arc(100, 100, 100, 0, Math.PI / 2)
ctx.closePath()
ctx.fill()
```

---

## 文字 (Character)



### 绘制

- `strokeText()` 或 `fillText()` 方法都可以绘制文字, 前者为描边, 后者为填充, 都接收4个参数
    - `text` : 需要绘制的文本信息
    - `x` : 文本起点的 `x轴` 坐标, 默认为文本 `baseline` 的起点 (左下角), 可以通过 `textAlign` 属性改变对齐方式
    - `y` : 文本起点的 `y轴` 坐标, 默认为文本 `baseline` 的起点 (左下角), 可以通过 `textBaseline` 属性改变对齐方式
    - `maxWidth` : (Optional) 文本的最大宽度, 如果超出宽度则会压缩每个文字的宽度, 但不换行

```js
const str = 'Tony loves Lily'
ctx.strokeText(str, canvasWidth / 2, canvasHeight / 2) // 描边
ctx.fillText(str, canvasWidth / 2, canvasHeight / 2) // 填充
```



### 相关属性

注意点

- 所有属性必须写在 `绘制方法` 之前

属性

- 字体, 类似于 `css` 的 `font`

```js
ctx.font = '30px comic sans ms' // 格式为 'size font', 和css的font几乎一样, 但也有细小区别
```

- 垂直对齐方式, 类似于 `css` 的 `vertical-align` , 参考点为绘制参数中的 `y`
    - `top` : 顶部对齐
    - `hanging` : 主要在藏文和其他印度文字中使用
    - `middle` : 垂直中心店对齐
    - `alphabetic` : 默认值, 正常文本基线
    - `ideographic` : 主要在汉语, 日语和韩语中使用, 表意基线
    - `bottom` : 底部对齐

```js
ctx.textBaseline = 'bottom'
```

- 水平对齐方式, 类似于 `css` 的 `text-align` , 参考点为绘制参数中的 `x`
    - `left` : 左对齐
    - `right` : 右对齐
    - `center` : 居中对齐
    - `start` : 起始方位对齐, 如果文本是从左往右排列的, 则等同于 `left` , 如果文本是从右往左排列的 则表示 `right`
    - `start` : 结束方位对齐, 如果文本是从左往右排列的, 则等同于 `right` , 如果文本是从右往左排列的 则表示 `left`

```js
ctx.textAlign = 'center'
```

---

## 绘制图片 (Draw Image)

1. 创建 `<img>` 元素, 设置src

```js
const img = new Image()
img.src = 'path/to/image.jpg'
```

2. 监听图片加载完毕

```js
img.onload = function () {
  // drawImage
}
```

3. `drawImage()` 方法接收3 / 5 / 9个参数, <span style="color: yellow">注意5 / 9参数的参数位置是不一样的</span>
    - `imageObject` : 图片元素
    - `dx` : 图片左上角的 `x轴` 坐标
    - `dy` : 图片左上角的 `y轴` 坐标
    
    - `dWidth` : (Optional) 图片宽度
    - `dHeight` : (Optional) 图片高度
    - `sx` : 图片元素截取起始点的 `x轴` 坐标
    - `sy` : 图片元素截取起始点的 `y轴` 坐标
    - `sWidth` : 图片元素从截取起始点开始算, 截取的宽度
    - `sHeight` : 图片元素从截取起始点开始算, 截取的高度

```js
ctx.drawImage(image, dx, dy) // 3参数
ctx.drawImage(image, dx, dy, dWidth, dHeight) // 5参数
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) // 9参数
```

![canvas_drawImage](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_drawImage.jpg)

```js
ctx.drawImage(img, 50, 50, 100, 100, 100, 100, 200, 200)
```

---

## 绘制动画 (Draw Animation)

步骤

1. 加载资源图片
2. 监听图片加载完毕
3. 定义索引
4. 设置定时器
5. 使用 `clearRect()` 清空 `canvas`
6. 通过设置图片的 `sx` , `sy` , `sWidth` , `sHeight` 来根据索引逐帧绘制图片并循环

示例

![person.png](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_animation.png)

```html
<body>
<canvas width="500" height="400"></canvas>
<script>
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  // 画向右走 (第三行)
  const img = new Image()
  img.onload = function () {
    // calculate width and height of each frame
    const frameWidth = img.width / 4
    const frameHeight = img.height / 4

    // calculate image position
    const originX = ctx.canvas.width / 2 - frameWidth / 2
    const originY = ctx.canvas.height / 2 - frameHeight / 2

    // draw frame
    let index = 0
    setInterval(() => {
      ctx.clearRect(0, 0, 500, 400)
      ctx.drawImage(img, frameHeight * index, frameHeight * 2, frameWidth, frameHeight, originX, originY, frameWidth, frameHeight)
      index++
      if (index > 3) {
        index = 0
      }
    }, 200)
  }
  img.src = 'images/person.png'
</script>
</body>
```

---

## 形变属性



### 基本概念

- `canvas` 中所有的形变属性都是基于坐标系的, 而不是针对某个绘制出来的图形
- 除非再次更改, 否则一直生效, `beginPath()` 无法重置
- 再次更改是以之前更改后的坐标系为基础



### 平移

- `translate()` 方法平移整个坐标系, 接收2个参数
    - `x` : 整个坐标系水平位置偏移的距离, 正数为向右, 负数为向左
    - `y` : 整个坐标系垂直位置偏移的距离, 正数为向右, 负数为向左

```js
ctx.translate(100, 50) // 向右100 向下50
```

![canvas_translate](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_translate.png)



### 旋转

- `rotate()` 方法将坐标系以原点为圆心旋转, 接收1个参数
    - `angle` : 旋转的弧度 (可以使用 `角度 * Math.PI / 180` 来计算), 正右方为 `0度` , 顺时针计算

```js
ctx.rotate(30 * Math.PI / 180) // 旋转30角度
```

![canvas_rotate](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_rotate.png)



### 缩放

- `scale()` 方法缩放整个坐标系, 接收2个参数
    - `x` : 整个坐标系水平缩放的倍数, 可以是小数, 负数表示水平翻转后再缩放
    - `y` : 整个坐标系垂直缩放的倍数, 可以是小数, 负数表示垂直翻转后再缩放

---

## 图形交互 (Interaction)

步骤

1. 给 `canvas` 添加点击事件
2. 获取通过 `event.offsetX / Y` 获取点击的位置
3. 通过 `isPointInPath()` 判断点击的位置是否在图形内

注意点

- `isPointInPath()` 方法只判断点位是否在当前的路径内
- 接收2个参数
    - `x` : 点击位置的 `x轴` 坐标
    - `y` : 点击位置的 `y轴` 坐标
- 若点位在图形内或与边框重合, 则返回 `true` , 反之返回 `false`
- 该方法只能判断通过 `stroke()` 或 `fill()` 绘制出来的图形, `fillRect()` 之类的方法无效

![canvas_isPointInPath](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\canvas_isPointInPath.png)

示例

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const rectX = 100
const rectY = 100
const rectWidth = 100
const rectHeight = 100
ctx.rect(rectX, rectY, rectWidth, rectHeight)
ctx.stroke()

// monitor rectangle onclick
canvas.onclick = function (event) {
  const x = event.offsetX
  const y = event.offsetY

  if (ctx.isPointInPath(x, y)) {
    console.log('rectangle clicked')
  } else {
    console.log('rectangle not clicked')
  }
}
```

框架

- 交互问题一般使用框架来解决
    - zrender.js
    - Knova.js
    - three.js
    - egret.js
    - pixi.js

