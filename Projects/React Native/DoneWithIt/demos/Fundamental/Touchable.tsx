import { StatusBar } from 'expo-status-bar'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'


const App = (): JSX.Element => {
  const handlePress = () => void console.log('Touchable pressed')

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      {/* <TouchableWithoutFeedback onPress={handlePress}> */}
      {/* <TouchableOpacity onPress={handlePress}> */}
      {/*
      <TouchableHighlight onPress={handlePress}>
        <Image
          source={{
            uri: `https://picsum.photos/200/300?t=${new Date().getTime()}`,
            width: 200,
            height: 300
          }}
        />
      </TouchableHighlight>
      */}
      {/* </TouchableOpacity> */}
      {/* </TouchableWithoutFeedback> */}
      <TouchableNativeFeedback onPress={handlePress}>
        <View style={styles.touchable} />
      </TouchableNativeFeedback>
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
  touchable: {
    width: 200,
    height: 70,
    backgroundColor: 'dodgerblue'
  }
})

export default App
