# jQuery - 技巧



## 实时监听 `<input>` / `<textarea>` 类元素的输入

- 因为 `jQuery` 中默认没有封装好的 `oninput` 事件, 所以需要使用事件委托
- 格式为 `parentNode.delegate(selector, "propertychange input", fn)` , `selector` 为要监听的对象, `parentNode` 为其祖先元素, `fn` 为回调函数

```js
$("body").delegate("textarea", "propertychange input", function () {
  console.log($(this).val());
});
```

- 或使用 `inputElement.on("input", fn)` , `inputElement` 为要监听的对象, `fn` 为回调函数

```js
$("textarea").on("input", function () {
  console.log($(this).val());
});
```



