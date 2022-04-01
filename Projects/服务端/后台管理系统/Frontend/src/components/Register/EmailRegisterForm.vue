<script lang="ts" setup>
import { Message, Lock, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { $ref } from 'vue/macros'
import { registerUser, sendVerificationEmail } from '../../api'
import { RegisterType } from '../../types'
import type { FormInstance } from '../../types'
import type { AxiosError } from 'axios'


const router = useRouter()

/**
 * Register Form
 */
const emailRegisterRef = $ref<FormInstance | null>(null)

const emailRegisterData = $ref({
  email: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  registerType: RegisterType.Email,
  agreement: false
})

const validateEmail = (rule: any, value: string, callback: any): void => {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value === '') {
    callback(new Error('Please input the email'))
  } else if (!regex.test(value)) {
    callback(new Error('Invalid email address'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: any): void => {
  const regex = /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (!regex.test(value)) {
    callback(new Error('Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.'))
  } else {
    if (emailRegisterData.confirmPassword !== '') {
      if (!emailRegisterRef) return
      void emailRegisterRef.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validateConfirmPassword = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== emailRegisterData.password) {
    callback(new Error('Password doesn\'t match'))
  } else {
    callback()
  }
}
const validateCaptcha = (rule: any, value: string, callback: any): void => {
  const regex = /^[A-Za-z0-9]{4}$/
  if (value === '') {
    callback(new Error('Please input the captcha'))
  } else if (!regex.test(value)) {
    callback(new Error('Incorrect captcha'))
  } else {
    callback()
  }
}
const validateAgreement = (rule: any, value: boolean, callback: any): void => {
  if (!value) {
    callback(new Error('Please agree to the Terms and Conditions'))
  } else {
    callback()
  }
}

const emailRegisterRules = $ref({
  email: { validator: validateEmail },
  password: { validator: validatePassword },
  confirmPassword: { validator: validateConfirmPassword },
  captcha: { validator: validateCaptcha },
  agreement: { validator: validateAgreement }
})

const submitForm = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // Succeed
        await registerUser(emailRegisterData)
        await router.push('/login')
      } catch (err) {
        // Error
        ElMessage.error({
          message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
          center: true,
          showClose: true,
          duration: 3000
        })
      }
    } else {
      ElMessage.error({
        message: 'Invalid registration data',
        type: 'success',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.resetFields()
  ElMessage.closeAll()
}


/**
 * Verification Code
 */
let disableSendButton = $ref(false)
let sendButtonText = $ref('Send Verification Code')
let loading = $ref(false)

const sendVerificationCode = async (): Promise<void> => {
  loading = true
  sendButtonText = 'Sending'

  const email = emailRegisterData.email

  // validate email
  if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(email)) {
    ElMessage.error({
      message: 'Invalid email address',
      center: true,
      showClose: true,
      duration: 3000
    })
    return
  }

  try {
    await sendVerificationEmail({ email })

    ElMessage.success({
      message: 'Verification email has been sent',
      center: true,
      showClose: true,
      duration: 3000
    })

    // disable send button for 60 seconds
    loading = false
    disableSendButton = true
    let count = 60
    sendButtonText = `Resend in ${ count }s`
    const disableTimer = setInterval(() => {
      count--

      if (count === 0) {
        disableSendButton = false
        sendButtonText = 'Resend Verification Code'
        clearInterval(disableTimer)
        return
      }

      sendButtonText = `Resend in ${ count }s`
    }, 1000)

  } catch (err) {
    // Error
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 3000
    })

    disableSendButton = false
    sendButtonText = 'Resend Verification Code'
  }
}
</script>

<template>
    <el-form ref="emailRegisterRef"
             :model="emailRegisterData"
             :rules="emailRegisterRules"
             class="email-register-form"
             @submit.prevent
    >
        <el-form-item class="email" prop="email" required>
            <el-input v-model="emailRegisterData.email"
                      :prefix-icon="Message"
                      clearable
                      placeholder="E-mail"
                      type="text"
            />
        </el-form-item>
        <el-form-item class="password" prop="password" required>
            <el-input v-model="emailRegisterData.password"
                      :prefix-icon="Lock"
                      autocomplete="off"
                      clearable
                      maxlength="20"
                      placeholder="Password"
                      show-password
                      type="password"
            />
        </el-form-item>
        <el-form-item prop="confirmPassword" required>
            <el-input v-model="emailRegisterData.confirmPassword"
                      :prefix-icon="Lock"
                      autocomplete="off"
                      clearable
                      maxlength="20"
                      placeholder="Confirm password"
                      show-password
                      type="password"
            />
        </el-form-item>

        <div class="code-container">
            <el-form-item class="code-input" prop="captcha" required>
                <el-input v-model="emailRegisterData.captcha"
                          :prefix-icon="Check"
                          autocomplete="off"
                          clearable
                          maxlength="4"
                          placeholder="captcha"
                          show-word-limit
                          type="text"
                />
            </el-form-item>
            <el-button :disabled="disableSendButton" :loading="loading" @click="sendVerificationCode">{{ sendButtonText }}</el-button>
        </div>

        <el-form-item class="agreement" prop="agreement" required>
            <el-checkbox v-model="emailRegisterData.agreement">
                <p>I agree to the <a href="javascript:">Terms and Conditions</a></p>
            </el-checkbox>
        </el-form-item>

        <el-form-item class="register-buttons">
            <el-button type="primary" native-type="submit" @click="submitForm(emailRegisterRef)">Submit</el-button>
            <el-button @click="resetForm(emailRegisterRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 30px;
}

.code-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .code-input {
        margin-bottom: 0;
        margin-right: 20px;
    }
}

.el-checkbox {
    a {
        color: inherit;
        text-decoration: underline;
    }
}

.register-buttons {
    margin-bottom: 18px;

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>
