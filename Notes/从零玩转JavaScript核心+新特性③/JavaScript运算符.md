# 运算符

## 定义 (Definition)

JavaScript中的运算符是告诉程序执行特定算数或逻辑操作的符号



### 表达式

利用运算符链接在一起的有意义, 有结果的语句



### 操作数

`a+b` 中, `a` 和 `b` 均为操作数

---

## 分类 (Classify)



### 按功能分类

- 算数运算符
- 位运算符
- 关系运算符
- 逻辑运算符



### 按操作数的个数分类

- 单目运算, 只有一个操作数, 比如 `i++` `!`
- 双目运算, 有两个操作数, 比如 `a+b`
- 三目运算, 也称为**问号表达式**, 比如 `a>b ? 1 : 0`

---

## 优先级和结合性 (Precedence and Associativity)



### 优先级

在JavaScript中, 运算符优先级共分15级, 1级最高, 15级最低



### 结合性

- 左结合性, 从左至右运算

- 右结合性, 从右至左运算



### 优先级&结合性表格

| 等级 / Level | 运算符 / Operator                      | 描述 / Description                 | 英文 / English                                               | 结合性 / Associativity                 |
| ------------ | -------------------------------------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| 1            | `()`                                   | 表达式分组                         | Grouping                                                     | N/A                                    |
| 2            | `++` , `--` , `- `, `~` , `!`          | 一元运算符                         | Unary operators                                              | <span style="color: red">R => L</span> |
| 3            | `*` , `/` , `%`                        | 乘法, 除法, 取模                   | Multiplication, Division, Remainder / Modulus                | L => R                                 |
| 4            | `+` , `-` , `+`                        | 加法, 减法, 字符串连接             | Addition, Subtraction, String concatenation                  | L => R                                 |
| 5            | `<<` , `>>` , `>>>`                    | 移位                               | Bitwise                                                      | L => R                                 |
| 6            | `<` , `<=` , `>` , `>=`                | 小于, 小于等于, 大于, 大于等于     | Less than, Less than or equal, Greater than, Greater than or equal | L => R                                 |
| 7            | `==` , `!=` , `===` , `!==`            | 等于, 不等于, 严格相等, 非严格相等 | Equality, Inequality, Strict Equality, Strict Inequality     | L => R                                 |
| 8            | `&`                                    | 按位与                             | Bitwise AND                                                  | L => R                                 |
| 9            | `^`                                    | 按位异或                           | Bitwise XOR                                                  | L => R                                 |
| 10           | `|`                                    | 按位或                             | Bitwise OR                                                   | L => R                                 |
| 11           | `&&`                                   | 逻辑与                             | Logical AND                                                  | L => R                                 |
| 12           | `||`                                   | 逻辑或                             | Logical OR                                                   | L => R                                 |
| 13           | `?:`                                   | 条件                               | Conditional operator                                         | <span style="color: red">R => L</span> |
| 14           | `=` , `+=` , `-=` , `*=` , `/=` , `%=` | 赋值运算                           | Assignment                                                   | <span style="color: red">R => L</span> |
| 15           | `,`                                    | 多重求值                           | Multiple evaluation                                          | L => R                                 |

