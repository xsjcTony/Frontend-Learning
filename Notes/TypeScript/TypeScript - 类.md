# TypeScript - 类



> [TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)



## 定义

- 类似于 `JavaScript ES6+` 中的 `类`
- `字段` 需要手动指定, 不能单单只在 `constructor` 中赋值
  - 可以指定初始值
- `constructor` 和 `Function` 很像, 可以使用 `重载` ( `overload` ) 等, 但是不能指定返回值类型, 固定为 `类` 的实例

注意点

- 在命名 `static` 成员时, 不可以使用 `name` / `length` / `call` 等名称

```typescript
class Person {
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }

  name: string
  age: number = 0 // 初始值为 0

  say (): void {
    console.log(`My name is ${ this.name } and my age is ${ this.age }`)
  }

  static food: string

  static eat (): void {
    console.log(`I'm eating ${ this.food }`)
  }
}

const person = new Person('Tony', 24)
person.say() // My name is Tony and my age is 24
Person.food = '🧇'
Person.eat() // I'm eating 🧇
```

---

## 继承类 extends

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses)

- 和其他 `OOP` 语言一样, `类` 可以继承
- 使用 `extends` 关键字来继承另一个 `类`
- 只能继承一个 `类` , 不可以继承多个
- `子类` 拥有其 `父类` 所有的 `属性` / `方法` , 并且可以重写 ( `override` )  / 额外添加
  - 可以使用 `super.` 来访问 `父类` 的方法

注意点

- 在 `子类` 的 `constructor` 中, `super()` 之前不能调用 `this.` , 简而言之把 `super()` 写在第一行总没错
- 在 `重写` 方法时, 要注意和 `父类` 的方法兼容

```TypeScript
cclass Base {
  greet () {
    console.log('Hello, world!')
  }
}

class Derived extends Base {
  greet (name?: string) {
    if (name === undefined) {
      super.greet()
    } else {
      console.log(`Hello, ${ name.toUpperCase() }`)
    }
  }
}

const b: Base = new Derived()
b.greet() // Hello, world!
```

---

## 修饰符

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

- 修饰符既可以用在 `属性` 上, 也可以用在 `方法` 上
- 可以对 `constructor` 使用



### public

- 公开的
- 可以在任何地方使用 (包括 `类` 本身内部, `子类` , 和 `类` 的外部)
- 所有 `属性` / `方法` 默认就是 `public` , 可以不写

```TypeScript
class Person {
  constructor (name: string) {
    this.name = name
  }

  public name: string // public 可写可不写

  say (): void { // 默认不写就是 public
    console.log(this.name) // 内部使用
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类中使用
  }
}

const s = new Student('Aelita')
console.log(s.name) // 外部使用
```



### protected

- 受保护的
- 可以在 `类` 的内部以及 `子类` 的内部使用
- 不可以在 `外部` 使用

```TypeScript
class Person {
  constructor (name: string) {
    this.name = name
  }

  protected name: string // 受保护的, 只能在 类内部 和 子类内部 使用

  say (): void {
    console.log(this.name) // 内部使用, OK
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类内部使用, OK
  }
}

const s = new Student('Aelita')
console.log(s.name) // 外部使用, 报错
```



### private

- 私有的 (弱私有, 即编译为 `JavaScript` 后是可以在外部访问的, 强私有使用 `#` , 但是有限制)
- 只能在 `类` 的内部使用
- 不可以在 `子类` 或 `外部` 使用
- 建议 `弱私有` 成员名称以 `_` 起头
- `强私有` : 可以在变量前加上 `#` 符号以代替 `private` 关键字, 但是只能在编译目标为 `ES2015` 或更高时使用

```TypeScript
class Person {
  constructor (name: string) {
    this.name = name
  }

  private _name: string // 私有的 (弱私有) , 只能在 类内部 使用
  #_age: number // 强私有, 只能在编译为 ES2015 或更高 时使用

  say (): void {
    console.log(this.name) // 内部使用, OK
  }
}

class Student extends Person {
  constructor (name: string) {
    super(name)
  }

  say (): void {
    console.log(this.name) // 子类内部使用, 报错
  }
}

const s = new Student('Aelita')
console.log(s.name) // 外部使用, 报错
```



### readonly

- 只读的
- 不能在 `constructor` 之外的任何地方修改 (可以设定默认值)
- 可以配合 `public` / `protected` / `private` 使用, 但是必须放在这些修饰符之后
- 可以配合 `static` 使用, 但是必须放在其之后
- 不可以用于 `方法` , 只能用于 `属性`

```TypeScript
class Demo {
  constructor (name: string) {
    this.name = name // constructor 内修改, OK
  }

  public readonly name: string = 'init value, OK' // 可以设定默认值, 可以配合 public 等修饰符使用, 但是必须放在后面
  protected static readonly num: number = 4

  changeName () {
    name = 'Tony' // 尝试在 constructor 之外修改, 报错
  }
}

const d = new Demo('Aelita')
d.name = 'Tony' // 尝试在 constructor 之外修改, 报错
```

