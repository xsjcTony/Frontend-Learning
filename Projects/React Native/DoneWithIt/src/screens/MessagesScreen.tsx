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
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
            showChevrons
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
