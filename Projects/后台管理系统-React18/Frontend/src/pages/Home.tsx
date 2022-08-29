import { useTitle } from 'ahooks'
import { Button, message } from 'antd'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '@/assets/images/logo.png'
import Footer from '@/components/Footer'
import SelectLanguage from '@/locales/components/SelectLanguage'
import { setCurrentUser, setLoggedIn } from '@/store/authentication/authenticationSlice'
import type { AppDispatch, RootState } from '@/store'


/**
 * Style
 */
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;

    .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;

        .logout {
            cursor: pointer;
            padding: 10px 10px;
            border-radius: 5px;

            &:hover {
                background: #ddd;
            }
        }

        span {
            margin: 5px 25px 0 0;

            &:hover {
                background: #ddd;
                border-radius: 5px;
            }
        }
    }

    .container {
        padding: 0 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        gap: 100px;

        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            user-select: none;

            img {
                height: 100px;
                margin-right: 10px;
            }

            h1 {
                font-size: 40px;
            }
        }

        .welcome {
            color: #999;
            text-align: center;
        }

        .actions {
            display: flex;
            gap: 30px;
        }
    }
`


/**
 * Component
 */
const Home = (): JSX.Element => {
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
  const navigate = useNavigate()
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.authentication.currentUser)


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.home.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Logout
   */
  const logout = (): void => {
    localStorage.removeItem('token')
    dispatch(setLoggedIn(false))
    dispatch(setCurrentUser(null))
    void message.success(intl.formatMessage({ id: 'success.logout' }), 3)
  }


  /**
   * Component
   */
  return (
    <HomeContainer>
      <div className="header">
        {loggedIn && (
          <div
            className="logout"
            onClick={logout}
          >
            {intl.formatMessage({ id: 'pages.home.logout' })}
          </div>
        )}
        <SelectLanguage size="24" />
      </div>
      <div className="container">
        <div className="title">
          <img alt="logo" src={logo} />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        {loggedIn
          ? (
            <h2>
              {intl.formatMessage({ id: 'pages.home.hi' })}
              {currentUser?.username ?? currentUser?.email ?? 'Placeholder'}
            </h2>
          )
          : <h2 className="welcome">{intl.formatMessage({ id: 'pages.home.welcome' })}</h2>}
        {
          loggedIn
            ? (
              <Button
                size="large"
                type="primary"
                onClick={() => void navigate('/admin', { replace: false })}
              >
                {intl.formatMessage({ id: 'pages.home.dashboard' })}
              </Button>
            )
            : (
              <div className="actions">
                <Button
                  size="large"
                  type="primary"
                  onClick={() => void navigate('/login', { replace: false })}
                >
                  {intl.formatMessage({ id: 'pages.home.login' })}
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => void navigate('/register', { replace: false })}
                >
                  {intl.formatMessage({ id: 'pages.home.register' })}
                </Button>
              </div>
            )
        }
      </div>
      <Footer iconSize="18" textSize="16" />
    </HomeContainer>
  )
}

export default Home
