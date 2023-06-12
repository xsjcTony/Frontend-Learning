import { Text } from 'react-native'
import DEFAULT_STYLES from '@constants/styles'
import type { JSX } from 'react'
import type { TextProps } from 'react-native'


const AppText = ({
  children,
  style,
  ...props
}: TextProps): JSX.Element => (
  <Text style={[DEFAULT_STYLES.TEXT, style]} {...props}>
    {children}
  </Text>
)


export default AppText
