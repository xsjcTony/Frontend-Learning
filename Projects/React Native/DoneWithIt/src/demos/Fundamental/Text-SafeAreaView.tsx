import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import type { JSX } from 'react'


const App = (): JSX.Element => {
  const handlePress = () => void console.log('Text pressed')

  return (
    <SafeAreaView style={styles.container}>
      <Text
        selectable
        suppressHighlighting
        numberOfLines={3}
        onPress={handlePress}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur culpa, dolor, doloribus error libero mollitia nobis nostrum pariatur quam quod repellendus sed tempora. Aliquam corporis doloribus inventore sunt voluptas?
      </Text>
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
