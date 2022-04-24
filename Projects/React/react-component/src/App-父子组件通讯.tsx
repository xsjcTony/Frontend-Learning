import { Component } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


class App extends Component {
  // 用于接收Footer子组件传递过来的数据的方法
  myFn = (name: string, age: number) => {
    console.log(name, age)
  }

  render() {
    return (
      <>
        <Header name={ 'Aelita' } age={ 24 } />
        <Main name={ 'Aelita' } age={ 24 } />
        <Footer fatherFn={ this.myFn } />
      </>
    )
  }
}

export default App
