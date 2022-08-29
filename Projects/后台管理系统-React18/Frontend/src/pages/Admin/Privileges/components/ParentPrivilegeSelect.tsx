import { ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { useIntl } from 'react-intl'
import { getPrivilegesByQuery } from '@/services/privileges'
import type { ResponseData } from '@/services/types'
import type { PrivilegeQueryResponse } from '@/types'
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select'


/**
 * Types
 */
interface ParentPrivilegeSelectProps {
  currentId?: number
}


/**
 * Component
 */
const ParentPrivilegeSelect = ({ currentId = undefined }: ParentPrivilegeSelectProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const request: ProFormSelectProps['request'] = async () => {
    let data: ResponseData<PrivilegeQueryResponse>

    try {
      data = await getPrivilegesByQuery({ level: 1 })
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return []
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return []
    }

    return data.data.rows.filter(privilege => privilege.id !== currentId).map((privilege) => {
      return {
        label: privilege.privilegeName,
        value: privilege.id
      }
    })
  }

  const fieldProps: ProFormSelectProps['fieldProps'] = {
    size: 'large'
  }

  const rules: ProFormSelectProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.admin.privilege-list.error-message.parent-privilege.missing' })
    }
  ]


  /**
   * Component
   */
  return (
    <ProFormSelect
      allowClear={false}
      fieldProps={fieldProps}
      name="parentId"
      placeholder={intl.formatMessage({ id: 'pages.admin.privilege-list.placeholder.parent-privilege' })}
      request={request}
      rules={rules}
    />
  )
}

export default ParentPrivilegeSelect
