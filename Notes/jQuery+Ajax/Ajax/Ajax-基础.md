# Ajax - 基础 (Basic)



## 定义

- 全称为 `Asynchronous JavaScript and XML` (异步的 `JavaScript` 和 `XML` )

- 在<span style="color:yellow">不重新加载整个页面的情况下</span>与服务器交换数据并更新部分网页

---

## 基本使用

1. 创建一个 `异步对象`
2. 设置请求方式和请求地址
3. 发送请求
4. 监听状态的变化
5. 处理返回的结果



### 创建 `异步对象`

```js
let ajaxObj = new XMLHttpRequest()
```



### 设置请求方式和请求地址

方法

- `open(method, url, async)`

作用

- 设置请求方式和请求地址

参数

- `method` : 请求的类型, `GET` 或者 `POST`
- `url` : 请求地址, 文件在服务器上的位置
- `async` : `true` 为异步, `false` 为同步

示例

```js
ajaxObj.open("GET", "ajaxFile.php", true)
```



### 发送请求

```js
ajaxObj.send();
```



### 监听状态的变化

`readyState` 列表

| readyState | Description              |
| ---------- | ------------------------ |
| 0          | 请求未初始化             |
| 1          | 服务器连接已建立         |
| 2          | 请求已接收               |
| 3          | 请求处理中               |
| 4          | 请求已完成, 且响应已就绪 |



`status` 列表

> [HTTP response status codes - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- 代表 `HTTP` 状态码

- 一般 `200 <= status < 300` 或者 `304` 就成功代表接收到服务器数据

- 其他的代表失败




判断数据成功返回

- 使用 `onreadystatechange` 事件
- 判断 `readyState` 为 `4`
- 判断 `status` 为 `200 <= status < 300` 或 `304`

```js
ajaxObj.onreadystatechange = function (event) {
  if(ajaxObj.readyState === 4) {
    if(ajaxObj.status >= 200 && ajaxObj.status < 300 || ajaxObj.status === 304) {
      // deal with data returned
    } else {
      // error message
    }
  }
}
```



### 处理返回的结果

`字符串` 类型

```js
ajaxObj.responseText
```

`XML` 类型

```js
ajaxObj.responseXML
```

---

## 封装



### `GET` 请求

`GET` 方法添加对象

```js
function ajax(url, obj, success, error) {
	// deal with obj
	let res = [];
	for(let key in obj) {
		res.push(`${key}=${obj[key]}`);
	}
	url = `${url}?${res.join("&")}`;
}
```



设置 `timeout` 时间

- `abort` 代表终止请求

```js
function ajax(url, obj, timeout, success, error) {
  // timeout > 0
  if(timeout) {
    timer = setInterval(function () {
      xhr.abort();
      clearInterval(timer);
    }, timeout);
  }
}
```



将 `URL` 里的中文转换成英文

- `URL` 中只能有字母 / 数字 / 下划线 / ASCII码

- 使用 `encodeURIComponent()`

```js
function ajax(url, obj, timeout, success, error) {
  // deal with obj
  let res = [];
  for(let key in obj) {
    res.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  url = `${url}?${res.join("&")}`;
}
```



代码

```js
/**
 * ajax function
 * @param {string} url - the URL that request send to
 * @param {Object} obj - the object representing key and value pairs in URL for GET HTTP request
 * @param {number} timeout - timeout time for the request in millisecond, 0 for never timeout
 * @param {Function} success - callback function on success
 * @param {Function} error - callback function on failure
 */
function ajax(url, obj, timeout, success, error) {
  // deal with obj
  let res = [];
  for(let key in obj) {
    res.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  url = `${url}?${res.join("&")}`;

  // ajax
  let xhr = new XMLHttpRequest();
  let timer;
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    if(xhr.readyState === 4) {
      clearInterval(timer);
      if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        success(xhr);
      } else {
        error(xhr);
      }
    }
  }

  // timeout > 0
  if(timeout) {
    timer = setInterval(function () {
      xhr.abort();
      clearInterval(timer);
    }, timeout);
  }
}
```



### `POST` 请求

`POST` 方法添加对象

```js
function ajax(url, obj, success, error) {
	// deal with obj
	let res = [];
	for(let key in obj) {
		res.push(`${key}=${obj[key]}`);
	}
	let requestHeader = res.join("&");
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(requestHeader);
}
```



### 封装结果

```js
/**
 * ajax function
 * @param {Object} option - an object including HTTP request type (either GET or POST), url, data, timeout, success callback function and error callback function
 */
function ajax(option) {
  // ajax
  let xhr = new XMLHttpRequest();
  let timer;

  // GET
  if(option.type.toUpperCase() === "GET") {
    // deal with obj
    let res = [];
    for(let key in option.data) {
      res.push(`${encodeURIComponent(key)}=${encodeURIComponent(option.data[key])}`);
    }
    option.url = `${option.url}?${res.join("&")}`;

    xhr.open(option.type, option.url, true);
    xhr.send();
  }
  // POST
  else if(option.type.toUpperCase() === "POST") {
    // deal with obj
    let res = [];
    for(let key in option.data) {
      res.push(`${encodeURIComponent(key)}=${encodeURIComponent(option.data[key])}`);
    }
    let requestHeader = res.join("&");

    xhr.open(option.type, option.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(requestHeader);
  }
  // invalid type
  else {
    console.log("Invalid ajax type: " + option.type);
    return;
  }

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      clearInterval(timer);
      if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        option.success(xhr);
      } else {
        option.error(xhr);
      }
    }
  }

  // timeout > 0
  if(option.timeout) {
    timer = setInterval(function () {
      xhr.abort();
      clearInterval(timer);
    }, option.timeout);
  }
}
```

---

## `XML`



### 格式

- 第一行必须是 `<?xml version="1.0" encoding="UTF-8" ?>`
- 必须要有一个根标签, 但是是什么都行 ( `HTML` 中的根标签为 `<html>` )
- `XML` 中的所有数据都写在一对标签中

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<person>
	<name>Tony</name>
  <age>24</age>
</person>
```



### 前端获取 `XML` 内容

- 通过 `PHP` 拿到 `XML` 文件内容

```php
header("content-type:text/xml; charset=utf-8"); // 有XML文件的情况下在顶部添加
file_get_contents("info.xml");
```

- 通过 `Ajax` 拿到 `PHP` 响应的数据
- 在前端通过 `xhr.responseXML` 获取
- 获取到的结果本质是一个 `document` , 可以使用 `JavaScript` 中操作 `document` 的方法进行处理

```js
success: function (xhr) {
  let res = xhr.responseXML;
  console.log(res.querySelector("name").innerHTML); // Tony
}
```





