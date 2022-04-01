/* eslint '@typescript-eslint/prefer-reduce-type-parameter': 'off' */
/* eslint '@typescript-eslint/no-unnecessary-condition': 'off' */

import type {
  ExcelUserData,
  Privilege,
  GroupedPrivilegeSet,
  GroupedPrivilege,
  PrivilegeNode,
  ExportUser
} from '../types'
import type { RouteRecordRaw } from 'vue-router'


/**
 * Get all vue-router paths (no dynamic route)
 * @param {RouteRecordRaw[]} routes
 * @param {string} path
 * @return {string[]}
 */
export const getAllRoutePaths = (routes: RouteRecordRaw[], path = ''): string[] => {
  const res: string[] = []

  routes.forEach((route: RouteRecordRaw) => {
    let currentPath = path

    if (route.path.startsWith('/')) {
      res.push(route.path)
      if (route.children) {
        res.push(...getAllRoutePaths(route.children, route.path))
      }
    } else {
      currentPath = `${ currentPath }/${ route.path }`
      res.push(currentPath)
      if (route.children) {
        res.push(...getAllRoutePaths(route.children, currentPath))
      }
    }
  })

  return res
}


/**
 * Download file using `<a>` link
 * @param {BlobPart} blob
 * @param {string} mime
 * @param {string} filename
 */
export const downloadFile = (blob: BlobPart, mime = '', filename = ''): void => {
  const url = URL.createObjectURL(new Blob([blob], { type: mime }))
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('target', '_blank')
  link.setAttribute('rel', 'noopener noreferrer')
  link.setAttribute('download', filename)
  link.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}


/**
 * Convert user to excel ready format (true => 1, false => 0)
 * @param {User} user
 * @return {ExcelUserData[]}
 */
export const userToExcel = (user: ExportUser): ExcelUserData[] => {
  const res: ExcelUserData[] = []

  for (const key in user) {
    const data = user[key as keyof ExportUser]

    if (typeof data === 'boolean') {
      res.push(data ? 1 : 0)
    } else {
      res.push(data as ExcelUserData)
    }
  }

  return res
}


/**
 * Group privileges by `type -> level -> privileges` data structure
 * @param {Privilege[]} privileges
 * @return {GroupedPrivilegeSet}
 */
export const groupPrivilegesByTypeAndLevel = (privileges: Privilege[]): GroupedPrivilegeSet => privileges.reduce<GroupedPrivilegeSet>((prev, curr) => {
  prev[curr.type] = prev[curr.type] ?? {}
  prev[curr.type][curr.level] = prev[curr.type][curr.level] ?? []

  const t = { ...curr } as unknown as GroupedPrivilege
  delete t.type
  delete t.level

  prev[curr.type][curr.level].push(t)
  return prev
}, {} as GroupedPrivilegeSet)


/**
 * Convert privileges into `el-tree` data structure
 * @param {Privilege[]} privileges
 * @return {PrivilegeNode[]}
 */
export const buildPrivilegeTree = (privileges: Privilege[]): PrivilegeNode[] => privileges.reduce<PrivilegeNode[]>((prev, curr: PrivilegeNode) => {
  if (curr.level === 1) {
    prev.push(curr)
    return prev
  }

  privileges.some((privilege: PrivilegeNode) => {
    if (curr.parentId === privilege.id) {
      privilege.children = privilege.children ?? []
      privilege.children.push(curr)
      return true
    }
  })

  return prev
}, [])
