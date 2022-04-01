# 30/03/2022



## 给 `<el-table>` 的展开行触发按钮添加文字

- `element-plus` 版本 `v2.0.5`

思路

- 通过 `伪元素` 添加文字
- 指定列的宽度
- 指定列的 `类名`
- 通过 `:deep` 查找对应元素
- 使用 `flex` 布局来排版
- 设置 `伪元素` 的 `line-height` 来微调

`<template>`

```html
<el-table-column type="expand" class-name="expand-column" width="150">
    <!-- 列的内容, 一般为插槽 -->
<el-table-column/>
```

`<style>`

```scss
.el-table {
    :deep(td.expand-column) { // 必须要查找 td, 否则标题栏也会有
        .cell {
        		display: flex; // 不能设置 align-items: center, 否则不能微调
        
        		&::after {
          			content: 'Privileges' // 添加的文字内容
          			line-height: 18px; // 用于微调水平居中
        		}
        }
    }
}
```

效果

![el-table_expand_column_custom_text.png](D:\xsjcTony\it666\Frontend-Learning\images\el-table_expand_column_custom_text.png)





## 修复 `<el-table>` 展开行触发按钮宽度改变后可点击范围区域旋转的问题

- `element-plus` 版本 `v2.0.5`

思路

- 取消外层 `wrapper` 的 `transform`
- 将 `transform` 应用于 `el-icon` 图标上

`<style>`

```scss
.el-table{
    :deep(.el-table__expand-icon--expanded) {
    		transform: none; // 取消 wrapper 的旋转
      	
      	.el-icon {
        		transform: rotate(90deg); // 将图标本身旋转
      	}
    }
}
```

效果

![el-table_expand_column_fix_clickable_area_rotation.png](D:\xsjcTony\it666\Frontend-Learning\images\el-table_expand_column_fix_clickable_area_rotation.png)



---

































