import { Component } from 'react'
import { titleAaC, link } from './Home.module.css'


class Home extends Component {
  public render() {
    return (
      <>
        <p className={ titleAaC }>I'm Home's paragraph</p>
        <a href="#" className={ link }>I'm Home's hyperlink</a>
      </>
    )
  }
}

export default Home
