import {
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  UserOutlined
} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest, useTitle } from 'ahooks'
import { Avatar, Button, message, PageHeader, Switch, Tag, Upload } from 'antd'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import SubpageContainer from '@/components/SubpageContainer'
import AssignRolesModalForm from '@/pages/Admin/Users/components/AssignRolesModalForm'
import { deleteUser, exportAllUsers, getUsersByQuery, updateUserState } from '@/services/users'
import { breadcrumbItemRender, downloadFile } from '@/utils'
import AddUserModalForm from './Users/components/AddUserModalForm'
import EditUserModalForm from './Users/components/EditUserModalForm'
import type { ResponseData } from '@/services/types'
import type { RootState } from '@/store'
import type { User, UserQueryResponse } from '@/types'
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table'
import type { PageHeaderProps, UploadProps } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'


/**
 * Types
 */
export interface UserQueryData {
  username?: string
  email?: string
  current?: number
  pageSize?: number
}


/**
 * Style
 */
const StyledSubpageContainer = styled(SubpageContainer)`
    .roles-body {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        
        span {
            margin-right: 0;
        }
    }
    
    .actions-header {
        display: flex;
        gap: 8px;
        margin: 0 10px;
        
        span {
            margin-right: 0;
        }
    }
    
    .actions-body {
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    
    .current-user-row {
        background-color: #e1f3d8;
    }
`


/**
 * Component
 */
