import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useBoolean } from 'ahooks'
import { Button, FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import AppText from '@components/AppText'
import PickerItem from '@components/PickerItem'
import Screen from '@components/Screen'
import COLORS from '@constants/colors'
import DEFAULT_STYLES from '@constants/styles'
import type { PickerItemProps } from '@components/PickerItem'
import type { ComponentProps, JSX } from 'react'


interface Item {
  label: string
  value: number
}


interface AppPickerProps {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
  placeholder: string
  items: Item[]
  selectedItem?: Item
  onSelectItem?: (item: Item) => void
}


const AppPicker = ({
  icon,
  placeholder,
  items,
  selectedItem,
  onSelectItem
}: AppPickerProps): JSX.Element => {

  const [modalOpened, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false)

  const onPress = (item: Item): PickerItemProps['onPress'] => () => {
    closeModal()
    onSelectItem?.(item)
  }


  return (
    <>
      <TouchableWithoutFeedback onPress={openModal}>
        <View style={styles.container}>
          {icon && <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name={icon} size={20} />}
          <AppText style={styles.picker}>{selectedItem?.label ?? placeholder}</AppText>
          <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name="chevron-down" size={20} />
        </View>
      </TouchableWithoutFeedback>

      <Modal animationType="slide" visible={modalOpened}>
        <Screen>
          <Button title="Close" onPress={closeModal} />
          <FlatList
            data={items}
            keyExtractor={({ value }) => value.toString()}
            renderItem={({ item }) =>
              <PickerItem label={item.label} onPress={onPress(item)} />}
          />
        </Screen>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 9999,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    columnGap: 10
  },
  picker: {
    ...DEFAULT_STYLES.TEXT,
    flex: 1
  }
})


export default AppPicker


export type { Item }
