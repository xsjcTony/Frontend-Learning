# Vue (v2)



> [Vue.js](https://vuejs.org/)
>
> [Vue.js - 中文文档](https://cn.vuejs.org/index.html)



## 定义

- `Vue.js` 是一套构建用户界面的 `框架`
- `框架` 是一套完整的解决方案, 项目如果需要更换 `框架` , 则需要重构整个项目
- `框架` 可以提升开发效率
- `Vue` 整合了 `Angular` / `React` 中的众多优点

---

## 优势

核心概念一

- 通过数据驱动界面更新, 无需手动操作 `DOM` 来更新界面
- 只需要关注如何获取 / 处理数据, 编写业务逻辑代码
- 只需要将处理好的数据交给 `Vue` , 它就会自动将数据渲染到模板 (界面) 上

核心概念二

- `组件化` 开发
- 将网页拆分成一个个独立的组件来编写
- 最后用封装好的组件拼接成一个完整的网页

![components.png](D:\xsjcTony\it666\Frontend-Learning\Notes\Vue\images\components.png)

---

## 基本使用



### 使用方式

- 传统下载+导入
- `vue-cli` 安装导入



### 基本模板

- `Vue实例对象` 的配置中的 `this` 指向其本身 ( `Vue实例对象` / `View Model` )
- 在配置中一般不要使用 `箭头函数` , 因为 `this` 的指向会被破坏
- `data` 中的键值可以直接通过访问 `Vue实例对象` 的 `属性` 获得, 比如 `this.name` / `vue.name`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue基本模板</title>
    <script src="path/to/vue.js"></script>
</head>
<body>
<div id="app">
    <!-- 使用模板语法将数据放进去 -->
    <p>{{ name }}</p>
</div>
<script>
  // 创建Vue实例对象
  const vue = new Vue({
    // 需要控制界面上哪个区域
    el: '#app',
    // 被控制区域的数据
    data: {
      name: 'Tony'
    }
  })
</script>
</body>
</html>
```

---

## 数据绑定 (Data bindings)



### MVVM设计模式 (design pattern)

| 简写 | 全称       | 中文名               | 作用                       |
| ---- | ---------- | -------------------- | -------------------------- |
| M    | Model      | 数据模型             | 保存数据, 处理数据业务逻辑 |
| V    | View       | 视图                 | 展示数据, 与用户交互       |
| VM   | View Model | 数据模型和视图的桥梁 | 处理数据模型和视图的互动   |

- 支持数据双向传递
    - `M` => `VM` => `V`
    - `V` => `VM` => `M`



### Vue应用

- `Vue` 本质是基于 `MVVM` 的
    - `View` : 被控制的区域
    - `View Model` : `Vue` 实例对象
    - `Model` : 实例对象中的 `data`

#### 单向绑定

- 默认情况下数据就是 `单向传递` 的: `M` => `VM` => `V`

- 我把 `数据` 交给 `Vue实例对象` , `Vue实例对象` 再把 `数据` 交给 `界面`
- 只要 `数据` 发生变化, `界面` 就会跟着变化
- 数据绑定过程
    1. 将未绑定 `数据` 的 `界面` 展示给用户
    2. 根据模型中的 `数据` 和控制的区域生成绑定数据之后的 `HTML` 代码
    3. 将绑定 `数据` 之后的 `HTML` 渲染到 `界面` 上

```html
<!-- View -->
<div id="app">
    <p>{{ name }}</p>
</div>
<script>
  // View Model
  const vue = new Vue({
    el: '#app',
    // Model
    data: {
      name: 'Tony'
    }
  })
</script>
```

#### 双向绑定

[表单输入绑定 — Vue.js](https://cn.vuejs.org/v2/guide/forms.html)

- 在 `<input>` / `<textarea>` / `<select>` 元素中可以通过 `v-model` 指令实现数据双向绑定
- 在如下示例中, `<input>` 标签会读取 `Model` 中 `msg` 的内容, 并且在用户输入时将实时数据传回给 `Model` 中的 `msg`

```html
<!-- View -->
<div id="app">
    <input type="text" v-model="msg">
</div>
<script>
  // View Model
  const vue = new Vue({
    el: '#app',
    // Model
    data: {
      msg: 'Tony'
    }
  })
</script>
```

---

## 指令 (Directives)

[API - 指令 — Vue.js](https://cn.vuejs.org/v2/api/#指令)

- `Vue` 内部提供的一些自定义属性
- 封装好了 `Vue` 内部实现的一些功能
- 使用指令就可以使用 `Vue` 中实现的这些功能



### v-model

- 上述 `数据双向绑定` 时使用
- 可以让数据在 `界面` 和 `数据` 之间来回传递



### v-once

- 让 `界面` 不要跟着 `数据` 变化, 只渲染一次

- 之后 `元素` 及其所有的 `子节点` 将被视为静态内容并于重新渲染时跳过

```html
<div id="app">
    <p>原始数据: {{ name }}</p> <!-- 会随着 data.name 变化 -->
    <p v-once>当前数据: {{ name }}</p> <!-- 初始值为Tony, 之后不会变化 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'Tony'
    }
  })
</script>
```



### v-cloak

- `数据` 渲染完成之后自动显示元素

- 由于默认情况在绑定好 `数据` 的 `HTML` 被生成渲染之前会先显示 `模板` 的内容, 如果用户网络比较慢或者网页性能比较差, 那么用户会看到 `模板` 内容
- 利用 `v-cloak` 配合 `css` 中的 `[v-cloak] { display: none }` 默认先隐藏未完成渲染的 `界面`

```html
<head>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div id="app">
    <p v-cloak>{{ name }}</p>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'Tony'
    }
  })
</script>
</body>
```



### v-text

- 相当于 `innerText`
- 会替换元素的所有内容
- 不会解析 `HTML`

```html
<div id="app">
    <p>++++{{ name }}++++</p> <!-- ++++Tony++++ -->
    <p v-text="name">++++++++</p> <!-- Tony -->
    <p v-text="msg">++++++++</p> <!-- <span>我是span</span> -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'Tony',
      msg: '<span>我是span</span>'
    }
  })
</script>
```



### v-html

- 相当于 `innerHTML`
- 会替换元素的所有内容
- 会解析 `HTML`
- <span style="color: #f40; font-weight: 700;">永远不要在用户提交的内容上使用 `v-html` , 只在可信的内容上使用, 不然很容易导致 `XSS攻击`</span>

```html
<div id="app">
    <p>++++{{ msg }}++++</p> <!-- ++++<span>我是span</span>++++ -->
    <p v-html="name">++++++++</p> <!-- Tony -->
    <p v-html="msg">++++++++</p> <!-- 我是span -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'Tony',
      msg: '<span>我是span</span>'
    }
  })
</script>
```



### v-if

- 如果取值是 `真值` , 那么就会渲染元素
- 如果取值是 `假值` ( `false` / `0` / `""` / `null` / `undefined` / `NaN` ), 那么就不会渲染元素, <span style="color: #ff0">(本质上根本就不会创建这个元素)</span>
- 可以从 `模型` 中获取数据, 也可以直接赋值一个 `表达式`

```html
<div id="app">
    <p v-if="show">我是show</p> <!-- 显示 -->
    <p v-if="hidden">我是hidden</p> <!-- 不显示 -->
    <p v-if="true">我是true</p> <!-- 显示 -->
    <p v-if="false">我是false</p> <!-- 不显示 -->
    <p v-if="age >= 18">我是age >= 18</p> <!-- 显示 -->
    <p v-if="age < 18">我是age < 18</p> <!-- 不显示 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      show: true,
      hidden: false,
      age: 18
    }
  })
</script>
```



### v-else

- 和 `if / else` 中的 `else` 效果一样
- 上一个 `兄弟元素` 必须要有 `v-if` / `v-else-if`

```html
<div id="app">
    <p v-if="age >= 18">成年人</p> <!-- 不显示 -->
    <p v-else>未成年人</p> <!-- 显示 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      age: 17
    }
  })
