# JSONP (JSON with Padding)



## 定义

- 让网页从别的跨域地址获取资料, 即跨域读取数据

---

## 原理

1. 在同一个界面中可以定义多个 `<script>` 标签
2. 同一个界面中多个 `<script>` 标签中的数据可以相互访问
3. 可以通过 `<script>` 的 `src` 属性导入其他资源
4. 通过 `src` 属性导入其他资源的本质就是将资源拷贝到 `<script>` 标签中
5. `<script>` 标签的 `src` 属性不仅能导入本地资源, 还能导入远程资源
6. `<srcipt>` 标签的 `src` 属性没有同源限制, 所以可以通过其请求跨域的数据

---

## 优化



### 优化一

- 在企业开发中通过 `JSONP` 来获取跨域的数据, 一般服务器返回的都不会是一个变量, 而是一个函数的调用

```html
<!-- index.html -->
<script>
	function demo(data) {
    console.log(data);
  }
</script>
<script src="http://127.0.0.1:80/jsonp/jsonp.php"></script>
```

```php
// jsonp.php
<?php
echo "demo(666);";
```



### 优化二

- 在获取跨域数据的时候通过 `GET` 请求告诉服务器我定义的方法是什么, 以防写死

```html
<!-- index.html -->
<script>
	function test(data) {
    console.log(data);
  }
</script>
<script src="http://127.0.0.1:80/jsonp/jsonp.php?cb=test"></script>
```

```php
// jsonp.php
<?php
$cb = $_GET["cb"];
echo $cb . "(666);";
```



### 优化三 (最终版)

- `<script>` 默认是同步的, 前面的没加载完数据后面的就不会被执行, 所以请求数据的 `<script>` 标签必须放在后面
- 可以通过 `JavaScript` 动态创建 `<script>` 标签, 默认是异步的

```html
<!-- index.html -->
<script>
	let scriptTag = document.createElement("script");
  scriptTag.src = "http://127.0.0.1:80/jsonp/jsonp.php?cb=test";
  document.body.appendChild(scriptTag);
  
  function test(data) {
    console.log(data);
  }
</script>
```

```php
// jsonp.php
<?php
$cb = $_GET["cb"];
echo $cb . "(666);";
```

---

## `jQuery` 中的使用

- 给对象中加上 `dataType: "jsonp"` 即可, 告知需要请求跨域数据
- 可选加上 `jsonp: "callback"` , 告知服务器在获取回调函数名称的时候需要用什么 `key` 来获取
- 可选加上 `jsonpCallback: "test" , 告知服务器在获取回调函数名称的时候, 回调函数的名称是什么
- `success` 中的 `msg` 即为服务端回调函数中的 `参数`

```html
<script src="jquery.js"></script>
<script>
	$.ajax({
    url: "http://127.0.0.1:80/jsonp/jsonp.php",
    dataType: "jsonp",
    jsonp: "cb",
    jsonpCallback: "test",
    success: function(msg) {
      console.log(msg); // 666
    }
  })
</script>
```

```php
// jsonp.php
<?php
$cb = $_GET["cb"]; // test
echo $cb . "(666);";
```

---

## 封装

```js
function jsonp(options) {
  options = options || {};
  let callbackName = ("jQuery" + Math.random()).replace(".", "");

  let url = options.url;
  // jsonp key specified
  if(options.jsonp) {
    url += "?" + options.jsonp + "=";
  } else {
    url += "?callback=";
  }
  // jsonp value specified
  if(options.jsonpCallback) {
    callbackName = options.jsonpCallback;
  }
  url += callbackName;
  // data specified
  if(options.data) {
    url += "&" + objToStr(options.data);
  }
  // get CORS data
  let scriptTag = document.createElement("script");
  scriptTag.src = url;
  document.body.appendChild(scriptTag);
  // define callback function
  window[callbackName] = function (data) {
    // delete used script tag
    document.body.removeChild(scriptTag);
    options.success(data);
  }

  function objToStr(obj) {
    obj.t = (Math.random() + "").replace(".", "");
    let arr = [];
    for(let key in obj) {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
    return arr.join("&");
  }
}
```

---

