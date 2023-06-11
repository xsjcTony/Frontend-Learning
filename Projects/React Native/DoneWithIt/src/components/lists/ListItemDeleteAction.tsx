import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import COLORS from '@constants/colors'
import type { JSX } from 'react'
import type { TouchableWithoutFeedbackProps } from 'react-native'


interface ListItemDeleteActionProps {
  onPress: TouchableWithoutFeedbackProps['onPress']
}


const ListItemDeleteAction = ({
  onPress
}: ListItemDeleteActionProps): JSX.Element => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <MaterialCommunityIcons color={COLORS.WHITE} name="trash-can" size={35} />
    </View>
  </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DANGER,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default ListItemDeleteAction
