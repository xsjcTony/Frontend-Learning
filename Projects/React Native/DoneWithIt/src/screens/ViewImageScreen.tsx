import chairImg from '@assets/chair.jpg'
import COLORS from '@constants/colors'
import { Image, StyleSheet, View } from 'react-native'
import type { JSX } from 'react'


const ViewImageScreen = (): JSX.Element => (
  <View style={styles.container}>
    <View style={styles.closeIcon} />
    <View style={StyleSheet.compose(styles.closeIcon, styles.deleteIcon)} />
    <Image
      resizeMode="contain"
      source={chairImg}
      style={styles.image}
    />
  </View>
)


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK
  },
  closeIcon: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    top: 40,
    left: 30
  },
  deleteIcon: {
    backgroundColor: COLORS.SECONDARY,
    left: void 0,
    right: 30
  },
  image: {
    width: '100%',
    height: '100%'
  }
})


export default ViewImageScreen
