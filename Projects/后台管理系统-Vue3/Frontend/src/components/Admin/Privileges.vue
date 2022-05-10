<script lang="ts" setup>
import {
  ArrowRight,
  EditPen,
  Delete,
  WarningFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus/es'
import { watch } from 'vue'
import { $, $ref } from 'vue/macros'
import {
  createPrivilege,
  deletePrivilege as destroyPrivilege,
  getPrivilegesByQuery,
  updatePrivilege,
  updatePrivilegeState
} from '../../api'
import { groupPrivilegesByTypeAndLevel } from '../../utils'
import type {
  PermissionManagementAddPrivilegeData,
  Privilege,
  PrivilegeQueryData,
  FormInstance, GroupedPrivilegeSet, PermissionManagementEditPrivilegeData
} from '../../types'
import type { AxiosResponse, AxiosError } from 'axios'


/**
 * Header (Breadcrumb)
 */
const emit = defineEmits<(e: 'resetDefaultActiveMenuItem') => void>()


/**
 * Query
 */
const queryData = $ref<PrivilegeQueryData>({
  type: '',
  keyword: '',
  currentPageNumber: 1,
  pageSize: parseInt(sessionStorage.getItem('privilegeTablePageSize') ?? '10') || 10
})

const queryPrivileges = async (queryData: PrivilegeQueryData): Promise<void> => {
  try {
    const response = await getPrivilegesByQuery(queryData)

    const privileges: Privilege[] = response.data.data.rows
    totalPrivilegeCounts = response.data.data.count
    tableData = privileges
  } catch (err) {
    ElMessage.error({
      message: (err as AxiosError).response?.data.msg || (err instanceof Error ? err.message : (err as any).message || 'Error'),
      center: true,
      showClose: true,
      duration: 2000
    })
  }
}

const query = async (): Promise<void> => {
  if (!queryData.keyword) {
    ElMessage.error({
      message: 'Provide keyword to query for privileges',
      center: true,
      showClose: true,
      duration: 3000
    })

    return
  }

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryPrivileges(queryData)
  }

  ElMessage.success({
    message: 'Query success',
    center: true,
    showClose: true,
    duration: 2000
  })
}

const refreshPrivileges = async (): Promise<void> => {
  queryData.type = ''
  queryData.keyword = ''

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryPrivileges(queryData)
  }

  ElMessage.success({
    message: 'Refresh success',
    center: true,
    showClose: true,
    duration: 2000
  })
}

const queryByType = async (): Promise<void> => {
  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryPrivileges(queryData)
  }
}


/**
 * Add Role
 */
let addPrivilegeDialogVisible = $ref<boolean>(false)
const addPrivilegeFormRef = $ref<FormInstance | null>(null)
const addPrivilegeData = $ref<PermissionManagementAddPrivilegeData>({
  privilegeName: '',
  privilegeDescription: '',
  type: 'menu',
  privilegeUrl: null,
  requestMethod: null,
  parentId: null,
  level: 1
})

const addPrivilege = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const response: AxiosResponse = await createPrivilege(addPrivilegeData)

        ElMessage.success({
          message: response.data.msg || 'Success',
          center: true,
          showClose: true,
          duration: 3000
        })

        addPrivilegeDialogVisible = false

        tableData.push(response.data.data)
        await refreshAvailablePrivileges()
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
        message: 'Invalid privilege data',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

// Validation
const validatePrivilegeName = (rule: any, value: string, callback: any): void => {
  if (value.trim() === '') {
    callback(new Error('Please input the privilege name'))
  } else {
    callback()
  }
}
const validatePrivilegeDescription = (rule: any, value: string, callback: any): void => {
  if (value.trim() === '') {
    callback(new Error('Please input the privilege description'))
  } else {
    callback()
  }
}
const validatePrivilegeUrl = (rule: any, value: string, callback: any): void => {
  const regex = /^\/\S*$/
  if (value.trim() === '') {
    callback(new Error('Please input the privilege URL'))
  } else if (!regex.test(value)) {
    callback(new Error('URL must start with "/" and no whitespace within'))
  } else {
    callback()
  }
}
const validateRequestMethod = (rule: any, value: string | null, callback: any): void => {
  if (!value) {
    callback(new Error('Please select the request method'))
  } else {
    callback()
  }
}
const validateParentId = (rule: any, value: string | null, callback: any): void => {
  if (!value) {
    callback(new Error('Please select the parent privilege'))
  } else {
    callback()
  }
}

const privilegeRules = $ref({
  privilegeName: { validator: validatePrivilegeName },
  privilegeDescription: { validator: validatePrivilegeDescription },
  privilegeUrl: { validator: validatePrivilegeUrl },
  requestMethod: { validator: validateRequestMethod },
  parentId: { validator: validateParentId }
})

