# jQuery - 原理



## 基本结构

```js
// aQuery = Aelita's jQuery

(function (window, undefined) {
  let aQuery = function () {
    return new aQuery.prototype.init();
  };

  aQuery.prototype = {
    constructor: aQuery,
    init: function () {}
  }

  aQuery.prototype.init.prototype = aQuery.prototype;
  window.aQuery = window.$ = aQuery;
})(window);
```



jQuery本质上是一个 `闭包` (立即执行函数)

- 防止和其他框架定义重名变量
- 通过 `window.xxx = xxx;` 来让外界访问内部定义的局部变量



为什么要传入 `window` 参数

- 为了之后的代码压缩

    ```js
    (function(e,t){})(window) // e即为window
    ```

- 为了提升查找的效率, 内部有 `window` 就不需要去外部再寻找 `window`



为什么要传入 `undefined` 参数

- 为了之后的代码压缩

    ```js
    (function(e,t){})(window) // t即为undefined
    ```

- `IE9` 以下的浏览器的 `undefined` 可以被修改, 为了保证内部使用的 `undefined` 不被修改, 所以需要接收一个正确的 `undefined` ( 不传参数即为 `undefined` )

---

## 入口函数

```js
init: function (selector) {
  // trim spaces at the start and end of the string
  selector = aQuery.trim(selector);
  //  / "" / null / undefined / NaN / 0 / false
  if(!selector) {
    return this;
  }
  // function
  else if(aQuery.isFunction(selector)) {
    aQuery.ready(selector);
  }
  // String
  else if(aQuery.isString(selector)) {
    // html code
    if(aQuery.isHTML(selector)) {
      // create all DOM elements
      let temp = document.createElement("div");
      temp.innerHTML = selector;
      // add root elements to jQuery object and add length property to jQuery object
      [].push.apply(this, temp.children);
    }
    // css selector
    else {
      // find all DOM elements based on css selector
      let res = document.querySelectorAll(selector);
      // add all DOM elements to jQuery object and add length property to jQuery object
      [].push.apply(this, res);
    }
  }
  // array / array-like object
  else if(aQuery.isArray(selector)) {
    // transform into real array
    let arr = [].slice.call(selector);
    // transform into jQuery object
    [].push.apply(this, arr);
  }
  // all other data types
  else {
    this[0] = selector;
    this.length = 1;
  }
  // return processed this
  return this;
}
```



### 接收参数细则

传入 ` ` / `""` / `null` / `undefined` / `NaN` / `0` / `false`

- 会返回一个空的 `jQuery对象`

传入 `html` 代码片段

- 将根据代码片段创建的 `DOM元素` 存储到 `jQuery对象` 中并返回

传入选择器

- 将根据选择器找到的所有 `DOM元素` 存储到 `jQuery对象` 中并返回

传入 `数组` / `伪数组`

- 将 `数组` / `伪数组` 中的元素依次存储到 `jQuery对象` 中并返回

传入 `对象` / `DOM元素`

- 会将 `对象` / `DOM元素` 存储到 `jQuery对象` 中返回

传入基本数据类型

- 会将基本数据类型存储到 `jQuery对象` 中返回

传入函数

- 就是 `入口函数`



### 接收参数总结

共分5中

1. ` ` / `""` / `null` / `undefined` / `NaN` / `0` / `false`
    - 返回空的 `jQuery对象`
2. 函数
    - `入口函数`
3. 字符串
    - 代码片段: 将根据选择器找到的所有 `DOM元素` 存储到 `jQuery对象` 中并返回
    - 选择器: 将根据选择器找到的所有 `DOM元素` 存储到 `jQuery对象` 中并返回
4. 数组 / 伪数组
    - 将 `数组` / `伪数组` 中的元素依次存储到 `jQuery对象` 中并返回
5. 除上述类型之外
    - 会将传入的数据存储到 `jQuery对象` 中返回



### 实现



- <span style="color: yellow; font-weight: bold">所有参数将作为 `selector` 传入</span>



预处理

- 使用 `trim()` 去除字符串头尾的空格 ( 自己封装的, 详见工具方法 )

    ```js
    selector = aQuery.trim(selector);
    ```




处理 ` ` / `""` / `null` / `undefined` / `NaN` / `0` / `false`

- 使用 `!selector` , 判断其是否为 `true` 即可, 为 `true` 则 `return this`

    ```js
    if(!selector) {
    	return this;
    }
    ```



处理函数

- 判断 `selector` 是否为函数

    ```js
    if(typeof selector === "function") {}
    ```

