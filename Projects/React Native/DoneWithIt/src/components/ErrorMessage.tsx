import { StyleSheet } from 'react-native'
import AppText from '@components/AppText'
import COLORS from '@constants/colors'
import type { JSX } from 'react'


interface ErrorMessageProps {
  errorMessage: string | undefined
}


const ErrorMessage = ({ errorMessage }: ErrorMessageProps): JSX.Element | null => errorMessage
  ? <AppText style={styles.error}>{errorMessage}</AppText>
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
