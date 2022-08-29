import * as AntdIcons from '@ant-design/icons/lib/icons'


/**
 * User
 */
export interface User {
  id: number
  username: string | null
  email: string | null
  github: boolean
  userState: boolean
  avatarUrl: string
  roles: Role[]
  privilegeMap?: PrivilegeMap
  menuTree?: Menu[]
  allowedRoutePaths?: string[]
}

export type UserWithJWT = User & { token: string }

export interface UserQueryResponse {
  rows: User[]
  count: number
}

/**
 * Role
 */
export interface Role {
  id: number
  roleName: string
  roleDescription: string
  roleState: boolean
  privileges: Privilege[]
  privilegeTree?: Privilege[]
  menus: Menu[]
  menuTree?: Menu[]
}

export interface RoleQueryResponse {
  rows: Role[]
  count: number
}


/**
 * Privilege
 */
export interface Privilege {
  id: number
  privilegeName: string
  privilegeDescription: string
  privilegeState: boolean
  requestMethod: 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number
  level: 1 | 2
  children?: Privilege[]
}

export interface PrivilegeQueryResponse {
  rows: Privilege[]
  count: number
}

export interface PrivilegeMap {
  [p: string]: boolean
}


/**
 * Menu
 */
export interface Menu {
  id: number
  menuName: string
  menuDescription: string
  menuState: boolean
  menuKey: string
  menuIcon: string | null
  parentId: number
  level: 1 | 2
  children?: Menu[]
}

export interface MenuQueryResponse {
  rows: Menu[]
  count: number
}


/**
 * Others
 */

export const isAntdIconName = (iconName: string | null): iconName is keyof typeof AntdIcons => {
  if (iconName === null) {
    return false
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return AntdIcons[iconName as keyof typeof AntdIcons] !== undefined
}
