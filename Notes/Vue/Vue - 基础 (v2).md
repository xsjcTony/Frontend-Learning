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

## 数据绑定 (Data binding)



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

## 指令 (Directive)

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

- 相当于 `JavaScript` 中的 `for...in` 循环

- 可以遍历 `Array` / `Object` / `number` / `string` / `Iterable (>=v2.6)`

- 使用特定语法 `alias in expression`

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
- 可以给 `回调函数` 传递参数, `$event` 为原生 `事件对象`
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
- 一个 `指令` 是一个 `对象` , `对象` 中有 `definition`
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



