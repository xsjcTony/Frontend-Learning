<script lang="ts" setup>
import {
  ArrowRight,
  Delete,
  EditPen,
  InfoFilled,
  Setting,
  User,
  WarningFilled
} from '@element-plus/icons-vue'
import { AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { nextTick, watch } from 'vue'
import { $, $ref } from 'vue/macros'
import {
  createRole,
  deleteRole as destroyRole,
  getPrivilegesByQuery,
  getRolesByQuery,
  updateRole,
  updateRoleState,
  assignPrivileges as assignPrivilegesAPI,
  getRoleById
} from '../../api'
import { buildPrivilegeTree } from '../../utils'
import type {
  FormInstance,
  PermissionManagementAddRoleData,
  PermissionManagementEditRoleData,
  Role,
  RoleQueryData,
  AssignPrivilegesData,
  PrivilegeNode,
  TreeInstance
} from '../../types'


/**
 * Header (Breadcrumb)
 */
const emit = defineEmits<(e: 'resetDefaultActiveMenuItem') => void>()


/**
 * Query
 */
const queryData = $ref<RoleQueryData>({
  keyword: '',
  currentPageNumber: 1,
  pageSize: parseInt(sessionStorage.getItem('roleTablePageSize') ?? '5') || 5
})

const queryRoles = async (queryData: RoleQueryData): Promise<void> => {
  try {
    const response = await getRolesByQuery(queryData)

    const roles: Role[] = response.data.data.rows
    totalRoleCounts = response.data.data.count

    roles.forEach(role => void (role.privilegeTree = buildPrivilegeTree(role.privileges)))

    tableData = roles
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
      message: 'Provide keyword to query for users',
      center: true,
      showClose: true,
      duration: 3000
    })

    return
  }

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryRoles(queryData)
  }

  ElMessage.success({
    message: 'Query success',
    center: true,
    showClose: true,
    duration: 2000
  })
}

const refreshRoles = async (): Promise<void> => {
  queryData.keyword = ''

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryRoles(queryData)
  }

  ElMessage.success({
    message: 'Refresh success',
    center: true,
    showClose: true,
    duration: 2000
  })
}


/**
 * Add Role
 */
let addRoleDialogVisible = $ref<boolean>(false)
const addRoleFormRef = $ref<FormInstance | null>(null)
const addRoleData = $ref<PermissionManagementAddRoleData>({
  roleName: '',
  roleDescription: ''
})

const addRole = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const response: AxiosResponse = await createRole(addRoleData)

        ElMessage.success({
          message: response.data.msg || 'Success',
          center: true,
          showClose: true,
          duration: 3000
        })

        addRoleDialogVisible = false
        tableData.push(response.data.data)
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
        message: 'Invalid role data',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

// Validation
const validateRoleName = (rule: any, value: string, callback: any): void => {
  if (value.trim() === '') {
    callback(new Error('Please input the role name'))
  } else {
    callback()
  }
}
const validateRoleDescription = (rule: any, value: string, callback: any): void => {
  if (value.trim() === '') {
    callback(new Error('Please input the role description'))
  } else {
    callback()
  }
}

const addRoleRules = $ref({
  roleName: { validator: validateRoleName },
  roleDescription: { validator: validateRoleDescription }
})

const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.resetFields()
}


/**
 * Table
 */
let tableData = $ref<Role[]>([])

void queryRoles(queryData)


/**
 * Pagination
 */
let totalRoleCounts = $ref<number>(0)

watch(() => queryData.currentPageNumber, async (newValue, oldValue) => {
  await queryRoles(queryData)
})
watch(() => queryData.pageSize, async (newValue, oldValue) => {
  sessionStorage.setItem('roleTablePageSize', newValue?.toString() ?? '5')

  if (queryData.currentPageNumber !== 1) {
    queryData.currentPageNumber = 1
  } else {
    await queryRoles(queryData)
  }
})


/**
 * Edit Role
 */
let editRoleDialogVisible = $ref<boolean>(false)
const editRoleFormRef = $ref<FormInstance | null>(null)
const editRoleData = $ref<PermissionManagementEditRoleData>({
  id: 0,
  roleName: '',
  roleDescription: ''
})

const editRole = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return
  if (!editRoleData.id) return

  const id = editRoleData.id

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const response: AxiosResponse = await updateRole(id, editRoleData)

        ElMessage.success({
          message: response.data.msg || 'Success',
          center: true,
          showClose: true,
          duration: 3000
        })

        tableData[tableData.findIndex(role => role.id === id)] = response.data.data

        editRoleDialogVisible = false
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
        message: 'Invalid role data',
        center: true,
        showClose: true,
        duration: 3000
      })
    }
  })
}

// Validation
const editRoleRules = $ref({
  roleName: { validator: validateRoleName },
  roleDescription: { validator: validateRoleDescription }
})

const showEditRoleDialog = (role: Role): void => {
  editRoleDialogVisible = true
  editRoleData.id = role.id
  editRoleData.roleName = role.roleName
  editRoleData.roleDescription = role.roleDescription
}


