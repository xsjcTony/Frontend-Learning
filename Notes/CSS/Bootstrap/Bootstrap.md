# Bootstrap



> [Bootstrap · The most popular HTML, CSS, and JS library in the world.](https://getbootstrap.com/)
>
> [Bootstrap中文网](https://www.bootcss.com/)
>
> [BootStrap中国-逐浪CMS引领网站开发新潮流](https://code.z01.com/)



## 定义

- 专门用于开发响应式布局 / 移动设备优先的 `WEB` 框架
- 由 `twitter` 公司推出

---

## 版本区别 (v3.x VS v4.x)

|             | v3.x  | v4.x    |
| ----------- | ----- | ------- |
| CSS预处理器 | less  | SASS    |
| 栅格种类    | 4种   | 5种     |
| 单位        | 像素  | rem     |
| 布局方式    | float | flexbox |

---

## 基本使用 (v4.x)

1. 导入 `CSS` 文件
2. 导入 `jQuery` 相关文件
3. 导入 `bootstrap` 相关 `js` 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap-模板</title>
    <link rel="stylesheet" href="path/to/bootstrap.css">
</head>
<body>

<script src="path/to/jquery.js"></script>
<script src="path/to/bootstrap.bundle.js"></script>
</body>
</html>
```

---

## 视口划分

- `Bootstrap` 将视口划分为了五种
    - `xs` : `<576px` , 超小屏幕
    - `sm` : `>=576px` , 小屏幕
    - `md` : `>=768px` , 中等屏幕
    - `lg` : `>=992px` , 大屏幕
    - `xl` : `>=1200px` , 超大屏幕

---

## 容器



[Overview · Bootstrap v4.6](https://getbootstrap.com/docs/4.6/layout/overview/)



### 定义

- 响应式布局的基础
- 推荐将所有内容都定义在 `容器` 中
- 给 `容器` 添加 `px-0` 类名可以去除左右两边的 `padding`



### 固定容器

- 类名为 `container`
- 在不同视口大小下会有不同的固定宽度
- 原理为通过 `@media` 判断视口宽度并设置 `max-width`

```html
<div class="container"></div>
```



### 自适应宽度容器

- 类名为 `container-fluid`
- 宽度永远是 `100%` 自适应
- 原理为设置 `width: 100%;`

```html
<div class="container-fluid"></div>
```

---

## 栅格系统



[Grid system · Bootstrap v4.6](https://getbootstrap.com/docs/4.6/layout/grid/)



### 定义

- 使用一系列的 `row` 和 `column` 来实现复杂的响应式布局
- 默认情况下会将一行的内容等分为 `12` 份
- 可以通过绑定类名的方式来指定这一行中的每一列占用多少份



### 基本格式

```html
<div class="container">
    <div class="row">
        <div class="col">我是第1列</div>
        <div class="col">我是第2列</div>
        <div class="col">我是第3列</div>
    </div>
</div>
```



### 特点

- 默认情况下 `row` 的宽度和所在 `容器` 的宽度一样
- 默认情况下所有 `col` 的宽度会等分所在 `row` 的宽度
- 可以通过 `col-*` 的方式指定当前占用 `12分之*`
- 如果一行中的内容的宽度超过了 `12` 份, 那么超出部分会自动换行

```html
<div class="col-6">我是列</div>
```



### `col` 的尺寸

- 根据视口大小划分尺寸
- 根据当前视口大小寻找对应类名, 从大到小寻找
- 可以为不同视口大小设置不同尺寸
- 若没有设置则默认占一整行

| 格式     | 视口大小 |
| -------- | -------- |
| col-*    | 超小屏幕 |
| col-sm-* | 小屏幕   |
| col-md-* | 中等屏幕 |
| col-lg-* | 大屏幕   |
| col-xl-* | 超大屏幕 |



### 沟槽

- 栅格的每一列间默认有间隙沟槽
- 一般是 `15px` 左右的 `margin` 或 `padding`
- 可以给 `row` 添加类名 `no-gutters` 来消除

```html
<!-- px-0 可以消除容器左右的 padding -->
<div class="container px-0">
  	<div class="row no-gutters">
      	<div class="col-6">我是第1列</div>
      	<div class="col-6">我是第2列</div>
      	<div class="col-6">我是第3列</div>
  	</div>
</div>
```



### 偏移

- 给 `col` 添加类名 `offset-*` , 可以使其偏移 `*` 份

```html
<div class="container">
    <div class="row">
        <div class="col-2 offset-3">1</div>
        <div class="col-2">2</div>
        <div class="col-2">3</div>
    </div>
</div>
```



### 排序

- 给 `col` 添加类名 `order-*` , 可以使它们按照顺序排序
- 顺序根据数字的由小到大
- 不排序的 `col` 会在需要排序的 `col` 前面

```html
<!-- 结果为 1 3 2 -->
<div class="container">
    <div class="row">
        <div class="col-2">1</div>
        <div class="col-2 order-2">2</div>
        <div class="col-2 order-1">3</div>
    </div>
</div>
```



### 原理 (实现)

- `row` 和 `col` 的底层原理是 `flex` 布局

```css
.row {
  	display: flex;
  	flex-wrap: wrap; /* 自动换行 */
  	margin-left: -15px; /* 抵消 .container 的padding-left */
  	margin-right: -15px; /* 抵消 .container 的padding-right */
}
.col {
  	flex: 1;
}
.col-6 {
 		flex-basis: 50%;
}
```

---

## 公共样式



> https://getbootstrap.com/docs/4.6/utilities



- 通过添加对应的类名来快速添加样式

---

## 常用组件



> https://getbootstrap.com/docs/4.6/components

