# 类 (>=ES6)



## Class



> [Classes - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)



### 定义

专门用来定义 `类` 的关键字



### 格式

#### class结构 (class structure)

```js
class Person {
  // Properties and Methods
}
```



#### 实例属性 (Instance property)

- `name = value;`
- 通过该类的 `实例对象` 来调用 `instance.name`

```js
class Person {
  name = "tony";
  age = 24;
}

let person = new Person(); // initialization
console.log(person.name); // "tony"
console.log(person.age); // 24
```



#### 实例方法 (Instance method)

- 不用 `myFunc = function () {}` , 直接使用简写 `myFunc() {}` 即可
- 通过该类的 `实例对象` 来调用 `instance.myFunc()`

```js
class Person {
  name = "tony";
  age = 24;
  say() {
    console.log(this.name, this.age);
  }
}

let person = new Person(); // initialization
person.say(); // "tony", 24
```



#### 静态属性 (Static property)

- `static name = value;`
- 通过该类的类名来调用 `ClassName.name`

```js
class Person {
  static num = 666;
}

console.log(Person.num); // 666
```



#### 静态方法 (Static method)

-  同[实例方法](####实例方法 (Instance method)), 直接使用简写 `static myFunc() {}` 即可
-  通过该类的类名来调用 `ClassName.myFunc()`

```js
class Person {
  static run() {
    console.log("run");
  }
}

Person.run(); // "run"
```



#### Constructor

- 通过 `new` 创建对象的时候, 系统会自动调用 `constructor`
- 可以用来传入 `parameter`
- 一般可以将需要 `初始化` 数值的 `Property` 和 `Method` 放在其中

```js
class Person {
  constructor(myName, myAge) {
    this.name = myName;
    this.age = myAge;
  }
}

let person = new Person("tony", 24); // initialization with parameters
console.log(person.name); // "tony"
console.log(person.age); // 24
```



#### 完整示例

```js
class Person {
  // constructor
  constructor(myName, myAge) {
    // instance property
    this.name = myName;
    this.age = myAge;
  }
  
  // instance method (stored in Person.prototype)
  say() {
    console.log(this.name, this.age);
  }
  
  // static property (invalid on most of explorers)
  static num = 666;
	
	// static method
	static run() {
    console.log("run");
  }
}

let person = new Person("tony", 24); // initialization with parameters

console.log(person.name); // "tony"
console.log(person.age); // 24
person.say(); // "tony", 24

console.log(Person.num); // 666
Person.run(); // "run"
```



### 注意点

- 在ES6标准中, `实例属性` 要写在 `constructor` 中, 大部分浏览器不支持在 `class` 中直接定义 `实例属性`
- 在ES6标准中, `静态属性` 要在 `class` 外通过 `类名` 来定义, 大部分浏览器不支持在 `class` 中直接定义 `静态属性`
- 写在 `class` 中的 `实例方法` 实质上是存储在 `原型对象` 中的, 想存储在 `实例对象` 中需要在 `constructor` 中用 `this.myFunc () {}` 来定义
- 使用 `class` 定义的 `类` 无法自定义 `原型对象` , 只能动态的给 `原型对象` 添加 `Property` 和 `Method` , 即直接在 `class` 中定义

---

## 继承 (Inheritance)



### 格式

#### `extends`

- `class Child extends Parent {}`
- 告诉浏览器 Child `类` 会继承 Parent `类`
- 原理同 `<ES6` `类` 版本笔记中的继承方法四

```js
class Person {
  
}

class Student extends Person { // 告诉浏览器子类Student会继承父类Person
  
}
```



#### `super()`

- `super(parameters)`
- 调用 `父类` 的 `constructor` 并传入相应 `parameter`

```js
class Person {
  constructor(myName, myAge) {
    this.name = myName;
    this.age = myAge;
  }
}

class Student extends Person {
  constructor(myName, myAge, myScore) {
    super(myName, myAge); // 调用父类Person的constructor
    this.score = myScore;
  }
}
```



#### 完整示例

```js
class Person {
  constructor(myName, myAge) {
    this.name = myName;
    this.age = myAge;
  }
  
  say() {
    console.log(this.name, this.age);
  }
}

class Student extends Person {
  constructor(myName, myAge, myScore) {
    super(myName, myAge);
    this.score = myScore;
  }
  
  study() {
    console.log("day day up");
  }
}

let student = new Student("tony", 24, 100);
console.log(student.name, student.age); // "tony", 24
student.say(); // "tony", 24
console.log(student.score); // 100
student.study(); // "day day up"
```

---

