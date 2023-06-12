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
    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
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
