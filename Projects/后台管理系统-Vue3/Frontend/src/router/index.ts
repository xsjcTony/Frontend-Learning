/* eslint '@typescript-eslint/no-unnecessary-condition': 'off' */
/* eslint '@typescript-eslint/promise-function-async': 'off' */

import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { createWebHistory, createRouter } from 'vue-router'
import { $ } from 'vue/macros'
import { getUserById, isLoggedIn } from '../api'
import { useStore } from '../stores'
import { buildPrivilegeTree } from '../utils'
import type { ResponseData, User, Privilege, PrivilegeNode } from '../types'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    component: () => import('/src/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('/src/views/Admin.vue'),
    redirect: '/admin/welcome',
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('/src/components/Admin/Welcome.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('/src/components/Admin/Users.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('/src/components/Admin/Roles.vue')
      },
      {
        path: 'privileges',
        name: 'privileges',
        component: () => import('/src/components/Admin/Privileges.vue')
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


/**
 * Access Control - Navigation Guard
 */
let authenticated = false
router.beforeEach(async (to: RouteLocationNormalized) => {
  const mainStore = useStore()
  let { loggedIn, currentUser } = $(storeToRefs(mainStore))

  // OAuth cookie
  const t = Cookies.get('token')
  if (t) {
    authenticated = false
    localStorage.setItem('token', t)
    Cookies.remove('token')
  }

  if (!authenticated) {
    try {
      const data: ResponseData = await isLoggedIn()
      loggedIn = true

      const id = (data.data as User).id
      const user: User = (await getUserById(id)).data.data

      // Create privilege tree
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

      currentUser = user
    } catch (err) {
      loggedIn = false
    }

    authenticated = true
  }

  if (to.path === '/login' || to.path === '/register') {
    if (loggedIn) {
      // redirect to '/admin' if logged in
      return '/admin'
    } else {
      return true
    }
  }

  // redirect to '/login' if not logged in
  if (!loggedIn) {
    return '/login'
  }

  // logged in, check for privileges (allowed routes)
  if (_allow(to.path, currentUser?.privilegeTree?.find(privilege => privilege.type === 'route'))) {
    return true
  } else {
    ElMessage.error({
      message: `You are not allowed to visit "${ to.path }"`,
      center: true,
      showClose: true,
      duration: 3000
    })

    return '/admin'
  }
})


/**
 * Privilege Control
 * @param {string} path
 * @param {PrivilegeNode | undefined} routePrivilege
 * @return {boolean}
 */
const _allow = (path: string, routePrivilege: PrivilegeNode | undefined): boolean => {
  if (!routePrivilege) return false

  if (routePrivilege.privilegeUrl === path) return true

  if (routePrivilege.children) {
    for (const p of routePrivilege.children) {
      if (_allow(path, p)) return true
    }
  }

  return false
}


export default router
