import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { getRolesByQuery } from '@/services/roles'
import { assignRoles as assignRolesAPI } from '@/services/users'
import type { ResponseData } from '@/services/types'
import type { User, RoleQueryResponse } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { InputProps, InputRef } from 'antd'


/**
 * Types
 */
export interface AssignRolesData {
  userId: number
  roleIds: number[]
}

interface AssignRolesFormProps {
  user: User
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  currentUser: User | null
}


/**
 * Style
 */
const StyledButton = styled(Button)`
    background-color: #faad14;
    border-color: #faad14;

    &:hover,
    &:focus {
        background-color: #ffc53d;
        border-color: #ffc53d;
    }
`


/**
 * Constants
 */
const { useForm } = ProForm


/**
 * Component
 */
const AssignRolesModalForm = ({
  user,
  reloadTable,
  currentUser
}: AssignRolesFormProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Modal
   */
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const modalProps: ModalFormProps['modalProps'] = {
    destroyOnClose: true,
    onCancel: () => void setModalVisible(false)
  }


  /**
   * Assign roles
   */
  const _assignRoles = async (values: AssignRolesData): Promise<void> => {
    let data: ResponseData<number[]>

    try {
      data = await assignRolesAPI({ userId: user.id, roleIds: values.roleIds })
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return Promise.reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return Promise.reject()
    }

    void message.success(intl.formatMessage({ id: data.msg }), 3)

    await reloadTable?.()

    setModalVisible(false)

    return Promise.resolve()
  }

  const { loading: assigningRoles, run: assignRoles } = useRequest(_assignRoles, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.user-list.users.assign-roles.submit.text' })
    },
    submitButtonProps: {
      loading: assigningRoles
    }
  }


  /**
   * Username
   */
  const usernameFieldProps: ProFormFieldItemProps<InputProps, InputRef>['fieldProps'] = {
    size: 'large',
    prefix: <UserOutlined />
  }


  /**
   * Roles
   */
  const rolesFieldProps: ProFormSelectProps['fieldProps'] = {
    size: 'large'
  }

  const getRoles: ProFormSelectProps['request'] = async () => {
    let data: ResponseData<RoleQueryResponse>

    try {
      data = await getRolesByQuery({})
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return []
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return []
    }

    return data.data.rows.map((role) => {
      return { label: role.roleName, value: role.id }
    })
  }


  /**
   * Component
   */
  return (
    <>
      <StyledButton
        disabled={!currentUser?.privilegeMap?.['DISPATCH_USER_ROLES']}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        <SettingOutlined />
      </StyledButton>
      <ModalForm<AssignRolesData>
        form={formInstance}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.user-list.users.assign-roles.title' })}
        visible={modalVisible}
        width={1000}
        onFinish={async values => void assignRoles(values)}
      >
        <ProFormText
          disabled
          fieldProps={usernameFieldProps}
          initialValue={user.username ?? user.email ?? `User ID: ${user.id}`}
          name="username"
        />
        <ProFormSelect
          allowClear
          fieldProps={rolesFieldProps}
          initialValue={user.roles.map(role => role.id)}
          mode="multiple"
          name="roleIds"
          request={getRoles}
        />
      </ModalForm>
    </>
  )
}

export default AssignRolesModalForm
