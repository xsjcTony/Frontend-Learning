/* eslint '@typescript-eslint/no-explicit-any': 'off' */

// RegisterData
interface BaseRegisterData {
  password: string
  captcha: string
}

interface AccountRegisterData extends BaseRegisterData {
  username: string
  github?: boolean
}

interface EmailRegisterData extends BaseRegisterData {
  email: string
}

export type RegisterData = AccountRegisterData | EmailRegisterData

export interface ResetPasswordData {
  email: string
  password: string
}


// Email Verification
export interface EmailInfo {
  from: string
  to: string
  subject: string
  text: string
}

export interface VerifyEmailData {
  email: string
  captcha: string
}


// loginData
interface BaseLoginData {
  password: string
  captcha: string
  remember: boolean
}

interface AccountLoginData extends BaseLoginData {
  username: string
}

interface EmailLoginData extends BaseLoginData {
  email: string
}

export type LoginData = AccountLoginData | EmailLoginData


// OAuthUserData
export interface OAuthUserData {
  [key: string]: any
  id: number
  provider: string
}

export interface OAuthBindData {
  username: string
  email: string
  password: string
  captcha: string
  oauthId: string
  provider: string
}


// AddUserData
export interface AddUserData {
  username?: string
  email: string
  password: string
  github?: boolean
  userState?: boolean
  avatarUrl?: string
}

// EditUserData
export interface EditUserData {
  username?: string
  email: string
  password?: string
  userState?: boolean
}

// ImportUserData
export interface ImportUserData {
  username?: string
  email?: string
  password: string
  userState?: boolean
  github?: boolean
  avatarUrl?: string
}

// ExcelUserData
export type ExcelUserData = number | string | null

// UserResponse
export interface UserResponse {
  id: number
  username: string | null
  email: string | null
  github: boolean
  userState: boolean
  avatarUrl: string
}

export interface UserQueryData {
  username?: string
  email?: string
  current?: string
  pageSize?: string
}


/**
 * Role
 */
export interface RoleQueryData {
  roleName?: string
  current?: string
  pageSize?: string
}

export interface ModifyRoleData {
  roleName: string
  roleDescription: string
  roleState?: boolean
}


/**
 * UserRole
 */
export interface ModifyUserRoleData {
  userId: number
  roleId: number
}


/**
 * Privilege
 */
export interface PrivilegeQueryData {
  privilegeName?: string
  parentId?: string
  requestMethod?: string
  level?: string
  current?: string
  pageSize?: string
  levelSorting?: 'asc' | 'desc'
}

export interface AddPrivilegeData {
  privilegeName: string
  privilegeDescription: string
  level: 1 | 2
  requestMethod?: 'delete' | 'get' | 'post' | 'put'
  privilegeUrl?: string
  parentId: number
}

export interface ModifyPrivilegeData {
  privilegeName: string
  privilegeDescription: string
  requestMethod: 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number
  level: 1 | 2
  privilegeState?: boolean
}


/**
 * RolePrivilege
 */
export interface ModifyRolePrivilegeData {
  roleId: number
  privilegeId: number
}


/**
 * Menu
 */
export interface MenuQueryData {
  menuDescription?: string
  parentId?: string
  menuKey?: string
  level?: string
  current?: string
  pageSize?: string
  levelSorting?: 'asc' | 'desc'
}

export interface AddMenuData {
  menuName: string
  menuDescription: string
  menuKey: string
  menuIcon?: string
  parentId: number
  level: 1 | 2
}

export interface ModifyMenuData {
  menuName: string
  menuDescription: string
  menuKey: string
  menuIcon: string | null
  parentId: number
  level: 1 | 2
  menuState?: boolean
}


/**
 * RoleMenu
 */
export interface ModifyRoleMenuData {
  roleId: number
  menuId: number
}