</script>
```



### v-else-if

- 和 `if / else` 中的 `else if` 效果一样
- 上一个 `兄弟元素` 必须要有 `v-if` / `v-else-if`

```html
<div id="app">
    <p v-if="score >= 80">优秀</p> <!-- 不显示 -->
    <p v-else-if="score >= 60">良好</p>  <!-- 显示 -->
    <p v-else>差</p> <!-- 不显示 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      score: 70
    }
  })
</script>
```



### v-show

- 和 `v-if` 一样
- <span style="color: #ff0">区别在于 `v-show` 通过 `css` 的 `display: none` 来隐藏该元素, 而 `v-if` 根本不创建元素</span>
- 适用于频繁切换的元素, 节省性能消耗

```html
<div id="app">
    <p v-show="show">我是show</p>  <!-- 显示 -->
    <p v-show="hidden">我是hidden</p> <!-- 不显示 -->
    <p v-show="true">我是true</p>  <!-- 显示 -->
    <p v-show="false">我是false</p> <!-- 不显示 -->
    <p v-show="age >= 18">我是age >= 18</p>  <!-- 显示 -->
    <p v-show="age < 18">我是age < 18</p> <!-- 不显示 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      show: true,
      hidden: false,
      age: 18
    }
  })
</script>
```



### v-for

- 相当于 `JavaScript` 中的 `for...of` 循环

- 可以遍历 `Array` / `Object` / `number` / `string` / `Iterable (v2.6+)`

- 使用特定语法 `alias in expression` / `alias of expression`

- 也可以为 `数组` 的 `索引` / `对象` 的 `键值` , `索引` 指定别名

    ```html
    <div v-for="(item, index) in items"></div>
    <div v-for="(val, key) in object"></div>
    <div v-for="(val, name, index) in object"></div>
    ```

```html
<div id="app">
  	<!--
		0 -- 张三
		1 -- 李四
		2 -- 王五
		3 -- 赵六
		-->
    <ul>
        <li v-for="(value, index) in list">{{ index }} -- {{ value }}</li>
    </ul>
  	<!--
		0: name - Tony
		1: age - 33
		2. gender - male
		-->
    <ul>
        <li v-for="(value, key, index) in obj">{{ index }}: {{ key }} - {{ value }}</li>
    </ul>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      list: ['张三', '李四', '王五', '赵六'],
      obj: {
        name: 'Tony',
        age: 33,
        gender: 'male'
      }
    }
  })
</script>
```

#### 就地复用 (修改) 原则

- `v-for` 在渲染元素的时候, 会先查看 `缓存` 中有没有需要渲染的 `元素`
- 如果 `缓存` 中没有需要渲染的 `元素` , 就会创建一个新的放到 `缓存` 中
- 如果 `缓存` 中有需要渲染的 `元素` , 就不会创建新的, 而是直接复用 (修改) 原有的

![v-for_default.png](D:\xsjcTony\it666\Frontend-Learning\Notes\Vue\images\v-for_default.png)

- 想要强制其重新排序, 需要绑定一个特殊的属性 `key` , 提供一个排序提示 [API - key — Vue.js](https://cn.vuejs.org/v2/api/#key)
- `key` 必须是每个元素中独一无二的属性
- 使用 `v-for` 时尽量绑定一个 `key` , 除非遍历的内容特别简单或刻意依赖默认行为的性能提升

![v-for_key.png](D:\xsjcTony\it666\Frontend-Learning\Notes\Vue\images\v-for_key.png)

```html
<div id="app">
    <form>
        <input type="text" v-model="name">
        <input type="submit" value="添加" @click.prevent="add">
    </form>
    <ul>
        <li v-for="(person, index) in persons" :key="person.id">
            <input type="checkbox">
            <span>{{ index }} --- {{ person.name }}</span>
        </li>
    </ul>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      persons: [
        { name: '张三', id: 3 },
        { name: '李四', id: 2 },
        { name: '王五', id: 1 }
      ],
      name: ''
    },
    methods: {
      add () {
        const newId = this.persons[0].id + 1
        const newPerson = { name: this.name, id: newId }
        this.persons.unshift(newPerson)
        this.name = ''
      }
    }
  })
</script>
```



### v-bind

- 给元素的 `属性` 绑定数据
- 默认会去 `Model` 的 `data` 中查找数据
- 缩写为 `:`

#### 普通属性

- 如下格式只能给普通属性使用, `class` 和 `style` 不适用

- 格式为 `v-bind:attr="data"`
- 缩写为 `:attr="data"`
- 值只需要是一个合法的 `JavaScript` `表达式` 即可

```html
<div id="app">
    <input type="text" v-bind:placeholder="userName"> <!-- 完整写法 -->
    <input type="text" :placeholder="ph"> <!-- 缩写 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      ph: 'Username'
    }
  })
</script>
```

#### class属性

- 可以是其他类型, 比如 `数组` / `对象`

- 想要使用 `css` 中的类名, 需要将类名放到 `数组` 中, 并用 `引号` 包裹
    - 可以使用 `三目运算符` / `对象` 实现按需绑定
- 也可以接收 `对象` 绑定类名

```html
<head>
    <style>
        .size {
            font-size: 100px;
        }
        .color {
            color: red;
        }
        .active {
            background: skyblue;
        }
    </style>
</head>
<body>
<div id="app">
    <p :class="['size', 'color', flag ? 'active' : '']">我是段落</p> <!-- 使用三目运算符实现按需绑定 -->
    <p :class="['size', 'color', { active: flag }]">我是段落</p> <!-- 使用对象实现按需绑定 -->
    <p :class="obj">我是段落</p> <!-- 接收对象 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      flag: false,
      // 对象key为 类名, value为 是否需要绑定 
      obj: {
        size: true,
        color: false,
        active: true
      }
    }
  })
</script>
</body>
```

#### style属性

- 可以是其他类型, 比如 `数组` / `对象`
- 想要正常书写 `css` , 需要将样式放在 `{}` 中
- 样式名称如果带有 `-` , 则需要使用使用 `驼峰命名` 或 包裹在 `引号` 中, 样式值需要包裹在 `引号` 中, 比如 `{ fontSize: '100px' }`
- 若需要绑定多个 `样式对象` , 那么需要放进 `数组` 中

```html
<div id="app">
    <p :style="{ color: 'red', 'font-size': '100px' }">我是段落</p> <!-- 引号包裹带 - 的属性名 -->
    <p :style="{ color: 'red', fontSize: '100px' }">我是段落</p> <!-- 驼峰命名带 - 的属性名 -->
    <p :style="[obj1, obj2]">我是段落</p> <!-- 接收样式对象, 多个对象放在数组中 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      obj1: {
        color: 'blue',
        fontSize: '100px'
        // 'font-size': '100px' // 也可以使用
      },
      obj2: {
        backgroundColor: 'red'
      }
    }
  })
</script>
```



### v-on

- 给元素绑定监听事件
- 默认会去 `Vue实例对象` 的 `methods` 中查找对应的 `回调函数`
- 格式为 `v-on:event="callback"`
- 缩写为 `@` / `@event="callback"`
- `事件名称` 不需要写 `on`
- `回调函数` 若不需要传递 `参数` , 那么 `()` 可写可不写
- `原生事件` 自带原生的 `事件对象` 作为 `参数` , 不需要其他 `参数` 的情况下可以不写
- 可以给 `回调函数` 传递参数, 监听 `原生事件` 时, `$event` 为原生 `事件对象`
- `回调函数` 中如果想要使用 `Model` 的数据, 那么需要加上 `this.`

```html
<div id="app">
    <button v-on:click="myFn">我是按钮</button> <!-- 完整写法 -->
    <button @click="myFn">我是按钮</button> <!-- 缩写 -->
    <button @click="myFn()">我是按钮</button> <!-- 回调函数添加 (), 没有参数时可写可不写 -->
    <button @click="myFn2('Tony', 24)">我是按钮</button> <!-- 给回调函数传递参数 -->
    <button @click="myFn2('Tony', 24, $event)">我是按钮</button> <!-- 给回调函数传递原生事件对象 -->
    <button @click="myFn3">我是按钮</button> <!-- 在回调函数中使用 data 中的数据 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      gender: 'male'
    },
    methods: {
      myFn () { alert('Tony') },
      myFn2 (name, age, event) { console.log(name, age, event) },
      myFn3 () { console.log(this.gender) }
    }
  })
