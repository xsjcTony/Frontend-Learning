import { Image, StyleSheet, View } from 'react-native'
import AppText from '@components/AppText'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { ImageSourcePropType } from 'react-native'


interface CardProps {
  image: ImageSourcePropType
  title: string
  subTitle: string
}


const Card = ({
  image,
  title,
  subTitle
}: CardProps): JSX.Element => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <View style={styles.detailsContainer}>
      <AppText numberOfLines={3} style={styles.title}>{title}</AppText>
      <AppText style={styles.subTitle}>{subTitle}</AppText>
    </View>
  </View>
)


const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    marginBottom: 20,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  detailsContainer: {
    padding: 20
  },
  title: {
    marginBottom: 7
  },
  subTitle: {
    color: COLORS.SECONDARY,
    fontWeight: 'bold'
  }
})


export default Card
