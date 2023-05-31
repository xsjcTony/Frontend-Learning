import { StyleSheet, TouchableOpacity } from 'react-native'
import AppText from '@components/AppText'
import type { JSX } from 'react'
import type { TouchableOpacityProps } from 'react-native'


interface PickerItemProps {
  label: string
  onPress: TouchableOpacityProps['onPress']
}


const PickerItem = ({
  label,
  onPress
}: PickerItemProps): JSX.Element => (
  <TouchableOpacity onPress={onPress}>
    <AppText style={styles.text}>{label}</AppText>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  text: {
    padding: 20
  }
})


export default PickerItem


export type { PickerItemProps }
