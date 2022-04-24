import Home from '../components/Home'
import About from '../components/About'
import Other from '../components/Other'
import User from '../components/User'
import Login from '../components/Login'
import Discover from '../components/Discover'


const Suggestion = (): JSX.Element => <div>Suggestion</div>
const Ranking = (): JSX.Element => <div>Ranking</div>
const Playlist = (): JSX.Element => <div>Playlist</div>

const routes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/about/:name/:age',
    element: <About />
  },
  {
    path: '/other',
    element: <Other />
  },
  {
    path: '/user',
    element: <User />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '',
        element: <Suggestion />
      },
      {
        path: 'ranking',
        element: <Ranking />
      },
      {
        path: 'playlist',
        element: <Playlist />
      }
    ]
  }
]

export default routes