> [Operator precedence - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
>
> [Operator precedence and associativity in JavaScript](http://www.scriptingmaster.com/javascript/operator-precedence.asp)

---

## 算数运算符 (Arithmetic Operator)



### 定义

`+` , `- ` , `*` , `/` , `%`



### 优先级&结合性

| 等级 / Level | 运算符 / Operator | 结合性 / Associativity |
| ------------ | ----------------- | ---------------------- |
| 1            | `*` , `/` , `%`   | L => R                 |
| 2            | `+` , `-`         | L => R                 |



### 格式

- `value operator value`

```js
let num1, num2;
num1 = 3;
num2 = 5;
let result = num1 + num2; // 常量变量均可进行运算
console.log(result); // 8

// 取模运算 Remainder / Modulus
let result = 10 % 3; // 10 ÷ 3 = 3 余 1
console.log(result); // 1
```



### 注意点

- #### 加法运算 `+`

	- 任何非Number的数据在参与加法运算之前, 都会被自动转换成Number, 再参与运算

		```js
		let res = 1 + true; // let res = 1 + 1;
		let res = 1 + null; // let res = 1 + 0;
		```

	- 任何数据和NaN进行运算, 结果都是NaN

		```js
		let res = 1 + NaN;
		console.log(res); // NaN
		```

	- 任何数据和String相加, 都会被先转换成String之后再运算

		```js
		let res = 1 + "123"; // let res = "1" + "123"
		console.log(res); // 1123
		```

- #### 减法运算 `-`

  - 任何非Number的数据在参与减法运算之前, 都会被自动转换成Number, 再参与运算

    ```js
    let res = 1 - true; // let res = 1 - 1;
    let res = 1 - null; // let res = 1 - 0;
    ```

  - 任何数据和NaN进行运算, 结果都是NaN

  	```js
  	let res = 1 - NaN;
  	console.log(res); // NaN
  	```

  - 任何数据和String相减, 都会把String先转换成Number之后再运算

  	```js
  	let res = 1 - "123"; // let res = 1 - 123
  	console.log(res); // -122
  	```


- #### 乘法运算 `*`

	- 同[减法运算](#减法运算 )

- #### 除法运算 `/`

	- 同[减法运算](#减法运算 )

- #### 取模(取余)运算 `%`

	- 格式 `m % n = Remainder`

	- 如果 `m > n` , 那么正常取余

	- 如果 `m < n` , 那么结果就是 `m`

	- 如果 `n = 0` , 那么结果就是NaN

		```js
		let res = 3 % 0; // m = 3, n = 0
		console.log(res); // NaN
		```

	- 运算结果的正负性取决于 `m`

		```js
		let res = 10 % 3 // 1
		let res = 10 % -3 // 1
		let res = -10 % 3 // -1
		```

---

## 赋值运算符 (Assignment Operator)



### 定义

将等号右边的值储存到等号左边的变量中

```js
let res = 5;
res += 5; // 相当于 res = res + 5
res -= 5; // 相当于 res = res - 5
res *= 5; // 相当于 res = res * 5
res /= 5; // 相当于 res = res / 5
res %= 5; // 相当于 res = res % 5
```



### 分类

| 简单类型 | `=`                              |
| -------- | -------------------------------- |
| 复杂类型 | `+=` , `-=` , `*=` , `/=` , `%=` |



### 优先级&结合性

- 优先级低于算术运算符

	```js
	let res = 1 + 1 // 先计算1 + 1, 再赋值给res
	```

- 右结合性: `R => L`

	```js
	let num1, num2;
	num1 = num2 = 3; // 先将3赋值给num2, 再将num2的值赋值给num1
	```

	

### 注意点

- 赋值运算符左边只能放变量, 不能放常量

---

## 自增自减运算符 (Increment / Decrement Operator)



### 定义

`++` , `--`

快速对一个变量中的数据进行 `+1` / `-1` 操作



### 格式

`value++` / `value--` / `++value` / `--value`

```js
let num = 5;
num++; // num = num + 1
```



### Prefix / Postfix

- Prefix `++value` / `--value` 意思是先自增或自减, 再参与其他的运算

	```js
	let num = 1;
	let res = ++num = 1; // num++; let res = num + 1
	console.log(res); // 3
	```

- Prefix `value++` / `value--` 意思是先参与其他的运算, 再自增或自减

	```js
	let num = 1;
	let res = num++ + 1; // let res = num + 1; num++;
	console.log(res); // 2
	```



### 注意点

- 自增自减运算符只能出现在变量前后, 不能出现在常量或表达式的前后

	```js
	let num = 1;
	++num; // valid
	num--; // valid
	
	--666; // invalid
	666++; // invalid
	
	(1 + 1)++; // invalid
	--(1 + 1); // invalid
	```

- 企业开发中自增自减运算符最好单独出现, 不要出现在表达式中

	```js
	let a, b;
	a = 10;
	b = 5;
	
	// 不推荐
	let res = a++ + b; // let res = a + b; a++;
	console.log(res); // 15
	console.log(a); // 11
	
	// 推荐
	let res = a + b;
	a++;
	console.log(res); // 15
	console.log(a); // 11
	```

---

## 关系运算符 (Retional Operator)



### 定义

`<` , `<=` , `>` , `>=` , `==` , `!=` , `===` , `!==`



### 返回值

- 关系成立则返回 `true` 
- 关系不成立则返回 `false`



### 优先级&结合性

| 等级 / Level | 运算符 / Operator           | 结合性 / Associativity |
| ------------ | --------------------------- | ---------------------- |
| 1            | `<` , `<=` , `>` , `>=`     | L => R                 |
| 2            | `==` , `!=` , `===` , `!==` | L => R                 |

```js
let res = 10 == 10 > 0; // let res = 10 == true; let res = 10 == 1
console.log(res); // false
```



### 注意点

- 对于非Number的数据, 会先转换成Number, 再进行判断

	```js
	let res = 1 > true; // let res = 1 > 1;
	console.log(res); // false
	```

- 任何数据使用关系运算符和 `NaN` 进行任何比较, 返回值都是 `false`

	```js
	let res = 666 > NaN;
	console.log(res); // false
	```

- 如果参与比较的都是String, 那么不会转换成Number, 会直接比较自负对应的Unicode编码

	```js
	let res = "a" > "b"; // let res = 0061 > 0062
	console.log(res); // false
	
	// 如果字符串中有多个字符, 那么会从左到右依次比较直到条件不满足
	let res = "ab" > "ac"; 
	console.log(res); // false
	```

	> [Unicode编码转换](https://unicode-table.com/)

- **特殊比较**

	```js
	let res = null == 0; // false
	let res = undefined == 0; // false
	let res = null == undefined; // true
	let res = NaN == NaN; // false
	```

- 判断数值是否为 `NaN`

	```js
	let num = NaN;
	let res = isNaN(num);
	console.log(res);
	```

- `==` 只会判断取值是否相等, 不会判断数据类型是否相等, 但是 `===` 两个都会判断, 都相等才返回 `true`

	```js
	let res = 123 == "123"; // true
	let res = 123 === "123"; // false
	let res = 123 != "123"; // false
	let res = 123 !== "123"; // true
	```

- 因为左结合性: `L => R` , 所以不能用来判断区间

	```js
	let res = 10 > 5 > 3; // let res = true > 3; let res = 1 > 3;
	console.log(res); // false
	
	let res = 10 <= 25 <= 20 // let res = true <= 20; let res = 1 <= 20;
	console.log(res); // true
	```

---

## 逻辑运算符 (Logical Operator)



### 定义

`&& ` , `||` , `!`



### 优先级&结合性

| 等级 / Level | 运算符 / Operator | 结合性 / Associativity |
| ------------ | ----------------- | ---------------------- |
| 1            | `&&`              | L => R                 |
| 2            | `||`              | L => R                 |

```js
let res = true || false && false; // let res = true || false;
console.log(res); // true
```



### 返回值

- `true`
- `false`



### 逻辑与 `&&`

#### 格式

- `ExpressionA && ExpressionB`

	```js
	let res = (10 > 5) && (20 > 10); // let res = true && true
	console.log(res); // true
	```

#### 特点

- 一假则假

	```js
	let res = true && true; // true
	let res = true && false; // false
	let res = false && true; // false
	let res = false && false; // false
	```

	

### 逻辑或 `||`

#### 格式

- `ExpressionA || ExpressionB`

	```js
	let res = (10 < 5) || (20 > 10); // let res = false || true
	console.log(res); // true
	```

#### 特点

- 一真则真

	```js
	let res = true && true; // true
	let res = true && false; // true
	let res = false && true; // true
	let res = false && false; // false
	```



### 逻辑非 `!`

#### 格式

- `!Expression`

	```js
	let res = !(20 > 10); // let res = !true
	console.log(res); // false
	```

#### 特点

- 真变假, 假变真

	```js
	let res = !true; // false
	let res = !false; // true
	```



### 注意点

- 在逻辑运算中如果不是Boolean, 那么会先转换成Boolean, 再参与其他运算

	```js
	let res = !0; // let res = !false
	console.log(res); // true
	```

- 在 `&&` 中, 如果参与运算的不是Boolean, 那么返回值特点为

	- `ExpressionA && ExpressionB`
	- 如果 `ExpressionA` 为 `false` , 那么返回 `ExpressionA`
	- 如果 `ExpressionA` 为 `true`, 那么无论 `ExpressionB` 成立与否, 都返回 `ExpressionB` 

	```js
	let res = 0 && 123; // 0
	let res = null && 123; // null
	let res = 1 && 123; // 123
	let res = 1 && null; // null
	```

- 在 `||` 中, 如果参与运算的不是Boolean, 那么返回值特点为

	- `ExpressionA || ExpressionB`
	- 如果 `ExpressionA` 为 `true` , 那么返回 `ExpressionA`
	- 如果 `ExpressionA` 为 `false`, 那么无论 `ExpressionB` 成立与否, 都返回 `ExpressionB` 

	```js
	let res = 666 || 0; // 666
	let res = 0 || 123; // 123
	let res = 0 || null; // null
	```



### 逻辑短路 (Logical short-circuit)

- 在 `ExpressionA && ExpressionB` 中, 如果 `ExpressionA` 为 `false` , 那么 `ExpressionB` 就不会运算

	```js
	let num = 1;
	let res = (10 > 20) && (++num > 0); // let res = false && (++num > 0);
	console.log(num); // 由于++num没有执行, 所以输出1
	console.log(res); // false
	```

- 在 `ExpressionA || ExpressionB` 中, 如果 `ExpressionA` 为 `true` , 那么 `ExpressionB` 就不会运算

	```js
	let num = 1;
	let res = (10 < 20) && (++num > 0); // let res = true && (++num > 0);
	console.log(num); // 由于++num没有执行, 所以输出1
	console.log(res); // true
	```

---

## 逗号运算符 (Comma Operator)



### 定义

`,`



### 格式

- 利用 `,` 同时定义多个变量: `let a, b;`
- 利用 `,` 同时给多个变量赋值: `a = 10, b = 5;`



### 优先级&结合性

- 优先级是所有运算符中**最低的**
- 左结合性: `L => R`



### 返回值

- `,` 的运算结果就是最后一个表达式的结果

	```js
	let res = ((1 + 1), (2 + 2), (3 + 3));
	console.log(res); // 6
	```

---

## 三目(条件)运算符 (Ternary (Conditional) Operator)



### 定义

`?:`



### 格式

- `Expression ? ResultA : ResultB;`



### 返回值

- 当 `Expression` 为 `true` 的时候, 返回 `ResultA` 

- 当 `Expression` 为 `false` 的时候, 返回 `ResultB` 

	```js
	let res = true ? 123 : 456;
	console.log(res); // 123
	
	let res = false ? 123 : 456;
	console.log(res); // 456
	```



### 注意点

- `?` 和 `:` 不能单独出现, 要么一起出现, 要么一起不出现

---

## 奇淫技巧



### 交换 `a` 和 `b` 的数值

```js
let a = 10, b = 5;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b); // a = 5, b = 10
```

