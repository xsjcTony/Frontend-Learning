import type { ImageRequireSource } from 'react-native'


declare global {
  module '*.png' {
    const value: ImageRequireSource
    export default value
  }

  module '*.jpg' {
    const value: ImageRequireSource
    export default value
  }
}
