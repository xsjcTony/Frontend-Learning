import { FlatList } from 'react-native'
import moshImg from '@assets/mosh.jpg'
import ListItem from '@components/ListItem'
import listItemSeparator from '@components/ListItemSeparator'
import Screen from '@components/Screen'
import type { JSX } from 'react'


const messages = [
  {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: moshImg
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: moshImg
  }
]


const MessagesScreen = (): JSX.Element => (
  <Screen>
    <FlatList
      data={messages}
      ItemSeparatorComponent={listItemSeparator}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <ListItem
          image={item.image}
          subTitle={item.description}
          title={item.title}
          onPress={() => void console.log('Message selected', item)}
        />
      )}
    />
  </Screen>
)


export default MessagesScreen
