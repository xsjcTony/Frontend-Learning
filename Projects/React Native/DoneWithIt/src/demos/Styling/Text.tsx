import { Text, View } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text
      style={{
        // fontFamily: 'Courier New'
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: '600',
        color: 'tomato',
        textTransform: 'capitalize',
        textDecorationLine: 'line-through',
        textAlign: 'center',
        lineHeight: 30
      }}
    >
      I love React Native! This is my first React Native app! Here&apos;s some more text.
    </Text>
  </View>
)


export default App
