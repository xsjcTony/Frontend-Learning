import { LockOutlined, SafetyOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import { useBoolean } from 'ahooks'
import { Form, Popover } from 'antd'
import { useIntl } from 'react-intl'
import PasswordStrength from '@/components/PasswordStrength'
import type { FormInstance } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'


/**
 * Types
 */
interface UsernameInputProps {
  register?: boolean
  placeholder?: string
  formInstance: FormInstance
  editUser?: boolean
}


/**
 * Component
 */
const PasswordInput = ({
  register = false,
  placeholder = undefined,
  formInstance,
  editUser = false
}: UsernameInputProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const { useWatch } = Form


  /**
   * Props
   */
  // Login
  const passwordFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <LockOutlined className="prefix-icon" />
  }

  const passwordRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.password.missing' })
    }
  ]


  // Register
  const password = useWatch<string | undefined>('password', formInstance)
  const [passwordPopoverVisible, { setTrue: showPopover, setFalse: hidePopover }] = useBoolean(false)

  // validate methods
  const checkPassword = async (_: unknown, value: string): Promise<void> => {
    const regex = /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/

    if (!value) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password.missing' }))
    }

    void formInstance.validateFields(['password-check'])

    if (!regex.test(value)) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password.rule' }))
    }

    return Promise.resolve()
  }

  const checkConfirmPassword = async (_: unknown, value: string): Promise<void> => {
    if (value && value !== password) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password-check.invalid' }))
    }
    return Promise.resolve()
  }

  // props
  const registerPasswordFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <LockOutlined className="prefix-icon" />,
    onFocus: showPopover,
    onBlur: hidePopover
  }

  const registerPasswordCheckFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <SafetyOutlined className="prefix-icon" />
  }

  // rules
  const registerPasswordCheckRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.password-check.missing' })
    },
    { validator: checkConfirmPassword }
  ]

  /**
   * Edit user
   */
  const editCheckPassword = async (_: unknown, value: string): Promise<void> => {
    const regex = /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/

    if (value === '') {
      formInstance.setFieldsValue({
        password: undefined,
        'password-check': undefined
      })
    }

    void formInstance.validateFields(['password-check'])

    if (!value) {
      return Promise.resolve()
    }

    if (!regex.test(value)) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password.rule' }))
    }

    return Promise.resolve()
  }

  const editCheckConfirmPassword = async (_: unknown, value: string): Promise<void> => {
    if (password === undefined) {
      return Promise.resolve()
    }

    if (value !== password) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password-check.invalid' }))
    }
    return Promise.resolve()
  }


  // Placeholder
  const internalPlaceholder = register
    ? intl.formatMessage({ id: 'pages.register.placeholder.password' })
    : intl.formatMessage({ id: 'pages.login.placeholder.password' })


  /**
   * Component
   */
  if (register) {
    // With password-check
    return (
      <>
        <Popover
          content={<PasswordStrength password={password} />}
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={passwordPopoverVisible}
        >
          <ProFormText.Password
            fieldProps={registerPasswordFieldProps}
            name="password"
            placeholder={placeholder ?? internalPlaceholder}
            rules={editUser ? [{ validator: editCheckPassword }] : [{ validator: checkPassword }]}
          />
        </Popover>
        <ProFormText.Password
          fieldProps={registerPasswordCheckFieldProps}
          name="password-check"
          placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password-check' })}
          rules={editUser ? [{ validator: editCheckConfirmPassword }] : registerPasswordCheckRules}
        />
      </>
    )
  } else {
    // Single password
    return (
      <ProFormText.Password
        fieldProps={passwordFieldProps}
        name="password"
        placeholder={placeholder ?? internalPlaceholder}
        rules={passwordRules}
      />
    )
  }
}

export default PasswordInput
