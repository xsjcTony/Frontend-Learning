import type { ElForm, ElTree } from 'element-plus'


/**
 * Pinia
 */
// MainStore
export interface MainStore {
  loggedIn: boolean
  currentUser: User | null
  assetBaseUrl: string
  apiBaseUrl: string
}

// UserStore
export interface UserStore {
  tableData: User[]
  queryData: UserQueryData
  totalUserCounts: number
}


/**
 * Element-Plus
 */
// ElForm
export type FormInstance = InstanceType<typeof ElForm>
// ElTree
export type TreeInstance = InstanceType<typeof ElTree>


/**
 * Registration
 */
export const enum RegisterType {
  Normal = 'normal',
  Email = 'email'
}

interface BaseRegisterData {
  password: string
  captcha: string
  registerType: RegisterType
}

interface NormalRegisterData extends BaseRegisterData {
  username: string
}

interface EmailRegisterData extends BaseRegisterData {
  email: string
}

export type RegisterData = EmailRegisterData | NormalRegisterData


/**
 * Response Data
 */
interface BaseResponseData {
  code: number
  msg: unknown
}

export interface ResponseData extends BaseResponseData {
  data: unknown
}

export interface JwtUserResponseData extends BaseResponseData {
  data: User & { token: string }
}

export interface StringResponseData extends BaseResponseData {
  data: string
}

export interface ImportUsersResponseData extends BaseResponseData {
  data: User[]
}


/**
 * Login
 */
export interface LoginData {
  username: string
  password: string
  captcha: string
}


/**
 * Users
 */
export interface UserManagementAddUserData {
  username: string
  email: string | null
  password: string
  confirmPassword: string
}

export interface UserManagementEditUserData {
  id?: number
  username: string
  email: string | null
  password: string | undefined
  confirmPassword: string | undefined
  avatarUrl: string
}

export interface User {
  id: number
  username: string | null
  email: string | null
  github: boolean
  userState: boolean
  avatarUrl: string
  roles: Role[]
  privilegeTree?: PrivilegeNode[]
}

export interface UserQueryData {
  role: string
  origin: '' | 'github' | 'local'
  type: '' | 'email' | 'username'
  keyword: string
  currentPageNumber?: number
  pageSize?: number
}

export interface ExportUser {
  id: number
  username: string | null
  email: string | null
  github: boolean
  userState: boolean
  avatarUrl: string
  roles?: Role[]
}

export type ExcelUserData = number | string | null

export interface AssignRolesData {
  id: number
  username: string
  assignedRoles: number[]
}


/**
 * Roles
 */
export interface Role {
  id: number
  roleName: string
  roleDescription: string
  roleState: boolean
  privileges: Privilege[]
  privilegeTree?: PrivilegeNode[]
}

export interface RoleQueryData {
  keyword: string
  currentPageNumber?: number
  pageSize?: number
}

export interface PermissionManagementAddRoleData {
  roleName: string
  roleDescription: string
}

export interface PermissionManagementEditRoleData {
  id: number
  roleName: string
  roleDescription: string
}

export interface AssignPrivilegesData {
  id: number
  roleName: string
  assignedPrivileges: number[]
}


/**
 * UserRole
 */
export interface AssignRolesRequestData {
  userId: number
  roleIds: number[]
}


/**
 * Privileges
 */
export interface Privilege {
  id: number
  privilegeName: string
  privilegeDescription: string
  privilegeState: boolean
  type: 'menu' | 'request' | 'route'
  requestMethod: 'all' | 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number | null
  level: 1 | 2 | 3
}

export type GroupedPrivilege = PartialBy<Privilege, 'level' | 'type'>

export type GroupedPrivilegeSet = {
  [P in Privilege['type']]: {
    [U in Privilege['level']]: GroupedPrivilege[]
  }
}

export interface PrivilegeNode extends Privilege {
  children?: PrivilegeNode[]
}

export interface PrivilegeQueryData {
  type: '' | 'menu' | 'request' | 'route'
  keyword: string
  currentPageNumber?: number
  pageSize?: number
}

export interface PermissionManagementAddPrivilegeData {
  privilegeName: string
  privilegeDescription: string
  type: 'menu' | 'request' | 'route'
  requestMethod: 'all' | 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number | null
  level: 1 | 2 | 3
}

export interface PermissionManagementEditPrivilegeData extends PermissionManagementAddPrivilegeData {
  id: number
}


/**
 * RolePrivilege
 */
export interface AssignPrivilegesRequestData {
  roleId: number
  privilegeIds: number[]
}


/**
 * Utilities
 */
// Make specified keys in
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
