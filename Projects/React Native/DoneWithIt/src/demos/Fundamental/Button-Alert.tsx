import { StatusBar } from 'expo-status-bar'
import { Button, SafeAreaView, StyleSheet, Alert } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {
  const handleAlertPress = () => void Alert.alert('My title', 'My message', [
    { text: 'Yes', onPress: () => void console.log('Yes'), style: 'destructive' },
    { text: 'No', onPress: () => void console.log('No') }
  ])

  const handlePromptPress = () => void Alert.prompt('My title', 'My message', text => void console.log(text))

  return (
    <SafeAreaView style={styles.container}>
      <Button color="#ffc0cb" title="Alert" onPress={handleAlertPress} />
      <Button color="#ffc0cb" title="Prompt" onPress={handlePromptPress} />
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
  }
})

export default App
