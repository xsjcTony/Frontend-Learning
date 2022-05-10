/* eslint '@typescript-eslint/no-explicit-any': 'off' */

// RegisterData
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
  github?: boolean
}

interface EmailRegisterData extends BaseRegisterData {
  email: string
}

export type RegisterData = EmailRegisterData | NormalRegisterData


// Email Verification
export interface EmailInfo {
  from: string
  to: string
  subject: string
  text: string
}


// loginData
export interface LoginData {
  username: string
  password: string
  captcha: string
}


// OAuthUserData
export interface OAuthUserData {
  [key: string]: any
  id: number
  provider: string
}


// AddUserData
export interface AddUserData {
  username: string
  email: string | null
  password: string
  github?: boolean
  userState?: boolean
  avatarUrl?: string
}

// EditUserData
export interface EditUserData {
  username: string
  email: string | null
  password: string | undefined
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
  role: string
  origin: '' | 'github' | 'local'
  type: '' | 'email' | 'username'
  keyword: string
  currentPageNumber?: string
  pageSize?: string
}


/**
 * Role
 */
export interface RoleQueryData {
  keyword: string
  currentPageNumber?: string
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
  type: '' | 'menu' | 'request' | 'route'
  keyword: string
  currentPageNumber?: string
  pageSize?: string
}

export interface ModifyPrivilegeData {
  privilegeName: string
  privilegeDescription: string
  type: 'menu' | 'request' | 'route'
  requestMethod: 'all' | 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number | null
  level: 1 | 2 | 3
  privilegeState?: boolean
}


/**
 * RolePrivilege
 */
export interface ModifyRolePrivilegeData {
  roleId: number
  privilegeId: number
}
