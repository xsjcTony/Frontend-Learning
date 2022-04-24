import { useEffect, createContext, useContext } from 'react'


// Types
interface User {
  name: string
  age: number
}

interface Info {
  gender: string
}

const UserContext = createContext<User>({} as User)
const InfoContext = createContext<Info>({} as Info)

const App = (): JSX.Element => {
  return (
    <UserContext.Provider value={{ name: 'Aelita', age: 18 }}>
      <InfoContext.Provider value={{ gender: 'male' }}>
        <Home />
        <hr />
        <About />
      </InfoContext.Provider>
    </UserContext.Provider>
  )
}

const Home = (): JSX.Element => {
  const [user, info] = useGetContext()

  return (
    <div>
      <p>Home</p>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{info.gender}</p>
    </div>
  )
}

const About = (): JSX.Element => {
  const [{ name, age }, { gender }] = useGetContext() // 解构

  return (
    <div>
      <p>About</p>
      <p>{name}</p>
      <p>{age}</p>
      <p>{gender}</p>
    </div>
  )
}

// custom Hook
const useGetContext = (): [User, Info] => [useContext(UserContext), useContext(InfoContext)]

export default App
