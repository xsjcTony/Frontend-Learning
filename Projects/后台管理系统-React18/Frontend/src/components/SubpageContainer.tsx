/* eslint-disable react/require-default-props */

import styled from 'styled-components'
import type { PropsWithChildren, ReactNode } from 'react'


/**
 * Types
 */
interface SubpageContainerProps {
  header?: ReactNode
  footer?: ReactNode
  className?: string // for styling by styled-component
}

/**
 * Style
 */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

    .subpage-content {
        margin: 24px 24px 0;
        flex: 1;
    }
`

const SubpageContainer = ({
  header = undefined,
  footer = undefined,
  children = undefined,
  className
}: PropsWithChildren<SubpageContainerProps>): JSX.Element => (
  <Container className={className}>
    {header}
    <div className="subpage-content">{children}</div>
    {footer}
  </Container>
)

export default SubpageContainer
