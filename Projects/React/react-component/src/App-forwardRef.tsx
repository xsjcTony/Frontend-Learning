import { Component, createRef, forwardRef } from 'react'
import type { ReactNode } from 'react'


const About = forwardRef<HTMLSpanElement, unknown>((props, ref) => (
  <div>
    <p >I'm p</p>
    <span ref={ ref }>I'm span</span>
  </div>
))

class App extends Component {
  private aboutSpanRef = createRef<HTMLSpanElement>()

  private btnClick = (): void => {
    console.log(this.aboutSpanRef)
  }

  public render(): ReactNode {
    console.log('App render()')
    return (
      <>
        <About ref={ this.aboutSpanRef } />
        <button onClick={ this.btnClick }>App Button</button>
      </>
    )
  }
}

export default App
