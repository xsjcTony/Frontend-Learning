import Constants from 'expo-constants'
import { SafeAreaView, StyleSheet } from 'react-native'
import type { JSX, PropsWithChildren } from 'react'


const Screen = ({ children }: PropsWithChildren): JSX.Element => 
  <SafeAreaView style={styles.screen}>{children}</SafeAreaView>


const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight
  }
})


export default Screen
