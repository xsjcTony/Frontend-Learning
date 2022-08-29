import { Progress } from 'antd'
import { useIntl } from 'react-intl'
import styled from 'styled-components'


/**
 * Types
 */
interface PasswordStrengthProps {
  password: string | undefined
}


/**
 * Style
 */
const StyledProgress = styled(Progress)`
    &.ant-progress-status-normal .ant-progress-bg {
        background: #faad14;
    }
`


/**
 * Data
 */
const passwordProgressMap = {
  high: 'success' as const,
  medium: 'normal' as const,
  low: 'exception' as const
}


/**
 * Methods
 */
const getPasswordStatus = (password: string | undefined): 'high' | 'low' | 'medium' => {
  if (password && password.length >= 9) {
    return 'high'
  }

  if (password && password.length >= 5) {
    return 'medium'
  }

  return 'low'
}


/**
 * Component
 */
const PasswordStrength = ({ password }: PasswordStrengthProps): JSX.Element => {
  const intl = useIntl()

  const passwordStrengthMap: Record<string, JSX.Element> = {
    low: (
      <div style={{ color: '#f5222d' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.low' })}
      </div>
    ),
    medium: (
      <div style={{ color: '#faad14' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.medium' })}
      </div>
    ),
    high: (
      <div style={{ color: '#52c41a' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.high' })}
      </div>
    )
  }

  return (
    <div style={{ padding: '4px 0' }}>
      {passwordStrengthMap[getPasswordStatus(password)]}
      <StyledProgress
        percent={password ? password.length * 10 > 100 ? 100 : password.length * 10 : 0}
        showInfo={false}
        status={passwordProgressMap[getPasswordStatus(password)]}
        strokeWidth={6}
      />
      <div style={{ marginTop: 10 }}>
        {intl.formatMessage({ id: 'pages.register.error-message.password.rule' })}
      </div>
    </div>
  )
}

export default PasswordStrength
