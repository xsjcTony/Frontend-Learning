/**
 * Types
 */


import { CheckOutlined } from '@ant-design/icons'
import { ProFormCaptcha } from '@ant-design/pro-form'
import { useBoolean } from 'ahooks'
import { message } from 'antd'
import { useIntl } from 'react-intl'
import { sendVerificationEmail } from '@/services/register'
import type { ResponseData } from '@/services/types'
import type { FormInstance, ProFormCaptchaProps } from '@ant-design/pro-form'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'
import type { ReactNode } from 'react'


/**
 * Types
 */
interface EmailCaptchaProps {
  formInstance: FormInstance
  email: string | undefined
}


/**
 * Component
 */
const EmailCaptcha = ({ formInstance, email }: EmailCaptchaProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()

  const [emailSent, { setTrue: setEmailSent }] = useBoolean(false)

  const getCaptcha: ProFormCaptchaProps['onGetCaptcha'] = async (): Promise<void> => {
    try {
      await formInstance.validateFields(['email'])
    } catch (err) {
      void message.error((err as ValidateErrorEntity).errorFields[0].errors[0], 3)
      throw new Error()
    }

    if (!email) {
      void message.error('Invalid E-mail address')
      throw new Error()
    }

    let data: ResponseData

    try {
      data = await sendVerificationEmail({ email })
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      throw new Error()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: 'pages.register.message.send-captcha.error' }), 3)
      throw new Error()
    }

    void message.success(intl.formatMessage({ id: 'pages.register.message.send-captcha.success' }), 3)
    setEmailSent()
  }

  const captchaTextRender: ProFormCaptchaProps['captchaTextRender'] = (timing: boolean, count: number): ReactNode =>
    timing ? `${count}s` : emailSent
      ? intl.formatMessage({ id: 'pages.register.captcha.button.resend' })
      : intl.formatMessage({ id: 'pages.register.captcha.button.send' })

  const verificationCodeFieldProps: ProFormCaptchaProps['fieldProps'] = {
    size: 'large',
    prefix: <CheckOutlined className="prefix-icon" />,
    showCount: true,
    maxLength: 4
  }

  const verificationCodeRules: ProFormCaptchaProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.invalid' })
    }
  ]

  return (
    <ProFormCaptcha
      captchaProps={{ size: 'large' }}
      captchaTextRender={captchaTextRender}
      countDown={60}
      fieldProps={verificationCodeFieldProps}
      name="captcha"
      placeholder={intl.formatMessage({ id: 'pages.register.placeholder.captcha' })}
      rules={verificationCodeRules}
      onGetCaptcha={getCaptcha}
    />
  )
}

export default EmailCaptcha
