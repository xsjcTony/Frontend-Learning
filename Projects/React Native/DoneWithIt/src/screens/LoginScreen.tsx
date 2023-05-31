import { Image, StyleSheet } from 'react-native'
import logo from '@assets/logo-red.png'
import AppButton from '@components/AppButton'
import AppTextInput from '@components/AppTextInput'
import Screen from '@components/Screen'
import type { JSX } from 'react'


const LoginScreen = (): JSX.Element => (
  <Screen style={styles.container}>
    <Image source={logo} style={styles.logo} />

    <AppTextInput
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      icon="email"
      keyboardType="email-address"
      placeholder="Email"
    />

    <AppTextInput
      secureTextEntry
      autoCapitalize="none"
      autoComplete="new-password"
      autoCorrect={false}
      icon="lock"
      placeholder="Password"
    />

    <AppButton title="Login" onPress={() => void console.log(1)} />
  </Screen>
)


const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50
  },
  container: {
    paddingHorizontal: 10,
    rowGap: 20
  }
})


export default LoginScreen
