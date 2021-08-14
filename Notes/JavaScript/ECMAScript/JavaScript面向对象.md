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
			obj.say = function  {
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

注意点

- 如果想用变量名作为对象属性 / 方法的名称, 那么必须加上 `[]`

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

- `function` 的 `this` 指向 `调用者`

- 如果 `箭头函数` 嵌套在 `function` 中, 那么 `箭头函数` 的 `this` 会指向 `function`
- `箭头函数` 的 `this` 是其 `父作用域` 的 `this`



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
- 修改 `Function` 或 `Method` 中的 `this` 为指定的 `Object` , 并立即调用, 传递的 `parameter` 通过 `Array` / `伪数组` 的形式写在后面

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

## 获取对象类型



### 格式

- 通过 `实例对象` 找到 `构造函数` 的 `name` 属性
- `instance.constructor.name`



### 示例

```js
let arr = new Array();
console.log(arr.constructor.name); // Array

class Person {
  
}

let person = new Person();
console.log(person.constructor.name); // Person
```



### 注意点

- 通过 `typeof` 会输出 `Object` , 因为创建对象的本质是 `new Object()`

```js
let arr = new Array();
console.log(typeof arr); // object

class Person {
  // 本质
  // let obj = new Object();
  // let this = obj;
  // return this
}

let person = new Person();
console.log(typeof person); // object
```



### 原理

1. 在 `实例对象` 中寻找 `constructor` , 找不到
2. 去 `实例对象` 的 `__proto__` 也就是 `原型对象` 中寻找 `constructor` , 找到并指向 `构造函数`
3. 在 `构造函数` 中寻找 `name` 属性, 找到并输出 `类名`

![获取对象类型原理](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\find_class_name.png)

---

## `instanceof`



### 定义

判断 `对象(object)` 是否是指定 `构造函数` 的 `实例(instance)`



### 格式

`instance instanceof Class`



### 原理

只要指定 `构造函数` 的 `原型对象` 出现在了 `实例对象` 的 `原型链` 中, 都会返回 `true` (详见 `类(ES5)` 中 `原型链` 和 `继承方法四` )



### 原理图示

![instanceof() 原理图示](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\instanceof_&_isPrototypeOf.png)



### 示例

```js
class Person {
  constructor(myName) {
    this.name = myName;
  }
}

let person = new Person("tony");
console.log(person instanceof Person); // true

class Cat {
  constructor(myName) {
    this.name = myName;
  }
}

let cat = new Cat("meow");
console.log(cat instanceof Person); // false

class Student extends Person {
  constructor(myName, myScore) {
    super(myName);
    this.score = myScore;
  } 
}

let student = new Student("tony", 100);
console.log(student instanceof Student); // true
```

---

## `isPrototypeOf()`



### 定义

判断 `Object` 是否是指定 `Object` 的 `原型对象`



### 格式

`prototype.isPrototypeOf(instance)`



### 原理

只要 `Object` 出现在了指定 `Object` 的 `原型链` 中, 都会返回 `true` (详见 `类(ES5)` 中 `原型链` 和 `继承方法四` )



### 原理图示

![isPrototypeOf() 原理图示](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\instanceof_&_isPrototypeOf.png)



### 示例

```js
class Person {
  constructor(myName) {
    this.name = myName;
  }
}

let person = new Person("tony");
console.log(Person.prototype.isPrototypeOf(person)); // true

class Cat {
  constructor(myName) {
    this.name = myName;
  }
}

let cat = new Cat("meow");
console.log(Person.prototype.isPrototypeOf(cat)); // false

class Student extends Person {
  constructor(myName, myScore) {
    super(myName);
    this.score = myScore;
  } 
}

let student = new Student("tony", 100);
console.log(Person.prototype.isPrototypeOf(student)); // true

console.log(Student.prototype.isPrototypeOf(student)); // true
console.log(Person.prototype.isPrototypeOf(Student.prototype)); // true
```

---

## `in`



### 定义

判断指定 `Object` 是否拥有指定 `Property`



### 格式

`"property" in instance`



### 示例

```js
class Person {
  constructor() {
    this.name = null;
    this.age = 0;
  }
}

Person.prototype.height = 0;

let person = new Person();

console.log("name" in person); // true
console.log("height" in person); // true

// 继承也会继承父类的Property, 并不影响in的判断
class Student extends Person {
  constructor() {
    super();
    this.score = 0;
  }
}

let student = new Student();

console.log("name" in student); // true
console.log("height" in student); // true
```

---

## `hasOwnProperty()`



### 定义

判断指定 `Object` 本身 (不包含 `原型对象` ) 是否拥有指定 `Property`



### 格式

`instance.hasOwnProperty("property")`



### 示例

```js
class Person {
  constructor() {
    this.name = null;
    this.age = 0;
  }
}

Person.prototype.height = 0;

let person = new Person();

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("height")); // false

// 继承也会继承父类的Property(以及原型对象中的), 并不影响hasOwnProperty()的判断
class Student extends Person {
  constructor() {
    super();
    this.score = 0;
  }
}

let student = new Student();

console.log(student.hasOwnProperty("name")); // true
console.log(student.hasOwnProperty("height")); // false
```

---

## `Property` / `Method` 增删改查 (CRUD)



### 增加 (Create)

- `instance.name = value`
- `instance["name"] = value`

```js
class Person {

}

let person = new Person();

console.log(person); // Person {}

person.name = "tony";
person["age"] = 24;
person.say = function () {
  console.log("hello world");
}
person["run"] = function () {
  console.log("run");
}

console.log(person); // Person {name:"tony", age:24, say: {...}, run: {...}}
```



### 删除 (Delete)

- `delete instance.name`
- `delete instance["name"]`

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    this.say = function () {
      console.log("hello world");
    }
    this.run = function () {
      console.log("run");
    }
  }
}

