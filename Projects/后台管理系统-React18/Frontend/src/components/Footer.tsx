import { FacebookOutlined, GithubOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'
import styled from 'styled-components'
import type { FooterProps } from '@ant-design/pro-layout'


/**
 * Types
 */
interface StyledFooterProps {
  iconSize?: number | string
  textSize?: number | string
}


/**
 * Constants
 */
const footerLinks: FooterProps['links'] = [
  {
    key: 'github',
    title: <GithubOutlined />,
    href: 'https://github.com/xsjcTony',
    blankTarget: true
  },
  {
    key: 'youtube',
    title: <YoutubeOutlined />,
    href: 'https://www.youtube.com/channel/UCYVhIP1-wyBqLo5TK_jhlNg',
    blankTarget: true
  },
  {
    key: 'twitter',
    title: <TwitterOutlined />,
    href: 'https://twitter.com/xsjctony',
    blankTarget: true
  },
  {
    key: 'facebook',
    title: <FacebookOutlined />,
    href: 'https://www.facebook.com/xsjctony',
    blankTarget: true
  }
]


/**
 * Style
 */
const StyledFooter = styled(DefaultFooter)<StyledFooterProps>`
    .ant-pro-global-footer-copyright {
        font-size: ${props => props.textSize}px;
    }
    
    .ant-pro-global-footer-links {
        .anticon {
            font-size: ${props => props.iconSize}px;
        }
    }
`


/**
 * Component
 */
const Footer = ({ iconSize = 14, textSize = 14 }: StyledFooterProps): JSX.Element => (
  <StyledFooter
    copyright="Aelita 2022"
    iconSize={iconSize}
    links={footerLinks}
    textSize={textSize}
  />
)

export default Footer
