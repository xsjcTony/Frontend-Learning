import { createContext, useContext } from 'react'


const UserContext = createContext({
  name: 'Tequila',
  age: 18
})
const ColorContext = createContext<string>('#ffc0cb')

const App = (): JSX.Element => {
  return (
    <UserContext.Provider value={{ name: 'Aelita', age: 18 }}>
      <ColorContext.Provider value="pink">
        <Home />
      </ColorContext.Provider>
    </UserContext.Provider>
  )
}

const Home = (): JSX.Element => {
  const { name, age } = useContext(UserContext)
  const color = useContext(ColorContext)

  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{color}</p>
    </div>
  )
}

export default App
