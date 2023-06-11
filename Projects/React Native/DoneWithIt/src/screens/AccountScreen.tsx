import { FlatList, StyleSheet, View } from 'react-native'
import moshImg from '@assets/mosh.jpg'
import ListItem from '@components/lists/ListItem'
import ListItemSeparator from '@components/lists/ListItemSeparator'
import Screen from '@components/Screen'
import COLORS from '@constants/colors'
import type { IconProps } from '@components/Icon'
import type { JSX } from 'react'


interface Item {
  title: string
  icon: IconProps
}


const menuItems: Item[] = [
  {
    title: 'My Listings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: COLORS.PRIMARY
    }
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: COLORS.SECONDARY
    }
  }
]


const AccountScreen = (): JSX.Element => (
  <Screen style={styles.screen}>
    <View style={styles.container}>
      <ListItem
        image={moshImg}
        subTitle="aschaeffer@aelita.me"
        title="Aelita Schaeffer"
      />

      <FlatList
        data={menuItems}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={({ title }) => title}
        renderItem={({ item: { title, icon } }) => <ListItem iconProps={icon} title={title} />}
      />

      <ListItem
        iconProps={{ name: 'logout', backgroundColor: '#ffed66' }}
        title="Log Out"
      />
    </View>
  </Screen>
)


const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.LIGHT_GREY
  },
  container: {
    paddingVertical: 20,
    rowGap: 20
  }
})


export default AccountScreen
