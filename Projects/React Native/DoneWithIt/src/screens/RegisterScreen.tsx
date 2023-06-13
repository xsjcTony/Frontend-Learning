import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Image, StyleSheet } from 'react-native'
import { z } from 'zod'
import logo from '@assets/logo-red.png'
import AppButton from '@components/AppButton'
import TextInputField from '@components/fields/TextInputField'
import Screen from '@components/Screen'
import type { JSX } from 'react'
import type { SubmitHandler } from 'react-hook-form'


type RegisterFormSchema = z.infer<typeof registerFormSchema>


const registerFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(4)
})


const RegisterScreen = (): JSX.Element => {

  const {
    control,
    handleSubmit
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<RegisterFormSchema> = (data) => {
    console.log(data)
  }


  return (
    <Screen style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInputField
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        control={control}
        icon="account"
        name="name"
        placeholder="Name"
      />

      <TextInputField
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        control={control}
        icon="email"
        keyboardType="email-address"
        name="email"
        placeholder="Email"
      />

      <TextInputField
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect={false}
        control={control}
        icon="lock"
        name="password"
        placeholder="Password"
      />

      <AppButton
        title="Register"
        onPress={handleSubmit(onSubmit)}
      />
    </Screen>
  )
}


const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50
  },
  container: {
    paddingHorizontal: 10,
    rowGap: 20
  }
})


export default RegisterScreen
