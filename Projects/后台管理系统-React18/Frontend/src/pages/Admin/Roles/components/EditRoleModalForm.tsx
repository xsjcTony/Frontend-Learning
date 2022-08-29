import { EditOutlined, EyeOutlined, TagsOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import RequiredTextInput from '@/pages/components/RequiredTextInput'
import { updateRole } from '@/services/roles'
import type { ResponseData } from '@/services/types'
import type { Role, User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'


/**
 * Types
 */
export interface EditRoleData {
  roleName: string
  roleDescription: string
}

interface EditRoleFormProps {
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  initialValues: Role
  currentUser: User | null
}


/**
 * Component
 */
const EditRoleModalForm = ({
  reloadTable,
  initialValues,
  currentUser
}: EditRoleFormProps): JSX.Element => {

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
  const _editRole = async (values: EditRoleData): Promise<void> => {
    let data: ResponseData

    try {
      data = await updateRole(initialValues.id, values)
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

  const { loading: editingRole, run: editRole } = useRequest(_editRole, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.role-list.roles.edit.submit.text' })
    },
    submitButtonProps: {
      loading: editingRole
    }
  }


  /**
   * Component
   */
  return (
    <>
      <Button
        disabled={!currentUser?.privilegeMap?.['UPDATE_ROLE']}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        <EditOutlined />
      </Button>
      <ModalForm<EditRoleData>
        autoFocusFirstInput
        initialValues={initialValues}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.role-list.roles.edit.title' })}
        visible={modalVisible}
        width={400}
        onFinish={async values => void editRole(values)}
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

export default EditRoleModalForm
