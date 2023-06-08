import { useController } from 'react-hook-form'
import { View } from 'react-native'
import AppTextInput from '@components/AppTextInput'
import ErrorMessage from '@components/ErrorMessage'
import COLORS from '@constants/colors'
import type { AppTextInputProps } from '@components/AppTextInput'
import type { JSX } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'


interface TextInputFieldProps<T extends FieldValues, N extends FieldPath<T>> extends AppTextInputProps {
  control: Control<T>
  name: N
}


const TextInputField = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  ...props
}: TextInputFieldProps<T, N>): JSX.Element => {

  const {
    field: { ref, onBlur, onChange, value },
    formState: { errors }
  } = useController({ control, name })


  return (
    <View>
      <AppTextInput
        {...props}
        ref={ref}
        style={errors[name] && { borderColor: COLORS.DANGER }}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
      />
      <ErrorMessage errorMsg={errors[name]?.message as string | undefined} />
    </View>
  )
}


export default TextInputField
