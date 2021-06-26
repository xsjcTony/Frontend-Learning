# Date



## MDN官方文档

> [Date - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)



## 获取当前时间

```js
let date = new Date();
console.log(date);
```



## 创建指定时间

```js
let date1 = new Date("2019-11-11 09:08:07");
// @param month The month as a number between 0 and 11 (January to December).
let date2 = new Date(2019, 11, 11, 9, 8, 7); // 月份会多一个月
```



## 获取年月日时分秒

```js
let date = new Date("2019-11-11 09:08:07");
console.log(date.getFullYear()); // 2019
console.log(date.getMonth()); // 10 (月份会少一个月所以需要+1)
console.log(date.getMonth() + 1); // 11
console.log(date.getDate()); // 11
console.log(date.getHours()); // 9
console.log(date.getMinutes()); // 8
console.log(date.getSeconds()); // 7
```



## 格式化

```js
let date = new Date("2019-11-11 09:08:07");
console.log(formatDate(date)); // 2019-11-11 9:8:7

function formatDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
```



## 计算时间差

```js
let curDate = new Date("2020-4-19 22:30:20");
let remDate = new Date("2020-4-30 00:00:00");

// 得到两个时间之间的差值(ms)
let differTime = remDate - curDate; // 原理为 remDate.valueOf() - curDate.valueOf()

// 得到两个时间之间的差值(s)
let differSecond = differTime / 1000;

// 相差的天数 = 相差的总秒数 / 每一天的秒数
let day = Math.floor(differSecond / (60 * 60 * 24));

// 相差的小时数 = 相差的总秒数 / 每小时的秒数 % 24
let hour = Math.floor(differSecond / (60 * 60) % 24);

	// 相差的分钟 = 相差的总秒数 / 每分钟的秒数 % 60
	let minute = Math.floor(differSecond / 60 % 60);

	// 相差的秒数 = 相差的总秒数 % 60
	let second = Math.floor(differSecond % 60);

	// 输出
	console.log(`相差${day}天${hour}小时${minute}分钟${second}秒`); // 相差10天1小时29分钟40秒
```



## 常用方法 (Methods)



### `Date.now()`



> [Date.now() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)



作用

- 获取当前时间距离1970年1月1日的毫秒值

格式

```js
Date.now()
```

返回值

- 当前时间距离1970年1月1日的毫秒值

示例

```js
console.log(Date.now());
// 或通过
let date = new Date();
console.log(date.valueOf());
```



