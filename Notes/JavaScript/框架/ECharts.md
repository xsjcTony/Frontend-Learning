# ECharts



> [Apache ECharts](https://echarts.apache.org/zh/index.html)
>
> [GitHub - apache/echarts at 5.2.0](https://github.com/apache/echarts/tree/5.2.0)



## 定义

- 一个使用 `JavaScript` 实现的 `数据可视化` 库
- 可以流畅的运行在 `PC` 和 `移动设备` 上

- `数据可视化` 意为将数据通过 `图表` 的形式展示出来

---

## 图表类型

> https://echarts.apache.org/examples/zh/index.html

---

## 原理

- `4.0` 之前, 底层使用 `canvas` 标签来实现
- `4.0` 之后, 支持 `SVG` 渲染

---

## 基本使用

1. 引入相关 `.js` 文件

2. 准备一个容器

3. 创建一个 `ECharts` 对象, 传入容器
4. 创建配置对象
5. 将配置对象传递给 `ECharts`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECharts-基本使用</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        div {
            width: 600px;
            height: 400px;
        }
    </style>
    <script src="js/echarts.js"></script>
</head>
<body>
<div></div>
<script>
  const div = document.querySelector('div')
  const myChart = echarts.init(div)
  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  myChart.setOption(option)
</script>
</body>
</html>
```

---

## 配置



> [Documentation - Apache ECharts](https://echarts.apache.org/zh/option.html)



### 基本配置

- `title` : 设置图表标题
- `legend` : 设置图表的图例 (隐藏 / 显示)
- `xAxis` : 设置 `x轴` 上的显示的数据
- `yAxis` : 设置 `y轴` 上的显示的数据, 若不设置则根据数据自动计算填充
- `series` : 设置图表数据, 是一个 `数组` , 其中每一个 `对象` 都是一组数据
    - `name` : 必须和 `legend` 中的名称相同, 否则无法控制隐藏 / 显示
    - `type` : 数据绘制类型
    - `data` : 一个 `数组` , 包含了数据



### 标题组件

- 即为 `title` 对象, 可以包含
    - `show` : `true` 为显示, `false` 为不显示
    - `text` : 标题文字
    - `subtext` : 副标题文字
    - `left` / `top` / `right` / `bottom` : 标题位置, 单位为 `像素`
    - `borderColor` : 标题边框颜色
    - `borderWidth` : 标题边框宽度, 单位为 `像素`

```js
title: {
  show: true,
  text: 'ECharts 入门示例',
  subtext: 'ECharts learning',
  top: 10,
  left: 10,
  borderWidth: 5,
  borderColor: '#f00'
}
```



### 工具箱组件

- 即为 `toolbox` 对象, 可以包含
    - `show` : `true` 为显示, `false` 为不显示
    - `feature` : 具体显示功能, 是一个 `对象`
        - `saveAsImage` : 保存为图片
        - `dataView` : 数据视图, 可以动态更改数据
        - `restore` : 还原数据
        - `dataZoom` : 视图缩放
        - `magicType` : 动态类型切换

```js
toolbox: {
  show: true,
  feature: {
    saveAsImage: {
      show: true
    },
    dataView: {
      show: true
    },
    restore: {
      show: true
    },
    dataZoom: {
      show: true
    },
    magicType: {
      type: ['bar', 'line', 'pie']
    }
  }
},
```



### 弹窗组件

- 即为 `tooltip` 对象, 可以包含
    - `show` : `true` 为显示, `false` 为不显示
    - `trigger` : 在哪里显示

```js
tooltip: {
  show: true,
  trigger: 'axis'
}
```



### 数据标记

- 在 `series` 对象中
    - `markPoint` 为标记点, 是一个数组
    - `markLine` 为标记线, 是一个数组

```js
series: [
  {
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20],
    markPoint: {
      data: [
        { type: 'max', name: 'maximum' },
        { type: 'min', name: 'minimum' }
      ]
    },
    markLine: {
      data: [
        { type: 'max', name: 'maximum' },
        { type: 'min', name: 'minimum' },
        { type: 'average', name: 'average' }
      ]
    }
  }
]
```

