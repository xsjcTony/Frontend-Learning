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


type LoginFormSchema = z.infer<typeof loginFormSchema>


const loginFormSchema = z.object({
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(4)
})


const LoginScreen = (): JSX.Element => {

  const {
    control,
    handleSubmit
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    console.log(data)
  }


  return (
    <Screen style={styles.container}>
      <Image source={logo} style={styles.logo} />

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
        title="Login"
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


export default LoginScreen
