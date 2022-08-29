/* eslint-disable react/require-default-props */

import { useEffect, useState } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import enUS from './en-US'
import type { RootState } from '@/store'
import type { PropsWithChildren } from 'react'


/**
 * Component
 */
const IntlProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [message, setMessage] = useState(enUS)
  const locale = useSelector((state: RootState) => state.layout.locale)

  useEffect(() => {
    import(`../locales/${locale}.ts`)
      .then(module => void setMessage(module.default))
      .catch(() => {
        console.error(`Locale "${locale}" does not exist, using default "en-US" instead`)
        setMessage(enUS)
      })
  }, [locale])

  return (
    <ReactIntlProvider defaultLocale="en-US" locale={locale} messages={message}>
      {children}
    </ReactIntlProvider>
  )
}

export default IntlProvider
