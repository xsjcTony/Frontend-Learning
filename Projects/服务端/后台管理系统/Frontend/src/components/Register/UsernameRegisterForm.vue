<script lang="ts" setup>
import { User, Lock, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { $ref } from 'vue/macros'
import { registerUser } from '../../api'
import { RegisterType } from '../../types'
import type { FormInstance } from '../../types'
import type { AxiosError } from 'axios'


const router = useRouter()

/**
 * Register Form
 */
const usernameRegisterRef = $ref<FormInstance | null>(null)

const usernameRegisterData = $ref({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  registerType: RegisterType.Normal,
  agreement: false
})

const validateUsername = (rule: any, value: string, callback: any): void => {
  const regex = /^[A-Za-z0-9]{6,20}$/
  if (value === '') {
    callback(new Error('Please input the username'))
  } else if (!regex.test(value)) {
    callback(new Error('Username must be any of a-z, A-Z or 0-9, and between 6 and 20 (both inclusive) characters long'))
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
    if (usernameRegisterData.confirmPassword !== '') {
      if (!usernameRegisterRef) return
      void usernameRegisterRef.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validateConfirmPassword = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== usernameRegisterData.password) {
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

const usernameRegisterRules = $ref({
  username: { validator: validateUsername },
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
        await registerUser(usernameRegisterData)
        await router.push('/login')
      } catch (err) {
        // Error
        ElMessage.error({
          message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
          center: true,
          showClose: true,
          duration: 3000
        })
        refreshCaptcha()
      }
    } else {
      ElMessage.error({
        message: 'Invalid registration data',
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
  refreshCaptcha()
}


/**
 * Captcha
 */
const captcha = $ref<HTMLImageElement | null>(null)

const refreshCaptcha = (): void => {
  if (!captcha) return
  captcha.src = `http://127.0.0.1:7001/captcha?t=${ new Date().getTime() }`
}
</script>

<template>
    <el-form ref="usernameRegisterRef"
             :model="usernameRegisterData"
             :rules="usernameRegisterRules"
             class="username-register-form"
             @submit.prevent
    >
        <el-form-item class="username" prop="username" required>
            <el-input v-model="usernameRegisterData.username"
                      :prefix-icon="User"
                      autofocus
                      clearable
                      maxlength="20"
                      placeholder="Username"
                      show-word-limit
                      type="text"
            />
        </el-form-item>
        <el-form-item class="password" prop="password" required>
            <el-input v-model="usernameRegisterData.password"
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
            <el-input v-model="usernameRegisterData.confirmPassword"
                      :prefix-icon="Lock"
                      autocomplete="off"
                      clearable
                      maxlength="20"
                      placeholder="Confirm password"
                      show-password
                      type="password"
            />
        </el-form-item>

        <div class="captcha-container">
            <el-form-item class="captcha-input" prop="captcha" required>
                <el-input v-model="usernameRegisterData.captcha"
                          :prefix-icon="Check"
                          autocomplete="off"
                          clearable
                          maxlength="4"
                          placeholder="captcha"
                          show-word-limit
                          type="text"
                />
            </el-form-item>
            <img ref="captcha"
                 alt
                 class="captcha-image"
                 src="http://127.0.0.1:7001/captcha"
                 @click="refreshCaptcha"
            >
        </div>

        <el-form-item class="agreement" prop="agreement" required>
            <el-checkbox v-model="usernameRegisterData.agreement">
                <p>I agree to the <a href="javascript:">Terms and Conditions</a></p>
            </el-checkbox>
        </el-form-item>

        <el-form-item class="register-buttons">
            <el-button type="primary" native-type="submit" @click="submitForm(usernameRegisterRef)">Submit</el-button>
            <el-button @click="resetForm(usernameRegisterRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
.username,
.password,
.agreement {
    margin-bottom: 30px;
}

.captcha-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .captcha-input {
        margin-bottom: 0;
        margin-right: 20px;
    }

    .captcha-image {
        cursor: pointer;
        width: 160px;
        height: 60px;
    }
}

.el-checkbox {
    a {
        color: inherit;
        text-decoration: underline;
    }
}

.register-buttons {
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>
