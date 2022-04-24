import { useEffect, useState } from 'react'


const App = (): JSX.Element => {
  const [isHomeShow, setIsHomeShow] = useState<boolean>(true)

  return (
    <>
      {isHomeShow && <Home />}
      <hr />
      <button onClick={() => void setIsHomeShow(!isHomeShow)}>Show / hide Home</button>
    </>
  )
}

const Home = (): JSX.Element => {
  const [name, setName] = useState<string>('Aelita')
  const [age, setAge] = useState<number>(18)

  useEffect(() => {
    // componentDidMount + componentDidUpdate
    console.log('modify DOM')
  })

  useEffect(() => {
    console.log('subscribe')

    // componentWillUnmount
    return () => {
      console.log('unsubscribe')
    }
  })

  useEffect(() => {
    console.log(`Only trigger when age changes ${age}`)
  }, [age])

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change name to "Tequila"</button>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(age - 1)}>-1</button>
    </div>
  )
}

export default App
