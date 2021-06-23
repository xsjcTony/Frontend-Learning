# 表单 (Form)



## 获取表单元素中的内容




### 获取 `input` 中的内容

```js
inputElement.value
```

---

## 表单事件



### `input` 获取焦点

```js
inputElement.onfocus = () => {}
```



### `input` 失去焦点

```js
inputElement.onblur = () => {}
```



### `input` 内容改变

1. `onchange`

    - 只有 `input` 失去焦点之后才能获取到内容

    ```js
    inputElement.onchange = () => {}
    ```

2. `oninput`

    - `oninput` 可以实时获取 `input` 的数据修改
    - <span style="color: yellow">>=IE9</span>
    - <span style="color: yellow"><IE9</span> 可以使用 `onpropertychange` 事件实现实时监听
    - 通过代码给 `input` 设置数据不会触发 `oninput` 事件
    
    ```js
    inputElement.oninput = () => {} // >=IE9
    inputElement.onpropertychange = () => {} // <IE9, 可以忽略
    ```

---

## 禁用表单元素

```js
inputElement.disabled = true; // 禁用
inputElement.disabled = false; // 启用
```