</script>
```

#### 修饰符

- 格式为 `@event.modifier="callback"`
- 修饰符可以叠加使用
- 常用修饰符
    - `.once` : 只触发一次 `回调函数`
    - `.prevent` : 调用 `event.preventDefault()` , 阻止元素的默认行为
    - `.stop` : 调用 `event.stopPropagation()` , 阻止事件冒泡
    - `.self` : 只有事件是从元素本身触发时, 才执行 `回调函数` , 诸如通过子元素事件冒泡触发的都不执行
    - `.capture` : 将 `事件冒泡` 变为 `事件捕获`

```html
<head>
    <style>
        .a {
            width: 300px;
            height: 300px;
            background: red;
        }
        .b {
            width: 200px;
            height: 200px;
            background: blue;
        }
        .c {
            width: 100px;
            height: 100px;
            background: green;
        }
    </style>
</head>
<body>
<div id="app">
    <button @click.once="myFn">once</button> <!-- 只执行一次回调函数 -->
    <a href="https://www.google.com/" @click.prevent="myFn">prevent</a> <!-- 阻止元素默认行为 -->
    <div class="a" @click="myFn1">
        <div class="b" @click.stop="myFn2"> <!-- 阻止了事件冒泡, 事件不会冒泡到 a -->
            <div class="c" @click="myFn3"></div> <!-- 没有阻止, 事件会冒泡到 b -->
        </div>
    </div>
    <div class="a" @click="myFn1">
        <div class="b" @click.self="myFn2"> <!-- 点击 c 不会执行回调函数, 因为不是点击 b 本身触发的 -->
            <div class="c" @click="myFn3"></div>
        </div>
    </div>
    <div class="a" @click.capture="myFn1">
        <div class="b" @click.capture="myFn2">
            <div class="c" @click.capture="myFn3"></div> <!-- 添加.capture之后输出顺序为事件捕获的 a, b, c, 而默认事件冒泡的顺序为 c, b, a -->
        </div>
    </div>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {},
    methods: {
      myFn () { alert('Tony') },
      myFn1 () { console.log('爷爷') },
      myFn2 () { console.log('爸爸') },
      myFn3 () { console.log('儿子') }
    }
  })
</script>
</body>
```

#### 按键修饰符

[事件处理 - 按键修饰符 — Vue.js](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)

- 只有在按下特定按键的情况下才触发事件
- 可以使用 `Vue` 提供的预置修饰符, 也可以配置 `Vue.config.keyCodes` 来自定义 `按键修饰符别名`

```html
<div id="app">
    <input type="text" @keyup.ffff="myFn"> <!-- 只有按 F2 才会触发事件 -->
</div>
<script src="js/vue.js"></script>
<script>
  Vue.config.keyCodes.ffff = 113 // 将keyCode为113的按键(F2)绑定给ffff, 使用@event.ffff="callback"即可
  const vue = new Vue({
    el: '#app',
    data: {},
    methods: {
      myFn () { alert('Tony') }
    }
  })
</script>
```



### v-slot

- 定义模板指向的 `具名插槽`
- 格式为 `v-slot:name`
- 缩写为 `#name`
- 只能用于 `<template>` 标签中
- `#:name="tag"` 可以用于接收 `作用域插槽` 暴露出来的数据

```html
<div id="app">
    <my-comp>
        <!-- 完整写法 -->
        <template v-slot:one> <!-- 将内容插入到具名插槽one中 -->
            <div>我是追加的内容1</div>
            <div>我是追加的内容11</div>
        </template>
        <!-- 缩写 -->
        <template #two> <!-- 将内容插入到具名插槽two中 -->
            <div>我是追加的内容2</div>
            <div>我是追加的内容22</div>
        </template>
    </my-comp>
</div>
<template id="my_comp">
    <div>
        <div>我是头部</div>
        <slot name="one">我是默认数据1</slot> <!-- 具名插槽, 名称为one -->
        <slot name="two">我是默认数据2</slot> <!-- 具名插槽, 名称为two -->
        <div>我是底部</div>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  Vue.component('myComp', {
    template: '#my_comp'
  })

  const vue = new Vue({
    el: '#app'
  })
</script>
```



### 自定义指令

