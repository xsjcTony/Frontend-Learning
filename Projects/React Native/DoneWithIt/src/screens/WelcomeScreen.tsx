import backgroundImg from '@assets/background.jpg'
import logo from '@assets/logo-red.png'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import type { JSX } from 'react'


const WelcomeScreen = (): JSX.Element => (
  <ImageBackground
    source={backgroundImg}
    style={styles.background}
  >
    <Image source={logo} style={styles.logo} />
    <Text>Sell What You Don&apos;t Need</Text>

    <View style={styles.loginButton} />
    <View style={StyleSheet.compose(styles.loginButton, styles.registerButton)} />
  </ImageBackground>
)


const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 70
  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#fc5c65',
    marginTop: 'auto'
  },
  registerButton: {
    marginTop: 0,
    backgroundColor: '#4ecdc4'
  }
})


export default WelcomeScreen
