# axios



[axios/axios: Promise based HTTP client for the browser and node.js](https://github.com/axios/axios)



## 定义 / 特点

- 基于 `Promise` 的 `HTTP库` 网络请求插件
- 可以用在 `浏览器` 和 `Node.js` 中
- 支持 `Promise API`
- 自动转换 `JSON` 数据
- 客户端支持防御 `XSRF`



## 基本使用

基本格式

```js
axios.get(url, {data}).then().catch()
```



参数

`url` : 网络请求的地址

- `GET` 请求专递参数则直接写在 `url` 的后面, 形式为 `?key=value&key=value`

`data` : 一个 `对象` , 包含了 `POST` 请求所使用的数据



返回值

- 一个 `Promise对象`, 其中比较有用的有
    - `data` : 服务器返回的值 ( `JSON` 会自动转换成 `对象` )
    - `status` : 服务器的 `HTTP` 状态码
    - `statusText` : 服务器的 `HTTP` 状态信息



## `GET` 请求示例

- 文本

```php
// fetch.php
<?php
echo "Tony666";
```

```html
<script>
	axios.get("http://127.0.0.1/jQuery/axios.php")
    .then(res => console.log(res.data)) // Tony666
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
	axios.get("http://127.0.0.1/jQuery/axios.php?teacher=Tony&age=24")
    .then(res => console.log(res.data)) // {name: "Tony", age: "24"}
    .catch(error => console.log(error));
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
	axios.post("http://127.0.0.1/jQuery/axios.php")
    .then(res => console.log(res.data)) // Tony666
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
	axios.post("http://127.0.0.1/jQuery/axios.php", {
    teacher: "Tony",
    age: 24
  }).then(res => console.log(res.data)) // {name: "Tony", age: "24"}
    .catch(error => console.log(error));
</script>
```



## 全局默认值

定义

- `axios` 提供了很多请求配置
- 也提供了设置默认值的方法



格式

- `axios.defaults.key = value`
- 需要写在请求之前



示例

- 全局请求超时时间默认值, 单位为 `ms`

    ```js
    axios.defaults.timeout = 2000
    ```

- 全局请求根地址默认值, 再发送请求的时候就可以不用写了

    ```js
    axios.defaults.baseURL = "http://127.0.0.1"
    axios.get("/jQuery/axios.php")
    ```

