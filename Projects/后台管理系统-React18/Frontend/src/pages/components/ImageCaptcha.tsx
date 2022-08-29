import { CheckOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'


/**
 * Types
 */
interface ImageCaptchaProps {
  src: string
  refresh: () => void
}


/**
 * Style
 */
const CaptchaContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .captcha-image {
        height: 40px;
        cursor: pointer;
    }
`


/**
 * Component
 */
const ImageCaptcha = ({ src, refresh }: ImageCaptchaProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Props
   */
  const captchaFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <CheckOutlined className="prefix-icon" />,
    maxLength: 4,
    showCount: true
  }

  const captchaRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.captcha.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: intl.formatMessage({ id: 'pages.login.error-message.captcha.invalid' })
    }
  ]


  /**
   * Component
   */
  return (
    <CaptchaContainer>
      <ProFormText
        fieldProps={captchaFieldProps}
        name="captcha"
        placeholder={intl.formatMessage({ id: 'pages.login.placeholder.captcha' })}
        rules={captchaRules}
      />
      <img
        alt="captcha"
        className="captcha-image"
        src={src}
        onClick={refresh}
      />
    </CaptchaContainer>
  )
}

export default ImageCaptcha
