import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { ViewStyle, TouchableOpacityProps } from 'react-native'


interface AppButtonProps {
  title: string
  color?: 'primary' | 'secondary'
  style?: ViewStyle
  onPress?: TouchableOpacityProps['onPress']
}


const AppButton = ({
  title,
  color = 'primary',
  style,
  onPress
}: AppButtonProps): JSX.Element => {
  const buttonColor = color === 'primary'
    ? COLORS.PRIMARY
    : COLORS.SECONDARY


  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  text: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})


export default AppButton
