<script lang="ts" setup>
import { Collection, Setting, Unlock, User, View } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $, $ref } from 'vue/macros'
import { useStore } from '../stores'


/**
 * Global Constants
 */
const mainStore = useStore()
const router = useRouter()
const route = useRoute()
const { currentUser, assetBaseUrl } = $(storeToRefs(mainStore))
if (!currentUser) throw new Error('Please log in first')


/**
 * Header
 */
const logout = async (): Promise<void> => {
  localStorage.removeItem('token')
  mainStore.loggedIn = false
  mainStore.currentUser = null
  resetDefaultActiveMenuItem()
  await router.push('/login')
}

const toggleMenuCollapse = (): void => {
  menuCollapsed = !menuCollapsed
  sessionStorage.setItem('menuCollapsed', menuCollapsed.toString())
}

const displayName = computed<string>(() => currentUser.username ?
  currentUser.username : currentUser.email ?
    currentUser.email : 'PLACEHOLDER'
)


/**
 * Aside
 */
const changeDefaultActiveMenuItem = (index: string): void => {
  defaultActiveMenuItem = index
  sessionStorage.setItem('defaultActiveMenuItem', defaultActiveMenuItem)
}
const resetDefaultActiveMenuItem = () => void sessionStorage.removeItem('defaultActiveMenuItem')

let menuCollapsed = $ref<boolean>(sessionStorage.getItem('menuCollapsed') === 'true')
let defaultActiveMenuItem = $ref(sessionStorage.getItem('defaultActiveMenuItem') ?? '')

const currentPath = route.name as string
if (['users', 'roles', 'permissions'].includes(currentPath)) {
  changeDefaultActiveMenuItem(currentPath)
}


/**
 * Privilege - Menu
 */
const availableMenus = currentUser.privilegeTree?.find(privilege => privilege.type === 'menu')
const defaultOpenedMenus: string[] = []
availableMenus?.children?.forEach((p) => {
  if (p.privilegeName === 'User management menu') {
    defaultOpenedMenus.push('user-management')
  }
  if (p.privilegeName === 'Permission management menu') {
    defaultOpenedMenus.push('permission-management')
  }
})
</script>

<template>
    <el-container>
        <el-header>
            <div class="header-left" @click="toggleMenuCollapse"></div>
            <div class="header-right">
                <img alt="avatar" :src="`${ assetBaseUrl }${ currentUser.avatarUrl }`">
                <p>{{ displayName }}</p>
                <el-button @click="logout">Log out</el-button>
            </div>
        </el-header>
        <el-container class="main-container">
            <el-aside :width="menuCollapsed ? '64px' : '250px'">
                <el-menu :collapse="menuCollapsed"
                         :collapse-transition="false"
                         class="el-menu-vertical-demo"
                         :default-active="defaultActiveMenuItem"
                         router
                         :default-openeds="defaultOpenedMenus"
                >

                    <el-sub-menu v-if="availableMenus?.children?.some(p => p.privilegeName === 'User management menu')"
                                 index="user-management"
                    >
                        <template #title>
                            <el-icon>
                                <Setting/>
                            </el-icon>
                            <span>User Management</span>
                        </template>

                        <el-menu-item v-if="availableMenus?.children?.find(p => p.privilegeName === 'User management menu')?.children?.some(p => p.privilegeName === 'User list menu')"
                                      index="users"
                                      @click="changeDefaultActiveMenuItem('users')"
                        >
                            <template #default>
                                <el-icon>
                                    <User/>
                                </el-icon>
                                <span>User List</span>
                            </template>
                        </el-menu-item>

                    </el-sub-menu>

                    <el-sub-menu v-if="availableMenus?.children?.some(p => p.privilegeName === 'Permission management menu')"
                                 index="permission-management"
                    >
                        <template #title>
                            <el-icon>
                                <Collection/>
                            </el-icon>
                            <span>Permission Management</span>
                        </template>

                        <el-menu-item v-if="availableMenus?.children?.find(p => p.privilegeName === 'Permission management menu')?.children?.some(p => p.privilegeName === 'Role list menu')"
                                      index="roles"
                                      @click="changeDefaultActiveMenuItem('roles')"
                        >
                            <template #default>
                                <el-icon>
                                    <View/>
                                </el-icon>
                                <span>Role List</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item v-if="availableMenus?.children?.find(p => p.privilegeName === 'Permission management menu')?.children?.some(p => p.privilegeName === 'Privilege list menu')"
                                      index="privileges"
                                      @click="changeDefaultActiveMenuItem('privileges')"
                        >
                            <template #default>
                                <el-icon>
                                    <Unlock/>
                                </el-icon>
                                <span>Privilege List</span>
                            </template>
                        </el-menu-item>

                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view @reset-default-active-menu-item="resetDefaultActiveMenuItem"/>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-container {
    width: 100%;
    height: 100%;
    background: #e9eef3;

    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: deepskyblue;

        .header-left {
            width: 136px;
            height: 100px;
            background: url('/src/assets/images/logo.png') center center / cover no-repeat;
            cursor: pointer;
            transform: translateY(-2px);
        }

        .header-right {
            display: flex;
            align-items: center;

            img {
                overflow: hidden;
                width: 40px;
                height: 40px;
                border: 1px solid #fff;
                border-radius: 50%;
            }

            p {
                margin: 0 20px 0 10px;
                font-weight: 700;
            }
        }
    }

    &.main-container {
        height: calc(100% - 60px);
    }

    .el-aside {
        background: #fff;

        .el-menu {
            border-right: none;
        }
    }
}
</style>
