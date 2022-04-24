import { Component, PureComponent } from 'react'
import { createPortal } from 'react-dom'


const otherContainer = document.querySelector('#other')

class Modal extends PureComponent {
  public render() {
    return createPortal(
      this.props.children,
      otherContainer! // 除去 null 的情况
    )
  }
}

class App extends Component {
  public render() {
    return (
      <Modal>
        <div id="modal">Modal</div>
      </Modal>
    )
  }
}

export default App
