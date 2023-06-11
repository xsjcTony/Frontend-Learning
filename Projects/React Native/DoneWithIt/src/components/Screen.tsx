import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import type { JSX, PropsWithChildren } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'


interface ScreenProps {
  style?: StyleProp<ViewStyle>
}


const Screen = ({
  style,
  children
}: PropsWithChildren<ScreenProps>): JSX.Element =>
  <View style={[styles.screen, style]}>{children}</View>


const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
})


export default Screen
