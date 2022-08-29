import { CodeOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import type { InputProps } from 'antd'
import type { InputRef } from 'antd/lib/input'


const PrivilegeUrlInput = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const rules: ProFormFieldItemProps<InputProps, InputRef>['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.privilege-url.missing' })
    },
    {
      pattern: /^\/\S*$/,
      message: intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.privilege-url.invalid' })
    }
  ]

  const fieldProps: ProFormFieldItemProps<InputProps, InputRef>['fieldProps'] = {
    size: 'large',
    prefix: <CodeOutlined />
  }


  /**
   * Component
   */
  return (
    <ProFormText
      fieldProps={fieldProps}
      name="privilegeUrl"
      placeholder={intl.formatMessage({ id: 'pages.admin.privilege-list.placeholder.privilege-url' })}
      rules={rules}
    />
  )
}

export default PrivilegeUrlInput
