# Vue - 扩展插件 (v2)



## vue-lazyload

[hilongjw/vue-lazyload: A Vue.js plugin for lazyload your Image or Component in your application.](https://github.com/hilongjw/vue-lazyload)

- 图片懒加载

基本使用

- 导入&配置

```js
// main.js
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png') // 图片正在加载的placeholder图片
})
```

- 将需要懒加载的图片的 `src` 换成 `v-lazy` , 固定路径需要加上 `''`

```vue
<img v-lazy="img.src" alt>
```

