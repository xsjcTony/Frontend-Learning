# 面向对象 (Object-Oriented)



## 定义

`面向对象` 关注的是解决问题需要哪些对象, `面向过程` 关注的是解决问题需要哪些步骤



## 类 (Class)

- 用来描述一类事物
- 在 `Class` 中说清楚将来创建出来的 `对象(Object)` 有哪些 `属性(Property)` 和 `行为(Method)`
- JavaScript提供了一个默认的类 `Object`



## 创建对象

- 通过默认的 `Object` 类来创建 `对象(Object)`

- ### 第一种方式

	1. `let obj = new Object();`

	2. 因为是默认 `Class` , 所以其中没有 `Property` 和 `Method` , 需要手动添加

		- 添加属性

			```js
			obj.name = "tony";
			obj.age = 24;
			```

		- 添加行为

			```js
			obj.say = () => {
			    console.log("hello world");
			}
			```

	3. 获取对象的 `Property`

		```js
		console.log(obj.name); // "tony"
		console.log(obj.age); // 24
		```

	4. 执行对象的 `Method`

		```js
		obj.say(); // "hello world"
		```

- ### 第二种方式
	
	1. `let obj = {}` , 本质和第一种方式相同
	2. 同上添加 `Property` 和 `Method`
	3. 依然能如上同样获取 `Property` 和执行 `Method`

- ### 第三种方式

	- 创建对象的时候直接添加 `Property` 和 `Method` , 相当于在 `Class` 模板上进行定制

		```js
		let obj = {
		    name: "tony",
		    age: 24,
		    say: function () {
		        console.log("hello world");
		    }
		}
		
		console.log(obj.name); // "tony"
		console.log(obj.age); // 24
		obj.say(); // "hello world"
		```

	- 依然能如上同样获取 `Property` 和执行 `Method`

---

## 方法 (Method)



> [Method definitions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)



### 和 `Function` 的区别

- `Function` 可以独立运行, 不需要和 `Class` 绑定在一起, 而 `Method` 需要 `Object` 来调用



#### 示例

```js
// Function
let test = function () {
    console.log("hello world");
}
test(); // "hello world"

// Method
let obj = {
    test: function () {
        console.log("hello world");
    }
}
test(); // Uncaught ReferenceError: test is not defined
obj.test(); // "hello world"
```

---

## `this`



### 定义

谁调用了当前的 `Method` 或者 `Function`

- 无论 `Method` 或 `Function` , 内部都有 `this`



### 示例

```js
// Function
let test = function () {
    console.log(this);
}
test(); // window // test(); 本质就是 window.test(); // window是DOM中的东西

// Method
let obj = {
    name: "tony",
    test: function () {
        console.log(this);
    }
}
obj.test(); // {name: "tony", test: f} // 当前调用方法的对象
```



### `function` 函数和 `箭头函数` 的 `this`

- 如果 `箭头函数` 嵌套在 `function` 中, 那么箭头函数的 `this` 会指向 `function`
- 如果单独使用箭头函数, 或者箭头函数套娃, 那么箭头函数全部指向 `window (0级作用域)`
- 箭头函数的 `this` 可以通过 `let self = this` 来更改
- `function` 和 `箭头函数` 尽量不要混淆使用, 否则会造成不必要的麻烦



### 修改 `this`

#### `bind()`

- `function.bind(object, parameters)`
- 修改 `Function` 或 `Method` 中的 `this` 为指定的 `Object` , 返回一个修改之后的新 `Function` 或 `Method` , 传递的 `parameter` 通过 `,` 分隔写在后面

```js
let obj = {
  name: "tony"
}

// 修改Function中的this
function test(a, b) {
  console.log(a, b);
  console.log(this);
}

test(10, 20); // 10, 20, window // 相当于window.test(10, 20);

let fn1 = test.bind(obj, 10, 20); // obj为指定的对象, 后面的是parameter
fn1(); // 10, 20, {name: "tony"}

// 修改Method中的this
function Person() {
  this.say = function () { // 在函数中有this的时候, 不能用箭头函数, 要用 function () {}
    console.log(this);
  }
}

let person = new Person();

person.say(); // Person {say: {...}}

let fn2 = person.say.bind(obj);
fn2(); // {name: "tony"}
```



#### `call()`

- `function.call(object, parameters)`
- 修改 `Function` 或 `Method` 中的 `this` 为指定的 `Object` , 并立即调用, 传递的 `parameter` 通过 `,` 分隔写在后面

```js
let obj = {
  name: "tony"
}

// 修改Function中的this
function test(a, b) {
  console.log(a, b);
  console.log(this);
}

test(10, 20); // 10, 20, window // 相当于window.test(10, 20);

test.call(obj, 10, 20); // 10, 20, {name: "tony"}

// 修改Method中的this
function Person() {
  this.say = function () { // 在函数中有this的时候, 不能用箭头函数, 要用 function () {}
    console.log(this);
  }
}

let person = new Person();

person.say(); // Person {say: {...}}

person.say.call(obj); // {name: "tony"}
```



#### `apply()`

- `function.apply(object, [parameters])`
- 修改 `Function` 或 `Method` 中的 `this` 为指定的 `Object` , 并立即调用, 传递的 `parameter` 通过 `Array` 的形式写在后面

```js
let obj = {
  name: "tony"
}

// 修改Function中的this
function test(a, b) {
  console.log(a, b);
  console.log(this);
}

test(10, 20); // 10, 20, window // 相当于window.test(10, 20);

test.apply(obj, [10, 20]); // 10, 20, {name: "tony"}

// 修改Method中的this
function Person() {
  this.say = function () { // 在函数中有this的时候, 不能用箭头函数, 要用 function () {}
    console.log(this);
  }
}

let person = new Person();

person.say(); // Person {say: {...}}

person.say.apply(obj); // {name: "tony"}
```

---

