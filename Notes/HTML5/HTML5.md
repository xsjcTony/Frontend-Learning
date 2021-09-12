# HTML5



## 标签



### `<figure>`

定义

- 代表一段独立的内容, 经常和 `<figcaption>` 配合使用

`<figcaption>`

- 这段内容的标题
- 写在父节点 `<figure>` 中的第一个或最后一个



### `<picture>`

> [\<picture>: The Picture element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)

定义

- `HTML5` 新增的标签, 可以为不同的显示情况下展示不同的图片
- 包含 `0` 至多个 `<source>` 标签和 `1` 个 `<img`> 标签

`<source>`

- 通过 `media` 属性来设置在什么情况下使用这张图片

`<img>`

- 所有 `<source>` 都不适用的情况下使用的默认图片

```html
<picture>
    <source srcset="path/to/mobile_bg.jpg" media="(max-width: 768px)"> <!-- 手机端图片 -->
    <img src="path/to/pc_bg.jpg" alt> <!-- 电脑端/默认图片 -->
</picture>
```



---

## 标签属性

- `role` : 增强语义性, 当现有 `HTML` 标签不能充分表达语义的时候, 就可以借助 `role` 来说明, 辅助工具可以借助 `role` 识别标签实际作用

```html
<div role="button">Click me!</div>
```

- `aria-***` : 全称为 Accessible Rich Internet Applications, 是一套为残疾人士无障碍使用网站而定制的协定

    - `aria-hidden` : 为了避免屏幕识读设备抓取一些可能产生混淆的输出内容 (比如装饰用的图标), 则将该属性设置为 `true`

    ```html
    <span aria-hidden="true">&times;</span>
    ```

    - `aria-label` : 阅读器会根据该属性告诉盲人该标签的作用

    ```html
    <button type="button" class="close" ></button>
    ```

    

