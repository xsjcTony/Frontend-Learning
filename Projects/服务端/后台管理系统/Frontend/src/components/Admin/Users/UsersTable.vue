<script lang="ts" setup>
import {
  EditPen,
  Delete,
  Setting,
  User,
  Lock,
  Message,
  InfoFilled,
  Plus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { $, $ref } from 'vue/macros'
import {
  deleteUser as destroyUser,
  getRolesByQuery,
  getUsersByQuery,
  updateUser,
  updateUserState,
  assignRoles as assignRolesAPI,
  getUserById
} from '../../../api'
import { useStore } from '../../../stores'
import { useUserStore } from '../../../stores/userStore'
import type {
  FormInstance,
  UserQueryData,
  StringResponseData,
  User as UserData,
  UserManagementEditUserData,
  AssignRolesData,
  Role
} from '../../../types'
import type { AxiosError, AxiosResponse } from 'axios'
import type { UploadFile, UploadRawFile } from 'element-plus'
import type { Awaitable } from 'element-plus/es/utils'


/**
 * Global Constants
 */
const mainStore = useStore()
let { currentUser, assetBaseUrl, apiBaseUrl } = $(storeToRefs(mainStore))
const userStore = useUserStore()
let { tableData, queryData, totalUserCounts } = $(storeToRefs(userStore))
const jwt = localStorage.getItem('token') ?? ''


/**
 * Table
 */
const tableRowClassName = ({ row }: { row: UserData }): string => {
  if (row.id === currentUser?.id) return 'current-user-row'
  return ''
}

const queryUsers = async (queryData: UserQueryData): Promise<void> => {
  try {
    const response = await getUsersByQuery(queryData)

    const users: UserData[] = response.data.data.rows
    totalUserCounts = response.data.data.count
    tableData = users
  } catch (err) {
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 2000
    })
  }
}

void queryUsers(queryData)

const refreshUsers = async (): Promise<void> => {
  queryData.role = ''
  queryData.origin = ''
  queryData.type = ''
  queryData.keyword = ''

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryUsers(queryData)
  }

  ElMessage.success({
    message: 'Refresh success',
    center: true,
    showClose: true,
    duration: 2000
  })
}


/**
 * Edit User
 */
let editUserDialogVisible = $ref<boolean>(false)
const editUserFormRef = $ref<FormInstance | null>(null)
const editUserData = $ref<UserManagementEditUserData>({
  id: -1,
  username: '',
  email: null,
  password: undefined,
  confirmPassword: undefined,
  avatarUrl: '/public/assets/images/avatars/avatar.jpg'
})

const showEditUserDialog = (user: UserData): void => {
  editUserDialogVisible = true
  editUserData.id = user.id
  editUserData.username = user.username ?? ''
  editUserData.email = user.email
  editUserData.password = undefined
  editUserData.confirmPassword = undefined
  editUserData.avatarUrl = user.avatarUrl
}

const editUser = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return
  if (!editUserData.id) return

  const id = editUserData.id

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const response: AxiosResponse = await updateUser(id, editUserData)

        ElMessage.success({
          message: response.data.msg || 'Success',
          center: true,
          showClose: true,
          duration: 3000
        })

        const newUser = response.data.data
        tableData[tableData.findIndex(user => user.id === id)] = newUser
        if (id === currentUser?.id) {
          currentUser = newUser
        }

        editUserDialogVisible = false
      } catch (err) {
        ElMessage.error({
          message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
          center: true,
          showClose: true,
          duration: 3000
        })
      }
    } else {
      ElMessage.error({
        message: 'Invalid user data',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

// Validation
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
const validateEmail = (rule: any, value: string | null, callback: any): void => {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value && !regex.test(value)) {
    callback(new Error('Invalid email address'))
  } else {
    callback()
  }
}
const validateEditUserPassword = (rule: any, value: string | undefined, callback: any): void => {
  const regex = /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/
  if (value && !regex.test(value)) {
    callback(new Error('Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.'))
  } else {
    if (editUserData.confirmPassword !== '') {
      if (!editUserFormRef) return
      void editUserFormRef.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validateEditUserConfirmPassword = (rule: any, value: string | undefined, callback: any): void => {
  if (value && value !== editUserData.password) {
    callback(new Error('Password doesn\'t match'))
  } else {
    callback()
  }
}

const editUserRules = $ref({
  username: { validator: validateUsername },
  email: { validator: validateEmail },
  password: { validator: validateEditUserPassword },
  confirmPassword: { validator: validateEditUserConfirmPassword }
})

// Avatar
const handleAvatarSuccess = (response: StringResponseData, file: UploadFile): void => {
  if (response.code === 200) {
    editUserData.avatarUrl = response.data
    ElMessage.success({
      message: typeof response.msg === 'string' ? response.msg : 'Avatar has been uploaded',
      center: true,
      showClose: true,
      duration: 3000
    })
  } else {
    ElMessage.error({
      message: typeof response.msg === 'string' ? response.msg : 'Error',
      center: true,
      showClose: true,
      duration: 5000
    })
  }
}
const beforeAvatarUpload = (file: UploadRawFile): Awaitable<Blob | File | boolean | null | undefined> => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error({
      message: 'Avatar picture must be "image/jpeg" format',
      center: true,
      showClose: true,
      duration: 5000
    })
  }
  if (!isLt2M) {
    ElMessage.error({
      message: 'Avatar picture size can not exceed 2MB',
      center: true,
      showClose: true,
      duration: 5000
    })
  }

  return isJPG && isLt2M
}

// User State
const changeUserState = async (user: UserData): Promise<void> => {
  let { id, userState } = $(user)

  try {
    await updateUserState(id, userState)

    ElMessage.success({
      message: 'User state has been updated',
      center: true,
      showClose: true,
      duration: 2000
    })
  } catch (err) {
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 3000
    })

    userState = !userState
  }
}


/**
 * Delete User
 */
const deleteUser = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse = await destroyUser(id)

    ElMessage.success({
      message: response.data.msg || 'Success',
      center: true,
      showClose: true,
      duration: 3000
    })

    tableData.splice(tableData.findIndex(user => user.id === id), 1)
  } catch (err) {
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 3000
    })
  }
}


