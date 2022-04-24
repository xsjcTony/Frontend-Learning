import { NavLink, Outlet, useNavigate } from 'react-router-dom'


const Discover = (): JSX.Element => {
  const navigate = useNavigate()

  const btnClick = (): void => {
    navigate('/discover/playlist')
  }

  return (
    <div>
      <NavLink to="/discover"
               style={({ isActive }) => isActive ? { color: 'red' } : {}}
               end
      >
        Suggestion
      </NavLink>
      <NavLink to="/discover/ranking"
               style={({ isActive }) => isActive ? { color: 'red' } : {}}
      >
        Ranking
      </NavLink>
      <NavLink to="/discover/playlist"
               style={({ isActive }) => isActive ? { color: 'red' } : {}}
      >
        Playlist
      </NavLink>
      <button onClick={btnClick}>Playlist</button>
      <Outlet />
    </div>
  )
}

export default Discover
