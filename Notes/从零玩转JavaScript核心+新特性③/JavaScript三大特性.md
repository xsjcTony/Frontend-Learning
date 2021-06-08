# 三大特性



## 封装性 (Encapsulation)



### 定义

隐藏实现细节, 仅对外公开接口 (比如 `getter` 和 `setter` )



### 好处

- 不封装会让一个 `Class` 把自己的 `成员变量` 暴露给外部, 其就失去了对 `Property` 和 `Method` 的管理权, 别人可以任意修改
- 封装之后只能用 `Class` 中的 `public` 的 `Method` 读取或设置数据, 降低了数据被误用的可能, 提高安全性和灵活性



### 私有属性 (Private)

无法通过 `对象` 操作其 `Property` 和 `Method`

```js
function Person() {
  this.name = "tony"; // public property
  // this.age = 24; // public property
  let age = 24; // private property
  this.say = function () { // public method
    console.log("hello world");
  }
}

let obj = new Person();

console.log(obj.age); // undefined
console.log(age); // Uncaught ReferenceError: age is not defined
```



### Getter

提供一个 `public` 的 `Method` 以通过调用其来访问某个 `private` `Property` 的值

```js
function Person() {
  let age = 24; // private property
  
  // getter
  this.getAge = function () {
    return age;
  }
}

let obj = new Person();

console.log(obj.getAge()); // 24

console.log(age); // Uncaught ReferenceError: age is not defined
```



### Setter

提供一个 `public` 的 `Method` 以通过调用其来设置某个 `private` `Property` 的值

```js
function Person() {
  let age = 24; // private property
  
  // getter
  this.getAge = function () {
    return age;
  }
  
  // setter
  this.setAge = function (myAge) {
    if(myAge >= 0) { // reject invalid age value
      age = myAge;
    }
  }
}

let obj = new Person();

console.log(obj.getAge()); // 24
obj.setAge(55)); // set age to 55 via setter
console.log(obj.getAge()); // 55
obj.setAge(-3); // invalid age
console.log(obj.getAge()); // 55

console.log(age); // Uncaught ReferenceError: age is not defined
```



### 实例 vs 静态 (Instance vs Static)



#### 实例 `Property` / `Method`

通过 `实例对象` 访问的 `Property` / `Method`

```js
function Person() {
  this.name = "tony";
  this.say = function () {
    console.log("hello world");
  }
}

let obj = new Person(); // initialization

console.log(obj.name); // instance property
obj.say(); // instance method
```



#### 静态 `Property` / `Method`

通过 `构造函数` 访问的 `Property` / `Method`

```js
function Person() {
  this.name = "tony";
  this.say = function () {
    console.log("hello world");
  }
}

Person.num = 666;
Person.run = function () {
  console.log("run");
}

console.log(Person.num); // static property
Person.run(); // static method
```

---

## 继承性 (Inheritance)



> [Inheritance in JavaScript - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)



### 定义

如果 `构造函数` 和 `构造函数` 之间的关系是 `is a` 关系, 那么就可以使用继承来优化代码减少冗余度



### 继承方式一 (修改原型链)

1. 将 `子类` 的 `构造函数` 的 `原型对象` 指向 `父类` 的 `实例对象`
2. 将 `子类` 的 `构造函数` 的 `原型对象` 的 `constructor` 重新指向 `子类` 的 `构造函数` (由于被步骤 `1` 破坏所以需要修复, 否则会默认指向 `Object` 的 `构造函数`)



#### 示例

```js
// 父类Person构造函数
function Person() {
  this.name = null;
  this.age = 0;
  this.say = function () { // 在function定义的方法或函数中不能使用箭头函数
    console.log(this.name, this.age);
  }
}

// Student *is a* Person 成立, 所以可以继承
// 子类Student构造函数
function Student() {
  this.score = 0;
  this.study = function () {
    console.log("day day up");
  }
}

let student1 = new Student();
student1.say(); // Uncaught TypeError: student.say is not a function

Student.prototype = new Person(); // 将子类构造函数的原型函数指向父类的实例对象
Student.prototype.constructor = Student; // 将子类的构造函数的原型对象的constructor重新指向子类的构造函数 (定义prototype之后的必要修复)

let student2 = new Student();

student2.name = "tony";
student2.age = 24;
student2.score = 100;
student2.say(); // "tony", 24
student2.study(); // "day day up"
```



