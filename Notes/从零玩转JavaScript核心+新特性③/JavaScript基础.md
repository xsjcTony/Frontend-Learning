# JavaScript基本概念

> [Article: How browsers work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)

---

## 定义 (Definition)

JavaScript是一门**解释型**语言 (不需要编译) , 作用是控制网页行为, 也是脚本 (Script) 语言

---

## 组成 (Modules)

| JavaScript的组成 | 全称 / Full Name                            | 描述 / Description      |
| :--------------- | ------------------------------------------- | :---------------------- |
| ECMAScript       | European Computer Manufacturers Association | ECMA制定的脚本语言标准  |
| DOM              | Document Object Model                       | 操作网页中元素的API     |
| BOM              | Browser Object Model                        | 操作浏览器部分功能的API |

---

## 书写格式 (Format)

| JavaScript代码书写格式 (和CSS一样) | 代码示例 / Example Code                             |
| ---------------------------------- | --------------------------------------------------- |
| 行内样式 (不推荐)                  | `<button onclick="alert('Hello world');"></button>` |
| 内嵌样式                           | `<script>alert('Hello world');</script>`            |
| 外链样式                           | `<script src="example.js"></script>`                |

**内嵌样式**如果写在 `<head>` 中并且要操作界面中的元素, 则必须加上 

```javascript
window.onload = function () {
    // 操作界面元素的JavaScript
}
```

含义是等待页面加载完毕再执行 `{}` 中的代码

或者直接将代码写在 `</body>` 结束标签之前 (所有html内容之后)

**外链样式同理**

**内嵌样式**和**外链样式**冲突:

```html
<!-- 无效代码 -->
<script src="example.js">
	alert('Hello world');
</script>
```

---

## 常见输出方式 (Common way to output)

| JavaScript常见输出方式 | 代码示例 / Example Code         | 注意点 / Notes                                       |
| ---------------------- | ------------------------------- | ---------------------------------------------------- |
| 弹窗                   | `alert('Hello world');`         | 如果输出内容不是数字, 必须通过 `''` 或者 `""` 括起来 |
| 网页内容区域           | `document.write('Hello world')` | 如果输出内容不是数字, 必须通过 `''` 或者 `""` 括起来 |
| 开发者工具控制台       | `console.log('Hello world')`    | 如果输出内容不是数字, 必须通过 `''` 或者 `""` 括起来 |

`confirm()`, `prompt()` 注意点和 `alert()` 相同, `confirm()` 多了一个取消按钮, `prompt()` 再多一个输入框, 皆为弹窗

`console.warn()` 是警告输出, 背景是黄的

`console.error()` 是错误输出, 背景是红的

---

## 区分大小写 (Case sensitive)

JavaScript严格区分大小写: `Alert()` 和 `alert()` 不是一回事

每一句代码最后都需要添加 `;`

