# Animate.css



> [Animate.css | A cross-browser library of CSS animations.](https://animate.style/)
>
> [animate-css/animate.css: 🍿 A cross-browser library of CSS animations. As easy to use as an easy thing.](https://github.com/animate-css/animate.css)



## 定义

- a library of ready-to-use, cross-browser animations for use in your web projects. Great for emphasis, home pages, sliders, and attention-guiding hints



## 基本使用

- 引入 `Animate.css` 相关 `css` 文件

```html
<link rel="stylesheet" href="path/to/animate.css">
```

- 在需要做动画的元素上添加类名

    - 任何需要使用 `Animate.css` 来添加动画的, 都需要添加 `animate__animated`

    - 添加动画名称类名 比如 `animate__bounce`
    - 无限执行动画可使用 `animate__infinite`
    - 延迟执行可使用 `animate__delay-1s`

```html
<div class="animate__animated animate__bounce animate__infinite animate__delay-1s"></div>
```



## 自定义



### 动画重复次数

方法一

- 添加类名 `animate__repeat-1` 
- 修改元素的 `css` 中的 `--animate-repeat`

```html
<style>
  div {
    --animate-repeat: 4; /* 执行4次 */
  }
</style>
<body>
<div class="animate__animated animate__bounce animate__repeat-1"></div>
</body>
```

方法二

- 修改元素的 `css` 中的 `animation-iteration-count`

```html
<style>
  div {
    animation-iteration-count: 4; /* 执行4次 */
  }
</style>
<body>
<div class="animate__animated animate__bounce"></div>
</body>
```



### 动画延迟时间

方法一

- 添加类名 `animate__delay-1s` 
- 修改元素的 `css` 中的 `--animate-delay`

```html
<style>
  div {
    --animate-delay: 3s; /* 延迟3秒 */
  }
</style>
<body>
<div class="animate__animated animate__bounce animate__delay-1s"></div>
</body>
```

方法二

- 修改元素的 `css` 中的 `animation-delay`

```html
<style>
  div {
    animation-delay: 3s; /* 延迟3秒 */
  }
</style>
<body>
<div class="animate__animated animate__bounce"></div>
</body>
```



### 自定义动画

- 按照如下格式在 `css` 中自定义
- 添加对应类名

```css
@keyframes myFadeIn {
    from {
        opacity: 0;
        transform: scale(2);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
.animate__myFadeIn {
    -webkit-animation-name: myFadeIn;
    animation-name: myFadeIn;
}
```

