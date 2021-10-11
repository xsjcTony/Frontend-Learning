# CSS3



## 函数



### `calc()`

- 可以进行简单的 `+` , `-` , `*` , `/` 运算

```css
margin-left: calc(-200px / 2); /* margin-left: -100px; */
```



---

## 单位 (Unit)

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

## background



### 连写 (shorthand)

> [CSS background property](https://www.w3schools.com/cssref/css3_pr_background.asp)



### `bg-size` 的插入方法

- 如果没有 `bg-position` , 直接写即可

- 如果有, 要放在 `bg-position` 后面, 中间加一个 `/` . 如下示例中为 `cover`

```css
background: url("images/1.jpg") ncenter center / cover;
```

---

## text



### 文字阴影

> [CSS text-shadow property](https://www.w3schools.com/cssref/css3_pr_text-shadow.asp)

```css
text-shadow: 5px 5px 5px #000000; /* text-shadow: h-shadow v-shadow blur-radius color|none|initial|inherit; */
```



### 元素内的文字不换行

```css
white-space: nowrap;
```



### 限制一段文字的显示行数

- 谷歌浏览器 (webkit)

```css
overflow: hidden;  /* 配合 -webkit-line-clamp 使用, 多余文字不显示 */
text-overflow: ellipsis; /* 多余文字使用 "
display: -webkit-box; /* 配合 -webkit-line-clamp 使用 */
-webkit-line-clamp: 3; /* 限制行数为3行 */
-webkit-box-orient: vertical; /* 配合 -webkit-line-clamp 使用 */
```



---

## input系列 / 相关



### `<textarea>` 禁止改变大小

```css
resize: none;
```





---

## 选择器 (Selector)



### :first-child

- 只生效于其不仅是第一个child还是正确类型, 如果需要选择第一个当前类型则应使用 `:nth-of-type(x)`

```html
<div>
  <p></p>
  <span></span>
  <span></span>
</div>
```

```css
  span:first-child {} /* 无效, 因为div的第一个child不是span */
  span:nth-of-type(1) /* 应使用这个 */
```



### :not()

- `()` 中应用选择器, 可以去除一些不想应用样式的元素而给剩下的统一设置样式




---

## Border



### 动态添加边框导致内容移位的优化方法

- 先添加一个透明边框占位置, 再通过 `JavaScript` 添加类名覆盖

```css
ul>li {
  border: 2px solid transparent;
  box-sizing: border-box;
}

.current { /* 动态添加该类名即可添加边框 */
  border: 2px solid orange;
}
```



---

## Animation



### step

- 通过 `step(x)` 可以让一个动画分成 `x` 步来执行

```css
div {
  animation: show 2.5s steps(5) 1.5s forwards; /* 把show动画分成5步来进行 */
}

@keyframes show {
	from {
		width: 0;
	}
	to {
		width: 100px;
	}
}
```



---

## Overflow



### `scroll` 不显示滚动条

- `webkit` 内核浏览器

```css
&::-webkit-scrollbar {
		display: none;
}
```

- 其他浏览器
    1. 给父元素写死 `width` / `height`
    2. 给父元素设置 `overflow: hidden`
    3. 给滚动元素设置 `padding-bottom ` / `padding-right` 将滚动条挤出父元素



---

## Position



### `fixed` 可以将其他元素作为定位参考

- `position: fixed` 的元素会以父元素中有任意 `transform` / `perspective` / `filter` 值不为 `none` 的元素作为定位参考, 其他情况都参照视口



---

## flex-box



### 内容将容器撑大

- 使用 `flex-shrink` 无法解决, 需要给将 `flex` 容器撑大的元素设置 `min-width: 0`



---

## 移动端



### 禁用默认情况下移动端的事件

```css
touch-action: none;
```



---

## transform



### 更改形变中心点

- 使用 `transform-origin` 属性

```css
transform-origin: 50px 30px; /* 从左上角数 向右50像素, 向下30像素的位置 */
```



---

## 其他



### 查询是否需要添加私有前缀

> [Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/)



### `object-fit`

- 和 `background-size` 一样, 但可以应用于其他标签来调整元素中的内容, 比如 `<video>`

```css
video {
  object-fit: cover; /* 填满整个父元素 */
}
```



### 在不影响布局的情况下隐藏元素

```css
visibility: hidden;
```



### 将元素变模糊

```css
filter: blur(1px); /* 数值越大越模糊 */
```



### 进度条

```html
<head>
  <style>
    body {
      background: #000000;
    }

    .bar {
      width: 500px;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
    }

    .bar .line {
      width: 0;
      height: 100%;
      background: #ffffff;
      position: relative
    }

    .bar .line .dot {
      position: absolute;
      top: 50%;
      left: 100%;
      width: 14px;
      height: 14px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: #ffffff;
    }
  </style>
</head>
<body>
<div class="bar">
	<div class="line">
		<div class="dot"></div>
	</div>
</div>
</body>
```



### 让元素不触发事件 / 触发事件

- 如果父元素不触发事件, 那么子元素也不触发
- 如果想要父元素不触发但子元素触发, 则需要分别设置父元素为 `none` , 子元素为 `auto`

```css
pointer-events: none; /* 不触发事件 */
pointer-events: auto; /* 触发事件 */
```



### 元素宽度随着内容变化

```css
div {
  	width: fit-content;
}
```

