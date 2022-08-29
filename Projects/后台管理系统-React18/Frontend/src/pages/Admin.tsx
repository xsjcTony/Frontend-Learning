/* eslint-disable react-hooks/exhaustive-deps */

import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, SmileOutlined, LogoutOutlined } from '@ant-design/icons'
import * as AntdIcons from '@ant-design/icons/lib/icons'
import { useBoolean } from 'ahooks'
import { Layout, Menu, Avatar, Dropdown, message } from 'antd'
import { createElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '@/assets/images/logo.png'
import SelectLanguage from '@/locales/components/SelectLanguage'
import { setCurrentUser, setLoggedIn } from '@/store/authentication/authenticationSlice'
import { isAntdIconName } from '@/types'
import { isPromptInfo } from '@/types/locationState'
import type { AppDispatch, RootState } from '@/store'
import type { Menu as MenuType } from '@/types'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { ReactNode, Key } from 'react'


/**
 * Constants
 */
const { Header, Content, Sider } = Layout


/**
 * Utils
 */
const createItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: ItemType[]
): ItemType => {
  return { key, icon, children, label }
}


/**
 * Style
 */
const StyledLayout = styled(Layout)`
    width: 100%;
    height: 100%;
    min-width: 700px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 48px;
        padding: 0 20px;
        color: #fff;
        min-width: 700px;

        .ant-dropdown-trigger {
            height: 48px;
            line-height: 48px;
            cursor: pointer;

            &.ant-dropdown-open {
                background: #444;
            }
        }

        .header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;

            img {
                height: 30px;
                margin-right: 10px;
            }

            h1 {
                color: #fff;
                line-height: 48px;
                font-size: 18px;
            }
        }

        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

            .user-container {
                padding: 0 10px;

                .ant-avatar {
                    margin-right: 10px;
                }
            }
        }
    }

    .main-container {
        margin-top: 48px;

        .menu-container {
            height: 100%;

            .ant-layout-sider-children {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .menu {
                    li {
                        cursor: pointer;
                    }

                    .ant-menu-sub.ant-menu-inline {
                        background: #fff;
                    }
                }

                .menu-footer {
                    li {
                        border-top: 1px solid #ddd;
                        padding: 10px 20px;
                    }

                    .menu-collapse-trigger {
                        font-size: 18px;
                        cursor: pointer;
                        transition: color .3s;

                        &:hover {
                            color: #1890ff;
                        }
                    }
                }
            }
        }
    }
`


/**
 * Component
 */
const Admin = (): JSX.Element => {

  /**
   * Utils
   */
  const [collapsed, { toggle: toggleMenuCollapse }] = useBoolean(false)
  const intl = useIntl()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.authentication.currentUser)
  const assetBaseUrl = useSelector((state: RootState) => state.layout.assetBaseUrl)


  /**
   * Prompt
   */
  useEffect(() => {
    if (isPromptInfo(location.state)) {
      const { type, intlId, duration, path, noPrivilege } = location.state.promptInfo
      void message[type](`${intl.formatMessage({ id: intlId })}${noPrivilege ? ` "${path}"` : ''}`, duration)
    }
  }, [])


  /**
   * Header
   */
  useEffect(() => {
    if (!currentUser) {
      void navigate('/login', {
        replace: true,
        state: {
          type: 'prompt',
          promptInfo: {
            type: 'error',
            intlId: 'error.need-login',
            duration: 3,
            path: location.pathname,
            noPrivilege: false
          }
        }
      })
    }
  }, [])


  /**
   * Menu items
   */
  const welcomeMenuItem: ItemType = createItem(
    intl.formatMessage({ id: 'menu.welcome' }),
    '/admin',
    <SmileOutlined />
  )

  const [menuItems, setMenuItems] = useState<ItemType[]>([])

  const mapCallback = (menu: MenuType): ItemType => createItem(
    intl.formatMessage({
      id: menu.menuName,
      defaultMessage: menu.menuDescription
    }),
    menu.menuKey,
    isAntdIconName(menu.menuIcon) ? createElement(AntdIcons[menu.menuIcon]) : undefined,
    menu.children ? menu.children.map(mapCallback) : undefined
  )

  useEffect(() => {
    if (currentUser?.menuTree) {
      const { menuTree } = currentUser
      setMenuItems([welcomeMenuItem, ...menuTree.map(mapCallback)])
    } else {
      setMenuItems([welcomeMenuItem])
    }
  }, [currentUser])


  /**
   * Logout
   */
  const logout = (): void => {
    localStorage.removeItem('token')
    dispatch(setLoggedIn(false))
    dispatch(setCurrentUser(null))
    navigate('/login', {
      replace: false,
      state: {
        type: 'prompt',
        promptInfo: {
          type: 'success',
          intlId: 'success.logout',
          duration: 3,
          path: location.pathname,
          noPrivilege: false
        }
      }
    })
  }

  const userDropdownMenu = (
    <Menu
      items={[
        createItem(
          intl.formatMessage({ id: 'header.user-dropdown.logout' }),
          'logout',
          <LogoutOutlined />
        )
      ]}
      onClick={logout}
    />
  )


  /**
   * Component
   */
  return (
    <StyledLayout>
      <Header className="header">
        <div
          className="header-left"
          onClick={() => void navigate('/', { replace: false })}
        >
          <img alt="logo" src={logo} />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        <div className="header-right">
          <Dropdown overlay={userDropdownMenu} placement="bottom">
            <div className="user-container">
              <Avatar
                alt="avatar"
                icon={<UserOutlined />}
                shape="circle"
                size="default"
                src={`${assetBaseUrl}${currentUser?.avatarUrl ?? ''}`}
              />
              {currentUser?.username ?? currentUser?.email ?? 'Placeholder'}
            </div>
          </Dropdown>
          <SelectLanguage color="#fff" size="20" />
        </div>
      </Header>
      <Layout className="main-container">
        <Sider
          collapsible
          breakpoint="lg"
          className="menu-container"
          collapsed={collapsed}
          collapsedWidth={58}
          theme="light"
          trigger={null}
          width={230}
          onCollapse={toggleMenuCollapse}
        >
          <Menu
            className="menu"
            defaultOpenKeys={['user-management', 'privilege-management']}
            items={menuItems}
            mode="inline"
            selectedKeys={[location.pathname]}
            theme="light"
            onClick={({ key }) => void navigate(key, { replace: false })}
          />
          <ul className="menu-footer">
            <li className="menu-collapse-trigger" onClick={toggleMenuCollapse}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </li>
            <li>
              {collapsed ? 'v1' : 'v1.0.0'}
            </li>
          </ul>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  )
}

export default Admin
