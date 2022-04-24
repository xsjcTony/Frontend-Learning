import { Component } from 'react'
import Home from './components/Home'
import About from './components/About'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import Other from './components/Other'


interface AppState {
  flag: boolean
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    flag: true
  }

  public render() {
    return (
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <NavLink to="/home"
                 style={ ({ isActive }) => ({
                   color: isActive ? 'red' : '#ffc0cb'
                 }) }
        >
          Home
        </NavLink>
        <NavLink to="/about"
                 style={ ({ isActive }) => ({
                   color: isActive ? 'red' : '#ffc0cb'
                 }) }
        >
          About
        </NavLink>
        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route element={ <Other /> } />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
