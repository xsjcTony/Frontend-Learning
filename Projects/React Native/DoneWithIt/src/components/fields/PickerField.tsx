import { useController } from 'react-hook-form'
import { View } from 'react-native'
import AppPicker from '@components/fields/AppPicker'
import ErrorMessage from '@components/fields/ErrorMessage'
import COLORS from '@constants/colors'
import type { AppPickerProps } from '@components/fields/AppPicker'
import type { JSX } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { StyleProp, ViewStyle } from 'react-native'


interface PickerFieldProps<T extends FieldValues, N extends FieldPath<T>> extends AppPickerProps {
  control: Control<T>
  name: N
  containerStyle?: StyleProp<ViewStyle>
}


const PickerField = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  containerStyle,
  ...props
}: PickerFieldProps<T, N>): JSX.Element => {

  const {
    field: { onChange, value },
    formState: { errors }
  } = useController({ control, name })

  const errorMessage = errors[name]?.message


  return (
    <View style={containerStyle}>
      <AppPicker
        {...props}
        selectedItem={value}
        style={errors[name] && { borderColor: COLORS.DANGER }}
        onSelectItem={onChange}
      />
      <ErrorMessage errorMessage={typeof errorMessage !== 'object' ? errorMessage : void 0} />
    </View>
  )
}


export default PickerField
