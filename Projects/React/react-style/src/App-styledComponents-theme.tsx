import { Component } from 'react'
import Home from './components/Home'
import About from './components/About'
import { ThemeProvider } from 'styled-components'


class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={ { size: '100px', color: '#f00' } }>
        <Home />
        <About />
      </ThemeProvider>
    )
  }
}

export default App
