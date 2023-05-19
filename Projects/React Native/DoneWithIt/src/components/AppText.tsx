import { Platform, StyleSheet, Text } from 'react-native'
import type { JSX, PropsWithChildren } from 'react'
import type { TextStyle } from 'react-native'


interface AppTextProps {
  style?: TextStyle
}


const AppText = ({
  children,
  style
}: PropsWithChildren<AppTextProps>): JSX.Element => (
  <Text style={[styles.text, style]}>
    {children}
  </Text>
)


const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.select({
      ios: 'Avenir',
      'default': 'Roboto'
    })
  }
})


export default AppText
