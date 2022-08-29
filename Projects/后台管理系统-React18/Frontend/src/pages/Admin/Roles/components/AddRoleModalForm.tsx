import { EyeOutlined, PlusOutlined, TagsOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import RequiredTextInput from '@/pages/components/RequiredTextInput'
import { addRole as addRoleAPI } from '@/services/roles'
import type { ResponseData } from '@/services/types'
import type { User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'


/**
 * Types
 */
export interface AddRoleData {
  roleName: string
  roleDescription: string
}

interface AddRoleFormProps {
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  currentUser: User | null
}


/**
 * Component
 */
const AddRoleModalForm = ({ reloadTable, currentUser }: AddRoleFormProps): JSX.Element => {

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
   * Add user
   */
  const _addRole = async (values: AddRoleData): Promise<void> => {
    let data: ResponseData

    try {
      data = await addRoleAPI(values)
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

  const { loading: addingRole, run: addRole } = useRequest(_addRole, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.role-list.roles.add.submit.text' })
    },
    submitButtonProps: {
      loading: addingRole
    }
  }


  /**
   * Component
   */
  return (
    <>
      <Button
        disabled={!currentUser?.privilegeMap?.['CREATE_ROLE']}
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        {intl.formatMessage({ id: 'pages.admin.role-list.table.actions.add-roles' })}
      </Button>
      <ModalForm<AddRoleData>
        autoFocusFirstInput
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.role-list.roles.add.title' })}
        visible={modalVisible}
        width={400}
        onFinish={async values => void addRole(values)}
        onFinishFailed={() => void message.error(intl.formatMessage({ id: 'pages.admin.role-list.roles.add.data.invalid' }), 3)}
      >
        <RequiredTextInput
          name="roleName"
          placeholder={intl.formatMessage({ id: 'pages.admin.role-list.placeholder.role-name' })}
          prefix={<EyeOutlined />}
          ruleMessage={intl.formatMessage({ id: 'pages.admin.role-list.error-message.role-name.missing' })}
        />
        <RequiredTextInput
          name="roleDescription"
          placeholder={intl.formatMessage({ id: 'pages.admin.role-list.placeholder.role-description' })}
          prefix={<TagsOutlined />}
          ruleMessage={intl.formatMessage({ id: 'pages.admin.role-list.error-message.role-description.missing' })}
        />
      </ModalForm>
    </>
  )
}

export default AddRoleModalForm
