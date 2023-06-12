import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { z } from 'zod'
import AppButton from '@components/AppButton'
import PickerField from '@components/fields/PickerField'
import TextInputField from '@components/fields/TextInputField'
import Screen from '@components/Screen'
import { stringToNumber } from '@utils/preprocesses'
import type { Item } from '@components/fields/AppPicker'
import type { JSX } from 'react'
import type { SubmitHandler } from 'react-hook-form'


type ListingEditingFormSchema = z.infer<typeof listEditingFormSchema>


const listEditingFormSchema = z.object({
  title: z.string().min(1),
  price: z.preprocess(
    stringToNumber,
    z.number().min(1).max(10000)
  ),
  category: z
    .object({
      label: z.string().min(1),
      value: z.number()
    })
    .nullable(),
  description: z.string().optional()
})


const categories: Item[] = [
  {
    backgroundColor: '#fc5c65',
    icon: 'floor-lamp',
    label: 'Furniture',
    value: 1
  },
  {
    backgroundColor: '#fd9644',
    icon: 'car',
    label: 'Cars',
    value: 2
  },
  {
    backgroundColor: '#fed330',
    icon: 'camera',
    label: 'Cameras',
    value: 3
  },
  {
    backgroundColor: '#26de81',
    icon: 'cards',
    label: 'Games',
    value: 4
  },
  {
    backgroundColor: '#2bcbba',
    icon: 'shoe-heel',
    label: 'Clothing',
    value: 5
  },
  {
    backgroundColor: '#45aaf2',
    icon: 'basketball',
    label: 'Sports',
    value: 6
  },
  {
    backgroundColor: '#4b7bec',
    icon: 'headphones',
    label: 'Movies & Music',
    value: 7
  },
  {
    backgroundColor: '#a55eea',
    icon: 'book-open-variant',
    label: 'Books',
    value: 8
  },
  {
    backgroundColor: '#778ca3',
    icon: 'application',
    label: 'Other',
    value: 9
  }
]


const ListingEditScreen = (): JSX.Element => {

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
          containerStyle={styles.price}
          control={control}
          inputMode="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
        />

        <PickerField
          iconPicker
          containerStyle={styles.category}
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
          onPress={handleSubmit(onSubmit, err => void console.log(err))}
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
  },
  price: {
    width: '32.5%'
  },
  category: {
    width: '55%'
  }
})


export default ListingEditScreen
