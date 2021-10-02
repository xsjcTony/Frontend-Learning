# 移动web开发



## 常用单位

> [CSS values and units - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

像素

- 固定单位
- 单位符号为 `px`

- 一个小方格就是一个像素
- 不会随着视口大小的变化而变化

百分比

- 动态单位
- 单位符号为 `%`
- 以当前元素的父元素作为参考进行计算
- 子元素的 `width` / `height` 分别根据父元素的 `width` / `height` 来计算
- 子元素的 `margin` / `padding` 根据父元素的 `宽度` 来计算
- `border` 类属性不能使用百分比

em

- 动态单位
- 单位符号为 `em`
- 大小相对于 `font-size` 属性 (比如 `font-size: 12px` , 则 `1em` 为 `12px` )
- 从当前元素开始寻找 `font-size` , 若没有则寻找祖先元素, 找到为止
- 若当前元素以及所有祖先元素都没有设置, 则使用浏览器的默认字体大小

rem

- 动态单位
- 单位符号为 `rem`
- 大小相对于 `根元素` ( `html` ) 的 `font-size` 属性
- 如果 `根元素` ( `html` ) 没有设置, 则使用浏览器的默认字体大小
- 当前元素和祖先元素的字体大小不会影响 `rem` 的值

vw / vh

- 动态单位
- 单位符号为 `vw` / `vh`
- `1vw` 等于视口宽度的 `1%`
- `1vh` 等于视口高度的 `1%`
- 会随着视口大小的变化而变化

vmin / vmax

- 动态单位
- 单位符号为 `vmin` / `vmax`
- `vmin` 等于 `vw` 和 `vh` 中较小的那一个
- `vmax` 等于 `vw` 和 `vh` 中较大的那一个
- 可以保证移动设备屏幕旋转后尺寸不变

---

## 视口



> [Viewport concepts - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts)



### 基本概念

定义

- 可视区域的大小
- PC端的视口大小就是浏览器窗口可视区域的大小
- 移动端视口大小被认为定义为了 `980`

移动设备视口问题

- 由于移动端视口大小被默认定义为了 `980` , 但实际上远比设备的尺寸要大, 所以默认情况下网页会被等比缩小

- 如果想不自动缩放网页的尺寸, 则需要定义 `<meta name="viewport" content="***">` 来设置视口大小 

- > [Standard metadata names - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#standard_metadata_names_defined_in_other_specifications)

    - `width=device-width` : 设置视口宽度等于设备的宽度
    - `initial-scale` : 初始的缩放比例, `1` 则为不缩放
    - `maximum-scale` : 允许用户缩放到的最大比例
    - `minimum-scale` : 允许用户缩小到的最小比例
    - `user-scalable` : 用户是否可以手动缩放

- 一般在企业开发中, 这些都是要有的

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```



### 适配方案



#### 媒体查询

定义

- 通过 `@media` 查询设备的宽度来执行不同的 `css` 样式

优势

- 简单, 哪里不对改哪里
- 可以响应式展示网站, 调整宽度不用刷新页面
- 适合移动端和PC端维护同一套代码的情况

劣势

- 由于移动端和PC端维护同一套代码, 代码量非常大, 不利于维护
- 会造成其他设备的资源浪费, 特别是加载图片资源
- 会损失移动端和PC端各自特有的交互方式

应用场景

- 简单 (界面不复杂) 的网页, 比如企业官网, 宣传单页等



#### 界面自动跳转

定义

- 移动端和PC端分别使用不同的代码
- 通过判断用户使用的设备来决定是否跳转至移动端专用页面

实现

- 通过 `window.navigator.userAgent` 获取用户的设备
- 通过正则表达式确定是否为 `iOS` / `Android` 设备
- 是移动设备则跳转

```js
function isPc () {
  const userAgentInfo = window.navigator.userAgent
  if (/iphone/i.test(userAgentInfo)) {
    return false
  } else if (/android/i.test(userAgentInfo)) {
    return false
  }
  return true
}

if (!isPc()) {
  window.location.href="https://mobile.webpage/"
}
```



#### 媒体查询 / JavaScript + `rem`

定义

- 根据等比缩放的方法给不同的屏幕尺寸的 `html` 元素设定不同的 `font-size` , 元素根据使用 `rem` 作为单位

等比缩放

1. 将设计图片等分为指定份数
2. 将目标屏幕也等分为指定份数
3. 原始元素尺寸 / 设计图片每一份大小 * 目标屏幕每一份大小 = 等比缩放后元素的尺寸

开发中的应用

- 将目标屏幕每一份的大小定义为 `html` 元素的 `font-size`
- 使用时只需要设定为 (原始元素尺寸 / 设计图片每一份大小) `rem` 即可
- 为了通用适配, 所以可以用 `JavaScript` 来设置 `html` 元素的 `font-size`
    - 好处: 不用写很多的 `@media`
    - 坏处: 切换屏幕尺寸之后需要刷新才能生效

```js
document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px' // 7.5为份数
```



### 物理像素 vs 逻辑像素



#### 物理像素 (设备像素)

- 物理屏幕上真实存在的发光点

- 固定不变



#### 逻辑像素 (CSS像素)

- 代码设置的像素都是逻辑像素

- 并不是真实存在的



#### 两者的关系

- 在PC端, 1个 `CSS像素` 一般对应着电脑屏幕的1个 `物理像素` , 所以没啥问题
- 在移动端, 从iPhone4的Retina屏幕开始, 1个 `CSS像素` 就对应手机屏幕的不止1个 `物理像素` 了
- 以iPhone4为例, 1个 `CSS像素` 等于手机屏幕上2个 `物理像素` , 导致了同样的 `1px` 在Retina屏幕上看着会更粗一些



#### 两者不一样的解决办法

- 获取 `DPR` (设备像素比)
    - DPR = 设备像素 / CSS像素

```js
window.devicePixelRatio
```

- 通过 1 / DPR 获取需要缩放的比例

```js
const scale = 1 / window/devicePixelRatio
```

- 动态设置 `<meta name="viewport">`

```html
<script>
  const scale = 1 / window.devicePixelRatio
  const text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`
  document.write(text)
</script>
```



### 终极适配方案

- 动态设置 `<meta name="viewport">`
- 动态设置 `html` 的 `font-size`
- 编写 `CSS` 时使用 `rem` 作为单位

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>移动端适配方案三</title>
    <script>
      const scale = 1 / window.devicePixelRatio
      const text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`
      document.write(text)
      document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px'
    </script>
</head>
<body>
  
</body>
</html>
```

---

## 属性

- `apple-touch-icon` : 苹果 `safari` 浏览器的 `私有属性` , 指定 `将网页保存到主屏幕` 时的图标