#### 图示

![继承方式一图示](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\inheritance_1.png)



#### 弊端

- 无法在创建 `实例对象` 时直接给父类 `构造函数` 包含的 `Property` 赋值

```js
// 父类Person构造函数
function Person(myName, myAge) {
  this.name = myName;
  this.age = myAge;
  this.say = function () { // 在function定义的方法或函数中不能使用箭头函数
    console.log(this.name, this.age);
  }
}

// 子类Student构造函数
function Student(myName, myAge, myScore) { // myName, myAge 无法赋值, 因为其对应属性在父类的构造函数中
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

Student.prototype = new Person();
Student.prototype.constructor = Student;

let student = new Student("tony", 24, 100); // "tony" 和 24 无法赋值
student.say(); // undefined, undefined
```



### 继承方式二 (修改父类的this)

1. 通过 [`call()`](####call()) 或 [`apply()`](####apply()) 修改父类的 `this` 让父类的 `Property` 和 `Method` 属于子类
2. 可以通过 `call()` 或 `apply()` 传递初始化参数



#### 示例

```js
// 父类构造函数
function Person(myName, myAge) {
  this.name = myName; // student.name = myName;
  this.age = myAge; // student.age = myAge;
  this.say = function () { // student.say = function () {}
    console.log(this.name, this.age);
  }
}

// 子类构造函数
function Student(myName, myAge, myScore) {
  Person.call(this, myName, myAge); // Person.call(student)
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

let student = new Student("tony", 24, 100);

console.log(student.score); // 100
student.say(); // "tony", 24
student.study(); // "day day up"
```



#### 图示

![继承方式二图示](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\inheritance_2.png)



#### 弊端

- 无法继承父类的 `原型对象` 中的 `Property` 和 `Method`

```js
// 父类构造函数
function Person(myName, myAge) {
  this.name = myName; // student.name = myName;
  this.age = myAge; // student.age = myAge;
}

// 父类原型对象
Person.prototype = {
  constructor: Person,
  say: function () {
  	console.log(this.name, this.age);
	}
}

// 子类构造函数
function Student(myName, myAge, myScore) {
  Person.call(this, myName, myAge); // Person.call(student)
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

let student = new Student("tony", 24, 100);

student.say(); // Uncaught TypeError: student.say is not a function
```



### 继承方式三 (基于方式二的优化)

1.  将 `子类` 的 `构造函数` 的 `原型对象` 指向 `父类` 的原型对象
2.  将 `子类` 的 `构造函数` 的 `原型对象` 的 `constructor` 重新指向 `子类` 的 `构造函数` (由于被步骤 `1` 破坏所以需要修复, 否则会默认指向 `Object` 的 `构造函数`)



#### 示例

```js
// 父类构造函数
function Person(myName, myAge) {
  this.name = myName; // student.name = myName;
  this.age = myAge; // student.age = myAge;
}

// 父类原型对象
Person.prototype = {
  constructor: Person,
  say: function () {
  	console.log(this.name, this.age);
	}
}

// 子类构造函数
function Student(myName, myAge, myScore) {
  Person.call(this, myName, myAge); // Person.call(student)
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

Student.prototype = Person.prototype; // 将子类的构造函数的原型对象指向父类的原型对象
Student.prototype.constructor = Student; // 将子类的构造函数的原型对象的constructor重新指向子类的构造函数 (定义prototype之后的必要修复)

let student = new Student("tony", 24, 100);

console.log(student.score); // 100
student.say(); // "tony", 24
student.study(); // "day day up"
```



#### 图示

![继承方式三图示](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\inheritance_3.png)



#### 弊端

- 破坏了 `父类` 的 `构造函数` , `原型对象` , `实例对象` 的[三角恋关系](##构造函数, 原型对象, 实例对象的关系)
- 给 `子类` 的 `原型对象` 添加 `Property` 或 `Method` 时, 也会给 `父类` 的 `原型对象` 添加, 因为是同一个, 污染了 `父类` 的 `原型对象`

```js
// 父类构造函数
function Person(myName, myAge) {
  this.name = myName; // student.name = myName;
  this.age = myAge; // student.age = myAge;
}

// 父类原型对象
Person.prototype = {
  constructor: Person,
  say: function () {
  	console.log(this.name, this.age);
	}
}

// 子类构造函数
function Student(myName, myAge, myScore) {
  Person.call(this, myName, myAge); // Person.call(student)
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

Student.prototype = Person.prototype; // 将子类的构造函数的原型对象指向父类的原型对象
Student.prototype.constructor = Student; // 将子类的构造函数的原型对象的constructor重新指向子类的构造函数 (定义prototype之后的必要修复)
Student.prototype.run = function () { // 给子类的原型对象添加一个方法
  console.log("run");
}

let person = new Person("tony", 24);

person.run(); // "run" // 父类的实例对象也能调用子类的原型对象中的方法
```



### <span style="color: red;"><推荐></span> 继承方式四 (忽略前面三个)

1. 通过 [`call()`](####call()) 或 [`apply()`](####apply()) 修改父类的 `this` 让父类的 `Property` 和 `Method` 属于子类
2. 可以通过 `call()` 或 `apply()` 传递初始化参数
3. 将 `子类` 的 `构造函数` 的 `原型对象` 指向 `父类` 的 `实例对象`
4. 将 `子类` 的 `构造函数` 的 `原型对象` 的 `constructor` 重新指向 `子类` 的 `构造函数` (由于被步骤 `1` 破坏所以需要修复, 否则会默认指向 `Object` 的 `构造函数`)



#### 示例

```js
// 父类构造函数
function Person(myName, myAge) {
  this.name = myName; // student.name = myName;
  this.age = myAge; // student.age = myAge;
}

// 父类原型对象
Person.prototype = {
  constructor: Person,
  say: function () {
  	console.log(this.name, this.age);
	}
}

// 子类构造函数
function Student(myName, myAge, myScore) {
  Person.call(this, myName, myAge); // Person.call(student)
  this.score = myScore;
  this.study = function () {
    console.log("day day up");
  }
}

Student.prototype = new Person(); // 将子类的构造函数的原型对象指向父类的实例对象
Student.prototype.constructor = Student; // 将子类的构造函数的原型对象的constructor重新指向子类的构造函数 (定义prototype之后的必要修复)

let student = new Student("tony", 24, 100);

console.log(student.score); // 100
student.say(); // "tony", 24
student.study(); // "day day up"

let person = new Person("tony", 24);

person.run(); // Uncaught TypeError: person.run is not a function
```



#### 图示

![继承方式四图示](D:\xsjcTony\it666\Frontend-Learning\Notes\从零玩转JavaScript核心+新特性③\images\inheritance_4.png)

---

## <span style="color: red;"><不用关注></span> 多态 (Polymorphism)



### 强类型语言

- 一般编译型语言都是强类型语言
- 要求变量的使用要严格符合定义
- 例如 `int num;` , 那么 `num` 中就只能够存储整型数据



### 弱类型语言

- 一般解释型语言都是弱类型语言
- 不要求变量的使用要严格符合定义
- 例如 `let num;` , 那么 `num` 中什么都类型数据都可以存储
- <span style="color: blue">JavaScript 属于弱类型语言</span>



### 多态概念

- 事物的多种形态
- 同一个事件发生在不同的对象上会产生不同的结果



### JavaScript示例

- 在JavaScript中, 很多其他语言需要用继承来解决的问题完全不需要使用继承

```js
function Dog() {
  this.eat = function () {
    console.log("狗吃东西");
  }
}

function Cat() {
  this.eat = function () {
    console.log("猫吃东西");
  }
}

function feed(animal) { // 传狗就是狗吃东西的方法, 传猫就是猫吃的东西的方法, 只有弱类型语言可以, 其他语言要继承+多态
  animal.eat();
}

let dog = new Dog();
feed(dog); // "狗吃东西"

let cat = new Cat();
feed(cat); // "猫吃东西"
```

---

