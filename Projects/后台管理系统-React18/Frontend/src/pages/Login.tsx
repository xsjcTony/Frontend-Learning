import { GithubOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProForm } from '@ant-design/pro-form'
import { useRequest, useTitle } from 'ahooks'
import { Tabs, Divider, Button, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '@/assets/images/logo.png'
import Footer from '@/components/Footer'
import SelectLanguage from '@/locales/components/SelectLanguage'
import { loginUser } from '@/services/login'
import { getUserById } from '@/services/users'
import { setCurrentUser, setLoggedIn } from '@/store/authentication/authenticationSlice'
import { isPromptInfo } from '@/types/locationState'
import { buildAllowedRoutePathsByUser, buildMenuTreeByUser, buildPrivilegeMapByUser } from '@/utils'
import EmailInput from './components/EmailInput'
import ImageCaptcha from './components/ImageCaptcha'
import PasswordInput from './components/PasswordInput'
import UsernameInput from './components/UsernameInput'
import type { ResponseData } from '@/services/types'
import type { AppDispatch, RootState } from '@/store'
import type { User, UserWithJWT } from '@/types'
import type { LoginFormProps } from '@ant-design/pro-form'
import type { TabsProps } from 'antd'


/**
 * Types
 */
type LoginType = 'account' | 'email'

interface BaseLoginData {
  password: string
  captcha: string
  remember: boolean
}

export interface AccountLoginData extends BaseLoginData {
  username: string
}

export interface EmailLoginData extends BaseLoginData {
  email: string
}


/**
 * Style
 */
const LoginContainer = styled.div`
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

    .login-form-container {
        flex: 1;
        padding: 30px 0;

        .actions {
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
        }

        .ant-pro-form-login-other {
            .other-login {
                display: flex;
                align-items: center;

                .anticon {
                    font-size: 24px;
                    color: rgba(0, 0, 0, .2);
                    cursor: pointer;
                    transition: all .3s;
                    margin-left: 15px;

                    &:hover {
                        color: #000;
                    }
                }
            }

            .divider {
                user-select: none;
                color: #ccc;
            }
        }

        .prefix-icon {
            color: #ccc;
        }

        .register-button,
        .login-button {
            width: 100%;
        }
    }
`


/**
 * Constants
 */
const { TabPane } = Tabs
const { useForm } = ProForm


/**
 * Component
 */
const Login = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.login.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Prompt
   */
  useEffect(() => {
    if (isPromptInfo(location.state)) {
      const { type, intlId, duration } = location.state.promptInfo
      void message[type](intl.formatMessage({ id: intlId }), duration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  /**
   * Tabs
   */
  const [loginType, setLoginType] = useState<LoginType>('account')

  const changeTab: TabsProps['onChange'] = (activeKey: string): void => {
    formInstance.resetFields()
    setLoginType(activeKey as LoginType)
  }


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formActions: LoginFormProps<Record<string, any>>['actions'] = (
    <>
      <div className="other-login">
        {intl.formatMessage({ id: 'pages.login.other' })}
        <a href={`${apiBaseUrl}/api/v1/github`}>
          <GithubOutlined />
        </a>
      </div>
      <Divider plain className="divider">
        {intl.formatMessage({ id: 'pages.login.or' })}
      </Divider>
      <Button
        className="register-button"
        size="large"
        onClick={() => void navigate('/register', { replace: false })}
      >
        {intl.formatMessage({ id: 'pages.login.register' })}
      </Button>
    </>
  )

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="login-button"
        loading={loggingIn}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.login.login' })}
      </Button>
    )
  }


  /**
   * Captcha
   */
  const [captchaSrc, setCaptchaSrc] = useState<string>(`${apiBaseUrl}/api/v1/captcha?t=${Date.now()}`)

  const refreshCaptcha = useCallback(() => void setCaptchaSrc(`${apiBaseUrl}/api/v1/captcha?t=${Date.now()}`), [apiBaseUrl])


  /**
   * Login
   */
  const _login = async (values: AccountLoginData | EmailLoginData): Promise<void> => new Promise(async (resolve, reject) => {
    // Remember me: default to false (Because it won't be in values if it's not changed at all)
    if (!values.remember) {
      values.remember = false
    }

    let loginResponse: ResponseData<UserWithJWT>

    try {
      loginResponse = await loginUser(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (loginResponse.code !== 200) {
      void message.error(intl.formatMessage({ id: loginResponse.msg }), 3)
      refreshCaptcha()
      return void reject()
    }

    // save JWT token into Local Storage
    localStorage.setItem('token', loginResponse.data.token)

    // fetch user data with roles
    let userResponse: ResponseData<User>

    try {
      userResponse = await getUserById(loginResponse.data.id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (userResponse.code !== 200) {
      void message.error(intl.formatMessage({ id: userResponse.msg }), 3)
      refreshCaptcha()
      return void reject()
    }

    const user = userResponse.data

    // Privilege map
    user.privilegeMap = buildPrivilegeMapByUser(user)

    // Menu tree
    user.menuTree = await buildMenuTreeByUser(user)

    // Allowed route paths
    user.allowedRoutePaths = await buildAllowedRoutePathsByUser(user)

    // Redux
    dispatch(setLoggedIn(true))
    dispatch(setCurrentUser(user))

    void message.success(intl.formatMessage({ id: loginResponse.msg }), 3)
    navigate('/admin', { replace: false })
    resolve()
  })

  const { loading: loggingIn, run: login } = useRequest(_login, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  /**
   * Component
   */
  return (
    <LoginContainer>
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
      <div className="login-form-container">
        <LoginForm
          actions={formActions}
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinish={async (values: AccountLoginData | EmailLoginData) => void login(values)}
          onFinishFailed={() => void message.error(intl.formatMessage({ id: 'pages.login.error-message.data.invalid' }))}
        >
          <Tabs
            activeKey={loginType}
            onChange={changeTab}
          >
            <TabPane
              key="account"
              tab={intl.formatMessage({ id: 'pages.login.login-type.account' })}
            />
            <TabPane
              key="email"
              tab={intl.formatMessage({ id: 'pages.login.login-type.email' })}
            />
          </Tabs>
          {loginType === 'account' && <UsernameInput />}
          {loginType === 'email' && <EmailInput />}
          <PasswordInput formInstance={formInstance} />
          <ImageCaptcha refresh={refreshCaptcha} src={captchaSrc} />
          <div className="actions">
            <ProFormCheckbox noStyle name="remember">
              {intl.formatMessage({ id: 'pages.login.actions.remember-me' })}
            </ProFormCheckbox>
            <Link replace={false} to="/reset_password/verify">
              {intl.formatMessage({ id: 'pages.login.actions.forgot-password' })}
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </LoginContainer>
  )
}

export default Login
