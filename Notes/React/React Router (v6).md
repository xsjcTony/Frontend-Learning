# React Router (v6)



> [Declarative routing for React apps at any scale | React Router](https://reactrouter.com/)



## 路由

- 维护了 `URL` 地址和 `组件` 的映射关系
- 通过这个映射关系可以根据不同的 `URL` 地址去渲染不同的 `组件`

---

## 安装

```shell
npm i react-router-dom@6
```

---

## 监听模式

- 监听模式分为 `history` / `hash` 两种
- 尽量包裹 `根组件`



### history

- `http://www.aelita.com/home`
- 通过 `BrowserRouter` 组件监听

```tsx
<BrowserRouter>
  { /* ... */ }
</BrowserRouter>
```



### hash

- `http://www.aelita.com/#/home`
- 通过 `HashRouter` 组件监听

```tsx
<HashRouter>
  { /* ... */ }
</HashRouter>
```

---

## 导航



### Link

- 使用 `Link` 组件可以让用户跳转到某个 `URL`
- 会渲染成一个 `<a>` 标签

props

- `to` : 需要跳转的 `URL` 地址
  - 也可以是一个 `对象` , 包含
    - `pathname` : 需要跳转的 `URL` 地址
    - `search` : `query string`
    - `hash` : `hash` 值
- `state` : 想要传递的 `state` , 在 `组件` 中使用 `useLocation` 中的 `state` 接收

```tsx
<Link to="/home">Home</Link>
<Link to="/about">About</Link>
```



### NavLink

- 在 `Link` 的基础上, 添加了激活状态的相关功能
- 会渲染成一个 `<a>` 标签

props

- 含有一切 `Link` 拥有的 `props`
- `end` : 只有作为最后一层路径时才设置为 `active`
- `children` / `className` / `style` : 和 `React` 中的相同, 但是可以接受一个回调函数
  - 接收 `props` 参数, 其中有一项 `isActive` , 即为当前的激活状态

```tsx
<NavLink to="/home"
         style={ ({ isActive }) => ({
           color: isActive ? 'red' : '#ffc0cb'
         }) }
>
  Home
</NavLink>
```



### Navigate

- 重定向 `URL`

props

- `to` : 要跳转的 `URL`
- `replace` : 是否替换当前 `history` 中的记录, 默认为 `false`

```tsx
<Navigate to="/login" replace />
```



### useNavigate

- 用于获取 `navigate` 方法的 `Hooks`
  - 接收和 `<Link>` 一样的内容
- 用于通过 `JavaScript` 手动跳转 `URL`

```tsx
const Discover = (): JSX.Element => {
  const navigate = useNavigate()

  const btnClick = (): void => {
    navigate('/discover/playlist')
  }

  return (
    <div>
      <button onClick={btnClick}>Playlist</button>
      <Outlet />
    </div>
  )
}
```



---

## 路由

- `URL` 与 `组件` 之间的映射关系
  - 使用 `JSX` 则使用 `Routes` 和 `Route` 组件
  - 使用 `JavaScript对象` 则使用 `useRoutes`



### Routes

- 所有 `Route` 的父组件

```tsx
<Routes>
  { /* <Route>s */ }
</Routes>
```



### Route

- 用于表达映射关系
- 可以嵌套

props

- `path` : 匹配的 `URL` , 会继承 `父Route` 的路径
- `element` : 需要渲染的 `组件`
- `children` : 嵌套的 `Route` 路由
- `caseSensitive` : 匹配 `URL` 时是否需要在意大小写, 默认为 `false`

```tsx
<Routes>
  <Route path="/home" element={ <Home /> } />
  <Route path="/about" element={ <About /> } />
  <Route path="/user" element={ <User /> } />
  <Route path="/login" element={ <Login /> } />
  <Route path="/discover" element={ <Discover /> }>
    <Route path="" element={ <Suggestion /> } />
		<Route path="ranking" element={ <Ranking /> } />
		<Route path="playlist" element={ <Playlist /> } />
	</Route>
</Routes>
```



### Outlet

- 在 `父路由` 的 `组件` 中使用
- 用以渲染其 `子路由` 的 `UI`

```tsx
<NavLink to="/discover"
         style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
         end
>
  Suggestion
</NavLink>
<NavLink to="/discover/ranking"
         style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
>
  Ranking
</NavLink>
<NavLink to="/discover/playlist"
         style={ ({ isActive }) => isActive ? { color: 'red' } : {} }
>
  Playlist
</NavLink>
<Outlet />
```



### useRoutes

- 代替 `Routes` 组件的 `Hooks`
- 使用 `JavaScript` 对象统一管理 `路由`

```tsx
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
```

```tsx
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
```

---

## 参数



### useSearchParams

- 用于获取 `query string` 的 `Hooks`
- 使用的是 `NodeJS` 的 `URLSearchParams`

```tsx
<Link to="/home?name=Aelita&age=18">Home</Link>
```

```tsx
const [searchParams, setSearchParams] = useSearchParams()
```



### useParams

- 用于获取 `dynamic params` 的 `Hooks`
- 获取的是一个 `对象` , 包含了键值对

```tsx
<Link to="/about/Aelita/18">About</Link>
<Route path="/about/:name/:age" element={<About />} />
```

```tsx
const params = useParams() // { name: 'Aelita', age: '18' }
```



### useLocation

- 用于获取 `location` 的 `Hooks`
- 其中的 `state` 即为传递下来的 `state` , 可以在其中传递需要的参数

```tsx
<Link to="/other"
      state={{
        name: 'Aelita',
        age: 18,
        gender: 'female'
      }}
>
  Other
</Link>
```

```tsx
const { state } = useLocation() // { name: 'Aelita', age: 18, gender: 'female' }
```



































































































