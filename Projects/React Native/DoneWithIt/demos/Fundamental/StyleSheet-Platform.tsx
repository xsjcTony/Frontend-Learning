import { StatusBar } from 'expo-status-bar'
import { Button, Platform, SafeAreaView, StyleSheet, StatusBar as NativeStatusBar } from 'react-native'


const App = (): JSX.Element => {
  const handlePress = () => void console.log('Button pressed')

  return (
    <SafeAreaView style={StyleSheet.compose(styles.container, anotherStyle.container)}>
      <Button title="Press me" onPress={handlePress} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight : 0
  }
})

const anotherStyle = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  }
})

export default App
