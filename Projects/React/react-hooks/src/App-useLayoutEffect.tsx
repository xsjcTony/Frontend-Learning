import './App-useLayoutEffect.css'
import { useLayoutEffect, useRef, useState } from 'react'


const App = (): JSX.Element => {
  const [isHomeShow, setIsHomeShow] = useState(true)

  return (
    <>
      {isHomeShow && <Home />}
      <hr />
      <button onClick={() => void setIsHomeShow(!isHomeShow)}>Hide / Show</button>
    </>
  )
}

const Home = (): JSX.Element => {
  const pRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!pRef.current) {
      throw new Error('p is not rendered')
    }

    pRef.current.style.left = '0'
    pRef.current.style.left = '500px'
  })

  return (
    <p ref={pRef} />
  )
}

export default App
