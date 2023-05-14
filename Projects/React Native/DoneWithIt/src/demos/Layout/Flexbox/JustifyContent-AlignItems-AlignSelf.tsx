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
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  first: {
    backgroundColor: 'dodgerblue',
    width: 100,
    height: 300,
    alignSelf: 'flex-start'
  },
  second: {
    backgroundColor: 'gold',
    width: 100,
    height: 200
  },
  third: {
    backgroundColor: 'tomato',
    width: 100,
    height: 100
  }
})

export default App
