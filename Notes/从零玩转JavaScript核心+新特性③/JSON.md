# JSON (JavaScript Object Notation)



## 定义

- 一种轻量级的数据交换格式
- 基于 `ECMAScript` 的一个子集
- 采用完全独立于编程语言的文本格式来存储和表示数据



## 格式

- 本质是 `String` 版本的 `JavaScript` 对象
- `JSON` 本身是一个 `String`

```json
{"firstName": "Json"} // JSON对象
{firstName: "Json"} // JavaScript对象
```



## 注意点

- `JavaScript` 对象可以转换成 `JSON` , `JSON` 也可以转换成 `JavaScript` 对象

- `JSON` 中的 `key` 只能是 `String` , `value` 可以使任意 `JavaScript` 数据类型



## 转换

- `JavaScript` 对象转换为 `JSON`

    ```js
    JSON.stringify(obj);
    ```

- `JSON` 转换为 `JavaScript` 对象

    ```js
    JSON.parse(json);
    ```



## 示例

```js
// 定义一个JavaScript对象
let obj = {
  name: "tony",
  age: 24,
  gender: "man"
}

// 将JavaScript对象转换成JSON
let json = JSON.stringify(obj);
console.log(json); // {"name":"tony","age":24,"gender":"man"}
console.log(typeof json); // string

// 将JSON转换成JavaScript对象
let obj2 = JSON.parse(json);
console.log(obj2); // {name: "tony", age: 24, gender: "man"}
console.log(typeof obj2); // object
```



