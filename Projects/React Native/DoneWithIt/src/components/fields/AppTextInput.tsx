import { MaterialCommunityIcons } from '@expo/vector-icons'
import { forwardRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import COLORS from '@constants/colors'
import DEFAULT_STYLES from '@constants/styles'
import type { ComponentProps, JSX } from 'react'
import type { TextInputProps } from 'react-native'


interface AppTextInputProps extends TextInputProps {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
}


const AppTextInput = forwardRef<
  TextInput,
  AppTextInputProps
>(({
  icon,
  style,
  ...props
}, ref): JSX.Element => (
  <View style={[styles.container, style]}>
    {icon && <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name={icon} size={20} />}
    <TextInput style={styles.textInput} {...props} ref={ref} />
  </View>
))


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 9999,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    columnGap: 10,
    borderColor: COLORS.LIGHT_GREY,
    borderWidth: 2
  },
  textInput: {
    ...DEFAULT_STYLES.TEXT,
    flex: 1
  }
})


AppTextInput.displayName = 'AppTextInput'


export default AppTextInput


export type { AppTextInputProps }
