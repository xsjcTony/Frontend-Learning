import { StyleSheet, View } from 'react-native'
import COLORS from '@constants/colors'
import type { JSX } from 'react'


const ListItemSeparator = (): JSX.Element => <View style={styles.separator} />


const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.LIGHT_GREY
  }
})


export default ListItemSeparator
