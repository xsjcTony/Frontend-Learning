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

## 数据传递



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

#### 单向传递

- 默认情况下数据就是 `单向传递` 的: `M` => `VM` => `V`

- 我把 `数据` 交给 `Vue实例对象` , `Vue实例对象` 再把 `数据` 交给 `界面`

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

#### 双向传递

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

## 