[自定义指令 — Vue.js](https://cn.vuejs.org/v2/guide/custom-directive.html)

- 需要对 `DOM` 元素进行底层操作时使用

#### 全局指令

- 在任何一个 `Vue实例对象` 控制的区域中都可以使用

- 使用 `Vue.directive()` 注册
- 该方法接收两个参数
    - `id` : 指令名称, 如 `v-focus` 指令中 `id` 就是 `focus` , 不用写 `v-`
    - `definition` : (Optional) 指令的详细信息, 如果不写那么该方法作用就是一个 `getter` , 返回已注册的指令
        - 指令调用不同的 `钩子函数` 可以在不同的 `生命周期` 阶段执行, 具体见文档 [自定义指令 - 钩子函数 — Vue.js](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数)
        - `钩子函数` 第一个参数为 `el` , 是指令绑定的元素
        - `钩子函数` 的其他参数见文档, <span style="color: #f40;">且都是只读的, 切勿进行修改</span>

```html
<div id="app">
    <p v-color="pColor">我是段落</p> <!-- 指令绑定到元素上时, 将文字颜色变成 绑定值 的颜色 -->
    <input type="text" v-focus> <!-- 元素被插入父节点时, 该元素获得焦点 -->
</div>
<script src="js/vue.js"></script>
<script>
  // 绑定 v-color
  Vue.directive('color', {
    bind (el, binding) {
      el.style.color = binding.value // 将颜色调整为指令的绑定值
    }
  })
  // 绑定 v-focus
  Vue.directive('focus', {
    inserted (el) {
      el.focus() // 元素获得焦点
    }
  })
  const vue = new Vue({
    el: '#app',
    data: {
      pColor: 'deeppink'
    }
  })
</script>
```

#### 局部指令

- 只能在注册了指令的 `Vue实例对象` 的控制区域中使用
- 在 `Vue实例对象` 中的 `directives` 中注册
- 一个 `指令` 是一对 `键值` , `key` 为 `指令` 名称, `value` 为 `definition`
- 其他和 `全局指令` 的注册方法基本一样

```html
<div id="app">
    <p v-color="pColor">我是段落</p> <!-- 指令绑定到元素上时, 将文字颜色变成 绑定值 的颜色 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      pColor: 'deeppink'
    },
    // 定义局部指令
    directives: {
      color: { // 指令名称
        bind (el, binding) { // 指令执行的生命周期阶段
          el.style.color = binding.value // 将颜色调整为指令的绑定值
        }
      }
    }
  })
</script>
```

---

## 计算属性 (Computed Properties)

[计算属性和侦听器 — Vue.js](https://cn.vuejs.org/v2/guide/computed.html)

- 通过 `函数` 进行一些复杂的逻辑计算, 将 `返回值` 作为 `属性` , 可以在模板 `{{ }}` 插值语法中直接使用
- 适合不经常发生变化的数据, 由于缓存的原因相比 `methods` 更加节省性能
- `computed` 中的函数只要其中使用的数据没有发生变化, 那么就只会被调用一次, 而 `methods` 中的函数每次执行都会被调用
- 在 `Vue实例对象` 中的 `computed` 中添加
- <span style="color: #ff0;">虽然定义的时候是通过 `函数` 返回的数据, 但他在被访问的时候本质上是一个 `属性` , 所以在使用的时候不能在后面加上 `()` , 当然也不能传递参数</span>

```html
<div id="app">
    <p>{{ msg }}</p> <!-- abcdef -->
    <p>{{ reversedMsg }}</p> <!-- fedcba -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'Tony',
      age: 24,
      msg: 'abcdef'
    },
    // 定义计算属性
    computed: {
      reversedMsg () {
        return this.msg.split('').reverse().join('') // this 指向 vm (Vue实例对象)
      }
    }
  })
</script>
```

---

## 过滤器 (Filters)

[过滤器 — Vue.js](https://cn.vuejs.org/v2/guide/filters.html)

- 用于格式化插入的文本数据
- 可以在 `{{ }}` 插值语法 / `v-bind` `表达式` 中使用 `(v2.1.0+)`
- 语法为 `{{ msg | filter }}` / `:attr="exp | filter"`
- 过滤器可以串联, 比如 `{{ msg | filterA | filterB }}`
- 过滤器本质是 `函数` , 所以可以传递 `参数` , 比如 `{{ msg | filterA('arg1', arg2) }}` , 但 `msg` 永远是第一个 `参数`
- `全局过滤器` 和 `局部过滤器` 重名时, 会采用 `局部过滤器`



### 全局过滤器

- 使用 `Vue.filter()` 注册
- 该方法接收两个参数
    - `id` : 过滤器的名称
    - `definition` : (Optional) 过滤器的详细信息, 如果不写那么该方法作用就是一个 `getter` , 返回已注册的过滤器
        - 处理数据的函数接受一个参数, 是当前要被处理的数据

```html
<div id="app">
    <p>{{ name | formatter1 | formatter2 }}</p> <!-- 知播渔大学, 指趣大学, 前端大学, C++大学 -->
</div>
<script src="js/vue.js"></script>
<script>
  // 定义全局过滤器
  Vue.filter('formatter1', value => value.replace(/学院/g, '大学')) // 将所有 "学院" 替换为 "大学"
  Vue.filter('formatter2', value => value.replace(/区块链/g, 'C++')) // 将所有 "区块链" 替换为 "C++"
  const vue = new Vue({
    el: '#app',
    data: {
      name: '知播渔学院, 指趣学院, 前端学院, 区块链学院'
    }
  })
</script>
```



### 局部过滤器

- 只能在注册了过滤器的 `Vue实例对象` 的控制区域中使用
- 在 `Vue实例对象` 中的 `filters` 中注册
- 一个 `过滤器` 是一对 `键值` , `key` 为 `过滤器` 名称, `value` 为 `definition`
- 其他和 `全局过滤器` 的注册方法基本一样

```html
<div id="app">
    <p>{{ name | formatter1 | formatter2 }}</p> <!-- 知播渔大学, 指趣大学, 前端大学, C++大学 -->
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      name: '知播渔学院, 指趣学院, 前端学院, 区块链学院'
    },
    // 定义局部过滤器
    filters: {
      formatter1: value => value.replace(/学院/g, '大学'), // 将所有 "学院" 替换为 "大学"
      formatter2: value => value.replace(/区块链/g, 'C++') // 将所有 "区块链" 替换为 "C++"
    }
  })
</script>
```

---

## 过渡动画 (Transition & Animation)

[进入/离开 & 列表过渡 — Vue.js](https://cn.vuejs.org/v2/guide/transitions.html)

- `Vue` 在插入 / 更新 / 移除 `DOM` 时, 可以应用 `transition` / `animation`
- 支持以下
    - 在 `css` 中通过对应的 `class` 编写过渡动画
    - 配合第三方 `css动画库` 使用, 比如 `Animate.css`
    - 在 `过渡钩子函数` 中使用 `JavaScript` 直接操作 `DOM`
    - 配合第三方 `JavaScript动画库` 使用, 比如 `Velocity.js`



### 进入 / 离开

- 将需要应用过渡动画的 `元素` / `组件` 放到 `Vue` 封装的组件 `<transition>` 中

- 支持四种情况

    - v-if
    - v-show
    - 动态组件
    - 组件根节点

- 可以给 `<transition>` 设置 `name` 属性, 会改变其对应的 `class` 名称

- <span style="color: #ff0">一个 `<transition>` 只能放一个 `元素` / 一组 `v-if` , 其余的不会被执行过渡动画</span>

- 在进入 / 离开的过渡动画中, 会有6个类名

    - `v-enter`：进入过渡的开始状态
    - `v-enter-active`：进入过渡生效时的状态, 可以被用来定义进入过渡的过程时间 / 延迟 / 曲线函数
    - `v-enter-to`：进入过渡的结束状态
    - `v-leave`：离开过渡的开始状态
    - `v-leave-active`：离开过渡生效时的状态, 可以被用来定义离开过渡的过程时间 / 延迟 / 曲线函数
    - `v-leave-to`：离开过渡的结束状态

    ![transition_classes.png](D:\xsjcTony\it666\Frontend-Learning\Notes\Vue\images\transition_classes.png)

- 类名取决于 `<transition>` 组件的 `name` 属性, 比如 `<transition name="fade">` 的对应类名就是 `fade-enter-active` 等等, `v-` 为没有 `name` 属性的默认类名的前缀

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-to,
        .fade-leave {
            opacity: 1;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: all 3s;
        }
    </style>
</head>
<body>
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition name="fade">
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      isShowed: true
    },
    methods: {
      toggle () {
        this.isShowed = !this.isShowed
      }
    }
  })
</script>
</body>
```



### 初始渲染

- 给 `<transition>` 添加 `appear` 属性可以让初始的渲染也拥有过渡动画

```html
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition name="fade" appear>
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
```



### JavaScript钩子

- 除了使用 `css` 的 `transition` / `animation` 之外, 还可以使用 `JavaScript钩子函数` 对 `DOM` 进行操作
- 使用 `v-on` 在 `<transition>` 中声明 `钩子函数` 的名称
- 一共有 `8` 个事件
    - `before-enter` : 进入开始之前
    - `enter` : 进入的执行过程
    - `after-enter` : 进入执行完毕之后
    - `enter-cancelled` : 进入过程被取消
    - `before-leave` : 离开开始之前
    - `leave` : 离开的执行过程
    - `after-leave` : 离开执行完毕之后
    - `leave-cancelled` : 离开过程被取消
- 每个 `钩子函数` 都有一个参数是 `el` , 代表了执行过渡的 `元素`
- `enter` / `leave` 还有另外一个参数是 `done` , 是执行完毕的回调函数, 直接调用 `done()` 
- `钩子函数` 可以和 `css` 结合, 也可以单独使用
- <span style="color: #ff0;">只使用 `JavaScript` 过渡的时候, `enter` / `leave` 中必须调用 `done()` 告知过程已经完成, 否则 `after-enter` / `after-leave` 不会被执行</span>
- 如果只使用了 `JavaScript` 的方式来操作 `DOM` , 那么建议添加 `v-bind:css="false"` 让 `Vue` 跳过对 `css` 的检测, 可以避免执行过程中被 `css` 影响
- <span style="color: #0ff">如果在 `JavaScript` 中使用了 `css` 的 `transition` , 那么需要加上 `el.offsetWidth` 或 `el.offsetHeight` 才能正常使用</span>
- <span style="color: #0ff">如果使用了 `初始渲染` , 那么需要给 `done()` 添加一些延迟才能正常使用, 比如说 `setTimeout(() => { done() }, 0)`</span>

原生 `JavaScript` 示例

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
</head>
<body>
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" :css="false" appear>
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      isShowed: true
    },
    methods: {
      toggle () {
        this.isShowed = !this.isShowed
      },
      // 进入动画开始之前
      beforeEnter (el) {
        el.style.opacity = '0'
      },
      // 进入动画执行过程中
      enter (el, done) {
        el.offsetWidth
        el.style.transition = 'all 3s'
        setTimeout(() => { done() }, 0)
      },
      // 进入动画执行完毕之后
      afterEnter (el) {
        el.style.opacity = '1'
        el.style.marginLeft = '500px'
      }
    }
  })
</script>
</body>
```

配合 `Velocity.js` 示例

- 不要使用 `Velocity` 的 `v2.x` , 有 `BUG`

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
</head>
<body>
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition @before-enter="beforeEnter" @enter="enter" :css="false">
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
<script src="js/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      isShowed: true
    },
    methods: {
      toggle () {
        this.isShowed = !this.isShowed
      },
      // 进入动画开始之前
      beforeEnter (el) {
        el.style.opacity = '0'
        el.style.marginLeft = '0'
      },
      // 进入动画执行过程中
      enter (el, done) {
        Velocity(el, { opacity: 1, marginLeft: '500px' }, { duration: 3000, complete: done })
      }
    }
  })
