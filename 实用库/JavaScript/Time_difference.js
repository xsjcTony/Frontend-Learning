let curDate = new Date("2020-4-19 22:30:20");
let remDate = new Date("2020-4-30 00:00:00");

// 得到两个时间之间的差值(ms)
let differTime = remDate - curDate; // 原理为 remDate.valueOf() - curDate.valueOf()

// 得到两个时间之间的差值(s)
let differSecond = differTime / 1000;

// 相差的天数 = 相差的总秒数 / 每一天的秒数
let day = Math.floor(differSecond / (60 * 60 * 24));
day = day >= 10 ? day : "0" + day;

// 相差的小时数 = 相差的总秒数 / 每小时的秒数 % 24
let hour = Math.floor(differSecond / (60 * 60) % 24);
hour = hour >= 10 ? hour : "0" + hour;

// 相差的分钟 = 相差的总秒数 / 每分钟的秒数 % 60
let minute = Math.floor(differSecond / 60 % 60);
minute = minute >= 10 ? minute : "0" + minute;

// 相差的秒数 = 相差的总秒数 % 60
let second = Math.floor(differSecond % 60);
second = second >= 10 ? second : "0" + second;

// 输出
// return `相差${day}天${hour}小时${minute}分钟${second}秒`