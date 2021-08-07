# PHP - 基础语法 (Basic Syntax)



## 使用方法

- `PHP` 是后端语言, 所以必须要放到服务器上才能使用

---

## 基本结构

```php
<?php
  // codes
?>
```

---

## 执行结果有中文

- 在顶部加上如下代码指定字符集

```php
header("content-type:text/html; charset=utf-8");
```

---

### 执行结果有 `XML`

- 在顶部加上如下代码

```php
header("content-type:text/html; charset=utf-8");
```

---

## 注释



单行注释

```php
// comment
```



多行注释

```php
/*
multi
line
comment
*/
```

---

## 变量



定义变量

- 使用 `$` 符号开头

```php
$variable = 10;
```



命名规范

- 和JavaScript一样

---

## 打印内容

- 使用 `echo` 关键字

```php
echo $variable;
```

---

## 集合



数组

```php
$arr = array(1, 3, 5);
echo $arr[0]; // 1
echo count($arr); // array 长度 // 
```



字典 (对象)

```php
$dict = array("name"=>"tony", "age"=>"24");
echo $dict["name"]; // tony
```



注意点

- 在 `PHP` 中 `echo` 不能输出 `数组` 和 `字典 (对象)`
- 要使用 `print_r()`

```php
print_r($arr);
```

---

## 分支循环

- 和JavaScript一模一样
- 包括 `if` / `switch` / `ternary` / `for` / `while` 等

---

## 网络请求



### `GET` 请求

- 无接到 `URL` 后面

```php
$_GET;
$_GET["userName"];
```



### `POST` 请求

- 会将提交的数据放到请求头中

```php
$_POST;
$_POST["userName"];
```

---

### 异同

相同点

- 都会将数据提交到远程服务器

不同点

- 提交数据存储的位置不同
    - `GET` 请求会将数据放到URL后面
    - `POST` 请求会将数据放到请求头中
- 提交数据的大小限制不同
    - `GET` 请求的数据大小不能大于2000个字符
    - `POST` 请求的数据大小没有限制

---

### 应用场景

- `GET` 请求适用于提交非敏感数据和小数据
- `POST` 请求适用于提交敏感数据 (密码) 和大数据

---

## 文件上传



超全局变量 `$_FILE` 

- 假设 `HTML` 中 `<input>` 标签的 `name` 为 `upload`

```html
<form action="#" method="post" enctype="multipart/form-data">
	<input type="file" name="upload">
</form>
```

```php
$_FILES["upload"]["name"]; // 文件名
$_FILES["upload"]["type"]; // 文件类型
$_FILES["upload"]["tmp_name"]; // 文件临时路径
$_FILES["upload"]["error"]; // 错误码
$_FILES["upload"]["size"]; // 文件大小
```



保存需要使用的文件

- 将文件从临时目录复制到指定目录
- `.` 代表字符串拼接

```php
move_uploaded_file($_FILES["upload"]["tmp_name"], "./new_location/" . $_FILES["name"]);
```



大文件上传

1. 在 `apache` 文件夹中找到 `php.ini`
2. 修改 `file_uploads = ` 为 `On`
3. 修改 `upload_max_filesize = ` 为想要的数值, 比如 `2084M`

4. 修改 `post_max_size = ` 为想要的数值, 比如 `2084M`
5. 修改 `max_execution_time = ` 为想要的数值, 比如 `30000`
6. 修改 `max_input_time = ` 为想要的数值, 比如 `30000`
7. 修改 `memory_limit = ` 为想要的数值, 比如 `2048M`



