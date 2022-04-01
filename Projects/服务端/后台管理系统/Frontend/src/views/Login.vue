<script lang="ts" setup>
import { User, Lock, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useRouter } from 'vue-router'
import { $ref } from 'vue/macros'
import { getUserById, loginUser } from '../api'
import { useStore } from '../stores'
import { buildPrivilegeTree } from '../utils'
import type { FormInstance, LoginData, JwtUserResponseData, Privilege, User as UserData } from '../types'
import type { AxiosError } from 'axios'


/**
 * Global Constants
 */
const router = useRouter()
const mainStore = useStore()


/**
 * Register Form
 */
const loginRef = $ref<FormInstance | null>(null)

const loginData: LoginData = $ref({
  username: '',
  password: '',
  captcha: ''
})

const validateUsername = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('Please input the username or email'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('Please input the password'))
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

const usernameRegisterRules = $ref({
  username: { validator: validateUsername },
  password: { validator: validatePassword },
  captcha: { validator: validateCaptcha }
})

const submitForm = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // Succeed
        const data: JwtUserResponseData = await loginUser(loginData)
        localStorage.setItem('token', data.data.token) // JWT Token

        // Create privilege tree
        const id = data.data.id
        const user: UserData = (await getUserById(id)).data.data

        const privileges: Privilege[] = []
        const addedPrivilegeIds: number[] = []
        for (const role of user.roles) {
          for (const privilege of role.privileges) {
            if (!addedPrivilegeIds.includes(privilege.id)) {
              addedPrivilegeIds.push(privilege.id)
              privileges.push(privilege)
            }
          }
        }
        user.privilegeTree = buildPrivilegeTree(privileges)

        mainStore.loggedIn = true // Pinia
        mainStore.currentUser = user
        await router.push('/admin')
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
        message: 'Invalid login data',
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
    <div class="login-container">
        <div class="login-wrapper">
            <h1>Login</h1>
            <el-form ref="loginRef"
                     :model="loginData"
                     :rules="usernameRegisterRules"
                     @submit.prevent
            >
                <el-form-item class="username" prop="username" required>
                    <el-input v-model.number="loginData.username"
                              :prefix-icon="User"
                              autofocus
                              clearable
                              placeholder="Username / E-mail"
                              type="text"
                    />
                </el-form-item>
                <el-form-item class="password" prop="password" required>
                    <el-input v-model="loginData.password"
                              :prefix-icon="Lock"
                              autocomplete="off"
                              clearable
                              placeholder="Password"
                              show-password
                              type="password"
                    />
                </el-form-item>
                <div class="captcha-container">
                    <el-form-item class="captcha-input" prop="captcha" required>
                        <el-input v-model="loginData.captcha"
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
                         :src="`http://127.0.0.1:7001/captcha?t=${ new Date().getTime() }`"
                         @click="refreshCaptcha"
                    >
                </div>
                <el-form-item class="register-buttons">
                    <el-button native-type="submit" type="primary" @click="submitForm(loginRef)">Login</el-button>
                    <el-button @click="resetForm(loginRef)">Reset</el-button>
                </el-form-item>
            </el-form>
            <p class="separate-line-with-text">Third Party Login</p>
            <ul class="third-party-login">
                <li>
                    <a href="http://127.0.0.1:7001/github">
                        <svg class="icon">
                            <use role="button" xlink:href="#icon-github"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background: url('/src/assets/images/bg.jpg') center center / cover no-repeat;

    .login-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 350px;
        padding: 0 20px;
        border-radius: 10px;
        background: #fff;
        transform: translate(-50%, -50%);

        & > h1 {
            font-size: 30px;
            text-align: center;
        }

        .captcha-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;

            .captcha-input {
                margin-right: 20px;
                margin-bottom: 0;
            }

            .captcha-image {
                width: 160px;
                height: 60px;
                cursor: pointer;
            }
        }

        .register-buttons {
            margin-bottom: 25px;

            :deep(.el-form-item__content) {
                justify-content: center;
            }
        }

        .separate-line-with-text {
            display: flex;
            color: #ccc;
            font-size: 15px;

            &::before,
            &::after {
                flex: 1;
                margin: auto 0;
                border-bottom: 1px solid #ccc;
                content: '';
            }

            &::before {
                margin-right: 10px;
            }

            &::after {
                margin-left: 10px;
            }
        }

        .third-party-login {
            display: flex;
            justify-content: center;
            position: relative;
            padding: 20px 0;
            list-style: none;

            & > li {
                padding: 0 30px;
                font-size: 35px;
            }
        }
    }
}
</style>
