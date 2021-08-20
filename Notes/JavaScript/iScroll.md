# iScroll



> [Iscrolljs](https://iscrolljs.com/)
>
> [cubiq/iscroll: Smooth scrolling for the web](https://github.com/cubiq/iscroll)
>
> [iScroll 5 介绍 · iScroll 5 API 中文版](http://caibaojian.com/iscroll-5/)



## 定义

- 高性能, 资源站用少, 无依赖, 多平台的JavaScript滚动插件



## 版本

- `iscroll.js` : 这个版本是常规应用的脚本, 它包含大多数常用的功能, 有很高的性能和很小的体积
- `iscroll-lite.js` : 精简版本, 它不支持快速跳跃, 滚动条, 鼠标滚轮, 快捷键绑定, 但如果你所需要的是滚动 (特别是在移动平台), iScroll精简版 是又小又快的解决方案
- `iscroll-probe.js` : 探查当前滚动位置是一个要求很高的任务, 这就是为什么我决定建立一个专门的版本, 如果你需要知道滚动位置在任何给定的时间,这是iScroll给你的 (我正在做更多的测试,这可能最终在常规iscroll.js脚本, 请留意)
- `iscroll-zoom.js` : 在标准滚动功能上增加缩放功能
- `iscroll-infinite.js` : 可以做无限缓存的滚动, 处理很长的列表的元素为移动设备并非易事, iScroll infinite版本使用缓存机制, 允许你滚动一个潜在的无限数量的元素

- `iScroll` 使用模块化开发, 可以使用 `Node.js` 自行打包



## 基本使用

- 引入 `iScroll`

```html
<script src="js/iscroll.js"></script>
```

- 定义一个三层嵌套关系
- 创建 `iScroll对象` , 告诉他谁需要滚动, 为三层关系的最外一层

```html
<body>
<div id="wrapper">
	<ul>
    <li></li>
    <li></li>
  </ul>
</div>
</body>
<script>
	let myScroll = new IScroll('#wrapper')
</script>
```



## 高级使用



### 启用鼠标滚轮

- 在创建 `iScroll对象` 时, 额外传入一个对象, 包含 `mouseWheel: true`

```js
let myScroll = new IScroll('#wrapper', {
  mouseWheel: true
})
```



### 滚动条

基本使用

- 在创建 `iScroll对象` 时, 额外传入一个对象, 包含 `scrollbars: true`
- 将启用滚动的元素设定为相对定位 `position: relative`

```html
<style>
    div {
        position: relative;
    }
</style>
<body>
<div id="wrapper">
	  <ul>
        <li></li>
        <li></li>
    </ul>
</div>
</body>
<script>
	let myScroll = new IScroll('#wrapper', {
    scrollbars: true
  })
</script>
```

自定义滚动条样式

- 先将对象内的内容设置为 `scrollbars: 'custom'`
- 再根据文档说明在 `css` 中通过 `class` 名称自定义滚动条

> [iScroll 5 滚动条 · iScroll 5 API 中文版](http://caibaojian.com/iscroll-5/scrollers.html)



### 自定义事件

> [iScroll 5 自定义事件 · iScroll 5 API 中文版](http://caibaojian.com/iscroll-5/customevents.html)

- `iScroll` 中有一些可以挂靠的自定义事件, 通过 `myScroll.on(type, fn)` 的方式来注册事件
- 事件列表见文档