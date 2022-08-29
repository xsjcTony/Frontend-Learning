import { MailOutlined } from '@ant-design/icons'
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
}


/**
 * Component
 */
const EmailInput = ({
  initialValue = undefined,
  register = false,
  placeholder = undefined
}: UsernameInputProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const emailFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <MailOutlined className="prefix-icon" />
  }

  const emailRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.email.missing' })
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: intl.formatMessage({ id: 'pages.login.error-message.email.invalid' })
    }
  ]

  const registerEmailFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <MailOutlined className="prefix-icon" />
  }

  const registerEmailRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.email.missing' })
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.email.invalid' })
    }
  ]

  const internalPlaceholder = register
    ? intl.formatMessage({ id: 'pages.register.placeholder.email' })
    : intl.formatMessage({ id: 'pages.login.placeholder.email' })


  /**
   * Component
   */
  return (
    <ProFormText
      fieldProps={register ? registerEmailFieldProps : emailFieldProps}
      initialValue={initialValue}
      name="email"
      placeholder={placeholder ?? internalPlaceholder}
      rules={register ? registerEmailRules : emailRules}
    />
  )
}

export default EmailInput
