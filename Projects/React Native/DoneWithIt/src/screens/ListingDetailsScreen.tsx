import { Image, StyleSheet, View } from 'react-native'
import jacketImg from '@assets/jacket.jpg'
import moshImg from '@assets/mosh.jpg'
import AppText from '@components/AppText'
import ListItem from '@components/ListItem'
import COLORS from '@constants/colors'
import type { JSX } from 'react'


const ListingDetailsScreen = (): JSX.Element => (
  <View>
    <Image source={jacketImg} style={styles.image} />
    <View style={styles.detailsContainer}>
      <AppText style={styles.title}>Red jacket for sale!</AppText>
      <AppText style={styles.price}>$100</AppText>
      <View style={styles.userContainer}>
        <ListItem
          image={moshImg}
          subTitle="5 Listings"
          title="Mosh Hamedani"
        />
      </View>
    </View>
  </View>
)


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  detailsContainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10
  },
  price: {
    color: COLORS.SECONDARY,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  userContainer: {
    marginVertical: 40
  }
})


export default ListingDetailsScreen
