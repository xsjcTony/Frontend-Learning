import { View } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <View
      style={{
        backgroundColor: 'dodgerblue',
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'royalblue',
        borderRadius: 50
        // borderTopWidth: 20,
        // borderTopLeftRadius: 50
      }}
    />
  </View>
)


export default App
