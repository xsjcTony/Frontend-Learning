import { StatusBar } from 'expo-status-bar'
import { Dimensions, Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {
  console.log(Platform.OS, Dimensions.get('screen'))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewStyle: {
    backgroundColor: 'dodgerblue',
    width: '50%',
    height: 70
  }
})

export default App
