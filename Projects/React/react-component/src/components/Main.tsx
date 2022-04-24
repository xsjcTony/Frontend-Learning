import './Main.css'
import { Component } from 'react'


interface myProps {
  name: string
  age: number
}

class Main extends Component<myProps> {
  constructor(props: myProps) {
    super(props)

    console.log(this.props) // { name: 'Aelita', age: 24 }
  }

  // 默认数据
  static defaultProps = {
    name: 'Lily',
    age: 18
  }

  public render() {
    return (
      <div className="main">Main</div>
    )
  }
}

export default Main
