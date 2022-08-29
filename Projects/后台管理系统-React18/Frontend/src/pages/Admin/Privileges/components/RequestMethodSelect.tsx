import { ProFormSelect } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select'


const RequestMethodSelect = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const valueEnum: ProFormSelectProps['valueEnum'] = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    'delete': 'DELETE'
  }

  const fieldProps: ProFormSelectProps['fieldProps'] = {
    size: 'large'
  }

  const rules: ProFormSelectProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.request-method.missing' })
    }
  ]


  /**
   * Component
   */
  return (
    <ProFormSelect
      allowClear={false}
      fieldProps={fieldProps}
      name="requestMethod"
      placeholder={intl.formatMessage({ id: 'pages.admin.privilege-list.placeholder.request-method' })}
      rules={rules}
      valueEnum={valueEnum}
    />
  )
}

export default RequestMethodSelect
