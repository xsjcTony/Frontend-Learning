import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import logo from '@/assets/images/logo.png'


/**
 * Style
 */
const WelcomeContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;

        h1 {
            font-size: 100px;
        }
    }
    
    .guide {
        font-size: 20px;
        color: #999;
        text-align: center;
    }
    
    .account {
        font-size: 30px;
    }
`


/**
 * Component
 */
const Welcome = (): JSX.Element => {

  /**
   * Hook
   */
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.welcome.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Component
   */
  return (
    <WelcomeContainer>
      <div className="logo">
        <img alt="Logo" src={logo} />
        <h1>{intl.formatMessage({ id: 'pages.admin.welcome.title' })}</h1>
      </div>
      <p className="guide">{intl.formatMessage({ id: 'pages.admin.welcome.guide' })}</p>
      <p className="account">{intl.formatMessage({ id: 'pages.admin.welcome.admin-account' })}</p>
    </WelcomeContainer>
  )
}

export default Welcome
