# 流程控制 (Flow Control)

## 定义 (Definition)

控制程序的运行流程

---

## 分类 (Classify)

| 结构名称 / Structure Name | 运行流程 / Execute Order                             |
| ------------------------- | ---------------------------------------------------- |
| 顺序结构                  | **默认**, 按照书写顺序从上至下执行每一条语句         |
| 选择结构                  | 对给定的条件进行判断, 根据判断结果决定执行哪一段代码 |
| 循环结构                  | 在给定条件成立的情况下, 反复执行某一段代码           |

---

## If



> [if...else - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)



### `if(exp) { ... }`



#### 格式

```js
if(expression) {
    // execute while expression === true;
}
```



#### 特点

- 当 `expression` 为 `true` 的时候就会执行 `{}` 中所有的代码, 且只执行一次



### `if(exp) { ... } else { ... }`



#### 格式

```js
if(expression) {
    // execute while expression === true
}
else {
    // execute while expression === false
}
```



#### 特点

- 当 `expression` 为 `true` 的时候就会执行 `if(exp)` 之后的 `{}` 中所有的代码, 且只执行一次
- 当 `expression` 为 `false` 的时候就会执行 `else` 之后的 `{}` 中所有的代码, 且只执行一次
- 两个 `{}` 只有一个会被执行, 且只执行一次



### `if(exp1) { ... } else if(exp2) { ... } else { ... }`



#### 格式

```js
if(expression1) {
	// execute while expression1 === true
}
else if(expression2) {
    // execute while expression2 === true
}
else {
    // execute while none of above is true
}
```



#### 特点

- 会从上至下依次判断每一个 `expression` , 哪一个满足, 就执行哪一个后面 `{}` 中的代码
- 如果所有 `expression` 都不满足, 就会执行 `else` 后面 `{}` 中的代码
- 所有 `{}` 只有一个会被执行, 且只执行一次



### 注意点

- 对于非Boolean类型的数据, 会先转换成Boolean再判断

	```js
	if(null) {
		console.log("A"); // not executed
	}
	console.log("B"); // executed
	```

- 对于 `==` / `===` 判断, 将常量写在前面

	```js
	let num = 10;
	// if(num == 5) { // 易打错成 if(num = 5) {
	if(5 == num) {
	    console.log("A"); // not executed
	}
	console.log("B"); // executed
	```

- `if` / `else if` / `else` 后面的大括号都可以省略, 但是只有紧随其后的一句语句受到控制

	```js
	if(false)
	    console.log("A"); // not executed
	console.log("B"); // executed
	```

- `;` 也是一条语句(空语句)

	```js
	if(false); { // 多打了个;导致if控制了下一条空语句(;)
	    console.log("A"); // executed
	    console.log("B"); // executed
	}
	```

- `if` 选择结构可以嵌套使用, 无限套娃

	```js
	if(true) {
	    if(false) {
	        console.log("A"); // not executed
	    }
	    else {
	        console.log("B"); // executed
	    }
	}
	else {
	    if(false) {
	        console.log("C"); // not executed
	    }
	    else {
	        console.log("D"); // not executed
	    }
	}
	```

- 当 `if` 选择结构省略大括号时, `else if` / `else` 会自动和距离最近并且没有被匹配过的 `if` 相匹配

	```js
	if(0)
		if(1)
	        console.log("A"); // not executed
		else
	        console.log("B"); // not executed
	else
	    if(1)
	        console.log("C"); // executed
		else
	        console.log("D"); // not executed
	```

- 如果条件满足后只有一句代码需要执行, 那么就使用 `?:` , 多句代码则使用 `if` 选择结构


---

## Switch



> [switch - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)



### 格式

```js
switch(exp) {
    case exp1: // 如果 exp === exp1, 则执行statement1, 其他的不执行, 如不相等, 继续比较 exp === exp2
        statement1;
        break;
    case exp2:
        statement2;
        break;
    .....
    default:
        statement; // 前面所有case都不匹配执行的代码
        break;
}
```



### 特点

- 从上至下依次判断每一个 `case` 是否和 `()` 中的 `expression` 结果相等 `===` , 如果相等就执行对应 `case` 后面的代码
- 如果所有的 `case` 都不匹配, 那么就会执行 `default` 后面的代码
- 所有的 `case` 和 `default` 只有一个会被执行, 并且只执行一次



### 注意点

- `case` 判断的是 `===` 而不是 `==`

	```js
	let num = 123;
	switch(num) {
	    case "123":
	        console.log("String123");
	        break;
	    case 123:
	        console.log("Number123"); // executed
	        break;
	    default:
	        console.log("Other");
	        break;
	}
	```

- `()` 中可以是变量, 常量, 或者表达式

- `case` 后面可以是变量, 常量, 或者表达式

- `break` 的作用是立即结束整个 `switch` 语句

