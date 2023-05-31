import { Text } from 'react-native'
import DEFAULT_STYLES from '@constants/styles'
import type { JSX, PropsWithChildren } from 'react'
import type { TextStyle } from 'react-native'


interface AppTextProps {
  style?: TextStyle
}


const AppText = ({
  children,
  style
}: PropsWithChildren<AppTextProps>): JSX.Element => (
  <Text style={[DEFAULT_STYLES.TEXT, style]}>
    {children}
  </Text>
)


export default AppText