let person = new Person();

console.log(person); // Person {name:"tony", age:24, say: {...}, run: {...}}

delete person.name;
delete person["age"];
delete person.say;
delete person["run"];

console.log(person); // Person {}
```



### 修改 (Update)

- `instance.name = value`
- `instance["name"] = value`

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    this.say = function () {
      console.log("hello world");
    }
    this.run = function () {
      console.log("run");
    }
  }
}

let person = new Person();

console.log(person); // Person {name:"tony", age:24, say: {...}, run: {...}}
person.say(); // "hello world"
person.run(); // "run"

person.name = "lily";
person["age"] = 18;
person.say = function () {
  console.log("saying");
}
person["run"] = function () {
  console.log("running");
}

console.log(person); // Person {name:"lily", age:18, say: {...}, run: {...}}
person.say(); // "saying"
person.run(); // "running"
```



### 查询 (Read)

- `instance.name`
- `instance["name"]`
- `instance.name()`
- `instance["name"]()`

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    this.say = function () {
      console.log("hello world");
    }
    this.run = function () {
      console.log("run");
    }
  }
}

let person = new Person();

console.log(person.name); // "tony"
console.log(person["age"]) // 24
person.say(); // "hello world"
person["run"](); // "run"
```

---

## 遍历 (Traversal)



### 定义

依次取出 `Object` 中所有的 `Property` 和 `Method`



### `for in` 循环

- `for(let key in obj) {}`
- 将指定 `Object` 中所有 `Property` 和 `Method` 的名称取出来并依次赋值给变量 `key`
- 专门用于遍历无序的东西的, 专门用于遍历 `Object` , <span style="color: yellow;">不推荐用于遍历 `Array` , 应使用 `for of` 循环</span> 

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    this.say = function () {
      console.log("hello world");
    }
  }
}

let person = new Person("tony", 24);

for(let key in person) {
  console.log(key); // name / age / say
}
```



### 注意点

- `ES6` 中使用 `class` 定义 `类` 的格式会默认将写在 `constructor` 外的 `Method` 存储到 `原型对象` 中, 遍历是找不到的
- 必须使用 `instance["name"]` 格式来访问 `Property` 和 `Method` 的数值, `instance.key` 会直接寻找名称为 `key` 的 `Property` 或 `Method` 的数值
- 如果想跳过 `Method` 则使用 `if(instance["name"] instanceof Function)` 来判断即可, 跳过使用 `continue` 关键字
- `Object` 中的 `Property` 和 `Method` 是无序的



### 遍历示例

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    
    // 存储在实例中
    this.say = function () {
      console.log("hello world");
    }
  }
  
  // 存储在原型对象中, 遍历找不到
  run() {
    console.log("run");
  }
}

let person = new Person("tony", 24);

// 不跳过方法
for(let key in person) {
  console.log(person[key]); // "tony" / 24 / function () { console.log("hello world"); }
}

