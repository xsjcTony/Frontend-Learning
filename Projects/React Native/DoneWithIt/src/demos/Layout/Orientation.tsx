import { useDeviceOrientation } from '@react-native-community/hooks'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {
  const orientation = useDeviceOrientation()

  const ViewStyle = StyleSheet.create({
    viewStyle: {
      backgroundColor: 'dodgerblue',
      width: '100%',
      height: orientation === 'landscape' ? '100%' : '30%'
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={ViewStyle.viewStyle} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default App
