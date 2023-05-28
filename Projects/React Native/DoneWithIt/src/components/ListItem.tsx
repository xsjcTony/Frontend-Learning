import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import AppText from '@components/AppText'
import Icon from '@components/Icon'
import COLORS from '@constants/colors'
import type { IconProps } from '@components/Icon'
import type { JSX } from 'react'
import type { ImageSourcePropType, TouchableHighlightProps } from 'react-native'
import type { SwipeableProps } from 'react-native-gesture-handler/Swipeable'


interface ListItemProps {
  title: string
  subTitle?: string
  image?: ImageSourcePropType
  onPress?: TouchableHighlightProps['onPress']
  renderRightActions?: SwipeableProps['renderRightActions']
  iconProps?: IconProps
}


const ListItem = ({
  image,
  title,
  subTitle,
  onPress,
  renderRightActions,
  iconProps
}: ListItemProps): JSX.Element => (
  <Swipeable renderRightActions={renderRightActions}>
    <TouchableHighlight
      style={styles.container}
      underlayColor={COLORS.LIGHT_GREY}
      onPress={onPress}
    >
      <>
        {iconProps && <Icon {...iconProps} />}
        {image && <Image source={image} style={styles.image} />}
        <View>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
      </>
    </TouchableHighlight>
  </Swipeable>
)


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
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
