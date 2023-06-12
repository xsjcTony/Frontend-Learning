import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '@components/AppText'
import Icon from '@components/Icon'
import type { MaterialCommunityIcons } from '@expo/vector-icons'
import type { ComponentProps, JSX } from 'react'
import type { TouchableOpacityProps } from 'react-native'


interface IconPickerItemProps {
  label: string
  icon: ComponentProps<typeof MaterialCommunityIcons>['name']
  backgroundColor?: string
  onPress: TouchableOpacityProps['onPress']
}


const IconPickerItem = ({
  label,
  backgroundColor,
  icon,
  onPress
}: IconPickerItemProps): JSX.Element => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <Icon
        backgroundColor={backgroundColor}
        containerStyle={styles.icon}
        name={icon}
        size={80}
      />
      <AppText style={styles.label}>{label}</AppText>
    </TouchableOpacity>
  </View>
)


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: '33%'
  },
  touchable: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    marginBottom: 5
  },
  label: {
    textAlign: 'center'
  }
})


export default IconPickerItem
