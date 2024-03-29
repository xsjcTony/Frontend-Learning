import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useBoolean } from 'ahooks'
import { Button, FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import AppText from '@components/AppText'
import IconPickerItem from '@components/fields/AppPicker/IconPickerItem'
import PickerItem from '@components/fields/AppPicker/PickerItem'
import Screen from '@components/Screen'
import COLORS from '@constants/colors'
import DEFAULT_STYLES from '@constants/styles'
import type { PickerItemProps } from '@components/fields/AppPicker/PickerItem'
import type { ComponentProps, JSX } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'


interface Item {
  label: string
  value: number
  backgroundColor?: string
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
}


interface AppPickerProps {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
  placeholder: string
  items: Item[]
  selectedItem?: Item
  onSelectItem?: (item: Item) => void
  iconPicker?: boolean
  style?: StyleProp<ViewStyle>
}


const AppPicker = ({
  icon,
  placeholder,
  items,
  selectedItem,
  onSelectItem,
  iconPicker = false,
  style
}: AppPickerProps): JSX.Element => {

  const [modalOpened, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false)

  const onPress = (item: Item): PickerItemProps['onPress'] => () => {
    closeModal()
    onSelectItem?.(item)
  }


  return (
    <>
      <TouchableWithoutFeedback onPress={openModal}>
        <View style={[styles.container, style]}>
          {icon && <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name={icon} size={20} />}
          <AppText
            style={[styles.picker, !selectedItem && { color: COLORS.MEDIUM_GREY }]}
          >
            {selectedItem?.label ?? placeholder}
          </AppText>
          <MaterialCommunityIcons color={COLORS.MEDIUM_GREY} name="chevron-down" size={20} />
        </View>
      </TouchableWithoutFeedback>

      <Modal animationType="slide" visible={modalOpened}>
        <Screen>
          <Button title="Close" onPress={closeModal} />
          <FlatList
            columnWrapperStyle={styles.iconRowWrapper}
            contentContainerStyle={iconPicker && styles.iconList}
            data={items}
            keyExtractor={({ value }) => value.toString()}
            numColumns={iconPicker ? 3 : void 0}
            renderItem={iconPicker
              ? ({ item }) => (
                <IconPickerItem
                  backgroundColor={item.backgroundColor}
                  icon={item.icon ?? 'help'}
                  label={item.label}
                  onPress={onPress(item)}
                />
              )
              : ({ item }) => <PickerItem label={item.label} onPress={onPress(item)} />}
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
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    columnGap: 10,
    borderColor: COLORS.LIGHT_GREY,
    borderWidth: 2
  },
  picker: {
    ...DEFAULT_STYLES.TEXT,
    flex: 1
  },
  iconList: {
    paddingVertical: 15,
    rowGap: 15,
    columnGap: 30
  },
  iconRowWrapper: {
    justifyContent: 'space-around'
  }
})


export default AppPicker


export type { Item, AppPickerProps }
