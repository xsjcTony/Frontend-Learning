import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import COLORS from '@constants/colors'
import DEFAULT_STYLES from '@constants/styles'
import type { ComponentProps, JSX } from 'react'
import type { TextInputProps } from 'react-native'


interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
}


const AppTextInput = ({
  icon,
  ...props
}: AppTextInputProps): JSX.Element => (
  <View style={styles.container}>
    {icon && <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name={icon} size={20} />}
    <TextInput style={styles.textInput} {...props} />
  </View>
)


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 9999,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    columnGap: 10
  },
  textInput: {
    ...DEFAULT_STYLES.TEXT,
    flex: 1
  }
})


export default AppTextInput
