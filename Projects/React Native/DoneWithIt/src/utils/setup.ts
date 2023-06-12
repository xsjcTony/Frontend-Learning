import { setErrorMap } from 'zod'
import { defaultErrorMap } from '@constants/errors'


const setupErrorMessages = () => void setErrorMap(defaultErrorMap)


export {
  setupErrorMessages
}
