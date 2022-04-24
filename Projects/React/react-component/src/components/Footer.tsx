import './Footer.css'
import { Component } from 'react'


interface myProps {
  fatherFn(name: string, age: number): void
}

class Footer extends Component<myProps> {
  constructor(props: myProps) {
    super(props)
  }

  // 通过调用父组件的方法，来通过参数传递数据
  btnClick = () => {
    this.props.fatherFn('Aelita', 24)
  }

  render() {
    return (
      <>
        <div className="footer">Footer</div>
        <button onClick={ this.btnClick }>Footer button</button>
      </>
    )
  }
}

export default Footer