const resetAddPrivilegeForm = (): void => {
  addPrivilegeData.privilegeName = ''
  addPrivilegeData.privilegeDescription = ''
  addPrivilegeData.type = 'menu'
  addPrivilegeData.privilegeUrl = null
  addPrivilegeData.requestMethod = null
  addPrivilegeData.parentId = null
  addPrivilegeData.level = 1
}

// Available Privileges
let availablePrivileges = $ref<GroupedPrivilegeSet>(undefined)
const refreshAvailablePrivileges = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await getPrivilegesByQuery({ type: '', keyword: '' })
    availablePrivileges = groupPrivilegesByTypeAndLevel(response.data.data.rows)
  } catch (err) {
    ElMessage.error({
      message: 'Failed to fetch privileges',
      center: true,
      showClose: true,
      duration: 3000
    })

    console.error('Failed to fetch privileges: ', err)
  }
}
void refreshAvailablePrivileges()


/**
 * Table
 */
let tableData = $ref<Privilege[]>([])

void queryPrivileges(queryData)


/**
 * Pagination
 */
let totalPrivilegeCounts = $ref<number>(0)

watch(() => queryData.currentPageNumber, async (newValue, oldValue) => {
  await queryPrivileges(queryData)
})
watch(() => queryData.pageSize, async (newValue, oldValue) => {
  sessionStorage.setItem('privilegeTablePageSize', newValue?.toString() ?? '10')

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryPrivileges(queryData)
  }
})


/**
 * Edit Privilege
 */
let editPrivilegeDialogVisible = $ref<boolean>(false)
const editPrivilegeFormRef = $ref<FormInstance | null>(null)
const editPrivilegeData = $ref<PermissionManagementEditPrivilegeData>({
  id: 0,
  privilegeName: '',
  privilegeDescription: '',
  type: 'menu',
  privilegeUrl: null,
  requestMethod: null,
  parentId: null,
  level: 1
})

const editPrivilege = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return
  if (!editPrivilegeData.id) return

  const id = editPrivilegeData.id

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const response: AxiosResponse = await updatePrivilege(id, editPrivilegeData)

        ElMessage.success({
          message: response.data.msg || 'Success',
          center: true,
          showClose: true,
          duration: 3000
        })

        editPrivilegeDialogVisible = false

        tableData[tableData.findIndex(privilege => privilege.id === id)] = response.data.data
        await refreshAvailablePrivileges()
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
        message: 'Invalid privilege data',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

const showEditPrivilegeDialog = (privilege: Privilege): void => {
  editPrivilegeDialogVisible = true
  editPrivilegeData.id = privilege.id
  editPrivilegeData.privilegeName = privilege.privilegeName
  editPrivilegeData.privilegeDescription = privilege.privilegeDescription
  editPrivilegeData.type = privilege.type
  editPrivilegeData.privilegeUrl = privilege.privilegeUrl
  editPrivilegeData.requestMethod = privilege.requestMethod
  editPrivilegeData.parentId = privilege.parentId
  editPrivilegeData.level = privilege.level
}

const resetEditPrivilegeForm = (): void => {
  editPrivilegeData.privilegeName = ''
  editPrivilegeData.privilegeDescription = ''
  editPrivilegeData.type = 'menu'
  editPrivilegeData.privilegeUrl = null
  editPrivilegeData.requestMethod = null
  editPrivilegeData.parentId = null
  editPrivilegeData.level = 1
}


/**
 * Change Privilege State
 */
