import { Component } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import User from './components/User'
import Login from './components/Login'
import Discover from './components/Discover'
import Other from './components/Other'


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
      <>
        <NavLink to="/home?name=Aelita&age=18"
                 style={({ isActive }) => isActive ? { color: 'red' } : {}}
        >
          Home
        </NavLink>
        <NavLink to="/about/Aelita/18"
                 style={({ isActive }) => isActive ? { color: 'red' } : {}}
        >
          About
        </NavLink>
        <NavLink to="/other"
                 state={{
                   name: 'Aelita',
                   age: 18,
                   gender: 'female'
                 }}
        >
          Other
        </NavLink>
        <NavLink to="/user"
                 style={({ isActive }) => isActive ? { color: 'red' } : {}}
        >
          User
        </NavLink>
        <NavLink to="/discover"
                 style={({ isActive }) => isActive ? { color: 'red' } : {}}
        >
          Discover
        </NavLink>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about/:name/:age" element={<About />} />
          <Route path="/other" element={<Other />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/discover" element={<Discover />}>
            <Route path="" element={<Suggestion />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="playlist" element={<Playlist />} />
          </Route>
        </Routes>
      </>
    )
  }
}

export default App
