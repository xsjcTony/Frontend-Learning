import { Link } from 'react-router-dom'
import { getMenuById } from '@/services/menus'
import { getPrivilegeById } from '@/services/privileges'
import type { ResponseData } from '@/services/types'
import type { Menu, Privilege, Role, User, PrivilegeMap } from '@/types'
import type { RequestOptionsType } from '@ant-design/pro-utils/es/typing'
import type { Route } from 'antd/es/breadcrumb/Breadcrumb'


/**
 * Types
 */
interface FlatDataStructure<T> {
  [p: string]: any
  parentId: number
  children?: T[]
}


/**
 * Methods
 */
export const breadcrumbItemRender = (route: Route, params: any, routes: Route[], paths: string[]): JSX.Element => {
  const isLast = routes.indexOf(route) === routes.length - 1

  return isLast
    ? <span>{route.breadcrumbName}</span>
    : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
}

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

export const flatToAntdTree = <T extends FlatDataStructure<T>>(data: T[], label: string, value: string): RequestOptionsType[] => {
  const callback = (item: T): RequestOptionsType => {
    let r: RequestOptionsType[] | undefined

    if (item.children) {
      r = item.children.map<RequestOptionsType>(callback)
    }

    return { label: item[label], value: item[value], children: r }
  }

  const tree = flatToTree<T>(data)

  return tree.map<RequestOptionsType>(callback)
}

export const flatToTree = <T extends FlatDataStructure<T>>(data: T[]): T[] => data.reduce<T[]>((prev, curr) => {
  if (curr.parentId === 0) {
    prev.push(curr)
    return prev
  }

  data.some((item) => {
    if (curr.parentId === item.id) {
      item.children = item.children ?? []
      item.children.push(curr)
      return true
    }

    return false
  })

  return prev
}, [])

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const uniqueArray = <T extends any>(arr: T[], key?: keyof T): T[] => {
  // primitive array
  if (key === undefined) {
    return [...new Set(arr)]
  }

  // object array
  const map = new Map<T[keyof T], T>()
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item)
    }
  })
  return [...map.values()]
}

export const buildPrivilegeTreeByRole = async (role: Role, returnFlat = false): Promise<Privilege[]> => {
  const p = [...role.privileges]

  for (const item of p) {
    if (
      item.parentId !== 0
      && p.findIndex(i => i.id === item.parentId) === -1
    ) {
      let d: ResponseData<Privilege>

      try {
        d = await getPrivilegeById(item.parentId)
      } catch (err) {
        throw new Error('error.network')
      }

      if (d.code !== 200) {
        throw new Error(d.msg)
      }

      p.push(d.data)
    }
  }

  return returnFlat ? p : flatToTree(p)
}

export const buildMenuTreeByRole = async (role: Role, returnFlat = false): Promise<Menu[]> => {
  const m = [...role.menus]

  for (const item of m) {
    if (
      item.parentId !== 0
      && m.findIndex(i => i.id === item.parentId) === -1
    ) {
      let d: ResponseData<Menu>

      try {
        d = await getMenuById(item.parentId)
      } catch (err) {
        throw new Error('error.network')
      }

      if (d.code !== 200) {
        throw new Error(d.msg)
      }

      m.push(d.data)
    }
  }

  return returnFlat ? m : flatToTree(m)
}

export const buildMenuTreeByUser = async (user: User): Promise<Menu[]> => {
  const menus: Menu[] = []
  for (const role of user.roles) {
    menus.push(...await buildMenuTreeByRole(role, true))
  }
  return flatToTree(uniqueArray<Menu>(menus, 'id'))
}

export const buildAllowedRoutePathsByUser = async (user: User): Promise<string[]> => {
  const menus: Menu[] = []
  for (const role of user.roles) {
    menus.push(...await buildMenuTreeByRole(role, true))
  }
  return uniqueArray(menus.filter(menu => menu.menuKey.startsWith('/')).map(menu => menu.menuKey))
}

export const buildPrivilegeMapByUser = (user: User): PrivilegeMap => {
  const p: Privilege[] = []
  user.roles.forEach(role => void p.push(...role.privileges))
  const t = uniqueArray(p.map(privilege => privilege.privilegeName))

  const res: PrivilegeMap = {}
  t.forEach(privilegeName => void (res[privilegeName] = true))
  return res
}
