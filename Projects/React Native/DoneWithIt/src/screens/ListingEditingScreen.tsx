import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { z } from 'zod'
import AppButton from '@components/AppButton'
import PickerField from '@components/fields/PickerField'
import TextInputField from '@components/fields/TextInputField'
import Screen from '@components/Screen'
import type { Item } from '@components/fields/AppPicker'
import type { JSX } from 'react'
import type { SubmitHandler } from 'react-hook-form'


type ListingEditingFormSchema = z.infer<typeof listEditingFormSchema>


const listEditingFormSchema = z.object({
  title: z.string().min(1),
  price: z.coerce.number().min(1).max(10000),
  category: z
    .object({
      label: z.string().min(1),
      value: z.number()
    })
    .nullable(),
  description: z.string().optional()
})


const categories: Item[] = [
  { label: 'Furniture', value: 1 },
  { label: 'Clothing', value: 2 },
  { label: 'Camera', value: 3 }
]


const ListingEditingScreen = (): JSX.Element => {

  const {
    control,
    handleSubmit
  } = useForm<ListingEditingFormSchema>({
    resolver: zodResolver(listEditingFormSchema),
    defaultValues: {
      title: '',
      // @ts-expect-error - placeholder empty string here
      price: '',
      category: null,
      description: ''
    }
  })


  const onSubmit: SubmitHandler<ListingEditingFormSchema> = (data) => {
    console.log(data)
  }


  return (
    <Screen>
      <View style={styles.container}>
        <TextInputField
          autoCapitalize="sentences"
          control={control}
          name="title"
          placeholder="Title"
        />

        <TextInputField
          control={control}
          inputMode="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
        />

        <PickerField
          control={control}
          items={categories}
          name="category"
          placeholder="Category"
        />

        <TextInputField
          multiline
          autoCapitalize="sentences"
          control={control}
          name="description"
          numberOfLines={3}
          placeholder="Description"
          textAlignVertical="top"
        />

        <AppButton
          title="Post"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    rowGap: 20
  }
})


export default ListingEditingScreen
