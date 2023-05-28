import { FlatList, StyleSheet, View } from 'react-native'
import jacketImg from '@assets/jacket.jpg'
import Card from '@components/Card'
import Screen from '@components/Screen'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { ImageRequireSource } from 'react-native'


interface Listing {
  id: number
  title: string
  price: number
  image: ImageRequireSource
}


const listings: Listing[] = [
  {
    id: 1,
    title: 'Red jacket for sale',
    price: 100,
    image: jacketImg
  },
  {
    id: 2,
    title: 'Couch in great condition',
    price: 1000,
    image: jacketImg
  }
]


const ListingsScreen = (): JSX.Element => (
  <Screen style={styles.screen}>
    <View style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: { title, image, price } }) =>
          <Card image={image} subTitle={`$${price}`} title={title} />}
      />
    </View>
  </Screen>
)


const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.LIGHT_GREY
  },
  container: {
    padding: 20
  }
})


export default ListingsScreen
