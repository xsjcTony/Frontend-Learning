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



### <span style="color: yellow;">(几乎用不到)</span> 变量插值

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

## 内置函数 (Functions)



> [Functions | Less.js](https://lesscss.org/functions/)



注意点

- `less` 的底层就是 `JavaScript`
- 所以大部分 `JavaScript` 常用方法在 `less` 中都可以用

- 在上述网址照葫芦画瓢即可

常用方法

```less
// 混杂方法
/*
image-size("file.jpg"); // => 100px 50px
image-width("file.jpg"); // => 100px
image-height("file.jpg"); // => 50px

// 单位转换
convert(9s, "ms"); // => 9000ms
convert(14cm, mm); // => 140mm
convert(8, mm); // => 8

// 列表
$list: "A", "B", C, "D";
length($list); // => 4
extract($list, 3); // => C
*/
// 数学
/*
ceil(2.1); // => 3 向上取整
floor(2.1); // => 2 向下取整
percentage(.3); // => 30% 转百分比
round(1.67, 1); // => 1.7 四舍五入，保留一位小数点
sqrt(25cm); // => 5cm 取平方根
abs(-5cm); // => 5cm 取绝对值
pi(); // => 3.141592653589793 圆周率π
max(3px, 42px, 1px, 16px); // => 42px
min(3px, 42px, 1px, 16px); // => 1px
*/
// 字符串
/*
replace("Hi Tom?", "Tom", "Jack"); // => "Hi Jack"
*/
// 判断类型
/*
isnumber(56px); // => true 是否含数字
isstring("string"); // => true
iscolor(#ff0); // => true
iscolor(blue); // => true
iskeyword(keyword); // => true
isurl(url(...)); // => true
ispixel(56px); // => true
isem(7.8em); // => true
ispercentage(7.8%); // => true
isunit(4rem, rem); // => true 是否为指定单位
isruleset($rules); // => true 是否为变量
*/
// 颜色操作
/*
增加饱和度
saturate(color, 20%)
减少饱和度
desaturate(color, 20%)
增加亮度
lighten(color, 20%)
减少亮度
darken(color, 20%)
降低透明度
fadein(color, 10%)
增加透明度
fadeout(color, 10%)
设置绝对不透明度(覆盖原透明度)
fade(color, 20%)
旋转色调角度
spin(color, 10)
将两种颜色混合，不透明度包括在计算中。
mix(#f00, #00f, 50%)
与白色混合
tint(#007fff, 50%)
与黑色混合
shade(#007fff, 50%)
灰度，移除饱和度
greyscale(color)
返回对比度最大的颜色
contrast(color1, color2)
*/
// 颜色混合
/*
每个RGB 通道相乘，然后除以255
multiply(color1, color2);
与 multiply 相反
screen(color1, color2);
使之更浅或更暗
overlay(color1, color2)
避免太亮或太暗
softlight(color1, color2)
与overlay相同，但颜色互换
hardlight(color1, color2)
计算每个通道(RGB)基础上的两种颜色的平均值
average(color1, color2)
*/
```

---

## 层级结构



### 基本使用

定义

- `less` 的初衷是让 `css` 和 `html` 一样有层级结构关系, 提升代码阅读性

格式

```less
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

```less
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

```less
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

- 本质是使用 `并集选择器` , 而混合是直接复制黏贴

格式

```less
.childClass:extend(.parentClass)
```

示例

```less
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

.father:extend(.center) {
  width: 300px;
  height: 300px;
  background: red;
  
  .son:extend(.center) {
    width: 200px;
    height: 200px;
    background: blue;
  }
}
```

---

## 条件判断



定义

- 给 `混合` 添加执行限定条件

格式

- 支持比较运算符 ( `>` , `<` , `>=` , `<=` , `=` )

```less
.className($var1, $var2) when ($var1 = value) {} // 当$var1的值和value相等时, 才会调用
div {
  .className(value, value2); // 会调用
  .className(newValue, value2); // 不会调用
}
```

- 支持逻辑运算符

    - `,` 代表 `||`

    ```less
    .className($var1, $var2) when ($var1 = value), ($var2 = value2) {} // 满足其一即可调用
    div {
      .className(value, newValue2); // 会调用
      .className(newValue, value2); // 会调用
      .className(newValue, newValue2); // 不会调用
    }
    ```

    - `and` 代表 `&&`

    ```less
    .className($var1, $var2) when ($var1 = value) and ($var2 = value2) {} // 两者都满足才可调用
    div {
      .className(value, value2); // 会调用
      .className(value, newValue2); // 不会调用
      .className(newValue, value2); // 不会调用
      .className(newValue, newValue2); // 不会调用
    }
    ```

- 支持内置函数检查

```less
.className($var1, $var2) when (ispixel($var1)) {} // 当$var1的单位为像素(px)时才能调用
div {
  .className(10px, value2); // 会调用
  .className(1, newValue2); // 不会调用
}
```