</script>
</body>
```



### 自定义动画类名

- 可以通过以下 `属性` 来自定义动画的 `class` 名称
    - `enter-class` : 对应 `v-enter`
    - `enter-active-class` : 对应 `v-enter-active`
    - `enter-to-class` : 对应 `v-enter-to`
    - `leave-class` : 对应 `v-leave`
    - `leave-active-class` : 对应 `v-leave-active`
    - `leave-to-class` : 对应 `v-leave-to`

原生 `css` 示例

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
        .custom-enter-aelita {
            opacity: 0;
            margin-left: 0;
        }
        .custom-enter-to-aelita {
            opacity: 1;
            margin-left: 500px;
        }
        .custom-enter-active-aelita {
            transition: all 3s;
        }
    </style>
</head>
<body>
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition appear
                enter-class="custom-enter-aelita"
                enter-active-class="custom-enter-active-aelita"
                enter-to-class="custom-enter-to-aelita">
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      isShowed: true
    },
    methods: {
      toggle () {
        this.isShowed = !this.isShowed
      }
    }
  })
</script>
</body>
```

配合 `animate.css` 示例

- 不同 `animate.css` 版本的 `class` 名称是不一样的

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>
<div id="app">
    <button @click="toggle">我是按钮</button>
    <transition appear
                enter-active-class="animate__animated animate__bounceInRight"
                leave-active-class="animate__animated animate__fadeOutDown">
        <div class="box" v-show="isShowed"></div>
    </transition>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      isShowed: true
    },
    methods: {
      toggle () {
        this.isShowed = !this.isShowed
      }
    }
  })
</script>
</body>
```



### 列表动画

- 想要同时渲染整个列表中所有 `元素` , 需要使用 `<transition-group>` 组件
- <span style="color: #ff0">该组件中的 `元素` 一定要绑定 `:key` , 并且一定要是唯一的值, 不然会造成动画混乱</span>
- 整个 `<transition-group>` 默认会由 `<span>` 呈现, 所有子元素都被包裹在其中, 通过 `tag` 属性可以更换为其他元素
- `appear` 可以照常使用

```html
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .v-enter,
        .v-leave-to {
            opacity: 0;
        }

        .v-enter-to,
        .v-leave {
            opacity: 1;
        }

        .v-enter-active,
        .v-leave-active {
            transition: all 1s;
        }
    </style>
</head>
<body>
<div id="app">
    <form>
        <input type="text" v-model="name">
        <input type="submit" value="添加" @click.prevent="add">
    </form>
    <transition-group appear tag="ul"> <!-- 下面所有的<li>都会被包裹在<ul>中, 不设置的话默认为<span> -->
        <li v-for="(person, index) in persons" :key="person.id" @click="remove(index)">
            <input type="checkbox">
            <span>{{ index }} --- {{ person.name }}</span>
        </li>
    </transition-group>
</div>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      persons: [
        { name: '张三', id: 1 },
        { name: '李四', id: 2 },
        { name: '王五', id: 3 }
      ],
      name: '',
      nextId: 4
    },
    methods: {
      add () {
        const newPerson = { name: this.name, id: this.nextId++ }
        this.persons.unshift(newPerson)
        this.name = ''
      },
      remove (index) {
        this.persons.splice(index, 1)
      }
    }
  })
</script>
</body>
```



### 过渡模式

- 通过给 `<transition>` 添加 `mode` 属性来指定
- `in-out` : 新元素先进行过渡, 完成之后当前元素过渡离开
- `out-in` : 当前元素先进行过渡, 完成之后新元素过渡进入

---

## 组件 (Components)

[组件基础 — Vue.js](https://cn.vuejs.org/v2/guide/components.html)

- 前端开发中把一个很大的界面拆分为多个小的界面, 每一个小界面就是一个 `组件`
- 将大界面拆分为小界面就是 `组件化`
- `组件化` 可以简化 `Vue实例对象` 的代码, 可以提高复用性



### 自定义组件

- 除了 `Vue` 本身自带的组件, 我们还可以定义自己的组件

#### 全局组件

- 任何一个 `Vue实例对象` 控制区域都可以使用的 `自定义组件`

创建步骤

1. 使用 `<template>` 模板编写组件的代码
    - `自定义组件` 只能有一个 `根元素`

2. 创建组件构造器 [API - Vue.extend — Vue.js](https://cn.vuejs.org/v2/api/#Vue-extend)

3. 注册已经创建好的组件 [API - Vue.component — Vue.js](https://cn.vuejs.org/v2/api/#Vue-component)

4. 使用注册好的组件

- 实际上可以把 `1~2` 合并为直接将 `自定义组件` 的 `options` 对象丢进 `Vue.component()` 中

```html
<div id="app">
    <abc></abc> <!-- 使用组件 -->
</div>
<template id="info">
    <div>
        <img src="images/fm.jpg" alt>
        <p>我是描述信息</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 注册组件, 直接传入对象
  Vue.component('abc', {
    // 组件模板只能有一个根元素
    template: '#info'
  })
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    data: {}
  })
</script>
```

#### 局部组件

- 只有在注册了该 `局部组件` 的 `Vue实例对象` 的控制区域中才可以使用

创建步骤

1. 使用 `<template>` 模板编写组件的代码

2. 在 `Vue实例对象` 中的 `components` 中添加 `对象`

3. key` 为要注册的 `组件` 的名称, `value` 为该 `自定义组件` 的 `options` 对象

4. 使用注册好的组件

```html
<div id="app">
    <abc></abc> <!-- 使用组件 -->
</div>
<template id="info">
    <div>
        <img src="images/fm.jpg" alt>
        <p>我是描述信息</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    data: {},
    // 自定义局部组件
    components: {
      abc: { // 组件名称
        template: '#info' // 组件模板
      }
    }
  })
</script>
```

#### data / methods

- `自定义组件` 也可以使用 `data` / `methods` 等
- <span style="color: #ff0">`data` 格式和 `Vue实例对象` 中的不太一样, 必须是一个 `函数` , 其中返回一个 `对象` , 作为该组件的 `data`</span>
- 原因是因为 `组件` 可以被复用, 这样每次创建 `组件` 就会创建一个新的 `data` , 绑定到这个创建的 `组件` 上, 避免了数据混乱 / 共用

```html
<div id="app">
    <abc></abc> <!-- 使用组件 -->
    <abc></abc> <!-- 复用组件 -->
    <abc></abc> <!-- 复用组件 -->
</div>
<template id="info">
    <div>
        <button @click="add">累加</button>
        <p>{{ number }}</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    data: {},
    // 自定义局部组件
    components: {
      // 组件名称
      abc: {
        // 组件模板
        template: '#info',
        // 组件数据
        data: function () {
          return {
            number: 0
          }
        },
        // 组件方法
        methods: {
          add () {
            this.number++
          }
        }
      }
    }
  })
</script>
```



