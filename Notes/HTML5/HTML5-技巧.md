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



### 播放相关操作

预加载 / 获取视频 / 播放时长 / 监听音频正在播放 / 暂停 / 播放 / 监听音频播放完毕

- 同 `<video>`



获取 / 设置音量

- 取值为 `0~1`

```js
audioElement.volume; // 获取音量, 返回一个0~1的Number
audioElement.volume = value; // 设置音量, 取值为0~1
```



### 更换音频地址需要刷新才能播放新音频

```js
audioElement.load()
```



---

## `<video>`



### 播放相关操作

预加载

- `oncanplay` 事件表示视频加载完毕

```js
videoElement.oncanplay = function () {}
```



获取视频 / 播放时长

- 返回视频的时长 (s)

```js
videoElement.duration // 总时长
videoElement.currentTime // 当前时长
```



监听视频正在播放

```js
videoElement.ontimeupdate = function () {}
```



暂停 / 播放

```js
videoElement.play()
videoElement.pause()
```



监听视频播放完毕

```js
videoElement.onended = function() {}
```



视频全屏

- 兼容性写法

```js
function toFullVideo(videoDom){
  if(videoDom.requestFullscreen){
    return videoDom.requestFullscreen();
  }else if(videoDom.webkitRequestFullScreen){
    return videoDom.webkitRequestFullScreen();
  }else if(videoDom.mozRequestFullScreen){
    return videoDom.mozRequestFullScreen();
  }else if(videoDom.msRequestFullscreen){
    return videoDom.msRequestFullscreen();
  }
}
```

---

## `<form>`



### 提交数据

- 使用 `method` 属性定义 `get` / `post` 方法
- 给其中的 `input` 等元素添加 `name` 是属性

```html
<form action="#" method="post">
	<input type="text">
</form>
```



### 上传文件

- 使用 `POST` 方法

- 添加 `enctype` 属性, 值为 `multipart/form-data`

```html
<form action="#" method="post" enctype="multipart/form-data">
	<input type="file">
</form>
```

