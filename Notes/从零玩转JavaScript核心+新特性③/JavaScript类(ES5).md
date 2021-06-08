## <span style="color: red;"><不专业></span> 工厂函数 (Factory function)



### 定义

专门用于创建对象的 `Function`



### 示例

```js
let createPerson = (myName, myAge) => {
    let obj = new Object();
    obj.name = myName;
    obj.age = myAge;
    obj.say = function () {
        console.log("hello world");
    }
    return obj;
}

let obj1 = createPerson("tony", 24);
let obj2 = createPerson("lily", 24);

console.log(obj1); // Object: {age: 24, name: "tony", say: f ()}
console.log(obj2); // Object: {age: 24, name: "l", say: f ()}
```

---

## <span style="color: red;"><不推荐> (<ES6) </span>构造函数 (Constructor function)



> [constructor - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)



### 定义

专门用于创建对象的 `Function`



### 注意点

- 首字母必须**大写**
- 本质上和[工厂函数](##<span style="color: red;"><不专业></span> 工厂函数 (Factory function))的简写
- 只能通过 `new` 来调用
- 在 `function () {}` 格式定义的 `Function` 或者 `Method` 中不能使用 `() => {}`



### 示例

```js
function Person(myName, myAge) {
    this.name = myName;
    this.age = myAge;
    this.say = function () { // 在function定义的方法或函数中不能使用箭头函数
        console.log("hello world");
    }
}

let obj1 = new Person("tony", 24);
let obj1 = new Person("lily", 24);

console.log(obj1); // Person: {age: 24, name: "tony", say: f ()}
console.log(obj2); // Person: {age: 24, name: "l", say: f ()}
```



### 原理

- `new Person("tony", 24);` 之后系统做的事情

    1. 自动在构造函数中创建一个 `Object`
    2. 将新创建的 `Object` 赋值给 `this`
    3. 在构造函数的最后添加 `return this;`

    ```js
    function Person(myName, myAge) {
        // let obj = new Object(); // 系统自动添加
        // let this = obj; // 系统自动添加
        
        this.name = myName;
        this.age = myAge;
        this.say = function () {
            console.log("hello world");
        }
        
        // return this; // 系统自动添加
    }
    ```

- 两个 `Object` 中相同的内容不存储在同一块内存中

    ```js
    function Person() {   
        this.say = function () {
            console.log("hello world");
        }
    }
    
    let obj1 = new Person();
    let obj2 = new Person();
    console.log(obj1.say === obj2.say); // false
    ```



### <span style="color: red;"><不专业, 不推荐></span> 优化

- 下述方法不专业, 推荐[原型对象 (Prototype)](###<span style="color: red;"><推荐> </span>Prototype)

- 将 `Object` 中重复的内容放到外面以减少存储空间的占用

    - 示例

        ```js
        function mySay() {
            console.log("hello world");
        }
        
        function Person() {   
            this.say = mySay();
        }
        
        let obj1 = new Person();
        let obj2 = new Person();
        console.log(obj1.say === obj2.say); // true
        ```

    - 弊端

        - 阅读性降低了
        - 污染了 `全局作用域` 的命名空间

    - 解决方法

        - 创建一个 `Object` , 将相同的内容都放到其中, 然后通过 `Object` 调用

        ```js
        let fns = {
            mySay: function () {
            	console.log("hello world");
        	}
        }
        
        function Person() {   
            this.say = fns.mySay();
        }
        
        let obj1 = new Person();
        let obj2 = new Person();
        console.log(obj1.say === obj2.say); // true
        ```



## <span style="color: red;"><推荐> </span>原型对象 (Prototype)



### 定义

用于保存一类 `Object` 中的公共 `Method` 和公共 `Property`



### 注意点

- 一定要加上 `constructor` 属性, 不然会破坏[原型链](##原型链)



### 示例

```js
function Person(myName, myAge) {   
    this.name = myName;
    this.age = myAge;
}

Person.prototype = {
    constructor: Person, // 一定要写, 否则会指向Object构造函数
    say: function () {
        console.log("hello world");
    }
}

let obj1 = new Person("tony", 24);
let obj2 = new Person("lily", 24);
obj1.say(); // "hello world"
obj2.say(); // "hello world"
console.log(obj1.say === obj2.say); // true
```



### 特点

- 存储在 `prototype` 中的 `Method` 可以被对应构造函数创建出来的所有 `Object` 共享

- 不仅能存储 `Method` , 还可以存储 `Property`
- 会被构造函数中同名的 `Property` 或 `Method` 覆盖

---

## 构造函数, 原型对象, 实例对象的关系



### 概念

- 通过 `构造函数` 创建出来的是 `实例对象` , 称之为 `实例化(initialization)`
- `构造函数` 中的 `prototype` 指向 `原型对象`
- `原型对象` 中的 `constructor` 指向 `构造函数`
- `实例对象` 中的 `__proto__` 指向 `原型对象`
- `原型对象` 的 `__proto__` 指向 `Object` 函数的 `原型对象`



### 示例

```js
// 构造函数
function Person(myName, myAge) {
    this.name = myName;
    this.age = myAge;
}

// 原型对象
Person.prototype = {
    constructor: Person,
    say: function () {
        console.log("hello world");
    }
}

// 实例对象
let obj = new Person("tony", 24);

console.log(Person); // 构造函数
console.log(Person.prototype); // 原型对象
console.log(Person.prototype.constructor); // 构造函数
console.log(obj.__proto__); // 原型对象

console.log(Person === Person.propotype.constructor); // true
console.log(obj.__proto__ === Person.prototype); // true

console.log(obj.__proto__.constructor.prototype.constructor.prototype.....); // 可以无限套娃
```



### `Function` 函数 (特殊)

- 本身也是一个 `构造函数`
- 也有 `原型对象`
- 通过 `function()` 实例化的都是 `Function` 函数的 `实例对象` , 比如上述的 `function Person(name, age) {}`
- `Function` 的 `实例对象` 的 `__proto__` 也指向 `原型对象`
- `Function` 函数本身的 `__proto__` 也指向 `原型对象`
- `Function` 的 `原型对象` 的 `__proto__` 指向 `Object` 函数的 `原型对象`

```js
// 实例对象
function Person(myName, myAge) {
    this.name = myName;
    this.age = myAge;
}

console.log(Function); // 构造函数
console.log(Function.prototype); // 原型对象
console.log(Function.prototype.constructor); // 构造函数
console.log(Person.__proto__); // 原型对象
console.log(Function.__proto__); // 原型对象

console.log(Function === Function.prototype.constructor); // true
console.log(Person.__proto__ === Function.prototype); // true
console.log(Function.__proto__ === Function.prototype); // true
```



### `Object` 函数 (特殊)

- `Object` 函数是 `Function` 构造函数的 `实例对象`
- `Object` 函数的 `__proto__` 指向 `Function` `原型对象`
- `Object` 函数的 `原型对象` 的 `__proto__` 指向 `null`

```js
console.log(Object); // 构造函数
console.log(Object.prototype); // 原型对象
console.log(Object.prototype.constructor); // 构造函数
console.log(Object.__proto__); // 原型对象


console.log(Object === Object.prototype.constructor); // true
console.log(Object.__proto__ === Function.prototype); // true

console.log(Object.prototype.__proto__); // null
```



### 总结

- `Function` 函数是所有函数的祖先函数
- 所有 `构造函数` 都有一个 `prototype` 属性指向 `原型对象`
- 所有 `原型对象` 都有一个 `constructor` 属性指向 `构造函数`
- 所有函数都是对象
- 所有对象都有一个 `__proto__` 属性指向 `原型对象`

![对象关系汇总图](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\objects_relationship.png)

---

## 原型链 (Propotype chain)



> [Inheritance and the prototype chain - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)



### 定义

由 `对象` 的 `__proto__` 属性一直找 `原型对象` 直到 `Object原型对象` 再到 `null` 的链条



### 流程

在访问 `对象` 的 `Method` 和 `Property` 时, 根据如下方法查找

1. 查找 `自己` 中的 `Method` 和 `Property` , 有则使用, 没有则跳转至 `2`
2. 访问 `__proto__` 去找 `原型对象` , 有则使用, 没有则跳转至 `3`
3. 重复 `2` , 直到查找到 `Object原型对象` , 有则使用, 没有则 `报错`

![原型链](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\prototype_chain.png)



### 注意点

- 在给一个 `对象` 不存在的 `属性` 赋值时, 不会去 `__proto__` 指向的 `原型对象` 查找, 如果当前 `对象` 中没有, 就会给当前 `对象` 新增一个不存在的 `Property` , 有则修改

```js
function Person(myName, myAge) {
  this.name = myName;
  this.age = myAge;
}

Person.prototype = {
  constructor: Person,
  currentType: "person",
  say: function () {
    console.log("1");
  }
}

let person = new Person("tony", 24);

person.currentType = "new value";
person.say = function () {
  console.log("2");
}

console.log(person.currentType); // "new value"
person.say(); // "2"
console.log(person.__proto__.currentType); // "person"
person.__proto__.say(); // "1"
```

---