/**
 * Change Role State
 */
const changeRoleState = async (role: Role): Promise<void> => {
  let { id, roleState } = $(role)

  try {
    await updateRoleState(id, roleState)

    ElMessage.success({
      message: 'Role state has been updated',
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

    roleState = !roleState
  }
}


/**
 * Delete Role
 */
const deleteRole = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse = await destroyRole(id)

    ElMessage.success({
      message: response.data.msg || 'Success',
      center: true,
      showClose: true,
      duration: 3000
    })

    tableData.splice(tableData.findIndex(role => role.id === id), 1)
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
 * Assign Privileges
 */
let assignPrivilegesDialogVisible = $ref<boolean>(false)

let privilegeTree = $ref<PrivilegeNode[]>(undefined)
const refreshAvailablePrivileges = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await getPrivilegesByQuery({ type: '', keyword: '' })
    privilegeTree = buildPrivilegeTree(response.data.data.rows)
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

const privilegeTreeRef = $ref<TreeInstance | null>(null)
const privilegeTreeProps = {
  children: 'children',
  label: 'privilegeName'
}

const assignPrivilegesFormRef = $ref<FormInstance | null>(null)
const assignPrivilegesData = $ref<AssignPrivilegesData>({
  id: 0,
  roleName: '',
  assignedPrivileges: []
})

const showAssignPrivilegesDialog = async (role: Role): Promise<void> => {
  assignPrivilegesDialogVisible = true
  assignPrivilegesData.id = role.id
  assignPrivilegesData.roleName = role.roleName
  assignPrivilegesData.assignedPrivileges = role.privileges.map(privilege => privilege.id)
  if (!privilegeTreeRef) {
    await nextTick(() => {
      // @ts-expect-error: privilegeTreeRef may be non-null when DOM has been updated
      privilegeTreeRef?.setCheckedKeys([])
      assignPrivilegesData.assignedPrivileges.forEach((id) => {
        // @ts-expect-error: the same as above
        const node = privilegeTreeRef?.getNode(id)
        if (node.isLeaf) {
          // @ts-expect-error: the same as above
          privilegeTreeRef?.setChecked(node, true, false)
        }
      })
    })
  } else {
    privilegeTreeRef.setCheckedKeys([])
    assignPrivilegesData.assignedPrivileges.forEach((id) => {
      const node = privilegeTreeRef.getNode(id)
      if (node.isLeaf) {
        privilegeTreeRef.setChecked(node, true, false)
      }
    })
  }

}

const assignPrivileges = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await assignPrivilegesAPI({
      roleId: assignPrivilegesData.id,
      privilegeIds: assignPrivilegesData.assignedPrivileges
    })

    const newRole: Role = (await getRoleById(assignPrivilegesData.id)).data.data
    newRole.privilegeTree = buildPrivilegeTree(newRole.privileges)

    tableData[tableData.findIndex(role => role.id === assignPrivilegesData.id)] = newRole

    assignPrivilegesDialogVisible = false

    ElMessage.success({
      message: response.data.msg || 'Success',
      center: true,
      showClose: true,
      duration: 3000
    })
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
        <el-breadcrumb-item>Role List</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- E Breadcrumb -->

    <!-- S Main -->
    <el-card>
        <div class="query-form">
            <el-input v-model="queryData.keyword"
                      clearable
                      placeholder="Keyword"
                      type="text"
            />
            <el-button type="primary" @click="query">Query</el-button>
            <el-button type="primary" @click="addRoleDialogVisible = true">Add Role</el-button>
            <el-button class="refresh-button" color="#ffc0cb" @click="refreshRoles">Clear keyword and Refresh</el-button>
        </div>
        <!-- /Top bar -->

        <el-table :data="tableData" border stripe>
            <el-table-column type="index"/>
            <el-table-column label="Role" min-width="200" prop="roleName"/>
            <el-table-column label="Description" min-width="250" prop="roleDescription"/>
            <el-table-column label="Privileges" type="expand" width="90">
                <template #default="{ row }">
                    <div class="expanded-privileges-container">
                        <div v-for="l1 in row.privilegeTree" :key="l1.id" class="level-1-container">
                            <div class="tag-container">
                                <el-tag type="danger">{{ l1.privilegeName }}</el-tag>
                            </div>
                            <div class="level-2-container">
                                <div v-for="l2 in l1.children" :key="l2.id" class="level-2-each">
                                    <div class="tag-container">
                                        <el-tag type="warning">{{ l2.privilegeName }}</el-tag>
                                    </div>
                                    <div class="level-3-container">
                                        <el-tag v-for="l3 in l2.children" :key="l3.id" type="success">{{ l3.privilegeName }}</el-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="State" width="70">
                <template #default="{ row }">
                    <el-switch v-model="row.roleState"
                               active-color="#13ce66"
                               inactive-color="#ff4949"
                               @change="changeRoleState(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="250">
                <template #header>
                    <el-tag>Edit</el-tag>
                    <el-tag type="warning">Assign privileges</el-tag>
                    <el-tag type="danger">Delete</el-tag>
                </template>
                <template #default="{ row }">
                    <el-button :icon="EditPen" type="primary" @click="showEditRoleDialog(row)"/>
                    <el-button :icon="Setting" type="warning" @click="showAssignPrivilegesDialog(row)"/>
                    <el-popconfirm :icon="WarningFilled"
                                   cancel-button-text="Cancel"
                                   confirm-button-text="Delete"
                                   confirm-button-type="danger"
                                   icon-color="#f00"
                                   title="Are you sure to delete this role?"
                                   @confirm="deleteRole(row.id)"
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
                       :page-sizes="[5, 10, 15, 20]"
                       :total="totalRoleCounts"
                       layout="->, total, sizes, prev, pager, next, jumper"
        />
        <!-- /Pagination -->
    </el-card>
    <!-- E Main -->

    <!-- S Add role dialog -->
    <el-dialog v-model="addRoleDialogVisible"
               custom-class="permission-management-add-role-dialog"
               title="Add Role"
               @close="resetForm(addRoleFormRef)"
    >
        <el-form ref="addRoleFormRef" :model="addRoleData" :rules="addRoleRules">
            <el-form-item prop="roleName" required>
                <el-input v-model="addRoleData.roleName"
                          :prefix-icon="User"
                          clearable
                          placeholder="Role name"
                          type="text"
                />
            </el-form-item>
            <el-form-item prop="roleDescription" required>
                <el-input v-model="addRoleData.roleDescription"
                          :prefix-icon="InfoFilled"
                          clearable
                          placeholder="Role description"
                          type="text"
                />
            </el-form-item>
        </el-form>
        <!-- /Add role form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetForm(addRoleFormRef)">Reset Form</el-button>
                <el-button @click="addRoleDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addRole(addRoleFormRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Add role dialog -->

    <!-- S Edit role dialog -->
    <el-dialog v-model="editRoleDialogVisible"
               custom-class="permission-management-edit-role-dialog"
               title="Edit Role"
    >
        <el-form ref="editRoleFormRef" :model="editRoleData" :rules="editRoleRules">
            <el-form-item prop="roleName" required>
                <el-input v-model="editRoleData.roleName"
                          :prefix-icon="User"
                          clearable
                          placeholder="Role name"
                          type="text"
                />
            </el-form-item>
            <el-form-item prop="roleDescription" required>
                <el-input v-model="editRoleData.roleDescription"
                          :prefix-icon="InfoFilled"
                          clearable
                          placeholder="Role description"
                          type="text"
                />
            </el-form-item>
        </el-form>
        <!-- /Edit role form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editRole(editRoleFormRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Edit role dialog -->

    <!-- S Assign privileges dialog -->
    <el-dialog v-model="assignPrivilegesDialogVisible"
               custom-class="user-management-assign-roles-dialog"
               title="Assign Privileges"
               top="5vh"
    >
        <el-form ref="assignPrivilegesFormRef" :model="assignPrivilegesData" label-width="auto">
            <el-form-item label="Role">
                <el-input v-model="assignPrivilegesData.roleName"
                          disabled
                          placeholder="Role"
                          type="text"
                />
            </el-form-item>
            <el-form-item label="Privileges">
                <el-tree ref="privilegeTreeRef"
                         :data="privilegeTree"
                         :props="privilegeTreeProps"
                         default-expand-all
                         node-key="id"
                         show-checkbox
                         @check="assignPrivilegesData.assignedPrivileges = [...privilegeTreeRef?.getHalfCheckedKeys(), ...privilegeTreeRef?.getCheckedKeys(false)]"
                />
            </el-form-item>
        </el-form>
        <!-- /Assign privileges form -->

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="assignPrivilegesDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="assignPrivileges">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- E Assign privileges dialog -->
</template>

<style lang="scss" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}

.el-card {
    min-width: 700px;

    .query-form {
        display: flex;

        .el-input {
            margin-right: 20px;
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

        :deep(.el-table__expand-icon--expanded) {
            transform: none;

            .el-icon {
                transform: rotate(90deg);
            }
        }

        .expanded-privileges-container {
            padding: 0 20px;

            .level-1-container {
                display: grid;
                grid-template-columns: 1fr 3fr;

                & + .level-1-container {
                    border-top: 1px solid var(--el-table-border-color);
                }

                .level-2-container {
                    padding: 20px 0;

                    .level-2-each {
                        display: grid;
                        grid-template-columns: 1fr 2fr;

                        & + .level-2-each {
                            margin-top: 20px;
                            padding-top: 20px;
                            border-top: 1px solid var(--el-table-border-color);
                        }
                    }

                    .level-3-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                }
            }

            .tag-container {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>

<style lang="scss">
.permission-management-add-role-dialog,
.permission-management-edit-role-dialog {
    min-width: 630px;
}
</style>
