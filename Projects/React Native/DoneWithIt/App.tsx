import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ListingsScreen from '@screens/ListingsScreen'
import type { JSX } from 'react'


const App = (): JSX.Element => (
  <GestureHandlerRootView style={styles.root}>
    <ListingsScreen />
  </GestureHandlerRootView>
)


const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})


export default App
