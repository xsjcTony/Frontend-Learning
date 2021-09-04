SVG (Scalable Vector Graphics)



> [SVG: Scalable Vector Graphics | MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)



## 定义 (Definition)

- 全称为 Scalable Vector Graphics
- 可缩放的矢量图

---

## 位图 vs 矢量图



### 位图

定义

- 传统的 `jpg` / `png` / `gif` 等都是位图
- 一个个很小的不同颜色的像素组成在一起的图片

优点

- 色彩丰富逼真

缺点

- 放大后会失真
- 文件体积大



### 矢量图

定义

- 通过 `XML` 格式定义
- 通过各种 `路径` 和 `填充颜色` 来描述渲染的图片

优点

- 放大后不会失真
- 文件体积小

缺点

- 不易制作色彩变化太多的图案

---

## 元素宽高

默认

- 默认为宽 `300px` , 高 `150px`

修改

- `svg` 既能通过 `css` 修改宽高, 也可以通过 `行内样式` 修改宽高, 画布中的内容会被不会被拉伸

```css
svg {
  width: 500px;
  height: 500px;
}
```

```html
<svg width="500" height="500"></svg>
```

---

## 使用方式

- 内嵌至 `HTML`

```html
<svg>
    <circle cx="100" cy="100" r="50" fill="transparent" stroke="#000"></circle>
</svg>
```

- 保存为 `.svg` 文件用浏览器打开
    - 为 `<svg>` 标签指定属性 `xmlns="http://www.w3.org/2000/svg"`

```xml
<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="50" fill="transparent" stroke="#000"></circle>
</svg>
```

- 在 `<img>` 标签中引用

```html
<img src="path/to/circle.svg" alt></img>
```

- 作为 `CSS` 背景使用
    - 若大小不够撑满元素, 则默认会平铺, 如不需要可以添加 `no-repeat`

```css
background: url('path/to/circle.svg');
```

---

## 路径 (Path)



> [\<path> - SVG: Scalable Vector Graphics | MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)



### 定义

- `SVG路径` 可以绘制任意图形
- 比较复杂



### 基本指令

基本格式

- 包含在 `d=""` 中
- 使用空格隔开每一个

注意点

- 大写字母是绝对定位, 小写字母是相对定位
    - 绝对定位: 以坐标系原点为基准 (写什么位置就是什么位置)
    - 相对定位: 以上一个点的坐标为原点基准指定位置

指令

- `M` : move to, 起点
- `L` : line to, 其他点, 可以有无限个
- `Z` : cloth path, 闭合路径
- `H` : horizontal line to, 新点和上一个点的 `y轴` 坐标相同
- `V` : vertical line to, 新点和上一个点的 `x轴` 坐标相同

示例

- 三角形, 下面两个效果相同

```html
<path d="M 100 100 L 300 100 L 300 300 Z" stroke="red" fill="none"></path>
<path d="M 100 100 H 300 V 300 Z" stroke="red" fill="none"></path>
```

---

## 常用属性 (General Attributes)

`css` 使用

- 这些常用属性都可以在 `css` 中使用

属性

- `fill` : 填充颜色, 默认为 `#000`
- `fill-opacity` : 填充颜色的透明度, 默认为 `1` / `100%`
- `stroke` : 描边颜色, 默认为 `none`
- `stroke-width` : 描边宽度, 默认为 `1`
- `stroke-opacity` : 描边的透明度, 默认为 `1` / `100%`
- `stroke-linecap` : 线段两段样式, 可选 `butt` / `round` / `square` , 默认为 `butt` , 和 `canvas` 的用法一样
- `stroke-dasharray` : 虚线样式, 格式为 `"x1 x2 x3 ..."` , 默认为 `none` , 和 `canvas` 的用法一样
- `stroke-dashoffset` : 虚线偏移位, 默认为 `0` , 和 `canvas` 的用法一样
- `stroke-linejoin` : 折线转角样式, 可选 `arcs` / `bevel` / `miter` / `miter-clip` / `round` , 默认为 `miter` , 和 `canvas` 的用法一样

---

## 绘制 (Draw)



### 矩形

