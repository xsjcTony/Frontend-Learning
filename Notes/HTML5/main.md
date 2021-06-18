# HTML5



## `<audio>`




### 谷歌浏览器自动播放解决方案



<span style="color: yellow;"><推荐></span> 方案一:

- 让用户和网页交互之后再播放

```js
let button = document.querySelector("button");
let audio = document.querySelector("audio");

button.onclick = function () {
  audio.play(); // 开始
}
```





方案二:

- 修改谷歌浏览器的配置

1. 在地址栏输入 `chrome://flags/`
2. 在搜索框输入: `autoplay`
3. 修改 `autoplay` 的选项为 `no user gesture is required`

