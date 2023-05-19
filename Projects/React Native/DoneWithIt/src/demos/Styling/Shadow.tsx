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
        // iOS
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        // android
        elevation: 20
      }}
    />
  </View>
)


export default App