- 调用 `ready()` 工具方法执行即可

    ```js
    if(aQuery.isFunction(selector)) {
      aQuery.ready(selector);
    }
    ```



处理字符串

- 判断 `selector` 是否为字符串

    ```js
    if(typeof selector === "string") {}
    ```

- 处理代码片段

    - 判断代码片段特征

        1. 由 `<` 打头

        2. 由 `>` 结尾

        3. 长度至少为 `3` , 因为最短的片段为 `<a>`

        ```js
        if(selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >=3) {}
        ```

    - 根据代码片段创建元素

        1. 通过原生JavaScript创建一个临时元素, 比如 `let temp = document.createElement("div")`
        2. 使用 `temp.innerHTML(selector)` 通过原生JavaScript来根据代码片段创建 `DOM元素` 

    - 将其中的一级元素添加到 `jQuery对象` 中, 并给 `jQuery对象` 添加 `length` 属性

        ```js
        [].push.apply(this, temp.children);
        ```

    - 返回加工好的 `this` ( `jQuery对象` )

        1. `return this`

    ```js
    if(aQuery.isHTML(selector)) {
      // create all DOM elements
      let temp = document.createElement("div");
      temp.innerHTML = selector;
      // add root elements to jQuery object and add length property to jQuery object
      [].push.apply(this, temp.children);
      // return processed this
      return this;
    }
    ```

- 处理选择器

    - 根据传入的选择器找到对应的 `DOM元素`

        1. 通过原生JavaScript的 `document.querySelectorAll()` 获取到对应的 `DOM元素` 

        ```js
        let res = document.querySelectorAll(selector);
        ```

    - 将找到的元素添加到 `jQuery对象` 中, 并给 `jQuery对象` 添加 `length` 属性

        ```js
        [].push.apply(this, res);
        ```

    - 返回加工好的 `this` ( `jQuery对象` )

        1. `return this`

    ```js
    else {
      // find all DOM elements based on css selector
      let res = document.querySelectorAll(selector);
      // add all DOM elements to jQuery object and add length property to jQuery object
      [].push.apply(this, res);
      // return processed this
      return this;
    }
    ```



处理 `数组`

- 判断 `selector` 是否为数组

    - 数组属于 `object`
    - 有 `length` 属性
    - 排除 `window`

    ```js
    if(typeof selector === "object" && "length" in selector && selector !== window) {}
    ```

- 处理 `数组`

    - 判断 `数组` 特征

        1. `({}).toString.apply(array)` 如果为 `[object Array]` 即为 `真数组`
        2. `伪数组` 为 `[object Object]`

        ```js
        if(({}).toString.apply(selector) === "[object Array]") {}
        ```

    - 转换为 `伪数组` 并存入 `jQuery对象` 中

        ```js
        [].push.apply(this, selector);
        ```

    - 返回加工好的 `this` ( `jQuery对象` )

        ```js
        return this;
        ```

    ```js
    if(({}).toString.apply(selector) === "[object Array]") {
      // transform into jQuery object
      [].push.apply(this, selector);
      // return processed this
      return this;
    }
    ```

- 处理 `伪数组`

    - 将 `伪数组` 转换为 `数组`

        ```js
        let arr = [].slice.call(selector);
        ```

    - 再当做 `数组` 来处理, 步骤同上

    ```js
    else {
      // transform into real array
      let arr = [].slice.call(selector);
      // transform into jQuery object
      [].push.apply(this, arr);
      // return processed this
      return this;
    }
    ```

- 然而实际上, `数组` 也可以转换成 `数组` , 因此根本无需判断为 `数组` 或 `伪数组` , 直接先全部转成 `数组` 即可

    ```js
    if(aQuery.isArray(selector)) {
      // transform into real array
      let arr = [].slice.call(selector);
      // transform into jQuery object
      [].push.apply(this, arr);
      // return processed this
      return this;
    }
    ```

    

处理其他数据

1. 直接赋值给 `this[0]` 
2. 设置 `length` 为 `1` 
3. `return this`

```js
else {
	this[0] = selector;
  this.length = 1;
	return this;
}
```

---

## 工具方法



定义

- 将常用的一些方法比如判断是否为某个类等封装到 `静态方法` 中



`isString()`

- 判断是否为字符串

```js
aQuery.isString = function (str) {
  return typeof str === "string";
};
```



`isHTML()`

- 判断是否为 `HTML` 代码片段

```js
aQuery.isHTML = function(str) {
	return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >=3;
};
```



`trim()`

