import * as AntdIcons from '@ant-design/icons/lib/icons'
import ProTable from '@ant-design/pro-table'
import { useTitle } from 'ahooks'
import { message, PageHeader, Switch, Tag } from 'antd'
import { createElement, useRef } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import SubpageContainer from '@/components/SubpageContainer'
import { getMenusByQuery } from '@/services/menus'
import { isAntdIconName } from '@/types'
import { breadcrumbItemRender } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Menu, MenuQueryResponse } from '@/types'
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table'
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender'
import type { PageHeaderProps } from 'antd'


/**
 * Types
 */
export interface MenuQueryData {
  menuDescription?: string
  parentId?: number
  menuKey?: string
  level?: 1 | 2
  current?: number
  pageSize?: number
  levelSorting?: 'asc' | 'desc'
}


/**
 * Style
 */
const StyledSubpageContainer = styled(SubpageContainer)`
    .ant-tag {
        margin-right: 0;
    }
    
    .actions-header {
        display: flex;
        gap: 8px;
        margin: 0 10px;
        justify-content: center;
    }
    
    .actions-body {
        display: flex;
        gap: 10px;
        margin: 0 10px;
        justify-content: center;
    }
`


/**
 * Component
 */
const Menus = (): JSX.Element => {

  /**
   * Hooks
   */
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.menu-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Header
   */
  const breadcrumb: PageHeaderProps['breadcrumb'] = {
    itemRender: breadcrumbItemRender,
    routes: [
      {
        path: 'admin',
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.home' })
      },
      {
        path: '',
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.menu-list.title' })
      }
    ]
  }

  const header = (
    <PageHeader
      breadcrumb={breadcrumb}
      ghost={false}
      title={intl.formatMessage({ id: 'pages.admin.menu-list.title' })}
    />
  )


  /**
   * Methods
   */
  const request: ProTableProps<Menu, MenuQueryData>['request'] = async (params, sort) => {
    if (sort.level) {
      params.levelSorting = sort.level === 'ascend' ? 'asc' : 'desc'
    }

    let data: ResponseData<MenuQueryResponse>

    try {
      data = await getMenusByQuery(params)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return {
        data: undefined,
        success: false,
        total: 0
      }
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return {
        data: undefined,
        success: false,
        total: 0
      }
    }

    return {
      data: data.data.rows,
      success: true,
      total: data.data.count
    }
  }


  /**
   * Table
   */
  const tableRef = useRef<ActionType>()

  const columns: ProColumns<Menu>[] = [
    {
      key: 'index',
      align: 'center',
      width: 50,
      search: false,
      render: (value, record, index) => (currentPageNumber.current - 1) * pageSize.current + index + 1
    },
    {
      align: 'center',
      width: 90,
      sorter: true,
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.level' }),
      dataIndex: 'level',
      render: (value, record) => (
        <Tag color={record.level === 1 ? 'red' : 'green'}>
          {`${intl.formatMessage({ id: 'pages.admin.menu-list.table.level.level' })} ${record.level}`}
        </Tag>
      ),
      valueType: 'select',
      request: async () => [
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ]
    },
    {
      align: 'center',
      tooltip: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-name.tooltip' }),
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-name' }),
      dataIndex: 'menuName',
      render: (value, record) => intl.formatMessage({
        id: record.menuName,
        defaultMessage: `I18n not found: ${record.menuName}`
      })
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-description' }),
      dataIndex: 'menuDescription'
    },
    {
      align: 'center',
      tooltip: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-key.tooltip' }),
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-key' }),
      dataIndex: 'menuKey'
    },
    {
      align: 'center',
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.menu-icon' }),
      dataIndex: 'menuIcon',
      render: (value, record) => record.menuIcon
        ? isAntdIconName(record.menuIcon)
          ? createElement(AntdIcons[record.menuIcon])
          : `${intl.formatMessage({ id: 'pages.admin.menu-list.table.menu-icon.invalid' })}: ${record.menuIcon}`
        : '-'
    },
    {
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.state' }),
      dataIndex: 'menuState',
      render: (value, record) => (
        <Switch
          disabled
          checked={record.menuState}
        />
      )
    },
    {
      hideInTable: true,
      key: 'parentId',
      title: intl.formatMessage({ id: 'pages.admin.menu-list.table.header.parentId' }),
      valueType: 'select',
      request: async () => {
        let data: ResponseData<MenuQueryResponse>

        try {
          data = await getMenusByQuery({ level: 1 })
        } catch (err) {
          void message.error(intl.formatMessage({ id: 'error.network' }), 3)
          return []
        }

        if (data.code !== 200) {
          void message.error(intl.formatMessage({ id: data.msg }), 3)
          return []
        }

        return data.data.rows.map((menu) => {
          return {
            label: intl.formatMessage({
              id: menu.menuName,
              defaultMessage: `I18n not found: ${menu.menuName}`
            }),
            value: menu.id
          }
        })
      }
    }
  ]

  const currentPageNumber = useRef<number>(1)
  const pageSize = useRef<number>(parseInt(sessionStorage.getItem('menuTablePageSize') ?? '5') || 5)

  const pagination: ProTableProps<Menu, MenuQueryData>['pagination'] = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 15, 30],
    defaultPageSize: pageSize.current,
    onChange: (page, size) => {
      currentPageNumber.current = page
      pageSize.current = size
      sessionStorage.setItem('menuTablePageSize', size.toString(10))
    }
  }

  const search: SearchConfig = {
    defaultCollapsed: false,
    labelWidth: 'auto'
  }


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={header}
    >
      <ProTable<Menu, MenuQueryData>
        bordered
        actionRef={tableRef}
        columns={columns}
        pagination={pagination}
        request={request}
        rowKey={record => record.id}
        search={search}
      />
    </StyledSubpageContainer>
  )
}

export default Menus
