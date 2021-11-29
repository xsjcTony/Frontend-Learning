import Loading from './Loading.vue'

export default {
  install (Vue, options) {
    // 1. 根据组件生成一个构造函数
    const LoadingConstructor = Vue.extend(Loading)
    // 2. 根据构造函数创建实例对象
    const LoadingInstance = new LoadingConstructor()
    // 3. 随便创建一个标签(元素)
    const div = document.createElement('div')
    // 4. 将创建好的标签添加到界面上
    document.body.appendChild(div)
    // 5. 将创建好的实例对象挂载到创建好的元素上
    LoadingInstance.$mount(div)

    // 使用Vue.use()传进来的数据代替组件中的默认数据
    if (options?.title) {
      LoadingInstance.title = options?.title
    }

    // 添加全局方法
    Vue.toggleLoading = function (isShow) {
      LoadingInstance.isShow = isShow
    }

    // 添加实例方法
    Vue.prototype.$toggleLoading = function (isShow) {
      LoadingInstance.isShow = isShow
    }
  }
}
