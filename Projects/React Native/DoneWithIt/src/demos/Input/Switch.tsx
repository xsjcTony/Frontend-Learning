import { useState } from 'react'
import { Switch } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {
  const [isNew, setIsNew] = useState<boolean>(false)

  return <Switch value={isNew} onValueChange={setIsNew} />
}


export default App
