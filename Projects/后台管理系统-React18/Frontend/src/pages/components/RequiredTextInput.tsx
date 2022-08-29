import { ProFormText } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { ReactNode } from 'react'


/**
 * Types
 */
interface RequiredTextInputProps {
  initialValue?: string
  placeholder: string
  ruleMessage: string
  name: string
  prefix?: ReactNode
}


/**
 * Component
 */
const RequiredTextInput = ({
  initialValue = undefined,
  placeholder,
  ruleMessage,
  name,
  prefix = undefined
}: RequiredTextInputProps): JSX.Element => {

  /**
   * Props
   */
  const fieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix
  }

  const rules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: ruleMessage
    }
  ]


  /**
   * Component
   */
  return (
    <ProFormText
      fieldProps={fieldProps}
      initialValue={initialValue}
      name={name}
      placeholder={placeholder}
      rules={rules}
    />
  )
}

export default RequiredTextInput