- 使用 `<rect>` 标签, 可选属性
    - `x` : (Optional) 矩形左上角的 `x轴` 坐标, 默认为 `0`
    - `y` : (Optional) 矩形左上角的 `y轴` 坐标, 默认为 `0`
    - `width` : 矩形宽度, 必须指定
    - `height` : 矩形高度, 必须指定
    - `fill` : (Optional) 填充颜色, 默认为 `#000`
    - `stroke` : (Optional) 描边颜色, 默认为 `none`
    - `stroke-width` : (Optional) 描边宽度, 默认为 `1`
    - `rx` : (Optional) `x轴` 上的圆角半径, 和 `border-radius` 类似, 若定义了 `ry` , 则默认值和 `ry` 相同
    - `ry` : (Optional) `y轴` 上的圆角半径, 和 `border-radius` 类似, 若定义了 `rx` , 则默认值和 `rx` 相同

```html
<rect x="100" y="100" width="100" height="100" fill="blue" stroke="red" stroke-width="1" rx="10" ry="10"></rect>
```



### 圆形

- 使用 `<circle>` 标签, 可选属性
    - `cx` : (Optional) 圆心的 `x轴` 坐标, 默认为 `0`
    - `cy` : (Optional) 圆心的 `y轴` 坐标, 默认为 `0`
    - `r` : 半径长度, 必须指定

```html
<circle cx="100" cy="100" r="50"></circle>
```



### 椭圆

- 使用 `<ellipse>` 标签, 可选属性
    - `cx` : (Optional) 圆心的 `x轴` 坐标, 默认为 `0`
    - `cy` : (Optional) 圆心的 `y轴` 坐标, 默认为 `0`
    - `rx` : `x轴` 上的半径, 若定义了 `ry` , 则默认值和 `ry` 相同, 必须定义其一
    - `ry` : `y轴` 上的半径, 若定义了 `rx` , 则默认值和 `rx` 相同, 必须定义其一

```html
<ellipse cx="100" cy="100" rx="100" ry="50"></ellipse>
```



### 直线

- 使用 `<line>` 标签, 可选属性
    - `x1` : (Optional) 起点的 `x轴` 坐标, 默认为 `0`
    - `y1` : (Optional) 起点的 `y轴` 坐标, 默认为 `0`
    - `x2` : (Optional) 终点的 `x轴` 坐标, 默认为 `0`
    - `y2` : (Optional) 终点的 `y轴` 坐标, 默认为 `0`
    - `stroke` : (Optional) 描边颜色, 默认为 `none`
    - `stroke-width` : (Optional) 描边宽度, 默认为 `1`

```html
<line x1="100" y1="100" x2="300" y2="100" stroke="#000"></line>
```



### 折线

- 使用 `<polyline>` 标签, 可选属性
    - `points` : 一对一对的方式描述所有的点位, 格式为 `"x1 x2 y1 y2 z1 z2 ..."` , 必须指定
    - `stroke` : (Optional) 描边颜色, 默认为 `none`
    - `stroke-width` : (Optional) 描边宽度, 默认为 `1`
    - `fill` : (Optional) 填充颜色, 默认为 `#000` , 不需要则设置为 `none` 或 `transparent`

```html
<polyline points="100 300 300 300 400 200" stroke="#000" fill="none"></polyline>
```



### 多边形

- 使用 `<polygon>` 标签, 和 `<polyline>` 差不多, 但是会自动关闭路径, 可选属性
    - `points` : 一对一对的方式描述所有的点位, 格式为 `"x1 x2 y1 y2 z1 z2 ..."` , 必须指定
    - `stroke` : (Optional) 描边颜色, 默认为 `none`
    - `stroke-width` : (Optional) 描边宽度, 默认为 `1`
    - `fill` : (Optional) 填充颜色, 默认为 `#000` , 不需要则设置为 `none` 或 `transparent`

```html
<polygon points="100 400 300 400 400 300" stroke="#000" fill="none"></polygon>
```



### 圆弧

