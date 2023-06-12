import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import COLORS from '@constants/colors'
import type { ComponentProps, JSX } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'


interface IconProps {
  name: ComponentProps<typeof MaterialCommunityIcons>['name']
  size?: number
  backgroundColor?: string
  iconColor?: string
  containerStyle?: StyleProp<ViewStyle>
}


const Icon = ({
  name,
  size = 40,
  backgroundColor = COLORS.BLACK,
  iconColor = COLORS.WHITE,
  containerStyle
}: IconProps): JSX.Element => (
  <View
    style={[
      styles.container,
      { width: size, height: size, backgroundColor },
      containerStyle
    ]}
  >
    <MaterialCommunityIcons color={iconColor} name={name} size={size / 2} />
  </View>
)


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
  }
})


export default Icon


export type {
  IconProps
}