/**
 * Pagination
 */
watch(() => queryData.currentPageNumber, async (newValue, oldValue) => {
  await queryUsers(queryData)
})
watch(() => queryData.pageSize, async (newValue, oldValue) => {
  sessionStorage.setItem('userTablePageSize', newValue?.toString() ?? '10')

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryUsers(queryData)
  }
})


/**
 * Assign Roles
 */
let assignRolesDialogVisible = $ref<boolean>(false)

let availableRoles = $ref<Role[]>([])
getRolesByQuery({ keyword: '' })
  .then(res => void (availableRoles = res.data.data.rows))
  .catch((err) => {
    ElMessage.error({
      message: 'Failed to fetch roles',
      center: true,
      showClose: true,
      duration: 3000
    })

    console.error('Failed to fetch roles: ', err)
  })

const assignRolesFormRef = $ref<FormInstance | null>(null)
const assignRolesData = $ref<AssignRolesData>({
  id: 0,
  username: '',
  assignedRoles: []
})

const showAssignRolesDialog = async (user: UserData): Promise<void> => {
  assignRolesDialogVisible = true
  assignRolesData.id = user.id
  assignRolesData.username = user.username ?? user.email ?? `User ID: ${ user.id }`
  assignRolesData.assignedRoles = user.roles.map((role: Role) => role.id)
}

const assignRoles = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await assignRolesAPI({
      userId: assignRolesData.id,
      roleIds: assignRolesData.assignedRoles
    })

    const newUser: UserData = (await getUserById(assignRolesData.id)).data.data

    ElMessage.success({
      message: response.data.msg || 'Success',
      center: true,
      showClose: true,
      duration: 3000
    })

    tableData[tableData.findIndex(user => user.id === assignRolesData.id)] = newUser
    if (assignRolesData.id === currentUser?.id) {
      currentUser = newUser
    }

    assignRolesDialogVisible = false
  } catch (err) {
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 3000
    })
  }
}
</script>

