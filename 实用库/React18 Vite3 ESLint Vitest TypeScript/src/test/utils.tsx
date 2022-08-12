/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import type { RenderOptions } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'


afterEach(() => {
  cleanup()
})


// wrap provider(s) here if needed
const AllProviders = ({ children }: PropsWithChildren): JSX.Element => <>{children}</>

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })


export * from '@testing-library/react'
// override render export
export { customRender as render }
