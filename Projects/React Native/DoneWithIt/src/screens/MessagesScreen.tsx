import { useState } from 'react'
import { FlatList } from 'react-native'
import moshImg from '@assets/mosh.jpg'
import ListItem from '@components/lists/ListItem'
import ListItemDeleteAction from '@components/lists/ListItemDeleteAction'
import listItemSeparator from '@components/lists/ListItemSeparator'
import Screen from '@components/Screen'
import type { JSX } from 'react'
import type { ImageRequireSource } from 'react-native'


interface Message {
  id: number
  title: string
  description: string
  image: ImageRequireSource
}


const initialMessages: Message[] = [
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


const MessagesScreen = (): JSX.Element => {

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [refreshing, setRefreshing] = useState<boolean>(false)


  const handleDelete = (message: Message) =>
    void setMessages(prev => prev.filter(m => m.id !== message.id))


  return (
    <Screen>
      <FlatList
        data={messages}
        ItemSeparatorComponent={listItemSeparator}
        keyExtractor={({ id }) => id.toString()}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <ListItem
            image={item.image}
            renderRightActions={() => <ListItemDeleteAction onPress={() => void handleDelete(item)} />}
            subTitle={item.description}
            title={item.title}
            onPress={() => void console.log('Message selected', item)}
          />
        )}
        onRefresh={() => void setMessages([{
          id: 2,
          title: 'T2',
          description: 'D2',
          image: moshImg
        }])}
      />
    </Screen>
  )
}


export default MessagesScreen
