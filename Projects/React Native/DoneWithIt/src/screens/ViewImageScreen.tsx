import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image, StyleSheet, View } from 'react-native'
import chairImg from '@assets/chair.jpg'
import COLORS from '@constants/colors'
import type { JSX } from 'react'


const ViewImageScreen = (): JSX.Element => (
  <View style={styles.container}>
    <View style={styles.closeIcon}>
      <MaterialCommunityIcons color={COLORS.WHITE} name="close" size={35} />
    </View>
    <View style={StyleSheet.compose(styles.closeIcon, styles.deleteIcon)}>
      <MaterialCommunityIcons color={COLORS.SECONDARY} name="trash-can-outline" size={35} />
    </View>
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
    position: 'absolute',
    top: 40,
    left: 30
  },
  deleteIcon: {
    left: void 0,
    right: 30
  },
  image: {
    width: '100%',
    height: '100%'
  }
})


export default ViewImageScreen