<template>
    <div class="table-row-indicators">
        <el-tag color="#e1f3d8" size="large" type="success">You</el-tag>
        <el-button color="#ffc0cb" @click="refreshUsers">Clear query conditions and Refresh</el-button>
    </div>

    <!-- S Table -->
    <el-table :data="tableData"
              :row-class-name="tableRowClassName"
              border
              stripe
    >
        <el-table-column type="index"/>
        <el-table-column label="Username" min-width="200" prop="username"/>
        <el-table-column label="E-mail" min-width="200" prop="email"/>
        <el-table-column class-name="user-roles" label="Role" min-width="200">
            <template #default="{ row }">
                <el-tag v-for="role in row.roles" :key="role.id" effect="plain">
                    {{ role.roleName }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="State" width="70">
            <template #default="{ row }">
                <el-switch v-if="row.id !== currentUser.id"
                           v-model="row.userState"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           @change="changeUserState(row)"
                />
            </template>
        </el-table-column>
        <el-table-column label="Actions" width="220">
            <template #header>
                <el-tag>Edit</el-tag>
                <el-tag type="warning">Assign roles</el-tag>
                <el-tag type="danger">Delete</el-tag>
            </template>
            <template #default="{ row }">
                <el-button :icon="EditPen" type="primary" @click="showEditUserDialog(row)"/>
                <el-button :icon="Setting" type="warning" @click="showAssignRolesDialog(row)"/>
                <el-popconfirm v-if="row.id !== currentUser.id"
                               :icon="InfoFilled"
                               cancel-button-text="Cancel"
                               confirm-button-text="Delete"
                               confirm-button-type="danger"
                               icon-color="#f00"
                               title="Are you sure to delete this user?"
                               @confirm="deleteUser(row.id)"
                >
                    <template #reference>
                        <el-button :icon="Delete" type="danger"/>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- E Table -->

    <!-- S Pagination -->
    <el-pagination v-model:currentPage="queryData.currentPageNumber"
                   v-model:page-size="queryData.pageSize"
                   :page-sizes="[10, 20, 30, 50]"
                   :total="totalUserCounts"
                   layout="->, total, sizes, prev, pager, next, jumper"
    />
    <!-- E Pagination -->

    <!-- S Edit user dialog -->
    <el-dialog v-model="editUserDialogVisible"
               custom-class="user-management-edit-user-dialog"
               title="Edit User"
    >
        <el-form ref="editUserFormRef"
                 :model="editUserData"
                 :rules="editUserRules"
                 label-position="top"
        >
            <el-form-item class="username" prop="username" required>
                <el-input v-model="editUserData.username"
                          :prefix-icon="User"
                          clearable
                          maxlength="20"
                          placeholder="Username"
                          show-word-limit
                          type="text"
                />
            </el-form-item>
            <el-form-item class="email" prop="email">
                <el-input :model-value="editUserData.email"
                          :prefix-icon="Message"
                          clearable
                          placeholder="E-mail (Optional)"
                          type="text"
                          @input="value => void (editUserData.email = value ? value : null)"
                />
            </el-form-item>
            <el-form-item class="password" prop="password">
                <el-input :model-value="editUserData.password"
                          :prefix-icon="Lock"
                          autocomplete="off"
                          clearable
                          maxlength="20"
                          placeholder="Password (Leave blank if no change)"
                          show-password
                          type="password"
                          @input="value => void (editUserData.password = value ? value : undefined)"
                />
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input :model-value="editUserData.confirmPassword"
                          :prefix-icon="Lock"
                          autocomplete="off"
                          clearable
                          maxlength="20"
                          placeholder="Confirm password (Leave blank if no change)"
                          show-password
                          type="password"
                          @input="value => void (editUserData.confirmPassword = value ? value : undefined)"
                />
            </el-form-item>
            <el-form-item label="Avatar">
                <el-upload :action="`${ apiBaseUrl }/api/v1/upload-user-avatar`"
                           :before-upload="beforeAvatarUpload"
                           :headers="{ Authorization: jwt }"
                           :on-success="handleAvatarSuccess"
                           :show-file-list="false"
                           accept="image/jpeg"
                           class="avatar-uploader"
                >
                    <img v-if="editUserData.avatarUrl"
                         :src="`${ assetBaseUrl }${ editUserData.avatarUrl }`"
                         alt
                         class="avatar"
                    >
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- /Add user form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editUserDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editUser(editUserFormRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Edit user dialog -->

    <!-- S Assign roles dialog -->
    <el-dialog v-model="assignRolesDialogVisible"
               custom-class="user-management-assign-roles-dialog"
               title="Assign Roles"
    >
        <el-form ref="assignRolesFormRef" :model="assignRolesData" label-width="auto">
            <el-form-item label="Username" prop="username">
                <el-input v-model="assignRolesData.username"
                          disabled
                          placeholder="Username"
                          type="text"
                />
            </el-form-item>
            <el-form-item label="Role" prop="role">
                <el-select v-model="assignRolesData.assignedRoles" multiple placeholder="Roles">
                    <el-option v-for="role in availableRoles"
                               :key="role.id"
                               :label="role.roleName"
                               :value="role.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <!-- /Assign roles form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="assignRolesDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="assignRoles">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Assign roles dialog -->
</template>

<style lang="scss" scoped>
.table-row-indicators {
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    padding-top: 20px;
    border-top: 1px solid #cccccc80;

    .el-tag {
        user-select: none;
    }

    .el-button {
        color: #fff;
    }
}

.el-table {
    margin: 20px 0 30px;

    th {
        .el-tag + .el-tag {
            margin-left: 5px;
        }
    }

    :deep(.current-user-row) {
        & > td {
            background: #e1f3d8 !important;
        }
    }

    :deep(.user-roles) {
        & > .cell {
            display: flex;
            flex-wrap: wrap;
            gap: 5px
        }
    }
}

.avatar-uploader {
    :deep(.el-upload) {
        position: relative;
        overflow: hidden;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        transition: var(--el-transition-duration-fast);

        &:hover {
            border-color: var(--el-color-primary);
        }
    }

    .avatar-uploader-icon {
        width: 178px;
        height: 178px;
        color: #8c939d;
        font-size: 28px;
        text-align: center;
    }

    .avatar {
        display: block;
        width: 178px;
        height: 178px;
    }
}
</style>

<style lang="scss">
.user-management-edit-user-dialog {
    min-width: 630px;
}

.user-management-assign-roles-dialog {
    min-width: 500px;

    .el-select {
        width: 100%;
    }
}
</style>
