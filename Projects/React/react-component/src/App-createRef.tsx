import { Component, createRef } from 'react'
import type { ReactNode } from 'react'


class App extends Component {
  // 若需要被其他组件中将本组件作为 ref 调用该方法, 则必须为 public
  public btnClick = (): void => {
    console.dir(this.pRef.current)
  }

  private pRef = createRef<HTMLParagraphElement>()

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <p ref={ this.pRef }>I'm box</p>
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
