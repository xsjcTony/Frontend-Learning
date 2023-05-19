import { Image, StyleSheet, View } from 'react-native'
import AppText from '@components/AppText'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { ImageSourcePropType } from 'react-native'


interface ListItemProps {
  title: string
  subTitle: string
  image: ImageSourcePropType
}


const ListItem = ({
  image,
  title,
  subTitle
}: ListItemProps): JSX.Element => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
    <View>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subTitle}>{subTitle}</AppText>
    </View>
  </View>
)


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 9999
  },
  title: {
    fontWeight: '500'
  },
  subTitle: {
    color: COLORS.MEDIUM
  }
})


export default ListItem