// 跳过方法
for(let key in person) {
  if(person[key] instanceof Function) {
    continue;
  }
  console.log(person[key]); // "tony" / 24
}

// 使用instance.key会找不到key的数值, 因为不存在该名称的属性或方法
for(let key in person) {
  console.log(person[key]); // undefined / undefined / undefined
}
```

---

## 对象解构赋值 (Object destructuring assignment)



> [Object destructuring assignment - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring)



### 注意点

- `Object` 解构赋值和 `Array` 解构赋值除了符号不一样, 其他一模一样 (详见 `数组` 中 `解构赋值`)

- `Object` 解构赋值使用 `{}`
- 左边的 `变量名称` 必须和 `Object` 的 `属性名称` 一致, 才能解构出数据
- 想使用新的 `变量名称` 需要使用 `originalName: newName`



### 示例

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
  }

  say() {
    console.log("hello world");
  }
}

let person = new Person();

// 左右数量一样
let {name, age, say} = person;
console.log(name, age, say); // "tony", 24, say() { console.log("hello world"); }

// 左边比右边少
let {age} = person;
console.log(age); // 24

// 左边比右边多
let {name, age, say, score} = person;
console.log(name, age, say, score); // "tony", 24, say() { console.log("hello world"); }, undefined

// 左边比右边多 + 默认值
let {name, age, say, score = 100} = person;
console.log(name, age, say, score); // "tony", 24, say() { console.log("hello world"); }, 100

// 变量名称不匹配
let {n, age, s} = person;
console.log(n, age, s); // undefined, 24, undefined

// 使用新变量名称
let {name: n, age: a, say: s} = person;
console.log(n, a, s); // "tony", 24, say() { console.log("hello world"); }
```



### 应用场景

#### `Array`

```js
let arr = [1, 3];

// let sum = (a, b) => { // 不用解构赋值的写法
let sum = ([a, b]) => {
  return a + b;
}
// console.log(sum(arr[0], arr[1])); // 4 // 不用解构赋值的写法
console.log(sum(arr)); // 4
```



#### `Object`

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
  }
}

let person = new Person();

// let say = (name, age) => { // 不用解构赋值的写法
let say = ({name, age}) => {
  return console.log(name, age);
}

// say(person.name, person.age); // "tony", 24 // 不用解构赋值的写法
say(person); // "tony", 24
```

---

## 深拷贝 / 浅拷贝



### 深拷贝 (Deep copy)



#### 注意点

- 修改 `新变量` 的数值<span style="color: yellow">不会</span>影响 `原有变量` 的数值
- 默认情况下 `基本数据类型` 都是 `深拷贝`
- 赋值实质上是将 `原有变量` 的 `数值` 赋值给 `新变量`



#### 示例

```js
let num1 = 123;
let num2 = num1; // 将num1中的数值拷贝一份并赋值给num2
num2 = 666; // 修改新变量num2的数值不影响原有变量num1的数值
console.log(num1, num2); // 123, 666
```



#### 原理图示

![深拷贝原理图示](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\deep_copy.png)



### 浅拷贝 (Shallow copy)



#### 注意点

- 修改 `新变量` 的数值<span style="color: yellow">会</span>影响 `原有变量` 的数值
- 默认情况下 `引用数据类型` 都是 `浅拷贝`
- 赋值实质上是将 `原有变量` 的 `变量地址` 赋值给 `新变量`



#### 示例

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
  }
}

let person1 = new Person();
let person2 = person1; // 将person2的变量地址拷贝一份并赋值给person2
person2.name = "lily"; // person1也会被修改, 因为person1, person2指向同一块内存地址

console.log(person1);
console.log(person2);
```



#### 原理图示

![浅拷贝原理图示](D:\xsjcTony\it666\Frontend-Learning\Notes\JavaScript\images\shallow_copy.png)

---

## 对象深拷贝 (Object deep copy)



### 步骤

