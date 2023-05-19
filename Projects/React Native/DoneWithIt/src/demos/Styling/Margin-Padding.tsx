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
        padding: 20,
        paddingHorizontal: 10,
        paddingLeft: 30
      }}
    >
      <View
        style={{
          backgroundColor: 'gold',
          width: 50,
          height: 50
        }}
      />
    </View>
    <View
      style={{
        backgroundColor: 'tomato',
        width: 100,
        height: 100,
        margin: 20
      }}
    />
  </View>
)


export default App
