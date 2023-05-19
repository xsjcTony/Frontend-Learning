import { MaterialCommunityIcons } from '@expo/vector-icons'
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
    <MaterialCommunityIcons
      color="dodgerblue"
      name="email"
      size={200}
    />
  </View>
)


export default App