- 去除字符串头尾两头的 `空格`

- `trim()` 只支持 `IE9` 以上, 所以为了支持老版本浏览器需要使用 `replace()`
- 正则表达式 `^\s+` `\s+$` 分别意为开头和结尾的一个或多个空格, `|` 代表或, `g` 代表全局匹配

```js
aQuery.trim = function (str) {
  // check if string
  if(!aQuery.isString(str)) {
    return str;
  }
  // check if trim() is supported in current browser
  if(str.trim) {
    // supported
    return str.trim();
  }
  else {
    // not supported
    return str.replace(/^\s+|\s+$/g, "");
  }
};
```



`isObject()`

- 判断是否为 `对象`

```js
aQuery.isObject = function (selector) {
  return typeof selector === "object";
}
```



`isWindow()`

- 判断是否为 `window`

```js
aQuery.isWindow = function (selector) {
  return selector === window;
}
```



`isArray()`

- 判断是否为 `数组` / `伪数组`

```js
aQuery.isArray = function (selector) {
  return aQuery.isObject(selector) && !aQuery.isWindow(selector) && "length" in selector;
}
```



`isFunction()`

- 判断是否为 `函数`

```js
aQuery.isFunction = function (selector) {
  return typeof selector === "function";
}
```



`ready()`

- 判断 `DOM` 是否加载完毕

    1. 先查看 `document.readyState` 的状态

    2. 再判断高低级浏览器
    3. 高级使用 `DOMContentLoaded` 事件
    4. 低级使用 `onreadystatechange` 事件

```js
aQuery.ready = function (fn) {
  if(document.readyState === "complete") {
    fn();
  }
  else if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
      fn();
    });
  }
  else {
    document.attachEvent("onreadystatechange", function () {
      fn();
    });
  }
}
```



`each()`

- 遍历一个 `数组` / `对象` , 将 `index` / `key` 和其对应的值传递给 `回调函数`
- `return false` 相当于 `break` , `return true` 相当于 `continue`
- `回调函数` 中的 `this` 即为相对应的 `键值`
    1. 判断是否为 `数组` / `伪数组`
    2. 若是, 使用 `for循环` 遍历
    3. 通过 `call()` 修改 `回调函数` 的 `this`
    4. 判断回调函数的返回结果是否为 `true` 或 `false` , 相应执行 `continue` 和 `break`
    5. 判断是否为 `对象` 
    6. 若是, 使用 `forin循环` 遍历
    7. 重复 `3~4`
    8. 返回传入的 `数组` / `对象`

```js
aQuery.each = function (obj, fn) {
  // array or array-like object
  if(aQuery.isArray(obj)) {
    for(let i = 0; i < obj.length; i++) {
      let res = fn.call(obj[i], i, obj[i]);
      if(res === true) {
        continue;
      }
      else if(res === false) {
        break;
      }
    }
  }
  // object
  else if(aQuery.isObject(obj)) {
    for(let key in obj) {
      let res = fn.call(obj[key], key, obj[key]);
      if(res === true) {
        continue;
      }
      else if(res === false) {
        break;
      }
    }
  }
  return obj;
}
```



`map()`

- 遍历一个 `数组` / `对象` , 将 `index` / `key` 和其对应的值传递给 `回调函数`

- 默认返回 `[]` , 其中存储了每个 `回调函数` 的返回值

- `回调函数` 中的 `this` 即为相对应的 `键值`

    1. 创建一个 `[]` 用于返回

    2. 判断是否为 `数组` / `伪数组`

    3. 若是, 使用 `for循环` 遍历

    4. 将 `回调函数` 的返回值存入用于返回的 `数组` 之中

    5. 判断是否为 `对象`

    6. 若是, 使用 `forin循环` 遍历

    7. 重复 `4`

    8. 返回一开始创建的 `数组`

```js
aQuery.map = function (obj, fn) {
  // the array to return
  let res = [];
  // array or array-like object
  if(aQuery.isArray(obj)) {
    for(let i = 0; i < obj.length; i++) {
      res.push(fn(obj[i], i));
    }
  }
  // object
  else if(aQuery.isObject(obj)) {
    for(let key in obj) {
      res.push(fn(obj[key], key));
    }
  }
  return res;
}
```



`nextSibling()`

- 下一个兄弟元素



`prevSibling()`

- 上一个兄弟元素



`getStyle()`

- 兼容性的获取元素样式



`setStyle()`

- 设置元素样式



`addEvent()`





---

## 方法归类



定义

- 将一类方法归类到一个静态方法中, 方便代码维护



