import { ProFormSelect } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select'


/**
 * Component
 */
const LevelSelect = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const request: ProFormSelectProps['request'] = async () => [
    {
      value: 1,
      label: `${intl.formatMessage({ id: 'pages.admin.privilege-list.table.level.level' })} 1`
    },
    {
      value: 2,
      label: `${intl.formatMessage({ id: 'pages.admin.privilege-list.table.level.level' })} 2`
    }
  ]

  const fieldProps: ProFormSelectProps['fieldProps'] = {
    size: 'large'
  }


  /**
   * Component
   */
  return (
    <ProFormSelect
      allowClear={false}
      fieldProps={fieldProps}
      initialValue={1}
      name="level"
      request={request}
    />
  )
}

export default LevelSelect
