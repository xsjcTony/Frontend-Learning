/* eslint-disable react/require-default-props */

import { ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { Locale } from 'antd/es/locale-provider'
import type { PropsWithChildren } from 'react'


/**
 * Component
 */
const AntdConfigProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [antdLocale, setAntdLocale] = useState<Locale>(enUS)
  const locale = useSelector((state: RootState) => state.layout.locale)

  useEffect(() => {
    const _locale = locale.replace('-', '_')

    import(`../../node_modules/antd/es/locale/${_locale}.js`)
      .then(module => void setAntdLocale(module.default))
      .catch(() => {
        console.error(`Ant Design's locale "${_locale}" does not exist, using default "en_US" instead`)
        setAntdLocale(enUS)
      })
  }, [locale])

  return (
    <ConfigProvider locale={antdLocale}>
      {children}
    </ConfigProvider>
  )
}

export default AntdConfigProvider
