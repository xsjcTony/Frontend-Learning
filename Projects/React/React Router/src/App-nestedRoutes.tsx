import { Component } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Other from './components/Other'
import User from './components/User'
import Login from './components/Login'
import Discover from './components/Discover'


const Suggestion = (): JSX.Element => <div>Suggestion</div>
const Ranking = (): JSX.Element => <div>Ranking</div>
const Playlist = (): JSX.Element => <div>Playlist</div>

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
        <NavLink to="/home"
                 style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
        >
          Home
        </NavLink>
        <NavLink to="/about"
                 style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
        >
          About
        </NavLink>
        <NavLink to="/user"
                 style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
        >
          User
        </NavLink>
        <NavLink to="/discover"
                 style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
        >
          Discover
        </NavLink>

        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/user" element={ <User /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/discover" element={ <Discover /> }>
            <Route element={ <Suggestion /> } />
            <Route path="ranking" element={ <Ranking /> } />
            <Route path="playlist" element={ <Playlist /> } />
          </Route>
          <Route element={ <Other /> } />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
