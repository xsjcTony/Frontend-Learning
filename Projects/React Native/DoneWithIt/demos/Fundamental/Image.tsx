import { StatusBar } from 'expo-status-bar'
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native'
import icon from '../../assets/icon-image.png'


const App = (): JSX.Element => {
  console.log(icon)

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      {/* <Image source={icon} /> */}
      <Image
        blurRadius={5}
        defaultSource={icon}
        fadeDuration={1000}
        source={{
          uri: `https://picsum.photos/200/300?t=${new Date().getTime()}`,
          width: 200,
          height: 300
        }}
      />
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
