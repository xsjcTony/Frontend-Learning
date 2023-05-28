import Constants from 'expo-constants'
import { SafeAreaView, StyleSheet } from 'react-native'
import type { JSX, PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'


interface ScreenProps {
  style?: ViewStyle
}


const Screen = ({
  style,
  children
}: PropsWithChildren<ScreenProps>): JSX.Element =>
  <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>


const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
})


export default Screen