- 使用路径指令 `A` , 意为[Elliptical Arc Curve](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve)
- 从当前位置绘制弧线到指定位置格式为 `A rx, ry, xr, laf, sf, x, y`
    - `rx` : 弧线所在椭圆的 `x轴` 半径
    - `ry` : 弧线所在椭圆的 `y轴` 半径
    - `xr` : 弧线所在椭圆的旋转角度, 正右方为 `0°` , 顺时针旋转
    - `laf` : 是否选择弧长较长的一段, `0` 为不选择 (即选择较短的一段) , `1` 为选择
    - `sf` : 是否顺时针绘制, `0` 为逆时针, `1` 为顺时针
    - `x` : 弧线的终点的 `x轴` 坐标
    - `y` : 弧线的终点的 `y轴` 坐标

```html
<path d="M 100 100 A 100 50 0 0 0 200 150" stroke="#f00" fill="none"></path>
```



### 贝塞尔曲线

- 使用路径指令 `Q` (二次) / `C` (三次), 意为[Quadratic Bézier Curve](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#quadratic_bézier_curve)
- 贝塞尔曲线图示
    - 一次![svg_qbc_1](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_qbc_1.gif)
    - 二次![svg_qbc_2](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_qbc_2.gif)
    - 三次![svg_qbc_3](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_qbc_3.gif)

- 二次贝塞尔曲线使用指令 `Q` , 格式为 `Q x1, y1, x, y`
    - `x1` : 控制点 (上图 `P1` ) 的 `x轴` 坐标
    - `y1` : 控制点 (上图 `P1` ) 的 `y轴` 坐标
    - `x` : 终点位置 (上图 `P2` ) 的 `x轴` 坐标
    - `y` : 终点位置 (上图 `P2` ) 的 `y轴` 坐标

```html
<path d="M 100 100 Q 150 50 200 100" stroke="#f00" fill="none"></path>
```

- 三次贝塞尔曲线使用指令 `C` , 格式为 `C x1, y1, x2, y2, x, y`
    - `x1` : 控制点1 (上图 `P1` ) 的 `x轴` 坐标
    - `y1` : 控制点1 (上图 `P1` ) 的 `y轴` 坐标
    - `x2` : 控制点2 (上图 `P2` ) 的 `x轴` 坐标
    - `y2` : 控制点2 (上图 `P3` ) 的 `y轴` 坐标
    - `x` : 终点位置 (上图 `P3` ) 的 `x轴` 坐标
    - `y` : 终点位置 (上图 `P3` ) 的 `y轴` 坐标

```html
<path d="M 100 300 C 100 250 200 250 200 300" stroke="#f00" fill="none"></path>
```



### 文本

普通文本

- 默认以文字的基线 (位于左下角) 作为基准点开始绘制

- 使用 `<text>` 标签, 可选属性
    - `x` : (Optional) 基准点的 `x轴` 坐标, 默认为 `0`
    - `y` : (Optional) 基准点的 `y轴` 坐标, 默认为 `0`
    - `style` : (Optional) 文字的样式, 使用 `CSS` 格式, 默认为 `none`
    - `stroke` : (Optional) 文字描边颜色, 默认为 `none`
    - `stroke-width` : (Optional) 文字描边宽度, 默认为 `1`
    - `fill` : (Optional) 文字填充颜色, 默认为 `#000` , 不需要则设置为 `none` 或 `transparent`
    - `text-anchor` : (Optional) 文字的水平对齐方式, 可选 `start` / `middle` / `end` , 默认为 `start`
    - `dominant-baseline` : (Optional) 文字的垂直对齐方式, 默认为 `none`
    - `dx` : (Optional) 指定文字相对于上一个文字的间隙, 默认为 `none`
    - `dy` : (Optional) 指定文字在垂直方向的偏移距离, 后面的文字会继承最后一个 `dy` 值, 默认为 `none`

```html
<text x="250" y="250" style="font-size: 40px" stroke="#f00" fill="none" text-anchor="middle" dominant-baseline="middle">Tony loves Lily.</text>
```

- 想绘制多行文本可使用 `<text>` 嵌套 `<tspan>`
    - 通过 `<text>` 可以统一设置样式
    - 通过 `<tspan>` 可以单独设置样式
    - 样式采用就近原则
    - `<tspan>` 用法和 `<text>` 一样

```html
<text>
    <tspan x="100" y="100">Tony</tspan>
    <tspan x="100" y="200">loves</tspan>
    <tspan x="100" y="300">Lily</tspan>
</text>
```

路径文本

- 注意点
    - 超出路径范围的内容不会被绘制
- 步骤

	1. 定义一个 `<path>` 路径并添加 `id` 属性
	2. 将路径放在 `<defs>` 标签中, 这样路径就不会显示
	3. 定义 `<text>` 标签
	4. 在其中定义 `<textPath>` 标签
	5. 给其添加 `xlink:href` , 指向 `<path>` 的 `id` , 比如 `#my_path`

```html
<defs>
    <path id="my_path" d="M 100 100 Q 150 50 200 100"></path>
</defs>
<text>
    <textPath xlink:href="#my_path">Tony loves Lily.</textPath>
</text>
```



### 超链接

- 可以给任意内容添加超链接, 只需要用 `<a>` 包裹, 可选属性
    - `xlink:href` : 跳转至的链接
    - `xlink:title` : (Optional) 链接的提示
    - `target` : (Optional) 打开链接的方式, 比如 `_blank` 就是在新标签页中打开

```html
<a xlink:href="https://www.google.com" xlink:title="google" target="_blank">
    <text x="100" y="100">Google</text>
</a>
```



### 图片

- 使用 `<image>` 标签, 可选属性
    - `xlink:href` : (Optional) 图片的路径
    - `width` : (Optional) 图片宽度, 会被等比拉伸
    - `height` : (Optional) 图片高度, 会被填满
    - `x` : (Optional) 图片左上角的 `x轴` 坐标
    - `y` : (Optional) 图片左上角的 `y轴` 坐标

```html
<image xlink:href="images/lnj.jpg" width="300" height="300"></image>
```

---

## 结构标签



### `<g>`

- 是group的缩写
- 可以将多个元素放到一个 `<g>` 中, 这样就组成了一个组
- 可以统一操作, 比如旋转 / 缩放 / 添加相关样式等

```html
<g fill="red" id="my_group">
    <circle cx="100" cy="100" r="100"></circle>
    <circle cx="100" cy="200" r="50"></circle>
    <circle cx="100" cy="300" r="30"></circle>
</g>
```



### `<use>`

- 使用 `<g>` 封装的图形可以通过 `<use>` 标签进行复制使用
- 需要给 `<g>` 添加 `id` 属性
- 给 `<use>` 添加 `xlink:href` , 指向 `<g>` 的 `id` , 比如 `#my_group`

```html
<g id="my_group">
    <circle cx="100" cy="100" r="100"></circle>
    <circle cx="100" cy="200" r="50"></circle>
    <circle cx="100" cy="300" r="30"></circle>
</g>
<use xlink:href="#my_group" x="300" fill="blue"></use>
```



### `<defs>`

- 在该标签中的元素是不会显示的, 可以作为模板使用

```html
<defs>
		<g id="my_group">
    		<circle cx="100" cy="100" r="100"></circle>
    		<circle cx="100" cy="200" r="50"></circle>
    		<circle cx="100" cy="300" r="30"></circle>
		</g>
</defs>
<use xlink:href="#my_group" fill="blue"></use>
```



### `<symbol>`

- 兼具 `<g>` 的分组特性和 `<defs>` 的不可见特性
- 能够创建自己的视窗, 能够应用 `viewBox` / `preserveAspectRatio` 属性

```html
<symbol id="my_symbol">
    <circle cx="100" cy="100" r="100"></circle>
    <circle cx="100" cy="200" r="50"></circle>
    <circle cx="100" cy="300" r="30"></circle>
</symbol>
<use xlink:href="#my_symbol" fill="green"></use>
```

---

## 裁剪 & 蒙版 (Clip & Mask)



### 裁剪

裁剪标签

- 使用 `<clipPath>` 标签
- 给标签添加 `id` 属性
- 在标签中定义要裁剪的形状

使用

- 在需要裁剪的图形中添加 `clip-path` 属性
- 值为 `url(#my_clip)` , `url` 中填写 `<cilpPath>` 的 `id` 属性值

```html
<clipPath id="my_clip">
    <circle cx="200" cy="200" r="100"></circle>
</clipPath>
<rect x="100" y="100" width="300" height="200" fill="blue" clip-path="url(#my_clip)"></rect>
```



### 蒙版

蒙版标签

- 使用 `<mask>` 标签
- 给标签添加 `id` 属性
- 在标签中定义要添加蒙版的形状以及颜色, 可以使用 `rgba()` 改变透明度
- 蒙版会将蒙版和图形的颜色混合, 并更改透明度

使用

- 在需要添加蒙版的图形中添加 `mask` 属性
- 值为 `url(#my_mask)` , `url` 中填写 `<mask>` 的 `id` 属性值

```html
<mask id="my_mask">
    <circle cx="200" cy="200" r="100" fill="rgba(255, 0, 0, 0.5)"></circle>
</mask>
<rect x="100" y="100" width="300" height="200" fill="blue" mask="url(#my_mask)"></rect>
```

---

## 渐变色 (Gradient)

- 渐变色分为 `线性渐变` 和 `径向渐变`
- 线性渐变标签为 `<linearGradient>`
- 径向渐变标签为 `<radialGradient>`
- 需要给标签添加 `id` 属性以便使用
- 由于渐变是模板, 所以需要放在 `<defs>` 中默认不显示
- `线性渐变` 可选属性
    - `x1` : 渐变范围开始的 `x轴` 坐标
    - `y1` : 渐变范围开始的 `y轴` 坐标
    - `x2` : 渐变范围结束的 `x轴` 坐标
    - `y2` : 渐变范围结束的 `y轴` 坐标
    - `id` : 即为默认 `id` 属性
    - `gradientUnits` : 有两个取值
        - `objectBoundingBox` : 默认取值, 意为单位为百分比, `0` ~ `1`
        - `userSpaceOnUse` : 意为单位为像素
- `径向渐变` 的 `API` : [\<radialGradient> - SVG: Scalable Vector Graphics | MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient)
- 在渐变标签中添加 `<stop>` 标签, 可选属性
    - `offset` : 颜色戳的位置, 单位为百分比, `0` ~ `1`
    - `stop-color` : 颜色戳的颜色
- 在需要使用该渐变色的图形中给 `fill` 属性指定 `url(#my_gradient)` , `url` 中填写渐变色的 `id` 属性值

```html
<defs>
    <!--<linearGradient x1="0" y1="0" x2="1" y2="1" id="my_linear_gradient">-->
    <linearGradient x1="100" y1="100" x2="400" y2="100" id="my_linear_gradient" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="pink"></stop>
        <stop offset="1" stop-color="skyblue"></stop>
    </linearGradient>
</defs>
<rect x="100" y="100" width="300" height="200" fill="url(#my_linear_gradient)"></rect>
```

---

## 画笔 (Pattern)

标签

- 使用 `<pattern>` 标签
- 给标签添加 `id` 属性
- 由于画笔是模板, 所以需要放在 `<defs>` 中默认不显示
- 可选属性
    - `width` : 填充图案的宽度
    - `height` : 填充图案的高度
    - `id` : 即为默认 `id` 属性
    - `patternUnits` : 有两个取值
        - `objectBoundingBox` : 默认取值, 意为宽高单位为百分比, `0` ~ `1`
        - `userSpaceOnUse` : 意为宽高单位为像素
- 在标签中定义要填充图案的内容

使用

- 在需要使用该填充图案的图形中给 `fill` 属性指定 `url(#my_pattern)` , `url` 中填写画笔的 `id` 属性值

```html
<defs>
    <!--<pattern id="my_pattern" width="0.2" height="0.2">-->
    <pattern id="my_pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="10" fill="red"></circle>
    </pattern>
</defs>
<rect x="100" y="100" width="300" height="200" fill="url(#my_pattern)"></rect>
```

---

## 形变

- `SVG` 中所有的形变属性都是基于坐标系的, 而不是针对某个绘制出来的图形
- 使用 `transform` 属性, 可选值
    - `translate(x, y)` : 平移, 单位为像素
    - `scale(x, y)` : 缩放, 单位为倍数
    - `rotate(deg)` : 旋转, 以正右方向为 `0°` , 顺时针旋转, 单位为角度

```html
<!--<rect x="100" y="250" width="300" height="200" fill="blue" transform="translate(100, 0)"></rect>-->
<!--<rect x="100" y="250" width="300" height="200" fill="blue" transform="scale(0.5, 1.2)"></rect>-->
<rect x="100" y="250" width="300" height="200" fill="blue" transform="rotate(15)"></rect>
```

---

## ViewBox (可视区域)



### 定义

- 用户可以看到的区域
- 默认情况下, 可视区域的大小和 `SVG` 内容区域的大小是一致的
- 可以手动修改
- 默认情况下示例

![svg_viewbox_default](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_viewbox_default.png)



### 属性格式

- `viewBox="x y width height"`

    - `x` : 可视区域 `x轴` 方向的位置, `x = 50` 为例

    ![svg_viewbox_x50](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_viewbox_x50.png)

    - `y` : 可视区域 `y轴` 方向的位置, `y = 50` 为例

    ![svg_viewbox_y50](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_viewbox_y50.png)

    - `width` : 可视区域宽度
    - `height` : 可视区域高度

    `width = 400, height = 400` 示例

    ![svg_viewbox_wh400](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_viewbox_wh400.png)

    `width = 100, height = 100` 示例

    ![svg_viewbox_wh50](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\svg_viewbox_wh50.png)



### 比例

- 默认情况下如果 `可视区域` 的尺寸是等比缩放的, 那么调整后的 `可视区域` 的 `x` / `y` 将和 `内容区域` 的 `x` / `y` 对齐
- 但如果 `可视区域` 的尺寸不是等比缩放的, 那么系统就会调整 `可视区域` 的位置, 手动设置的 `x` / `y` 会失效
- 如果依然需要 `可视区域` 的 `x` / `y` 和 `内容区域` 的 `x` / `y` 保持对齐, 那么就需要使用 `preserveAspectRatio` 属性
- 属性的取值
    - `xMin` : `可视区域` 和 `内容区域` 左边对齐
    - `xMid` : `可视区域` 和 `内容区域` `x轴` 中心对齐
    - `xMax` : `可视区域` 和 `内容区域` 右边对齐
    - `YMin` : `可视区域` 和 `内容区域` 上边缘对齐
    - `YMid` : `可视区域` 和 `内容区域` `y轴` 中心对齐
    - `YMax` : `可视区域` 和 `内容区域` 下边缘对齐

```html
<svg width="200" height="200" viewBox="0 0 50 150" preserveAspectRatio="xMinYMax">
    <circle cx="50" cy="50" r="50" fill="red"></circle>
</svg>
```

---

## 动画 (Animation)



### 标签

- `<animate>` : 基础动画
- `<animateTransform>` : 形变动画
- `<animateMotion>` : 路径动画



### 常用属性

- `attributeType` : `CSS` / `XML` 规定的属性值的命名空间
- `attributeName` : 元素的哪个属性执行动画
- `from` : 动画开始的值
- `to` : 动画结束的值
- `dur` : 动画时长, 单位为 `s`
- `fill` : 动画结束之后的状态, 取值为 `freeze` / `remove`
    - `freeze` : 保持结束状态
    - `remove` : 默认值, 恢复初始状态
- `xlink:href` : 指向需要执行动画的元素的 `id` , 比如 `#my_circle`
- `repeatCount` : 动画执行的次数, `infinite` 为无限执行
- `repeatDur` : 动画总共执行的时间, 单位为 `s`
- `begin` : 动画开始的时间, 单位为 `s`
    - 开头写上 `0;` 表示一进来就立即执行一次
    - 取值可以包含 `事件` , 比如 `mouseenter + 2s`
    - 取值可以包含另一个动画的结束, 比如 `animateId.end + 2s` , 需要给指向的动画添加 `id`
- `restart` : 动画开始执行之后是否可以被重新开始执行, 取值为 `always` / `whenNotActive` / `never`
    - `always` : 默认值, 任何时候都可以重新开始执行
    - `whenNotActive` : 执行过程中不可以重新开始, 需要等待执行完毕
    - `never` : 不可以重新开始执行
- `calcMode` : 每一个动画片段的动画表现
- `keyTimes` : 指定分割点, 单位为百分比, 取值 `0 ~ 1` , 配合 `values` 使用
- `values` : 指定每一个分割点的值, 配合 `keyTimes` 使用



### 使用方式

- 给元素添加 `id` , 在动画标签中添加 `xlink:href` 并指向元素的 `id`
- 将动画标签直接嵌套在需要执行动画的元素标签中
- 可以为同一个元素添加多个动画

```html
<svg>
    <circle id="my_circle" cx="100" cy="100" r="50" fill="blue">
        <animate id="to_right" attributeName="cx" from="100" to="300" dur="2s" begin="0;to_left.end" fill="freeze"></animate>
        <animate id="to_left" attributeName="cx" from="300" to="100" dur="2s" begin="to_right.end" fill="freeze"></animate>
    </circle>
</svg>
```



### 形变动画

- 使用 `<animateTransform>` 标签
- `attributeName` 属性永远为 `transform`
- 需要额外添加 `type` 属性, 指定形变类型
    - `translate` : 平移, 基于坐标系, 单位为 `px`
    - `rotate` : 旋转, 单位为 `deg` , 默认基于坐标系, 在 `from` 和 `to` 中可以在角度之后指定参考点位, 如 `from="0 100 100"`
    - `scale` : 缩放, 单位为 `倍数` , 基于坐标系

```html
<svg>
    <rect x="100" y="100" width="300" height="200" fill="blue">
        <!--<animateTransform attributeName="transform" type="translate" from="0 0" to="100 0" dur="2s" begin="click" fill="freeze"></animateTransform>-->
        <!--<animateTransform attributeName="transform" type="rotate" from="0 100 100" to="45 100 100" dur="2s" begin="click" fill="freeze"></animateTransform>-->
        <animateTransform attributeName="transform" type="scale" from="1 1" to="0.5 1" dur="2s" begin="click" fill="freeze"></animateTransform>
    </rect>
</svg>
```



### 路径动画

- 使用 `<animateMotion>` 标签
- 没有 `attributeName` 属性
- 需要添加 `path` 属性, 值为一个 `路径` 
- `路径` 中的坐标是以执行动画的元素为基准
- `rotate` 属性可以让元素自动翻转

```html
<svg width="500" height="500" viewBox="-100 -100 500 500">
    <rect x="0" y="0" width="40" height="40" fill="rgba(255, 0, 0, 0.5)">
        <animateMotion path="M 0 0 C 0 300 300 300 300 0" dur="5s" begin="click" fill="freeze" rotate="auto"></animateMotion>
    </rect>
</svg>
```

---

## 脚本编程

定义

- 通过 `JavaScript` 来操作 `SVG`

注意点

- 通过 `JavaScript` 创建 `SVG` 时, 必须为其创建 `命名空间` , 并使用 `document.createElementNS()` 来创建 `SVG`

```js
const SVG_NS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(SVG_NS, 'svg')
document.body.appendChild(svg)
```

- 创建 `SVG` 相关标签时, 也全部需要带上 `命名空间`

```js
const circle = document.createElementNS(SVG_NS, 'circle')
circle.setAttribute('cx', '100')
circle.setAttribute('cy', '100')
circle.setAttribute('r', '50')
circle.setAttribute('fill', '#f00')
svg.appendChild(circle)
```

- 使用 `xlink` 相关属性也必须指定 `命名空间`

```js
const XLINK_NS = 'http://www.w3.org/1999/xlink'
const image = document.createElementNS(SVG_NS, 'image')
image.setAttribute('x', '200')
image.setAttribute('y', '200')
image.setAttributeNS(XLINK_NS, 'xlink:href', 'images/lnj.jpg')
svg.appendChild(image)
```

框架

> [SVG.js v3.0 | Home](https://svgjs.dev/docs/3.0/)
>
> [Snap.svg - Home](http://snapsvg.io/)