---

## 可选属性 ?

- 在 `类` 中, 一个 `属性` 要么需要有初始值, 要么需要在 `constructor` 中明确赋值
- 若该属性可用可不用, 则可以在声明该属性时加上 `?` , 就可以颠覆上一条准则
- 同时在 `constructor` 的参数中也可以加上 `?`

```typescript
// 可选属性
class Person {
  name: string
  age?: number

  constructor (name: string, age?: number) {
    this.name = name
    this.age = age
  }
}

const p = new Person('Aelita')
console.log(p) // Person { name: 'Aelita', age: undefined }
```

---

## 参数属性 (Parameter Property)

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)

- 是一种简化代码的 `语法糖`
- 在 `constructor` 的参数前, 明确的指定 `属性修饰符` (至少一个)
- 可以搭配 `可选属性` 使用
- 这些参数会被转换成同名同值的 `属性`

```TypeScript
class Person {
  constructor (
    public name: string,
    protected age?: number
  ) {
    this.name = name
    this.age = age
  }
}

const p = new Person('Aelita', 24)
console.log(p) // Person { name: 'Aelita', age: 24 }
```

---

## getter / setter

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters)

- 和 `JavaScript` 中一样, 用于截取对对象成员的访问

注意点

- 如果只有 `getter` 没有 `setter` , 那么这个属性会被自动设置为 `readonly`
- 如果 `setter` 的参数没有指定类型, 那么会从 `getter` 的返回值类型 `推断`
- `getter` 和 `setter` 的 `成员可见性` 必须相同 (属性修饰符)

```TypeScript
class Person4 {
  private _age: number = 0

  set age (val: number) {
    if (val < 0) {
      throw new Error('age cannot be less than 0')
    } else {
      this._age = val
    }
  }

  get age (): number {
    return this._age
  }
}

const p4 = new Person4()
p4.age = 34 // OK, 通过 setter 
console.log(p4.age) // 34, 通过 getter 拿到数据
p4.age = -6 // 报错
```

---

## 抽象类 abstract

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)

- 专门用于定义那些不希望被外界直接创建的 `类`
- 一般用于定义 `基类`
- 用于约束 `子类`
- 用于约束但不具体实现的成员前面需要加上 `abstract` 关键字, 且 `abstract` 成员只能在 `抽象类` 中出现

```typescript
abstract class Person {
  abstract name: string
  abstract say (): void
}

class Student extends Person {
  name: string = 'Aelita'
  say (): void {
    console.log(`Hello ${ this.name }`)
  }
}
```

和 `接口` 的区别

- `接口` 只能定义约束
- `抽象类` 又可以定义约束, 又可以定义具体实现

```typescript
abstract class Person {
  abstract name: string
  eat (): void {
    console.log(`${ this.name } is eating food`)
  }
}
```

---

## 实现 (继承) 接口 implements

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses)

- 使用 `impelements` 关键字来继承 `接口`
- 可以同时继承多个 `接口`

```typescript
interface PersonInterface {
  name: string
  say (): void
}

class Person implements PersonInterface {
  name: string = 'Aelita'
  say (): void {
    console.log(`Hello ${ this.name }`)
  }
}
```

接口继承类 extends

- `接口` 也可以通过 `extends` 关键字继承于一个 `类`

- 可以同时继承多个 `类`

- 只会继承 `类` 中所有的成员 `声明` , 不会继承具体 `实现`

- <span style="color: #0ff;">如果继承的 `类` 中包含了任意 `protected` 成员, 那么就只有这个 `类` 的 `子类` 才能实现这个 `接口`</span>

  - ```typescript
    class Person {
      protected // ...
    }
    interface PersonInterface extends Person { /* ... */ }
    class Student extends Person implements PersonInterface { /* ... */ } // 必须是子类才能继承这个接口
    ```

---

## 泛型

[TypeScript: Documentation - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#generic-classes)

- `泛型` 具体定义详见 `TypeScript - 数据类型` 的 `泛型` 篇章
- `类` , 甚至 `接口` , 都可以是泛型的
- 格式和 `泛型方法` 差不多
- 和 `泛型方法` 一样, 在可以通过 `constructor` 的参数自动推断类型时, 创建实例时的 `<>` 可以省略

注意点

- `static` 的成员永远不可以使用 `泛型` 类型

```TypeScript
class Caches<T> {
  arr: T[] = []
  add (value: T): T {
    this.arr.push(value)
    return value
  }
  all (): T[] {
    return this.arr
  }
}

const cache = new Caches<number>()
cache.add(1)
cache.add(3)
cache.add(5)
console.log(cache.all) // [1, 3, 5]
```

---



























