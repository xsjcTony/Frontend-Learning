import { StyleSheet } from 'react-native'
import AppText from '@components/AppText'
import COLORS from '@constants/colors'
import type { JSX } from 'react'


interface ErrorMessageProps {
  errorMsg: string | undefined
}


const ErrorMessage = ({ errorMsg }: ErrorMessageProps): JSX.Element | null => errorMsg
  ? <AppText style={styles.error}>{errorMsg}</AppText>
  : null


const styles = StyleSheet.create({
  error: {
    color: COLORS.DANGER,
    fontSize: 16,
    marginStart: 18,
    paddingTop: 4
  }
})


export default ErrorMessage
