import { Component } from 'react'
import type { ComponentType } from 'react'


// 原始组件
class Home extends Component {
  render() {
    return (
      <div>Home</div>
    )
  }
}

// 由于是函数, 所以可以传递任意数量的参数, 高度自定义
// T stands for Props
function enhanceComponent<P>(WrappedComponent: ComponentType<P>) {
  return class extends Component {
    render() {
      return (
        <WrappedComponent { ...(this.props as P) } /> // 原始组件, 可以传递任意数据, 以及透传props
      )
    }
  }
}

// 通过函数生成的高阶组件
const EnhancedComponent = enhanceComponent(Home)

class App extends Component {
  render() {
    return (
      <EnhancedComponent /> // 使用高阶组件
    )
  }
}

export default App
