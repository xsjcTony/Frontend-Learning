/* eslint 'react/require-default-props': 'off' */

import { Dropdown, Menu } from 'antd'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import i18nLanguageMap from '@/locales/constants/i18nLanguageMap'
import { setLocale } from '@/store/layout/layoutSlice'
import type { I18nLocales } from '@/locales/constants/i18nLanguageMap'
import type { RootState, AppDispatch } from '@/store'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { MenuClickEventHandler, MenuInfo } from 'rc-menu/es/interface'


/**
 * Types
 */
interface SelectLanguageProps {
  className?: string
  color?: string
  size?: number | string
}


/**
 * Utils
 */
const getAllLocales = (): I18nLocales[] => (
  Object.keys(import.meta.glob('../*.ts'))
    .map(key => key
      .replace('../', '')
      .replace('.ts', '')
    )
) as I18nLocales[]


/**
 * Style
 */
const IconContainer = styled.span<{ size: number | string }>`
    cursor: pointer;
    padding: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    font-size: ${props => props.size}px;
    color: ${props => props.color}
`


/**
 * Component
 */
const SelectLanguage = ({ className, color = 'rgba(0, 0, 0, .85)', size = 18 }: SelectLanguageProps): JSX.Element => {
  const locale = useSelector((state: RootState) => state.layout.locale)
  const dispatch = useDispatch<AppDispatch>()

  const availableLanguages: ItemType[] = getAllLocales().map((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const _lang = i18nLanguageMap[key] ?? {
      lang: key,
      label: key,
      icon: '🌐',
      title: key
    }

    return {
      key,
      icon: <span>{_lang.icon}</span>,
      label: _lang.label
    }
  })

  const selectLanguage: MenuClickEventHandler = ({ key }: MenuInfo) => {
    dispatch(setLocale(key))
  }

  const menu = (
    <Menu
      items={availableLanguages}
      selectedKeys={[locale]}
      onClick={selectLanguage}
    />
  )


  return (
    <Dropdown
      className={className}
      overlay={menu}
    >
      <IconContainer color={color} size={size}>
        <svg
          fill="currentColor"
          height="1em"
          viewBox="0 0 24 24"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z " />
        </svg>
      </IconContainer>
    </Dropdown>
  )
}

export default memo(SelectLanguage)
