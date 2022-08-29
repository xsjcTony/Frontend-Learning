import { EyeOutlined, MenuOutlined } from '@ant-design/icons'
import ProForm, { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { SHOW_PARENT } from 'rc-tree-select'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { getMenusByQuery } from '@/services/menus'
import { assignMenus as assignMenusAPI } from '@/services/roles'
import { flatToAntdTree } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Role, Menu, MenuQueryResponse, User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '@ant-design/pro-form/es/interface'
import type { InputProps, InputRef, TreeSelectProps } from 'antd'
import type { RefSelectProps } from 'antd/es/select'


/**
 * Types
 */
export interface AssignMenusData {
  roleId: number
  menuIds: number[]
}

interface AssignMenusFormProps {
  role: Role
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  currentUser: User | null
}

type ProFormTreeSelectProps = ProFormFieldItemProps<TreeSelectProps, RefSelectProps> & ProFormFieldRemoteProps


/**
 * Style
 */
const StyledButton = styled(Button)`
    background-color: #52c41a;
    border-color: #52c41a;

    &:hover,
    &:focus {
        background-color: #73d13d;
        border-color: #73d13d;
    }
`


/**
 * Constants
 */
const { useForm } = ProForm


/**
 * Component
 */
const AssignMenusModalForm = ({
  role,
  reloadTable,
  currentUser
}: AssignMenusFormProps): JSX.Element => {

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
   * Assign menus
   */
  const _assignMenus = async (values: AssignMenusData): Promise<void> => {
    const t = [...values.menuIds]
    t.forEach((p) => {
      availableMenus.some((menu) => {
        if (menu.id === p && menu.parentId === 0) {
          availableMenus.forEach((item) => {
            if (item.parentId === p && !values.menuIds.includes(item.id)) {
              values.menuIds.push(item.id)
            }
          })
          return true
        }
        return false
      })
    })

    let data: ResponseData<number[]>

    try {
      data = await assignMenusAPI({ roleId: role.id, menuIds: values.menuIds })
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

  const { loading: assigningMenus, run: assignMenus } = useRequest(_assignMenus, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.role-list.roles.assign-menus.submit.text' })
    },
    submitButtonProps: {
      loading: assigningMenus
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
   * Menus
   */
  const [availableMenus, setAvailableMenus] = useState<Menu[]>([])

  const menusFieldProps: ProFormTreeSelectProps['fieldProps'] = {
    size: 'large',
    multiple: true,
    treeCheckable: true,
    treeDefaultExpandAll: true,
    listHeight: 800,
    allowClear: true,
    showCheckedStrategy: SHOW_PARENT
  }

  const getMenus: ProFormTreeSelectProps['request'] = async () => {
    let data: ResponseData<MenuQueryResponse>

    try {
      data = await getMenusByQuery({})
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return []
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return []
    }

    setAvailableMenus(data.data.rows)

    return flatToAntdTree(data.data.rows, 'menuDescription', 'id')
  }


  /**
   * Component
   */
  return (
    <>
      <StyledButton
        disabled={!currentUser?.privilegeMap?.['DISPATCH_ROLE_MENUS']}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        <MenuOutlined />
      </StyledButton>
      <ModalForm<AssignMenusData>
        form={formInstance}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.role-list.roles.assign-menus.title' })}
        visible={modalVisible}
        width={1000}
        onFinish={async values => void assignMenus(values)}
      >
        <ProFormText
          disabled
          fieldProps={roleFieldProps}
          initialValue={role.roleName}
          name="username"
        />
        <ProFormTreeSelect
          fieldProps={menusFieldProps}
          initialValue={role.menus.map(menu => menu.id)}
          name="menuIds"
          request={getMenus}
        />
      </ModalForm>
    </>
  )
}

export default AssignMenusModalForm
