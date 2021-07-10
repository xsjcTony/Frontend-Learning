# Sass (Syntactically Awesome Style Sheets)



> [Sass: Syntactically Awesome Style Sheets](https://sass-lang.com/)



## 定义

扩展 `CSS` 语言, 增加了一系列特性, 使 `CSS` 更容易维护和扩展, 可以用类似 `JavaScript` 的语法写 `CSS`

- 变量
- 混合 (Mix in)
- 嵌套
- 函数
- 运算
- ...

---

## 文件后缀名



### `.sass`

- 以 `缩进` 代替 `{}` 表示层级结构
- 语句后面不用 `;`

### `.scss`

- 以 `{}` 表示层级结构
- 语句后面需要 `;`
- <span style="color: yellow;">企业开发中常用</span>

---

## 使用方法



### 提前预编译

- 利用工具将 `sass` 或 `scss` 文件转换为 `css` 文件



---

## 注释 (Comments)



和 `JavaScript` 一样分单行注释和多行注释

- 单行注释

    - 不会参与预处理 (编译时会被直接去掉)

    ```scss
    // 这是一个单行注释
    ```

- 多行注释

    ```scss
    /*
    这是一个
    多行注释
    */
    ```

---

## 变量 (Variables)



### 基本使用

定义

- 和 `JavaScript` 中的变量差不多

注意点

- `sass` 中的变量不是延迟加载的, 不能先使用后定义
- 不同作用域内的变量不互相影响, 相同作用域内的使用后定义的

格式

```scss
// 定义变量
$variable: value;

// 使用变量
color: $variable;

// 变量赋值
$variable1: $variable2;

// {}外为全局变量, {}内为局部变量
$c: red; // 全局变量
{
  $c: blue; // 局部变量
	color: $c; // pink
  $c: pink; // 同名同作用域的变量使用最后定义的
}
color: $c; // red
```

示例

```scss
/*
.box1 {
	width: 200px;
	height: 200px;
	background: red;
	margin-bottom: 20px;
}

.box2 {
	width: 200px;
	height: 200px;
	background: red;
}
*/
// 相当于
$w: 200px;
$h: $w;
$c: red;

.box1 {
  $c: blue;
  width: $w;
  height: $h;
  background: $c; // blue
  margin-bottom: 20px;
}

.box2 {
  width: $w;
  height: $h;
  background: $c; // red
}
```



### 变量插值

定义

- 在 `sass` 中, 属性和选择器名称也可以使用变量, 但是必须要使用变量插值的格式, 否则无效

```scss
$w: width;
#{$w}: 200px; // width: 200px;

$w: 200px; // 无效
```

示例

```scss
/*
div {
	width: 200px;
	height: 200px;
	background: red;
}
*/
// 相当于
$size: 200px;
$w: width;
$s: div;

#{$s} {
  #{$w}: $size;
  height: $size;
  background: red;
}
```

---

## 运算 (Operation)



定义

- 可以进行简单的 `+` , `-` , `*` , `/` 运算
- 和 `JavaScript` 中的基本运算几乎相同
- 要写上单位, 但写在哪里都可以

格式

```scss
margin-left: (-200px * 0.5); // margin-left: -100px;
margin-left: (-200 / 2px); // margin-left: -100px;
margin-left: (-200px + 100px); // margin-left: -100px;

margin-left: (-200 + 100); // 缺少单位
```

---

## 混合 (Mix in)



### 基础混合

定义

- 将需要重复使用的代码封装到一个类中, 在需要使用的地方调用后即可
- 本质就是复制黏贴

注意点

- 在封装的类名之后加上 `()` , 调用的时候也要加
- 如果没有 `()` , 则调用的时候不用加

示例

```scss
/*
.father {
  width: 300px;
  height: 300px;
  background: red;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.father .son {
  width: 200px;
  height: 200px;
  background: blue;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
*/
// 相当于
@mixin center() {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.father {
  width: 300px;
  height: 300px;
  background: red;
  @include center(); // ()可加可不加
  
  .son {
    width: 200px;
    height: 200px;
    background: blue;
    @include center; // ()可加可不加
  }
}
```



### 带参数的混合

格式

```scss
@mixin className($var1, $var2, $var3) {
  attribute1: $var1;
  attribute2: $var2;
  attribute3: $var3;
}

div {
  @include className(value1, value2, value3);
}
```

默认值

```scss
@mixin className($var1: value1, $var2: value2) {}

div {
  @include className($var2: newValue); // $var1使用默认, $var2使用new Value
}
```

示例

```scss
/*
.box1 {
  width: 200px;
  height: 200px;
  background: #ff0000;
}

.box2 {
  width: 300px;
  height: 300px;
  background: #0000ff;
}

.box3 {
	width: 100px;
  height: 100px;
  background: #00ff00;
}
*/
// 相当于
@mixin whc($w: 100px, $h: 100px, $c: pink) {
  width: $w;
  height: $h;
  background: $c;
}

.box1 {
  @include whc(200px, 200px, red);
}

.box2 {
  @include whc(300px, 300px, blue);
}

.box3 {
  @include whc($c: green);
}
```



### 可变参数

定义

- `$args...` 表示可变参数, 可以接收任意数量的参数

格式

```scss
@mixin className1($args...) {
  attribute: $args;
}
.className2($essentialVar1, $essentialVar2, $args...) {
  attribute: $arguments;
}

div {
  @include className1(value1, value2); // attribute: value1 value2;
  @include className2(value1, value2, value3, value4); // attribute: value1 value2 value3 value4;
  @include className2(value1); // 报错, 少了一个必须要有的参数
}
```

注意点

- 如果有必须要的参数则写在 `...` 的前面, `...` 只能写在最后
- 使用 `$args` 来接收 `$args...` 可变参数, 每个中间会有一个空格

示例

```scss
/*
div {
  transition: all 4s linear 0s;
}
*/
// 相当于
@mixin animate($name, $time, $args...){
  transition: $name, $time, $args;
}

div {
  @include animate(all, 4s, linear, 0s);
}
```

---

## 导入其他 `sass` 或 `scss` 文件



格式

- 后缀可以省略, 默认为 `.sass` 或 `.scss`
- 同名 `.sass` 文件和 `.scss` 文件不能在同一目录下共存

```scss
@import "anotherFile";
@import "anotherFile.scss";
```

---

## 函数 (Functions)



### 内置函数

> [Sass: Built-In Modules](https://sass-lang.com/documentation/modules)

示例

```scss
div {
  width: 200px;
  height: 200px;
  background: mix(red, blue); // purple
}
```

常用内置函数

```scss
    /*
    1.SASS中的内置函数
    和LESS一样, SASS中也提供了很多内置函数方便我们使用
    */

    // 字符串函数
    /*
    unquote（$string）：删除字符串中的引号；
    quote（$string）：给字符串添加引号；
    To-upper-case（$string）：将字符串小写字母转换为大写字母
    To-lower-case（$string）：将字符串大写字母转换为小写字母
    */
    // 数值函数
    /*
    percentage($value)：将不带单位的数转换成百分比值；
    round($value)：将数值四舍五入，转换成一个最接近的整数；
    ceil($value)：向上取整；
    floor($value)：向下取整；
    abs($value)：取数的绝对值；
    min($numbers…)：找出几个数值之间的最小值；
    max($numbers…)：找出几个数值之间的最大值；
    random(): 获取随机数
    */
    // 颜色函数
    /*
    rgb($red,$green,$blue)：根据红、绿、蓝三个值创建一个颜色；
    rgba($red,$green,$blue,$alpha)：根据红、绿、蓝和透明度值创建一个颜色；
    red($color)：从一个颜色中获取其中红色值；
    green($color)：从一个颜色中获取其中绿色值；
    blue($color)：从一个颜色中获取其中蓝色值；
    mix($color-1,$color-2,[$weight])：把两种颜色混合在一起。
    */
    // 列表函数
    /*
    length($list)：返回一个列表的长度值;
    nth($list, $n)：返回一个列表中指定的某个标签值;
    join($list1, $list2, [$separator])：将两个列给连接在一起，变成一个列表；
    append($list1, $val, [$separator])：将某个值放在列表的最后；
    zip($lists…)：将几个列表结合成一个多维的列表；
    index($list, $value)：返回一个值在列表中的位置值。
    */
```



### 自定义函数

格式

```scss
@function myFunc($var) {
  @return $var;
}
```

注意点

- 不建议过多使用逻辑性的语句

示例

```scss
@function square($num) {
  @return $num * $num + px;
}

div {
  width: square(2); // 4px
}
```

---

## 层级结构



### 基本使用

定义

- `sass` 的初衷是让 `css` 和 `html` 一样有层级结构关系, 提升代码阅读性

格式

```scss
/*
.father {}
.father .son {}
*/
// 相当于
.father {
  .son {}
}
```





### 伪类

- `&:pseudoClass`

- `&` 的作用是告诉编译器将 `less` 转换成 `css` 时直接拼接在当前选择器后面即可, 不要用后代选择器 (默认)

```scss
/*
.father {}
.father .son {}
.father .son:hover {}
*/
// 相当于
.father {
  .son {
    &:hover {}
  }
}
```



### 伪元素

- `&::before` / `&::after`
- 原理和伪类相同

```scss
/*
.father {}
.father::before {}
*/
// 相当于
.father {
  &::before {}
}
```

---

## 继承 (Inherit)



定义

- 本质是使用 `并集选择器` , 而 `混合` 是直接复制黏贴

格式

```scss
.childClass {
  @extend .parentClass
}
```

示例

```scss
/*
.center,
.father,
.father .son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.father {
  width: 300px;
  height: 300px;
  background: red;
}
.father .son {
  width: 200px;
  height: 200px;
  background: blue;
}
*/
// 相当于
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.father {
  @extend .center;
  width: 300px;
  height: 300px;
  background: red;
  
  .son {
    @extend .center
    width: 200px;
    height: 200px;
    background: blue;
  }
}
```

---

## 条件判断



格式

- 支持 `@if` / `@else if` / `@else`

示例

```scss
@mixin triangle($dir, $width, $color) {
  width: 0;
  height: 0;
  border-width: $width;
  border-style: solid solid solid solid;
  
  @if($dir == up) {
    border-color: transparent transparent $color transparent;
  }
  @else if($dir == down) {
    border-color: $color transparent transparent transparent;
  }
  @else if($dir == left) {
    border-color: transparent $color transparent transparent;
  }
  @else if($dir == right) {
    border-color: transparent transparent transparent $color;
  }
}

div {
  @include triangle(Up, 50px, blue); // 向上的蓝色50px高的三角形
}
```

---

## 循环 (Loop)



### `for` 循环

格式

```scss
@for $var from min through max {} // 包含min, 包含max, 一次循环+1
@for $var from min to max {} // 包含min, 不包含max, 一次循环+1
```

示例

```scss
li {
  background: red;
    
  @for $i from 5 through 8 { // 第5~8个li背景变成蓝色
    &:nth-child(#{$i}) { // 使用变量插值
      background: blue;
    }
  }
  
  @for $j from 9 through 12 { // 第9~11个li背景变成蓝色
    &:nth-child(#{$i}) { // 使用变量插值
      background: blue;
    }
  }
}
```



### `while` 循环

格式

```scss
@while(expression) {}
```

示例

```scss
li {
  background: red;
  
  $i: 5;
	@while($i <= 8) { // 第5~8个li背景变成蓝色
  	&:nth-child(#{$i}) { // 使用变量插值
      background: blue;
    }
    $i: $i + 1; // $i++
  }
}
```



