import { useState, memo, useCallback } from 'react'


const App = (): JSX.Element => {
  console.log('App re-rendered')

  const [num, setNum] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const increment = useCallback((): void => {
    setNum(num + 1)
  }, [num])

  const decrement = useCallback((): void => {
    setCount(count - 1)
  }, [count])

  return (
    <>
      <p>num: {num}</p>
      <p>count: {count}</p>
      <hr />
      <Home handler={increment} />
      <hr />
      <About handler={decrement} />
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

const About = memo((props: { handler: () => void }): JSX.Element => {
  console.log('About re-rendered')

  return (
    <div>
      <p>About</p>
      <button onClick={() => void props.handler()}>App's count -1</button>
    </div>
  )
})

export default App