- 一旦 `case` 或者 `default` 被匹配, 那么其他 `case` 和 `default` 都不会再进行判断, 会继续执行代码直到 `break`

- `default` 随便放什么位置都可以, 但是要注意上一行引起的连锁反应

- `default` 可以省略

- 对区间进行判断建议使用 [`if`](# if) , 对几个固定的值进行判断建议使用  `switch`

- 原则: 能用 `if` 就用 `if`

---

## While



> [while - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)



### 格式

```js
while(exp) {
    // execute while exp === true
}
```



### 特点

- 只有 `expression` 为 `true` 才会执行后面 `{}` 中的代码
- `{}` 中的代码有可能会被执行多次
- 每次执行完 `{}` 中的内容后, 再判断 `expression`, 如果结果还是 `true`, 则继续执行 `{}` 中的内容, 执行完再判断, 循环直到 `expression` 为 `false`



### 书写循环结构的规则

1. 先写上结构代码
2. 将需要重复执行的代码拷贝到 `{}` 中
3. 在 `()` 中指定循环的结束条件



### 注意点

- 死循环 (无限循环)

	```js
	while(true) {
	    // infinite loop
	}
	```

- 循环结构中的 `{}` 称之为**循环体**

- 对于非Boolean类型的数据, 会先转换成Boolean再判断, 同 [`if`](##If)

- `while` 后面的大括号都可以省略, 但是只有紧随其后的一句语句受到控制, 同 [`if`](##If)

- 不能在 `()` 后面写 `;`, 同 [`if`](##If)

---

## Do...while



> [do...while - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)



### 格式

```js
do {
    // code to be executed
}
while(exp);
```



### 特点

- 无论 `expression` 是否为 `true` , 循环体都会被执行一次
- 其他同 [`while`](##While)



### 注意点

- 大部分情况下 `while` 和 `do...while` 是可以互换的
- 如果循环体中的代码无论如何都需要先执行一次, 建议使用 `do...while` 循环
- 其他情况建议都使用 `while` 循环

---

## For



> [for - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)



### 格式

```js
for(initialize exp; condition exp; final exp) {
    // code to be executed
}
```



### 特点

- 只有 `condition expression` 为 `true` 才会执行后面 `{}` 中的代码
- `initialize expression` 首先执行并且只会执行一次
- 执行完 `{}` 中的内容后, 会执行 `final expression` , 然后再次判断 `condition expression` , 同 [`while`](##While)



### 注意点

- 由于 `for` 相比 `while` 更灵活, 所以尽量使用 `for`

- `()` 中的三个 `expression` 都可以不写, 如果不写就相当于 `while(1)`

	```js
	for(;;) {
		// infinite loop
	}
	```

- `condition expression` 可以省略, 默认就是 `true`

- 若使用 `let` 定义变量, 则每次执行完循环体后会定义一个新的变量

- 其它同 [`while`](##While)

---

## Break



> [break - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)



### 定义

立即结束当前的 `loop` 或 `switch` 



### 格式

```js
// break switch
let num = 123;
switch(num) {
    case 123:
        console.log("123");
        break; // terminate switch
    default:
        console.log("other");
        break;
}

// break loop
let num = 1;
while(num<=10) {
    console.log(num);
    num++;
    break; // terminate loop
}
```



### 注意点

- `break` 后面不能编写任何的语句, 因为永远不会执行

	```js
	while(1) {
	    console.log("123"); // executed
	    break; // terminate loop
	    console.log("123"); // not executed
	}
	```

- 如果在 `nested loops` 中, `break` 结束的是当前所在的 `loop`

	```js
	for(let i = 0; i < 5; i++) {
	    console.log("outer loop" + i);
	    for(let j = 0; j < 5; j++) {
	        console.log("inner loop" + j);
	        break; // terminate the inner loop, outer loop continues
	    }
	}
	```

---

## Continue



> [continue - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)



### 定义

立即跳过本次循环, 进入下一次循环



### 格式

```js
for(let num = 1; num <= 10; num++) {
    if(1 === num) {
        continue; // skip current loop and move to final-expression (num++) in this case
    }
    console.log(num); // 1 is not printed
}
```



### 注意点

- 只能用于 `loop`

- `continue` 后面不能编写任何的语句, 因为永远不会执行

	```js
	for(let num = 1; num <= 10; num++) {
	    if(1 === num) {
	        continue;
	        console.log(num); // will never execute
	    }
	    console.log(num);
	}
	```

- 如果在 `nested loops` 中, `continue` 跳过的是当前所在的 `loop`

	```js
	for(let i = 0; i < 5; i++) {
	    console.log("outer loop" + i);
	    for(let j = 0; j < 5; j++) {
	        if(1 === j) {
	            continue; // skip the current cycle of inner loop and move to j++, outer loop continues
	        }
	        console.log("inner loop" + j); // did not execute when j === 1
	    }
	}
	```

---

