import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => (
  <>
    <View style={styles.container}>
      <View style={styles.first} />
      <View style={styles.second} />
      <View style={styles.third} />
    </View>
    <StatusBar style="auto" />
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  first: {
    flex: 2,
    backgroundColor: 'dodgerblue'
  },
  second: {
    flex: 1,
    backgroundColor: 'gold'
  },
  third: {
    flex: 1,
    backgroundColor: 'tomato'
  }
})

export default App
