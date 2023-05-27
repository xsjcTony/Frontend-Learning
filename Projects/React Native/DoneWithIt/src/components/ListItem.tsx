import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import AppText from '@components/AppText'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { ImageSourcePropType, TouchableHighlightProps } from 'react-native'


interface ListItemProps {
  title: string
  subTitle: string
  image: ImageSourcePropType
  onPress: TouchableHighlightProps['onPress']
}


const ListItem = ({
  image,
  title,
  subTitle,
  onPress
}: ListItemProps): JSX.Element => (
  <TouchableHighlight
    underlayColor={COLORS.LIGHT_GREY}
    onPress={onPress}
  >
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
    </View>
  </TouchableHighlight>
)


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 15
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
    color: COLORS.MEDIUM_GREY
  }
})


export default ListItem