### 组件切换

- `组件` 之间的切换

#### v-if切换

- 使用 `v-if` 来有条件的渲染 / 销毁 `组件`
- <span style="color: #f40">不推荐使用, 因为会销毁 `组件` , 无法保存 `组件` 的状态, 例如 `checkbox` 的选中状态等</span>
- <span style="color: #0ff;">推荐使用 `动态组件` 来切换</span>

#### 动态组件

[组件基础 - 动态组件 — Vue.js](https://cn.vuejs.org/v2/guide/components.html#动态组件)

[动态组件 & 异步组件 — Vue.js](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)

- 使用 `Vue` 封装好的 `<component>` 组件来实现组件之间的切换
- 通过绑定 `is` 属性来控制渲染哪一个 `组件`
- 默认不会保存 `组件` 的状态, 如果想要保存, 需要通过 `<keep-alive>` 标签包裹, 缓存失活的 `组件`

```html
<div id="app">
    <button @click="toggle">切换</button>
    <keep-alive>
        <component :is="name"></component>
    </keep-alive>
</div>
<template id="home">
    <div>
        <p>我是首页</p>
        <input type="checkbox">
    </div>
</template>
<template id="photo">
    <div>
        <img src="images/fm.jpg" alt>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 自定义全局组件
  Vue.component('home', {
    template: '#home'
  })
  Vue.component('photo', {
    template: '#photo'
  })
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    data: {
      name: 'home'
    },
    methods: {
      toggle () {
        this.name = this.name === 'home' ? 'photo' : 'home'
      }
    }
  })
</script>
```



### 组件动画

- 给 `组件` 添加动画和给 `元素` 添加动画是一样的
- 单个 `组件` 使用 `<transition>`
- 多个 `组件` 使用 `<transition-group>`
- 默认情况下进入 / 离开动画是同时执行的, 如果想分开执行, 需要指定 `过渡模式`

以 `动态组件` 例子为基础加入动画

```html
<transition mode="out-in">
    <keep-alive>
        <component :is="name"></component>
    </keep-alive>
</transition>
```



### 父子组件

- 在一个 `组件` 中又定义了其它 `组件` 就是 `父子组件`
- `局部组件` 本质上就是最简单的 `父子组件` , 因为 `Vue实例对象` 可以看做是一个 `大组件`
- `自定义组件` 也可以使用 `components` , 在其中再定义 `组件` 就是 `子组件`
- `子组件` 只能在 `父组件` 中使用

```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <p>我是父组件</p>
        <son></son>
    </div>
</template>
<template id="son">
    <div>
        <p>我是子组件</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    // 局部组件
    components: {
      father: {
        template: '#father',
        // 在自定义组件中定义子组件
        components: {
          son: {
            template: '#son'
          }
        }
      }
    }
  })
</script>
```

#### 数据传递

##### 父组件 => 子组件

- `子组件` 无法访问 `父组件` 的 `数据` 
- 如果想要访问, 必须通过 `父组件` 传递
- `父组件` 通过在 `子组件` 的标签中使用 `v-bind` 传递数据
    - `:tag="data"`
- `子组件` 通过配置中的 `props` 接收数据, 是一个 `数组` , 或者 `对象` [API - props — Vue.js](https://cn.vuejs.org/v2/api/#props)
    - `props: ["tag1", "tag2"]`
    - <span style="color: #f40;">这里只是示例, 真正开发的时候应使用 `对象` 来提供详细信息, 具体见文档</span>

```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <p>{{ name }}</p>
        <p>{{ age }}</p>
        <son :parent-name="name" :parent-age="age"></son> <!-- 通过v-bind给子组件传递数据, 传递时使用kebab-case -->
    </div>
</template>
<template id="son">
    <div>
        <p>{{ parentName }}</p>
        <p>{{ parentAge }}</p>
        <p>我是子组件</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    // 局部组件
    components: {
      father: {
        template: '#father',
        // 父组件的数据
        data: function () {
          return {
            name: 'Tony',
            age: 24
          }
        },
        // 在自定义组件中定义子组件
        components: {
          son: {
            template: '#son',
            // 子组件中通过props接收数据
            props: ['parentName', 'parentAge'] // 接收时使用camel-case
          }
        }
      }
    }
  })
</script>
```

##### 子组件 => 父组件

- 利用 `父组件` 可以给 `子组件` 传递方法的特点
- 在 `子组件` 中调用 `父组件` 中的方法时, 将想要传递给 `父组件` 的数据作为 `参数` 传递
- 传递 `参数` 的方法是 `this.$emit('method', args)`

```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <button @click="say('Tony')">我是按钮</button>
        <son @parent-say="say"></son> <!-- 通过v-bind给子组件传递数据, 传递时使用kebab-case -->
    </div>
</template>
<template id="son">
    <div>
        <button @click="sonSay">我是按钮</button> <!-- 使用子组件的方法 -->
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    // 局部组件
    components: {
      father: {
        template: '#father',
        methods: {
          say (data) {
            alert(data)
          }
        },
        // 在自定义组件中定义子组件
        components: {
          son: {
            template: '#son',
            methods: {
              sonSay () {
                // 使用$emit传递数据, 第一个参数是方法名称, 后面的参数都是要传递的参数(数据)
                this.$emit('parent-say', 'Tony loves Lily')
              }
            }
          }
        }
      }
    }
  })
</script>
```

#### 方法传递

- `子组件` 无法访问 `父组件` 的 `方法`
- 如果想要访问, 必须通过 `父组件` 传递
- `父组件` 通过在 `子组件` 的标签中使用 `v-on` 传递数据
    - `@tag="method"`
- `子组件` 通过配置中的 `methods` 自定义一个 `方法` 并在其中接收父组件的 `方法`
    - `this.$emit('tag')`

```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <button @click="say">我是按钮</button>
        <son @parent-say="say"></son> <!-- 通过v-bind给子组件传递数据, 传递时使用kebab-case -->
    </div>
</template>
<template id="son">
    <div>
        <button @click="sonSay">我是按钮</button> <!-- 使用子组件的方法 -->
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    // 局部组件
    components: {
      father: {
        template: '#father',
        // 父组件的方法
        methods: {
          say () {
            alert('Tony')
          }
        },
        // 在自定义组件中定义子组件
        components: {
          son: {
            template: '#son',
            // 子组件中通过methods中的自定义方法接收方法
            methods: {
              // 自定义方法
              sonSay () {
                // 接收父组件传递过来的方法
                this.$emit('parent-say')
              }
            }
          }
        }
      }
    }
  })
</script>
```

#### 多级传递

- 默认情况下无论是 `数据` 还是 `方法` , 都只能一级一级的往下传递



### 命名规范

说明

- `kebab-case` : 短横线分隔命名, 以下统一使用 `kebab`
- `camelCase` : 驼峰命名, 以下统一使用 `camel`
- 纯小写字符串不受以下限制

规范

- 注册 `组件` 时, 如果使用了 `camel` 命名, 那么使用的时候需要转换为 `kebab` 命名

    ```html
    <div id="app">
      	<my-comp></my-comp> <!-- 转换成kebab才能使用 -->
    </div>
    <script>
    	Vue.component('myComp', {/*...*/}) // 使用camel注册
    </script>
    ```

- `父组件` 给 `子组件` 传递 `数据` 的时候, 如果使用了 `kebab` 命名, 那么 `子组件` 接收的时候必须使用 `camel` 命名

    - `父组件` 传递时不能使用 `camel` , 因为 `HTML` 标签的属性名称无视大小写

    ```html
    <template id="father">
    		<div>
          	<p>[{ name }]</p> <!-- Tony -->
          	<son :parent-name="name"></son> <!-- 使用kebab进行数据传递 -->
      	</div>
    </template>
    <script>
    	Vue.component('father', {
        template: '#father',
        data: function () {
          return {
            name: 'Tony'
          }
        },
        components: {
          // 子组件
          son: {
            template: '#son',
            // 接收父组件传递的数据
            props: ['parentName'] // 接收时使用camel才能接收
          }
        }
      })
    </script>
    ```

- `父组件` 给 `子组件` 传递 `方法` 的时候, 不能使用 `camel` 命名, 因为 `HTML` 标签的属性名称无视大小写

    ```html
    <template id="father">
    		<div>
          	<button @click="say">我是按钮</button>
          	<son @parent-say="name"></son> <!-- 使用kebab进行方法传递 -->
      	</div>
    </template>
    <script>
    	Vue.component('father', {
        template: '#father',
        methods: {
          say () {
            console.log('Tony')
          }
        },
        components: {
          // 子组件
          son: {
            template: '#son',
            methods: {
        			sonSay () {
                // 接收父组件传递的方法
        				this.$emit('parent-say') // 同样使用kebab进行接收
      				}
      			}
          }
        }
      })
    </script>
    ```

    

### 插槽

[插槽 — Vue.js](https://cn.vuejs.org/v2/guide/components-slots.html)

- `插槽` 可以理解为一个坑
- 使用者可以根据自己的需求来填这个坑
- `插槽` 可以指定默认数据, 如果使用者没有填充, 默认数据就会被渲染
- `组件` 使用时双标签中的内容就视为填充的 `数据`
- 如果 `组件` 中没有定义 `插槽` , 那么使用 `组件` 的双标签中的所有内容都会被抛弃



#### 匿名插槽

- 没有指定名称的 `插槽`
- 有多少个 `匿名插槽` , 填充的数据就会被拷贝并渲染多少份
- <span style="color: #ff0">企业开发中一个 `组件` 内不要写多于一个的 `匿名插槽` , 想要使用其他 `插槽` 可以使用 `具名插槽`</span>
- `匿名插槽` 实际上也有名称, 是 `default` , 可以在 `v-slot` 中使用

```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <son>
            <!-- 双标签中的所有内容会被视为填坑的数据 -->
            <div>我是追加的内容1</div>
            <div>我是追加的内容2</div>
            <div>我是追加的内容3</div>
        </son>
    </div>
</template>
<template id="son">
    <div>
        <div>我是头部</div>
        <slot>我是默认数据</slot> <!-- 匿名插槽1 -->
        <slot>我是默认数据</slot> <!-- 匿名插槽2, 要被填充的数据也会被拷贝并渲染到这个插槽中 -->
        <div>我是底部</div>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 父组件
  Vue.component('father', {
    template: '#father',
    components: {
      son: {
        template: '#son'
      }
    }
  })
</script>
```



#### 具名插槽

- 顾名思义, 指定了名称的 `插槽`
- 通过 `name` 属性给 `<slot>` 指定名称
- 通过 `<template>` 配合 `v-slot` 来填充内容, 具体见 `指令 => v-slot`
- <span style="color: #ff0;">通过 `slot` 属性指定 `具名插槽` 的做法虽然还能用但是已经被**废弃**了, 不要使用, `v3.x` 中会被移除</span>



#### 作用域插槽

- 带数据的 `插槽`
- 让 `父组件` 在填充 `子组件` 插槽内容时也能使用 `子组件` 的 `数据`
- 在 `子组件` 的 `<slot>` 中通过 `v-bind` 暴露数据给 `父组件`
- 格式为 `:tag="data"`
- 在 `父组件` 的 `<template>` 中通过 `v-slot` 接收 `子组件` 暴露的数据
- 接收格式为 `#slotName="scopeName"` , 使用格式为 `scopeName.tag`
- <span style="color: #ff0;">通过 `slot-scope` 属性接收数据的做法虽然还能用但是已经被废弃了, 不要使用, `v3.x` 中会被移除</span>
- 典型的应用场景是 `子组件` 提供数据, `父组件` 决定如何渲染

该示例中 `Vue实例对象` 的控制区域可以视为 `父组件`

```html
<div id="app">
    <my-comp>
        <template #default="abc"> <!-- 匿名插槽的名称为 default, 作用域取名为abc -->
            <li v-for="name in abc.names">{{ name }}</li> <!-- abc.names就是接收到的数据 -->
        </template>
    </my-comp>
</div>
<template id="my_comp">
    <div>
        <div>我是头部</div>
        <slot :names="names">我是默认内容</slot> <!-- 将子组件的names数据暴露给父组件 -->
        <div>我是底部</div>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  Vue.component('myComp', {
    template: '#my_comp',
    data: function () {
      return {
        names: ['zs', 'ls', 'ww', 'zl']
      }
    }
  })
</script>
```

---

## Watch

[API - watch — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/api/#watch)

- `watch` 属性是专门监听数据变化的, 是一个 `对象`
- `key` 为需要观察的 `数据`
- `value` 为 `回调函数` 或者 `方法名`
- 只要 `数据` 发生了变化, 就会自动调用对应数据的 `回调函数`
- `回调函数` 会接受两个参数, 第一个为 `newValue` , 第二个为 `oldValue`

```html
<div id="app">
    <input type="tel" v-model.number="num1">
    <span>+</span>
    <input type="tel" v-model.number="num2">
    <span>=</span>
    <input type="text" disabled="disabled" :value="sum">
</div>
<script src="js/vue.js"></script>
<script src="js/vue-router.js"></script>
<script>
  const vue = new Vue({
    el: '#app',
    data: {
      num1: 0,
      num2: 0,
      sum: 0
    },
    // watch属性
    watch: {
      // 监听num1的变化
      num1: function (newValue, oldValue) {
        this.sum = newValue + this.num2
      },
      // 监听num2的变化
      num2: function (newValue, oldValue) {
        this.sum = newValue + this.num1
      }
    }
  })
</script>
```

---

## 生命周期钩子 (Lifecyele Hooks)

[API - 生命周期钩子 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)

- 一个 `实例` ( `组件` ) 在从生到死的特定阶段调用的 `方法` (钩子函数)
- 生命周期 `钩子` = 生命周期 `函数` = 生命周期 `事件` , 只是叫法区别
- 直接写在 `Vue实例对象` 中, `key` 为 `钩子` 名称, `value` 为 `函数`
- 系统会在特定阶段自动调用这些 `钩子函数`
- <span style="color: #f40;">不要使用 `箭头函数` , 因为 `this` 不会正确指向 `Vue实例对象`</span>
- 创建期间的 `钩子`
    - `beforeCreate` : `Vue实例` 创建好了 `事件` / `生命周期方法` , 但还没有初始化 `data` / `methods` , 因此该 `钩子` 中无法访问这两个属性
    - `created` : `Vue实例` 已经初始化好了 `data` / `methods` , 可以在该 `钩子` 中访问这两个属性
    - `beforeMount` :  `Vue实例` 已经完成了 `模板` 的编译, 但还没有挂载到 `界面` 上
    - `mounted` : `Vue实例` 已经将完成编译的 `模板` 渲染到 `界面` 中指定的位置上了
- 运行期间的 `钩子`
    - `beforeUpdate` : 一旦数据发生变化, 该 `钩子` 就会被调用, 此时 `data` 中的数据是最新的, 但是 `界面` 上显示的还是旧的
    - `updated` : `Vue实例` 已经完成了数据的更新, 此时 `data` 和 `界面` 上的数据都是最新的
- 销毁期间的 `钩子`
    - `beforeDestroy` : `Vue实例` 准备被销毁, 但还没有执行, `data` / `methods` 仍然可以访问, 并且这是最后一个可以访问到 `组件` 的 `data` / `methods` 的 `方法`
    - `destroyed` : `Vue实例` 完全销毁后调用, 其所有内容均无法再访问使用, <span style="color: #f40">即使能访问到, 也绝对不要在这个 `方法` 中操作, 最后一个可以操作其内容的 `方法` 是 `beforeDestroy`</span>

示例

```html
<div id="app">
    <p>{{ msg }}</p>
    <button @click="change">切换</button>
    <one v-if="isShow"></one>
</div>
<template id="one">
    <div>
        <p>我是组件</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 注册组件
  Vue.component('one', {
    template: '#one',
    data: function () {
      return {
        msg: 'message'
      }
    },
    methods: {
      bark () {
        console.log('bark')
      }
    },
    /* 生命周期钩子元素 */
    // 销毁期间 (点击 切换 按钮销毁该组件)
    beforeDestroy: function () {
      console.log(this.msg) // message
      console.log(this.bark) // f bark ()
    },
    destroyed: function () {
      console.log('destroyed') // destroyed
    }
  })
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    data: {
      msg: 'Tony',
      isShow: true
    },
    methods: {
      say () {
        console.log('say')
      },
      change () {
        this.isShow = !this.isShow
      }
    },
    /* 生命周期钩子函数 */
    // 创建期间
    beforeCreate: function () {
      console.log(this.msg) // undefined
      console.log(this.say) // undefined
    },
    created: function () {
      console.log(this.msg) // Tony
      console.log(this.say) // f say ()
    },
    beforeMount: function () {
      console.log(document.querySelector('p').innerHTML) // {{ msg }}
    },
    mounted: function () {
      console.log(document.querySelector('p').innerHTML) // Tony
    },
    // 运行期间 (将 msg 从 Tony 更改成 Lily)
    beforeUpdate: function () {
      console.log(this.msg) // Lily
      console.log(document.querySelector('p').innerHTML) // Tony
    },
    updated: function () {
      console.log(this.msg) // Lily
      console.log(document.querySelector('p').innerHTML) // Lily
    }
  })
</script>
```

`生命周期` 图示

![vue_instance_lifecycle.png](D:\xsjcTony\it666\Frontend-Learning\Notes\Vue\images\vue_instance_lifecycle.png)

---

## 特殊属性

[API - 特殊attribute — Vue.js](https://cn.vuejs.org/v2/api/#特殊-attribute)



### ref

- 用来给 `元素` 或 `子组件` 注册引用信息
- 引用信息将会注册在 `父组件` 的 `$refs` 对象上
- 在普通的 `DOM` 元素上使用, 那么指向的就是 `DOM` 元素, 可以用来获取 `DOM` , 虽然 `Vue` 推荐 `数据驱动` , 但迫不得已需要操作 `DOM` 的时候可以用这种方法获取
- 如果用在 `子组件` 上, 那么指向的就是 `组件实例` (通过原生 `JavaScript` 获取只能获取到 `组件` 的 `HTML` , 而不是 `组件实例` )
- 通过 `子组件` 实例的 `$el` 属性可以拿到 `根元素`
- <span style="color: #0ff;">反正就是永远不要使用原生 `JavaScript` 获取 `DOM` , 如果迫不得已要使用则通过 `ref` 绑定, 使用 `vm.$refs` 获取</span>

```html
<div id="app">
    <button @click="myFn">我是按钮</button>
    <p ref="myP">我是原生的DOM</p>
    <one id="my_one" ref="myOne"></one>
</div>
<template id="one">
    <div>
        <p>我是组件</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 注册组件
  Vue.component('one', {
    template: '#one'
  })
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    methods: {
      myFn () {
        console.log(this.$refs.myP) // <p>我是原生的DOM</p>
        console.log(this.$refs.myOne) // VueComponent {...}
      }
    }
  })
</script>
```

---

## 渲染函数

[渲染函数 & JSX — Vue.js](https://cn.vuejs.org/v2/guide/render-function.html)

- 有些时候相比于使用 `{{ }}` 模板, `渲染函数` 会更加好用, 因为他可以发挥 `JavaScript` 完全编程的能力
- 在 `Vue实例对象` / `组件` 中使用 `render` 属性
- 它是一个 `方法` , 接收的 `参数`
    - `createElement` : 一个 `函数` , `字符串模板` 的代替方案, 返回一个 `VNode` ( `虚拟节点` ), 其接收的 `参数` : [createElement  — Vue.js](https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数) 
- 该方式会直接覆盖 `Vue实例对象` 的控制区域

```html
<div id="app">
    <!--<one></one>--> <!-- 不需要了, 因为整个div#app会直接被createElement生成的VNode覆盖掉 -->
</div>
<template id="one">
    <div>
        <p>我是组件123</p>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
  // 注册组件
  Vue.component('one', {
    template: '#one'
  })
  // Vue实例对象
  const vue = new Vue({
    el: '#app',
    render: function (createElement) {
      return createElement('one')
    }
  })
</script>
```

---

## 单文件组件 (Single-File Component / SFC)

[单文件组件 — Vue.js](https://cn.vuejs.org/v2/guide/single-file-components.html)

- 文件扩展名为 `.vue`
- 所有 `SFC` 都由三个部分组成
    - `<template>` : 用于编写 `组件` 的 `HTML` 结构代码
    - `<script>` : 用于编写 `组件` 的业务逻辑代码
    - `<style>` : 用于编写 `组件` 的样式代码



### `App.vue` 文件示例

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```



### `<script>` 

- `SFC` 需要作为一个模块处理, 所以使用 `ESM` 的方式暴露出去 `export default { /* ... */ }`

- `name` : `组件` 名称
- `data` : 和 `组件` 中的用法一样, 必须是一个 `函数` , 返回一个 `对象`
- 其他诸如 `methods` 等都和之前 `组件` 中的一样
- `components` : 需要使用 `ESM` 的 `import Comp from './path/to/One.vue'` 导入之后使用, `components: { One: One }`



### `<style>`

- 默认情况下 `组件` 中的 `<style>` 中的样式是 `全局样式`
- 给 `<style>` 标签添加 `scoped` 属性来指定该 `SFC` 中的样式只应用于这个 `组件` , 是 `局部样式`

---

## 插件 (Plugins)

[插件 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/plugins.html)

- 用来为 `Vue` 添加全局功能
- 通过 `Vue.use()` 使用插件
- 必须在 `new Vue()` 之前调用 `Vue.use()`
- 给 `Vue` 添加 `实例方法` 的时候必须使用 `$` 开头的方法名



### 组件插件

- 将 `组件` 封装为 `插件` 的原因是为了方便对 `组件` 进行扩展

- 如果想通过 `Vue.use()` 来注册 `组件` , 必须先将 `组件` 封装成一个 `插件`
- 先将组件封装成一个 `SFC` (.vue) 文件, 然后再通过一个配套的 `JavaScript` 文件导入 `组件`
- 暴露一个 `install` 方法 (第一个参数为 `Vue` , 第二个参数是由 `Vue.use()` 传入的 `options` )
- 在需要使用该封装好的 `组件插件` 的地方引入这个 `JavaScript` 文件, 使用 `Vue.use()` 即可

最简单的封装示例

- `Loading.vue`

```vue
<template>
    <div class="container">
        <div class="loading"></div>
        <p class="title">正在加载...</p>
    </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="scss">
/* style */
</style>
```

- `index.js`

```js
import Loading from './Loading.vue'

export default {
  install: function(Vue) {
    Vue.component(Loading.name, Loading)
  }
}

```

- `main.js` 

```js
import Vue from 'vue'
import App from './App.vue'
import Loading from './plugin/loading/index'

Vue.use(Loading)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

---

## 实例方法



### vm.$nextTick

- 将 `回调函数` 延迟到下次 `DOM` 更新完毕之后执行
- `this` 绑定到调用他的 `Vue实例对象` 上

```js
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```



---

## 兼容性