const Users = (): JSX.Element => {

  /**
   * Hook
   */
  const intl = useIntl()
  const currentUser = useSelector((state: RootState) => state.authentication.currentUser)
  const assetBaseUrl = useSelector((state: RootState) => state.layout.assetBaseUrl)
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.user-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)


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
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.user-list.title' })
      }
    ]
  }

  const header = (
    <PageHeader
      breadcrumb={breadcrumb}
      ghost={false}
      title={intl.formatMessage({ id: 'pages.admin.user-list.title' })}
    />
  )


  /**
   * Methods
   */
  const request: ProTableProps<User, UserQueryData>['request'] = async (params) => {
    let data: ResponseData<UserQueryResponse>

    try {
      data = await getUsersByQuery(params)
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

  // change user state
  const _changeUserState = async (id: number, checked: boolean): Promise<void> => new Promise(async (resolve, reject) => {
    let res: ResponseData<User>

    try {
      res = await updateUserState(id, checked)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: 'pages.admin.user-list.user.state.updated' }), 3)
    return void resolve()
  })

  const { loading: changingUserState, run: changeUserState } = useRequest(_changeUserState, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // delete user
  const _removeUser = async (id: number): Promise<void> => new Promise(async (resolve, reject) => {
    let res: ResponseData<User>

    try {
      res = await deleteUser(id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: res.msg }), 3)
    return void resolve()
  })

  const { loading: deletingUser, run: removeUser } = useRequest(_removeUser, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // export all users
  const _exportUsers = async (): Promise<void> => new Promise(async (resolve, reject) => {
    let res: Blob | ResponseData

    try {
      res = await exportAllUsers()
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if ('code' in res) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    downloadFile(res, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'users.xlsx')
    return void resolve()
  })

  const { loading: exportingUsers, run: exportUsers } = useRequest(_exportUsers, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // import users
  const [importingUsers, setImportingUsers] = useState<boolean>(false)

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
    const isLt500KB = file.size / 1024 <= 500 // <= 500kb

    if (!isXLSX) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.import.file.type' }), 3)
      return false
    }

    if (!isLt500KB) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.import.file.type' }), 3)
      return false
    }

    return true
  }

  const handleUpload: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile<ResponseData>>) => {
    const { file: { status, response } } = info

    if (status === 'uploading') {
      setImportingUsers(true)
      return
    }

    if (status === 'error') {
      setImportingUsers(false)
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return
    }

    if (status === 'done') {
      setImportingUsers(false)

      if (response?.code !== 200) {
        void message.error(intl.formatMessage({ id: response?.msg ?? 'error.network' }), 3)
        return
      }

      void tableRef.current?.reloadAndRest?.()
      void message.success(intl.formatMessage({ id: response.msg }), 3)
      return
    }

    setImportingUsers(false)
    return
  }


  /**
   * Table
   */
  const tableRef = useRef<ActionType>()

  const columns: ProColumns<User>[] = [
    {
      key: 'index',
      align: 'center',
      width: 50,
      search: false,
      render: (value, record, index) => (currentPageNumber - 1) * pageSize + index + 1
    },
    {
      key: 'avatar',
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.avatar' }),
      render: (value, record) => (
        <Avatar
          alt="avatar"
          icon={<UserOutlined />}
          shape="circle"
          size="default"
          src={`${assetBaseUrl}${record.avatarUrl}`}
        />
      )
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.username' }),
      dataIndex: 'username'
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.email' }),
      dataIndex: 'email'
    },
    {
      align: 'center',
      search: false,
      key: 'roles',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.role' }),
      render: (value, record) => {
        if (record.roles.length === 0) {
          return '-'
        } else {
          return (
            <div className="roles-body">
              {record.roles.map(role => (
                <Tag key={role.id} color="magenta">
                  {role.roleName}
                </Tag>
              ))}
            </div>
          )
        }
      }
    },
    {
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.state' }),
      dataIndex: 'userState',
      render: (value, record) =>
        record.id !== currentUser?.id && (
          <Switch
            checked={record.userState}
            loading={changingUserState}
            onChange={checked => void changeUserState(record.id, checked)}
          />
        )
    },
    {
      width: 1,
      search: false,
      title: (
        <div className="actions-header">
          <Tag color="processing">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.edit' })}
          </Tag>
          <Tag color="warning">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.assign-roles' })}
          </Tag>
          <Tag color="error">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.delete' })}
          </Tag>
        </div>
      ),
      render: (value, record) =>
        record.id !== currentUser?.id && (
          <div className="actions-body">
            <EditUserModalForm
              currentUser={currentUser}
              initialValues={record}
              reloadTable={tableRef.current?.reload}
            />
            <AssignRolesModalForm
              currentUser={currentUser}
              reloadTable={tableRef.current?.reload}
              user={record}
            />
            <Button
              danger
              disabled={!currentUser?.privilegeMap?.['DELETE_USER']}
              loading={deletingUser}
              type="primary"
            >
              <DeleteOutlined onClick={() => void removeUser(record.id)} />
            </Button>
          </div>
        )
    }
  ]

  const toolbar: ProTableProps<User, UserQueryData>['toolbar'] = {
    title: <Tag color="success">You</Tag>,
    actions: [
      <AddUserModalForm
        key="addUser"
        currentUser={currentUser}
        reloadTable={tableRef.current?.reload}
      />,
      <Upload
        key="importUsers"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        action={`${apiBaseUrl}/api/v1/import-users`}
        beforeUpload={beforeUpload}
        disabled={!currentUser?.privilegeMap?.['IMPORT_USERS']}
        headers={{ Authorization: localStorage.getItem('token') ?? '' }}
        method="post"
        name="file"
        showUploadList={false}
        onChange={handleUpload}
      >
        <Button
          disabled={!currentUser?.privilegeMap?.['IMPORT_USERS']}
          icon={<ImportOutlined />}
          loading={importingUsers}
          type="primary"
        >
          {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.import-users' })}
        </Button>
      </Upload>,
      <Button
        key="exportUsers"
        disabled={!currentUser?.privilegeMap?.['EXPORT_USERS']}
        icon={<ExportOutlined />}
        loading={exportingUsers}
        type="primary"
        onClick={exportUsers}
      >
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.export-users' })}
      </Button>
    ]
  }

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(parseInt(sessionStorage.getItem('userTablePageSize') ?? '10') || 10)

  const pagination: ProTableProps<User, UserQueryData>['pagination'] = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20, 30, 50],
    defaultPageSize: pageSize,
    onChange: (page, pageSize) => {
      setCurrentPageNumber(page)
      setPageSize(pageSize)
      sessionStorage.setItem('userTablePageSize', pageSize.toString(10))
    }
  }


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={header}
    >
      <ProTable<User, UserQueryData>
        bordered
        actionRef={tableRef}
        columns={columns}
        pagination={pagination}
        request={request}
        rowClassName={record => record.id === currentUser?.id ? 'current-user-row' : ''}
        rowKey={record => record.id}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Users
