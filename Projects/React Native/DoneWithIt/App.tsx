import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ListingEditScreen from '@screens/ListingEditScreen'
import { setupErrorMessages } from '@utils/setup'
import type { JSX } from 'react'


setupErrorMessages()


const App = (): JSX.Element => (
  <GestureHandlerRootView style={styles.container}>
    <ListingEditScreen />
  </GestureHandlerRootView>
)


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


export default App
