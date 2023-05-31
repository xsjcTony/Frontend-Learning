import { useState } from 'react'
import { Text, TextInput } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {

  const [firstName, setFirstName] = useState<string>('')


  return (
    <>
      <Text>{firstName}</Text>
      <TextInput
        secureTextEntry
        clearButtonMode="always"
        keyboardType="numeric"
        maxLength={5}
        placeholder="First Name"
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
        }}
        value={firstName}
        onChangeText={setFirstName}
      />
    </>
  )
}


export default App
