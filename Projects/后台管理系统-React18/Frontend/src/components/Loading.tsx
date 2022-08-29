import { Spin } from 'antd'
import { memo } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import type { ReactNode } from 'react'


/**
 * Types
 */
interface LoadingProps {
  tip?: ReactNode
}


/**
 * Style
 */
const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    background: rgba(255, 255, 255, .5);
`


/**
 * Component
 */
const Loading = ({ tip = undefined }: LoadingProps): JSX.Element => {
  const intl = useIntl()

  return (
    <LoadingContainer>
      <Spin
        size="large"
        tip={tip ? tip : intl.formatMessage({ id: 'loading' })}
      />
    </LoadingContainer>
  )
}

export default memo(Loading)
