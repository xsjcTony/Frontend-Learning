# fetch



> [WindowOrWorkerGlobalScope.fetch() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)



## 定义

- 基于 `Promise` 的网络请求方法
- \>=ES6
- 可以代替 `Ajax`



## 基本使用

基本格式

```js
fetch(url, {options}).then().catch()
```



参数

`url` : 网络请求的地址

- `GET` 请求专递参数则直接写在 `url` 的后面, 形式为 `?key=value&key=value`

`options` : 一个 `对象` , 包含了各项设置

- `method` : `post` 或 `get`
- `body` : `POST` 请求所使用的数据



返回值

- 一个 `Promise对象`, 类型为 `Response` , 其中比较有用的有
    - `text()` : 该网络请求返回的 `Promise` 值
    - `json()` : 该网络请求返回的 `Promise` 值从 `JSON` 转换为 `对象`



## `GET` 请求示例

- 文本

```php
// fetch.php
<?php
echo "Tony666";
```

```html
<script>
	fetch("http://127.0.0.1/fetch/fetch.php", {
    method: "get"
  }).then(res => res.text())
  	.then(data => console.log(data)) // 打印 Tony666
  	.catch(error => console.log(error));
</script>
```

- `JSON`

```php
// fetch.php
<?php
$teacher = $_GET["teacher"];
$age = $_GET["age"];
$arr = array("name"=>$teacher, "age"=>$age);
$data = json_encode($arr);
echo $data;
```

```html
<script>
	fetch("http://127.0.0.1/fetch/fetch.php?teacher=Tony&age=24", {
    method: "get"
  }).then(res => res.json())
  	.then(data => console.log(data)) // 打印 {name: "Tony", age: "24"}
  	.catch(error => console.log(error))
</script>
```



## `POST` 请求示例

- 文本

```php
// fetch.php
<?php
echo "Tony666";
```

```html
<script>
	fetch("http://127.0.0.1/fetch/fetch.php", {
    method: "post"
  }).then(res => res.text())
  	.then(data => console.log(data)) // 打印 Tony666
  	.catch(error => console.log(error));
</script>
```

- `JSON`

```php
// fetch.php
<?php
$rws_post = $GLOBALS["HTTP_RAW_POST_DATA"];
$mypost = json_decode($rws_post);
$teacher = (string)$mypost->teacher;
$age = (string)$mypost->age;
$arr = array("name"=>$teacher, "age"=>$age);
$data = json_encode($arr);
echo $data;
```

```html
<script>
	fetch("http://127.0.0.1/fetch/fetch.php", {
    method: "post",
    body: JSON.stringify({
      teacher: "Tony",
      age: 24
    })
  }).then(res => res.json())
  	.then(data => console.log(data)) // 打印 {name: "Tony", age: "24"}
  	.catch(error => console.log(error))
</script>
```



## 封装

```js
class EasyHttp {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      if(params instanceof Object) {
        let res = [];
        for(let key in params) {
          res.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        }
        url = `${url}?${res.join("&")}`;
      }
      fetch(url, {
        method: "get"
      }).then(res => resolve(res.json()))
        .catch(error => reject(error));
    })
  }
  static post(url, params) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "post",
        body: JSON.stringify(params)
      }).then(res => resolve(res.json()))
        .catch(error => reject(error));
    })
  }
}
```