const changePrivilegeState = async (privilege: Privilege): Promise<void> => {
  let { id, privilegeState } = $(privilege)

  try {
    await updatePrivilegeState(id, privilegeState)

    ElMessage.success({
      message: 'Privilege state has been updated',
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

    privilegeState = !privilegeState
  }
}


/**
 * Delete Privilege
 */
const deletePrivilege = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse = await destroyPrivilege(id)

    ElMessage.success({
      message: response.data.msg || 'Success',
      center: true,
      showClose: true,
      duration: 3000
    })

    tableData.splice(tableData.findIndex(privilege => privilege.id === id), 1)
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
    <!-- S Breadcrumb -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>
            <a href="/admin" @click="emit('resetDefaultActiveMenuItem')">Home Page</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>Permission Management</el-breadcrumb-item>
        <el-breadcrumb-item>Privilege List</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- E Breadcrumb -->

    <!-- S Main -->
    <el-card>
        <div class="query-form">
            <el-select v-model="queryData.type"
                       clearable
                       placeholder="- All privileges -"
                       @change="queryByType"
            >
                <el-option label="Menu privileges" value="menu"/>
                <el-option label="Route privileges" value="route"/>
                <el-option label="Request privileges" value="request"/>
            </el-select>
            <el-input v-model="queryData.keyword"
                      clearable
                      placeholder="Keyword"
                      type="text"
            />
            <el-button type="primary" @click="query">Query</el-button>
            <el-button type="primary" @click="addPrivilegeDialogVisible = true">Add Privilege</el-button>
            <el-button class="refresh-button" color="#ffc0cb" @click="refreshPrivileges">Clear query conditions and Refresh</el-button>
        </div>
        <!-- /Top bar -->

        <el-table :data="tableData" border stripe>
            <el-table-column type="index"/>
            <el-table-column label="Privilege" prop="privilegeName" width="250"/>
            <el-table-column label="Description" min-width="300" prop="privilegeDescription"/>
            <el-table-column label="Level" prop="level" width="90">
                <template #default="{ row: { level } }">
                    <el-tag v-if="level === 1" type="danger">Level {{ level }}</el-tag>
                    <el-tag v-else-if="level === 2" type="warning">Level {{ level }}</el-tag>
                    <el-tag v-else-if="level === 3" type="success">Level {{ level }}</el-tag>
                    <el-tag v-else type="primary">Level {{ level }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="State" width="70">
                <template #default="{ row }">
                    <el-switch v-model="row.privilegeState"
                               active-color="#13ce66"
                               inactive-color="#ff4949"
                               @change="changePrivilegeState(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="130">
                <template #header>
                    <el-tag>Edit</el-tag>
                    <el-tag type="danger">Delete</el-tag>
                </template>
                <template #default="{ row }">
                    <el-button :icon="EditPen" type="primary" @click="showEditPrivilegeDialog(row)"/>
                    <el-popconfirm :icon="WarningFilled"
                                   cancel-button-text="Cancel"
                                   confirm-button-text="Delete"
                                   confirm-button-type="danger"
                                   icon-color="#f00"
                                   title="Are you sure to delete this privilege?"
                                   @confirm="deletePrivilege(row.id)"
                    >
                        <template #reference>
                            <el-button :icon="Delete" type="danger"/>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- /Main table -->

        <el-pagination v-model:currentPage="queryData.currentPageNumber"
                       v-model:page-size="queryData.pageSize"
                       :page-sizes="[10, 20, 30, 50]"
                       :total="totalPrivilegeCounts"
                       layout="->, total, sizes, prev, pager, next, jumper"
        />
        <!-- /Pagination -->
    </el-card>
    <!-- E Main -->

    <!-- S Add privilege dialog -->
    <el-dialog v-model="addPrivilegeDialogVisible"
               custom-class="permission-management-add-privilege-dialog"
               title="Add Privilege"
               @close="resetAddPrivilegeForm"
    >
        <el-form ref="addPrivilegeFormRef"
                 :model="addPrivilegeData"
                 :rules="privilegeRules"
                 label-width="130px"
        >
            <el-form-item label="Type" prop="type" required>
                <el-select v-model="addPrivilegeData.type"
                           @change="val => {
                               addPrivilegeData.requestMethod = val !== 'request' ?
                                   null :
                                   addPrivilegeData.level === 3 ?
                                       null :
                                       'all'
                           }"
                >
                    <el-option label="Menu" value="menu"/>
                    <el-option label="Route" value="route"/>
                    <el-option label="Request" value="request"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Level" prop="level" required>
                <el-select v-model="addPrivilegeData.level"
                           @change="val => {
                               addPrivilegeData.privilegeUrl = val === 3 ? '' : null
                               addPrivilegeData.parentId = null
                               addPrivilegeData.requestMethod = addPrivilegeData.type !== 'request' ?
                                   null :
                                   val === 3 ? null : 'all'
                           }"
                >
                    <el-option :value="1" label="Level 1"/>
                    <el-option :value="2" label="Level 2"/>
                    <el-option :value="3" label="Level 3"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Name" prop="privilegeName" required>
                <el-input v-model="addPrivilegeData.privilegeName"
                          clearable
                          placeholder="Name"
                          type="text"
                />
            </el-form-item>
            <el-form-item label="Description" prop="privilegeDescription" required>
                <el-input v-model="addPrivilegeData.privilegeDescription"
                          clearable
                          placeholder="Description"
                          type="text"
                />
            </el-form-item>
            <el-form-item v-if="addPrivilegeData.type === 'request'"
                          label="Request method"
                          prop="requestMethod"
                          required
            >
                <el-select v-if="addPrivilegeData.level !== 3" v-model="addPrivilegeData.requestMethod">
                    <el-option label="All methods" value="all"/>
                </el-select>
                <el-select v-else v-model="addPrivilegeData.requestMethod">
                    <el-option label="GET" value="get"/>
                    <el-option label="POST" value="post"/>
                    <el-option label="PUT" value="put"/>
                    <el-option label="DELETE" value="delete"/>
                </el-select>
            </el-form-item>
            <el-form-item v-if="addPrivilegeData.level === 3"
                          label="URL"
                          prop="privilegeUrl"
                          required
            >
                <el-input v-model="addPrivilegeData.privilegeUrl"
                          clearable
                          placeholder="URL"
                          type="text"
                />
            </el-form-item>
            <el-form-item v-if="addPrivilegeData.level !== 1"
                          label="Parent privilege"
                          prop="parentId"
                          required
            >
                <el-select v-model="addPrivilegeData.parentId" class="parent-privilege">
                    <el-option v-for="privilege in availablePrivileges[addPrivilegeData.type][addPrivilegeData.level - 1]"
                               :key="privilege.id"
                               :label="privilege.privilegeName"
                               :value="privilege.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <!-- /Add privilege form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetAddPrivilegeForm">Reset Form</el-button>
                <el-button @click="addPrivilegeDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addPrivilege(addPrivilegeFormRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Add privilege dialog -->

    <!-- S Edit privilege dialog -->
    <el-dialog v-model="editPrivilegeDialogVisible"
               custom-class="permission-management-edit-privilege-dialog"
               title="Edit Privilege"
    >
        <el-form ref="editPrivilegeFormRef"
                 :model="editPrivilegeData"
                 :rules="privilegeRules"
                 label-width="130px"
        >
            <el-form-item label="Type" prop="type" required>
                <el-select v-model="editPrivilegeData.type"
                           @change="val => {
                               editPrivilegeData.requestMethod = val !== 'request' ?
                                   null :
                                   editPrivilegeData.level === 3 ?
                                       null :
                                       'all'
                           }"
                >
                    <el-option label="Menu" value="menu"/>
                    <el-option label="Route" value="route"/>
                    <el-option label="Request" value="request"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Level" prop="level" required>
                <el-select v-model="editPrivilegeData.level"
                           @change="val => {
                               editPrivilegeData.privilegeUrl = val === 3 ? '' : null
                               editPrivilegeData.parentId = null
                               editPrivilegeData.requestMethod = editPrivilegeData.type !== 'request' ?
                                   null :
                                   val === 3 ? null : 'all'
                           }"
                >
                    <el-option :value="1" label="Level 1"/>
                    <el-option :value="2" label="Level 2"/>
                    <el-option :value="3" label="Level 3"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Name" prop="privilegeName" required>
                <el-input v-model="editPrivilegeData.privilegeName"
                          clearable
                          placeholder="Name"
                          type="text"
                />
            </el-form-item>
            <el-form-item label="Description" prop="privilegeDescription" required>
                <el-input v-model="editPrivilegeData.privilegeDescription"
                          clearable
                          placeholder="Description"
                          type="text"
                />
            </el-form-item>
            <el-form-item v-if="editPrivilegeData.type === 'request'"
                          label="Request method"
                          prop="requestMethod"
                          required
            >
                <el-select v-if="editPrivilegeData.level !== 3" v-model="editPrivilegeData.requestMethod">
                    <el-option label="All methods" value="all"/>
                </el-select>
                <el-select v-else v-model="editPrivilegeData.requestMethod">
                    <el-option label="GET" value="get"/>
                    <el-option label="POST" value="post"/>
                    <el-option label="PUT" value="put"/>
                    <el-option label="DELETE" value="delete"/>
                </el-select>
            </el-form-item>
            <el-form-item v-if="editPrivilegeData.level === 3"
                          label="URL"
                          prop="privilegeUrl"
                          required
            >
                <el-input v-model="editPrivilegeData.privilegeUrl"
                          clearable
                          placeholder="URL"
                          type="text"
                />
            </el-form-item>
            <el-form-item v-if="editPrivilegeData.level !== 1"
                          label="Parent privilege"
                          prop="parentId"
                          required
            >
                <el-select v-model="editPrivilegeData.parentId" class="parent-privilege">
                    <el-option v-for="privilege in availablePrivileges[editPrivilegeData.type][editPrivilegeData.level - 1]"
                               :key="privilege.id"
                               :label="privilege.privilegeName"
                               :value="privilege.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <!-- /Edit privilege form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetEditPrivilegeForm">Reset Form</el-button>
                <el-button @click="editPrivilegeDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editPrivilege(editPrivilegeFormRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Edit privilege dialog -->
</template>

<style lang="scss" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}

.el-card {
    min-width: 940px;

    .query-form {
        display: flex;

        .el-select {
            min-width: 200px;
        }

        .el-input {
            min-width: 200px;
            margin: 0 20px;
        }

        .refresh-button {
            color: #fff;
        }
    }

    .el-table {
        margin: 30px 0;

        th {
            .el-tag + .el-tag {
                margin-left: 5px;
            }
        }
    }
}
</style>

<style lang="scss">
.permission-management-add-privilege-dialog,
.permission-management-edit-privilege-dialog {
    min-width: 400px;

    .parent-privilege {
        width: 100%;
    }
}
</style>
