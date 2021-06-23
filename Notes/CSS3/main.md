# CSS3



## background



### 连写 (shorthand)

> [CSS background property](https://www.w3schools.com/cssref/css3_pr_background.asp)

#### `bg-size` 的插入方法

- 要放在 `bg-position` 后面, 中间加一个 `/` . 如下示例中为 `cover`

```css
background: url("images/1.jpg") center center / cover no-repeat;
```

---

## text



### 文字阴影

> [CSS text-shadow property](https://www.w3schools.com/cssref/css3_pr_text-shadow.asp)

```css
text-shadow: 5px 5px 5px #000000; /* text-shadow: h-shadow v-shadow blur-radius color|none|initial|inherit; */
```

---

## 选择器 (Selector)



### `:first-child`

- 只生效于其不仅是第一个child还是正确类型, 如果需要选择第一个当前类型则应使用 `:nth-of-type(x)`

```html
<div>
  <p></p>
  <span></span>
  <span></span>
</div>
```

```css
  span:first-child {} /* 无效, 因为div的第一个child不是span */
  span:nth-of-type(1) /* 应使用这个 */
```




---

## 边框 (Border)



### 动态添加边框导致内容移位的优化方法

- 先添加一个透明边框占位置

```css
ul>li {
  border: 2px solid transparent;
  box-sizing: border-box;
}

.current { /* 动态添加该类名即可添加边框 */
  border: 2px solid orange;
}
```

