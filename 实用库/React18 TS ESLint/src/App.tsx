import { useState } from 'react'


const App = (): JSX.Element => {
  const [num, setNum] = useState<string>(0)

  return (
    <div>{num}</div>
  )
}

export default App
