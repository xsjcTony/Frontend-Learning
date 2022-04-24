import { useRef, useState, useEffect } from 'react'


const App = (): JSX.Element => {
  const pRef = useRef<HTMLParagraphElement>(null)

  const [num, setNum] = useState(0)
  const previousNum = useRef<number | null>(null)

  useEffect(() => {
    previousNum.current = num
  }, [num])

  return (
    <>
      <p ref={pRef}>App</p>
      <button onClick={() => void console.log(pRef)}>Print pRef</button>
      <hr />
      <p>previous num: {previousNum.current}</p>
      <p>current num: {num}</p>
      <button onClick={() => void setNum(num + 1)}>num +1</button>
    </>
  )
}

export default App
