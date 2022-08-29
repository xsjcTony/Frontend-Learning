import { EyeOutlined, SettingOutlined } from '@ant-design/icons'
import ProForm, { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { SHOW_PARENT } from 'rc-tree-select'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { getPrivilegesByQuery } from '@/services/privileges'
import { assignPrivileges as assignPrivilegesAPI } from '@/services/roles'
import { flatToAntdTree } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Role, PrivilegeQueryResponse, Privilege, User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '@ant-design/pro-form/es/interface'
import type { InputProps, InputRef, TreeSelectProps } from 'antd'
import type { RefSelectProps } from 'antd/es/select'


/**
 * Types
 */
export interface AssignPrivilegesData {
  roleId: number
  privilegeIds: number[]
}

interface AssignPrivilegesFormProps {
  role: Role
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  currentUser: User | null
}

type ProFormTreeSelectProps = ProFormFieldItemProps<TreeSelectProps, RefSelectProps> & ProFormFieldRemoteProps


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
  role,
  reloadTable,
  currentUser
}: AssignPrivilegesFormProps): JSX.Element => {

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
   * Assign privileges
   */
  const _assignPrivileges = async (values: AssignPrivilegesData): Promise<void> => {
    const t = [...values.privilegeIds]
    t.forEach((p) => {
      availablePrivileges.some((privilege) => {
        if (privilege.id === p && privilege.parentId === 0) {
          availablePrivileges.forEach((item) => {
            if (item.parentId === p && !values.privilegeIds.includes(item.id)) {
              values.privilegeIds.push(item.id)
            }
          })
          return true
        }
        return false
      })
    })

    let data: ResponseData<number[]>

    try {
      data = await assignPrivilegesAPI({ roleId: role.id, privilegeIds: values.privilegeIds })
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

  const { loading: assigningPrivileges, run: assignPrivileges } = useRequest(_assignPrivileges, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.role-list.roles.assign-privileges.submit.text' })
    },
    submitButtonProps: {
      loading: assigningPrivileges
    }
  }


  /**
   * Username
   */
  const roleFieldProps: ProFormFieldItemProps<InputProps, InputRef>['fieldProps'] = {
    size: 'large',
    prefix: <EyeOutlined />
  }


  /**
   * Privileges
   */
  const [availablePrivileges, setAvailablePrivileges] = useState<Privilege[]>([])

  const privilegesFieldProps: ProFormTreeSelectProps['fieldProps'] = {
    size: 'large',
    multiple: true,
    treeCheckable: true,
    treeDefaultExpandAll: true,
    listHeight: 800,
    allowClear: true,
    showCheckedStrategy: SHOW_PARENT
  }

  const getPrivileges: ProFormTreeSelectProps['request'] = async () => {
    let data: ResponseData<PrivilegeQueryResponse>

    try {
      data = await getPrivilegesByQuery({})
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return []
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return []
    }

    setAvailablePrivileges(data.data.rows)

    return flatToAntdTree(data.data.rows, 'privilegeName', 'id')
  }


  /**
   * Component
   */
  return (
    <>
      <StyledButton
        disabled={!currentUser?.privilegeMap?.['DISPATCH_ROLE_PRIVILEGES']}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        <SettingOutlined />
      </StyledButton>
      <ModalForm<AssignPrivilegesData>
        form={formInstance}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.role-list.roles.assign-privileges.title' })}
        visible={modalVisible}
        width={1000}
        onFinish={async values => void assignPrivileges(values)}
      >
        <ProFormText
          disabled
          fieldProps={roleFieldProps}
          initialValue={role.roleName}
          name="username"
        />
        <ProFormTreeSelect
          fieldProps={privilegesFieldProps}
          initialValue={role.privileges.map(privilege => privilege.id)}
          name="privilegeIds"
          request={getPrivileges}
        />
      </ModalForm>
    </>
  )
}

export default AssignRolesModalForm