实现方法

1. 创建一个静态方法
2. 在 `prototype` 中创建一个同名实例方法
3. 将需要归类的方法以键值 ( `key` : `value` ) 的形式组成一个 `对象` 传入该方法中
4. 在该方法中遍历参数 `对象` 中的 `key` , 设置 `this[key] = obj[key]` 
5. 即可通过 `jQuery.key` 直接调用
6. 由 `类` 调用即为静态方法, 由 `实例对象` 调用即为实例方法, 这样为了避免 `jQuery对象` 无法正常使用这些方法

```js
aQuery.extend = aQuery.prototype.extend = function (obj) {
  for(let key in obj) {
    this[key] = obj[key]
  }
}
aQuery.extend({
  isString: function (str) {},
  // other functions
});
```



---

## 核心方法 & 属性



定义

- `原型对象` 上的 `方法` 和 `属性`



列表


1. `jquery` 获取jQ版本号
2. `selector` 实例默认的选择器取值
3. `length` 实例默认的长度
4. `push` 给实例添加新元素
5. `sort` 对实例中的元素进行排序
6. `splice` 按照指定下标指定数量删除元素, 也可以替换删除的元素
7. `toArray` 把实例转换为数组返回
8. `get`  获取指定下标的元素, 获取的是原生DOM
9. `eq` 获取指定下标的元素, 获取的是jQuery类型的实例对象
10. `first` 获取实例中的第一个元素, 是jQuery类型的实例对象
11. `last` 获取实例中的最后一个元素, 是jQuery类型的实例对象
12. `each` 遍历实例, 把遍历到的数据传给回调使用
13. `map`  遍历实例, 把遍历到的数据传给回调使用, 然后把回调的返回值收集起来组成一个新的数组返回

---

## `DOM` 操作相关方法



定义

- 用于 `实例对象` 中 `元素` 的 `DOM` 操作的相关方法



列表

1. `empty` 清除实例中所有元素的所有子节点
2. `remove` 删除实例中的所有的元素或指定元素
3. `html` 设置实例中所有元素的内容 / 获取第一个元素的内容
4. `text` 设置实例中所有元素的文本内容 / 获取所有元素的文本内容 
5. `appendTo` 将实例中的所有元素添加到所有指定元素内部的最后面, 接收`选择器` , 不接收 `文本`
6. `prependTo` 将实例中的所有元素添加到所有指定元素内部的最前面, 接收`选择器` , 不接收 `文本`
7. `append` 将实例中的所有元素添加到所有指定元素内部的最后面, 接收 `文本` , 不接收 `选择器`
8. `prepend` 将实例中的所有元素添加到所有指定元素内部的最前面, 接收 `文本` , 不接收 `选择器`
9. `insertBefore` 将实例中的所有元素添加到所有指定元素外部的前面, 接收`选择器` , 不接收 `文本`
10. `insertAfter` 将实例中的所有元素添加到所有指定元素外部的最前面, 接收`选择器` , 不接收 `文本`
11. `before` 将实例中的所有元素添加到所有指定元素内部的最后面, 接收 `文本` , 不接收 `选择器`
12. `after` 将实例中的所有元素添加到所有指定元素内部的最前面, 接收 `文本` , 不接收 `选择器`
13. `replaceAll` 将实例中的所有元素替换掉所有指定元素, 接收`选择器` , 不接收 `文本`
14. `replaceWith` 将实例中的所有元素替换掉所有指定元素, 接收 `文本` , 不接收 `选择器`
15. `next` 获取实例中所有元素的紧邻的后面的同辈元素
16. `prev` 获取实例中所有元素的紧邻的前面的同辈元素
17. `clone` 复制节点, 可选是否复制事件

---

## `属性` 相关操作方法



定义

- 用于 `实例对象` 中 `元素` 的 `属性` 操作的相关方法



列表

1. `attr` 设置 / 获取元素的属性节点值
2. `prop` 设置 / 获取元素的属性值
3. `css` 设置 / 获取元素的样式
4. `val` 设置 / 获取 `input` 类元素的键入值
5. `hasClass` 判断元素是否有指定 `class`
6. `addClass` 为元素添加指定 `class`
7. `removeClass` 为元素删除指定 `class`
8. `toggleClass` 为元素有则删除 / 无则添加指定 `class`

---

## `事件` 相关操作方法



定义

- 用于 `实例对象` 中 `元素` 的 `事件` 操作的相关方法



列表

1. `on` 为元素注册事件
2. `off` 为元素解绑事件











