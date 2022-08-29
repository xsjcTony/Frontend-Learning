import { UserOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'


/**
 * Types
 */
interface UsernameInputProps {
  initialValue?: string
  register?: boolean
  placeholder?: string
  editUser?: boolean
}


/**
 * Component
 */
const UsernameInput = ({
  initialValue = undefined,
  register = false,
  placeholder = undefined,
  editUser = false
}: UsernameInputProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const usernameFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <UserOutlined className="prefix-icon" />,
    maxLength: 20
  }

  const usernameRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.username.missing' })
    }
  ]

  const registerUsernameFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <UserOutlined className="prefix-icon" />,
    maxLength: 20,
    showCount: true
  }

  const registerUsernameRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.username.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{6,20}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.username.rule' })
    }
  ]

  const internalPlaceholder = register
    ? intl.formatMessage({ id: 'pages.register.placeholder.username' })
    : intl.formatMessage({ id: 'pages.login.placeholder.username' })

  const editUsernameRules: ProFormFieldItemProps['rules'] = [
    {
      required: false
    },
    {
      pattern: /^[A-Za-z0-9]{6,20}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.username.rule' })
    }
  ]


  /**
   * Component
   */
  return (
    <ProFormText
      fieldProps={register ? registerUsernameFieldProps : usernameFieldProps}
      initialValue={initialValue}
      name="username"
      placeholder={placeholder ?? internalPlaceholder}
      rules={editUser ? editUsernameRules : register ? registerUsernameRules : usernameRules}
    />
  )
}

export default UsernameInput
