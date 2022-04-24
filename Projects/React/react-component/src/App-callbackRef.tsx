import { Component } from 'react'
import type { ReactNode } from 'react'


class App extends Component {
  public btnClick = (): void => {
    console.dir(this.pRef)
  }

  private setPRef = (p: HTMLParagraphElement | null): void => {
    this.pRef = p
  }

  private pRef: HTMLParagraphElement | null = null

  public componentDidMount() {
    console.dir(this.pRef)
  }

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <p ref={ this.setPRef }>I'm box</p>
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
