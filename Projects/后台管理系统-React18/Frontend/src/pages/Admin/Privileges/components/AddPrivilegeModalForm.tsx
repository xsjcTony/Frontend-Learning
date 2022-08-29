import { PlusOutlined, SafetyCertificateOutlined, TagsOutlined } from '@ant-design/icons'
import ProForm, { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, Form, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import LevelSelect from '@/pages/Admin/Privileges/components/LevelSelect'
import ParentPrivilegeSelect from '@/pages/Admin/Privileges/components/ParentPrivilegeSelect'
import PrivilegeUrlInput from '@/pages/Admin/Privileges/components/PrivilegeUrlInput'
import RequestMethodSelect from '@/pages/Admin/Privileges/components/RequestMethodSelect'
import RequiredTextInput from '@/pages/components/RequiredTextInput'
import { addPrivilege as addPrivilegeAPI } from '@/services/privileges'
import type { ResponseData } from '@/services/types'
import type { User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'


/**
 * Types
 */
export interface AddPrivilegeData {
  privilegeName: string
  privilegeDescription: string
  level: 1 | 2
  requestMethod?: 'delete' | 'get' | 'post' | 'put'
  privilegeUrl?: string
  parentId: number
}

interface AddPrivilegeFormProps {
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  currentUser: User | null
}


/**
 * Constants
 */
const { useForm } = ProForm
const { useWatch } = Form


/**
 * Component
 */
const AddPrivilegeModalForm = ({ reloadTable, currentUser }: AddPrivilegeFormProps): JSX.Element => {

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
  const _addPrivilege = async (values: AddPrivilegeData): Promise<void> => {
    if (values.level === 1) {
      values.parentId = 0
    }

    let data: ResponseData

    try {
      data = await addPrivilegeAPI(values)
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

  const { loading: addingPrivilege, run: addPrivilege } = useRequest(_addPrivilege, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.privilege-list.privileges.add.submit.text' })
    },
    submitButtonProps: {
      loading: addingPrivilege
    }
  }


  /**
   * Level
   */
  const level = useWatch<AddPrivilegeData['level']>('level', formInstance)


  /**
   * Component
   */
  return (
    <>
      <Button
        disabled={!currentUser?.privilegeMap?.['CREATE_PRIVILEGE']}
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        {intl.formatMessage({ id: 'pages.admin.privilege-list.table.actions.add-privilege' })}
      </Button>
      <ModalForm<AddPrivilegeData>
        autoFocusFirstInput
        form={formInstance}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.privilege-list.privileges.add.title' })}
        visible={modalVisible}
        width={400}
        onFinish={async values => void addPrivilege(values)}
        onFinishFailed={() => void message.error(intl.formatMessage({ id: 'pages.admin.privilege-list.privileges.add.data.invalid' }), 3)}
      >
        <RequiredTextInput
          name="privilegeName"
          placeholder={intl.formatMessage({ id: 'pages.admin.privilege-list.placeholder.privilege-name' })}
          prefix={<SafetyCertificateOutlined />}
          ruleMessage={intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.privilege-name.missing' })}
        />
        <RequiredTextInput
          name="privilegeDescription"
          placeholder={intl.formatMessage({ id: 'pages.admin.privilege-list.placeholder.privilege-description' })}
          prefix={<TagsOutlined />}
          ruleMessage={intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.privilege-description.missing' })}
        />
        <LevelSelect />
        {level !== 1 && (
          <>
            <ParentPrivilegeSelect />
            <RequestMethodSelect />
            <PrivilegeUrlInput />
          </>
        )}
      </ModalForm>
    </>
  )
}

export default AddPrivilegeModalForm
