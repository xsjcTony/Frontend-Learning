import { LoginForm, ProForm } from '@ant-design/pro-form'
import { useRequest, useTitle } from 'ahooks'
import { Button, Form, message } from 'antd'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '@/assets/images/logo.png'
import Footer from '@/components/Footer'
import SelectLanguage from '@/locales/components/SelectLanguage'
import EmailCaptcha from '@/pages/components/EmailCaptcha'
import EmailInput from '@/pages/components/EmailInput'
import { verifyEmail } from '@/services/resetPassword'
import type { ResponseData } from '@/services/types'
import type { LoginFormProps } from '@ant-design/pro-form'


/**
 * Types
 */
export interface VerifyEmailData {
  email: string
  captcha: string
}


/**
 * Style
 */
const VerifyEmailContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;

        .logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            margin-left: 25px;

            img {
                height: 30px;
                margin-right: 10px;
            }

            h1 {
                line-height: 30px;
                font-size: 18px;
            }
        }

        & > span {
            margin: 5px 25px 0 0;
        }
    }

    .verify-form-container {
        flex: 1;
        padding: 30px 0;

        .prefix-icon {
            color: #ccc;
        }

        .verify-button {
            width: 100%;
        }
    }
`


/**
 * Constants
 */
const { useForm } = ProForm
const { useWatch } = Form


/**
 * Component
 */
const Verify = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.reset-password.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="verify-button"
        loading={verifying}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.reset-password.verify.verify' })}
      </Button>
    )
  }


  /**
   * Email
   */
  const email = useWatch<string | undefined>('email', formInstance)


  /**
   * Verify
   */
  const _verify = async (values: VerifyEmailData): Promise<void> => new Promise(async (resolve, reject) => {
    let data: ResponseData

    try {
      data = await verifyEmail(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return void reject()
    }

    void message.success(intl.formatMessage({ id: data.msg }), 3)
    navigate('/reset_password/reset', {
      replace: false,
      state: {
        email: values.email,
        verified: true
      }
    })
    resolve()
  })

  const { loading: verifying, run: verify } = useRequest(_verify, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Component
   */
  return (
    <VerifyEmailContainer>
      <div className="header">
        <div
          className="logo"
          onClick={() => void navigate('/', { replace: false })}
        >
          <img alt="logo" src={logo} />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        <SelectLanguage size="24" />
      </div>
      <div className="verify-form-container">
        <LoginForm
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'pages.reset-password.verify.subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinish={async (values: VerifyEmailData) => void verify(values)}
        >
          <EmailInput register />
          <EmailCaptcha email={email} formInstance={formInstance} />
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </VerifyEmailContainer>
  )
}

export default Verify
