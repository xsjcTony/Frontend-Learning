import { useState, memo, useMemo } from 'react'


const App = (): JSX.Element => {
  console.log('App re-rendered')

  const [num, setNum] = useState<number>(0)

  const increment = useMemo(() => (): void => {
    setNum(num + 1)
  }, [num])
  const user = useMemo(() => ({ name: 'Aelita', age: 18 }), [])

  return (
    <>
      <p>num: {num}</p>
      <hr />
      <Home handler={increment} />
      <hr />
      <About user={user} />
    </>
  )
}

const Home = memo((props: { handler: () => void }): JSX.Element => {
  console.log('Home re-rendered')

  return (
    <div>
      <p>Home</p>
      <button onClick={() => void props.handler()}>App's num +1</button>
    </div>
  )
})

const About = memo((props: { user: { name: string, age: number } }): JSX.Element => {
  console.log('About re-rendered')

  return (
    <div>
      <p>About</p>
      <p>{props.user.name}</p>
      <p>{props.user.age}</p>
    </div>
  )
})

export default App
