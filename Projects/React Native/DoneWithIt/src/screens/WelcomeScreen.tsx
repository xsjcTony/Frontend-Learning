import { Image, ImageBackground, StyleSheet, Text } from 'react-native'
import backgroundImg from '@assets/background.jpg'
import logo from '@assets/logo-red.png'
import AppButton from '@components/AppButton'
import type { JSX } from 'react'


const WelcomeScreen = (): JSX.Element => (
  <ImageBackground
    blurRadius={5}
    source={backgroundImg}
    style={styles.background}
  >
    <Image source={logo} style={styles.logo} />
    <Text style={styles.title}>Sell What You Don&apos;t Need</Text>

    <AppButton style={styles.loginButton} title="Login" onPress={() => void console.log('1')} />
    <AppButton color="secondary" title="Register" />
  </ImageBackground>
)


const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 'auto'
  },
  loginButton: {
    marginBottom: 20
  }
})


export default WelcomeScreen
