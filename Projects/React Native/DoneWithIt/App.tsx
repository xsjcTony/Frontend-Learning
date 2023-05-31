import { useState } from 'react'
import AppPicker from '@components/AppPicker'
import AppTextInput from '@components/AppTextInput'
import Screen from '@components/Screen'
import type { Item } from '@components/AppPicker'
import type { JSX } from 'react'


const items: Item[] = [
  { label: 'Furniture', value: 1 },
  { label: 'Clothing', value: 2 },
  { label: 'Cameras', value: 3 }
]


const App = (): JSX.Element => {

  const [category, setCategory] = useState<Item>(items[0])


  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
      <AppPicker
        icon="apps"
        items={items}
        placeholder="Category"
        selectedItem={category}
        onSelectItem={setCategory}
      />
      <AppTextInput icon="email" placeholder="Email" />
    </Screen>
  )
}


export default App