1. 先通过 `let target = new source.constructor` , 使用 `源对象` 的 `构造函数` 来创建一个新的 `Object`
2. 自定义一个深拷贝方法 `let deepCopy = (source, target) => {}` , 传入 `parameter` 为 `源对象 (source)` 和 `目标对象 (target)`
3. 新建一个高级 `for` 循环 `for(let key in source)` , [遍历](##遍历 (Traversal)) `source` 中所有存储在 `实例对象` 中的 `Property` 和 `Method`
4. 判断当前遍历至的 `Property` 或 `Method` 是不是 `方法 (Method)` , 使用 `if(source[key] instanceof Function)` , 如果是则直接赋值 `target[key] = source[key]`
5. 再判断当前遍历至的 `Property` 或 `Method` 是 `基本数据类型` 还是 `引用数据类型` , 使用 `if(source[key] instanceof Object)` , 原理是所有 `引用数据类型` 本质都是 `Object`
6. 如果是 `引用数据类型` , 先通过 `source[key].constructor` 获取 `Object` 的具体类型, 然后通过当前 `实例对象` 的 `构造函数` 新建一个相同类型的 `Object` 并赋值给 `target[key]` , 即为 `target[key] = new source[key].constructor` , 然后递归当前的自定义深拷贝方法 `deepCopy(source[key], target[key])` , 深拷贝 `source` 中的 `引用数据类型` 至 `target` 中
7. 如果不是, 则只剩 `基本数据类型` , 直接赋值 `target[key] = source[key]` 即可
8. 调用编写好的自定义深拷贝方法 `deepCopy(source, target)`



### 注意点

- `新对象` 本质是通过 `new Object()` 创建的, 所以他的 `构造函数` 是 `Object` 的, 就算拷贝了内容, `instanceof()` 也只会在传入 `Object` 时返回 `true`
- `Object.assign(object2, object1)` 方法只会拷贝 `实例对象` 中的 `Property` 和 `Method` , 并不会拷贝 `原型对象` 中的, 并且无法实现 `引用数据类型` 的深拷贝 (原理同[浅拷贝](####浅拷贝 (Shallow copy)))



### 示例

```js
class Person {
  constructor() {
    this.name = "tony";
    this.age = 24;
    this.say = function () { // 存储在实例对象中
      console.log("hello world");
    }
    this.cat = {
      age: 3
    }
    this.scores = [1, 3, 5];
  }
}

let person1 = new Person();

let person2 = new person1.constructor; // 通过源对象的构造函数创建一个新的对象

let deepCopy = (source, target) => { // 自定义一个深拷贝方法, 传入参数 源对象 和 目标对象
  for(let key in source) { // 遍历源对象中的所有属性和方法
    if(source[key] instanceof Function) { // 判断是不是方法
      target[key] = source[key]; // 将源对象中的方法直接赋值给目标对象
    }
    else if(source[key] instanceof Object) { // 判断是不是引用数据类型
      target[key] = new source[key].constructor; // 通过源对象的引用数据类型的构造函数创建一个新的对象
      deepCopy(source[key], target[key]); // 递归调用深拷贝方法深拷贝源对象中的引用数据类型至目标对象
    }
    else { // 只剩基本数据类型
      target[key] = source[key]; // 将源对象中的基本数据类型直接赋值给目标对象
    }
  }
}

deepCopy(person1, person2); // 调用深拷贝方法

console.log(person1); // Person { name:"tony", age:24, say: {...}, cat: {...}, scores:(3) [...] }
console.log(person2); // Person { name:"tony", age:24, say: {...}, cat: {...}, scores:(3) [...] }

person2.cat.age = 7; // 深拷贝之后person1的数据不会被修改

console.log(person1.cat.age); // 3
console.log(person2.cat.age); // 7
```

---

## 三大内置对象



### 宿主 (Host)

- JavaScript运行环境, 比如可以在浏览器中运行, 也可以在服务器上运行 ( node.js ) 



### 本地对象

- 与 `Host` 无关, 无论在浏览器还是服务器中都有

- ECMAScript 标准中定义的 `Class` ( `构造函数` )
- 使用过程中需要手动 `new` 创建
- 例如 `Boolean` , `Number` , `String` , `Array` , `Function` , `Object` , `Date` , `RegExp` 等



### 内置对象

- 与 `Host` 无关, 无论在浏览器还是服务器中都有
- ECMAScript标准中已经创建好的 `Object`
- 使用过程中<span style="color: yellow">无需</span>手动 `new` 创建
- 例如 `Global` , `Math` , `JSON`
- `Global` 本质上是不存在的, 万物皆对象, 所有对象都归 `Global` 管, 在浏览器中, `Global` 就是 `window`



### 宿主对象

- 属于 `Host`
- 对于浏览器来说, `Window` 和 `Document` 都是浏览器宿主对象, 服务器是用不了的
- 所有 `DOM` 和 `BOM` 对象都属于宿主对象

