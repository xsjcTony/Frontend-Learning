import { Component } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Other from './components/Other'
import User from './components/User'
import Login from './components/Login'


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
        <Link to="/user">User</Link>

        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/user" element={ <User /> } />
          <Route path="/login" element={ <Login /> } />
          <Route element={ <Other /> } />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
