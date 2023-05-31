import { Platform } from 'react-native'
import COLORS from '@constants/colors'


const DEFAULT_STYLES = {
  TEXT: {
    color: COLORS.DARK_GREY,
    fontSize: 18,
    fontFamily: Platform.select({ ios: 'Avenir', 'default': 'Roboto' })
  }
}


export default DEFAULT_STYLES
