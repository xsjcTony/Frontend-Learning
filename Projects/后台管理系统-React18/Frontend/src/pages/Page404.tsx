import { useTitle } from 'ahooks'
import { Button, Result } from 'antd'
import { memo } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SelectLanguage from '@/locales/components/SelectLanguage'


/**
 * Types
 */
interface Page404Props {
  homePath?: string
  lang?: boolean
}


/**
 * Style
 */
const CenteredContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FixedSelectLanguage = styled(SelectLanguage)`
    position: fixed;
    top: 5px;
    right: 25px;
`

/**
 * Component
 */
const Page404 = ({ homePath = '/', lang = false }: Page404Props): JSX.Element => {
  const intl = useIntl()
  const navigate = useNavigate()

  useTitle(`404 - ${intl.formatMessage({ id: 'title' })}`)

  return (
    <CenteredContainer>
      <Result
        extra={(
          <Button
            type="primary"
            onClick={() => void navigate(homePath, { replace: true })}
          >
            {intl.formatMessage({ id: 'pages.404.back' })}
          </Button>
        )}
        status="404"
        subTitle={intl.formatMessage({ id: 'pages.404.description' })}
        title="404"
      />
      {lang && <FixedSelectLanguage size="24" />}
    </CenteredContainer>
  )
}

export default memo(Page404)
