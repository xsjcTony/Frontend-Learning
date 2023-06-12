import { useController } from 'react-hook-form'
import { View } from 'react-native'
import AppTextInput from '@components/fields/AppTextInput'
import ErrorMessage from '@components/fields/ErrorMessage'
import COLORS from '@constants/colors'
import type { AppTextInputProps } from '@components/fields/AppTextInput'
import type { JSX } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { StyleProp, ViewStyle } from 'react-native'


interface TextInputFieldProps<T extends FieldValues, N extends FieldPath<T>> extends AppTextInputProps {
  control: Control<T>
  name: N
  containerStyle?: StyleProp<ViewStyle>
}


const TextInputField = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  containerStyle,
  multiline,
  numberOfLines,
  ...props
}: TextInputFieldProps<T, N>): JSX.Element => {

  const {
    field: { ref, onBlur, onChange, value },
    formState: { errors }
  } = useController({ control, name })

  const errorMessage = errors[name]?.message


  const inputStyles: StyleProp<ViewStyle> = [
    errors[name] && { borderColor: COLORS.DANGER },
    !!multiline && (numberOfLines ?? 0) > 1 && { borderRadius: 30 }
  ]


  return (
    <View style={containerStyle}>
      <AppTextInput
        {...props}
        ref={ref}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={COLORS.MEDIUM_GREY}
        style={inputStyles}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
      />
      <ErrorMessage errorMessage={typeof errorMessage !== 'object' ? errorMessage : void 0} />
    </View>
  )
}


export default TextInputField
