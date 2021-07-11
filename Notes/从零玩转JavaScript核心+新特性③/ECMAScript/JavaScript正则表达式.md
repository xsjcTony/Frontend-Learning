# 正则表达式 (Regular Expression)



> [RegExp - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)



## 定义

- 对 `String` 操作的一种逻辑公式



## 作用

- 在 `String` 中查找是否包含指定 `String`
- 在 `String` 中"提取"指定 `String`
- 对 `String` 中指定的内容进行 "替换"



## 匹配 (查找)

```js
let str = "123abc456";

let reg = new RegExp("a");
console.log(reg.test(str)); // true
let reg2 = new RegExp("A");
console.log(reg2.test(str)); // false
let reg3 = new RegExp("A", "i"); // 第二个参数为 "i" 意思是不区分大小写
console.log(reg3.test(str)); // true

let str2 = "abc2020-3-11def";
let str3 = "abc202-3-11def";

// 构造函数
let reg4 = new RegExp("\\d{4}-\\d{1,2}-\\d{1,2}");
console.log(reg4.test(str2)); // true
console.log(reg4.test(str3)); // false

// 字面量
let reg5 = /\d{4}-\d{1,2}-\d{1,2}/;
console.log(reg5.test(str2)); // true
console.log(reg5.test(str3)); // false
```



## 提取

```js
let str = "abc2020-3-11def";
let str2 = "abc2020-3-11def2019-11-11fdfsdf";
let reg = /\d{4}-\d{1,2}-\d{1,2}/;
let reg2 = /\d{4}-\d{1,2}-\d{1,2}/g;

console.log(str.match(reg)); // ["2020-3-11"]
console.log(str2.match(reg)); // ["2020-3-11"] // 默认找到第一个就停止
console.log(str2.match(reg2)); // ["2020-3-11", "2019-11-11"] // 最后加上g为全局匹配
```



## 替换

```js
let str = "abc2020-3-11def2019-11-11fdfsdf";
let reg = /\d{4}-\d{1,2}-\d{1,2}/g;

console.log(str.replace(reg, "it666")); // "abcit666defit666fdfsdf"
```



## 常用正则表达式大全

```
验证数字：^[0-9]*$
验证n位的数字：^\d{n}$
验证至少n位数字：^\d{n,}$
验证m-n位的数字：^\d{m,n}$
验证零和非零开头的数字：^(0|[1-9][0-9]*)$
验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
验证非零的正整数：^\+?[1-9][0-9]*$
验证非零的负整数：^\-[1-9][0-9]*$
验证非负整数（正整数 + 0）  ^\d+$
验证非正整数（负整数 + 0）  ^((-\d+)|(0+))$
验证长度为3的字符：^.{3}$
验证由26个英文字母组成的字符串：^[A-Za-z]+$
验证由26个大写英文字母组成的字符串：^[A-Z]+$
验证由26个小写英文字母组成的字符串：^[a-z]+$
验证由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
验证由数字、26个英文字母或者下划线组成的字符串：^\w+$

验证用户密码:^[a-zA-Z]\w{5,17}$ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
验证是否含有 ^%&',;=?$\" 等字符：[^%&',;=?$\x22]+
验证汉字：^[\u4e00-\u9fa5],{0,}$
验证Email地址：^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
验证InternetURL：^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$
验证电话号码：^(\d3,4|\d{3,4}-)?\d{7,8}$：--正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
验证身份证号（15位或18位数字）：^\d{15}|\d{}18$
验证一年的12个月：^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12”
验证一个月的31天：^((0?[1-9])|((1|2)[0-9])|30|31)$    正确格式为：01、09和1、31。
整数：^-?\d+$
非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$
正浮点数   ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$
负浮点数  ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
浮点数  ^(-?\d+)(\.\d+)?$
```

