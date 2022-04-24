import { NavLink, useRoutes } from 'react-router-dom'
import routes from './router'


const App = (): JSX.Element => {
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

      {useRoutes(routes)}
    </>
  )
}

export default App
