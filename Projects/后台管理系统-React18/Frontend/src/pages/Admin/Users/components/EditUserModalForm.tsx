import { EditOutlined } from '@ant-design/icons'
import ProForm, { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import AvatarUpload from '@/pages/components/AvatarUpload'
import EmailInput from '@/pages/components/EmailInput'
import PasswordInput from '@/pages/components/PasswordInput'
import UsernameInput from '@/pages/components/UsernameInput'
import { deleteTempAvatars, updateUser } from '@/services/users'
import type { ResponseData } from '@/services/types'
import type { User } from '@/types'
import type { ModalFormProps } from '@ant-design/pro-form'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'


/**
 * Types
 */
export interface EditUserData {
  username?: string
  email: string
  password?: string
  'password-check'?: string
  avatarUrl?: string
}

interface EditUserFormProps {
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
  initialValues: User
  currentUser: User | null
}


/**
 * Constants
 */
const { useForm } = ProForm


/**
 * Component
 */
const EditUserModalForm = ({
  reloadTable,
  initialValues,
  currentUser
}: EditUserFormProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Avatar
   */
  const [tempAvatarUrls, setTempAvatarUrls] = useState<string[]>([])


  /**
   * Modal
   */
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const modalProps: ModalFormProps['modalProps'] = {
    destroyOnClose: true,
    onCancel: () => {
      void deleteTempAvatars(tempAvatarUrls)
      setModalVisible(false)
    }
  }


  /**
   * Add user
   */
  const _editUser = async (err: ValidateErrorEntity<EditUserData>): Promise<void> => {
    const { errorFields, values } = err

    if (errorFields.length !== 0) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.add.data.invalid' }))
      return Promise.reject()
    }

    if (values.username === '') {
      values.username = undefined
    }

    let data: ResponseData

    try {
      data = await updateUser(initialValues.id, values)
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

    const modifiedTempUrls = [...tempAvatarUrls.slice(0, -1), initialValues.avatarUrl]
    void deleteTempAvatars(modifiedTempUrls)

    setModalVisible(false)

    return Promise.resolve()
  }

  const { loading: editingUser, run: editUser } = useRequest(_editUser, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const [submitterDisabled, setSubmitterDisabled] = useState<boolean>(false)

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.user-list.users.edit.submit.text' })
    },
    submitButtonProps: {
      loading: editingUser,
      disabled: submitterDisabled
    }
  }


  /**
   * Component
   */
  return (
    <>
      <Button
        disabled={!currentUser?.privilegeMap?.['UPDATE_USER']}
        type="primary"
        onClick={() => {
          setTempAvatarUrls([])
          setModalVisible(true)
        }}
      >
        <EditOutlined />
      </Button>
      <ModalForm<EditUserData>
        autoFocusFirstInput
        form={formInstance}
        initialValues={initialValues}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.user-list.users.edit.title' })}
        visible={modalVisible}
        width={400}
        onFinishFailed={err => void editUser(err)}
      >
        <EmailInput register />
        <UsernameInput
          editUser
          register
          placeholder={intl.formatMessage({ id: 'pages.admin.user-list.users.add.username.placeholder' })}
        />
        <PasswordInput editUser register formInstance={formInstance} />
        <AvatarUpload
          changeSubmitterDisabled={setSubmitterDisabled}
          currentUser={currentUser}
          formInstance={formInstance}
          initialAvatarUrl={initialValues.avatarUrl}
          name="avatarUrl"
          setTempAvatarUrls={setTempAvatarUrls}
          tempAvatarUrls={tempAvatarUrls}
        />
      </ModalForm>
    </>
  )
}

export default EditUserModalForm
