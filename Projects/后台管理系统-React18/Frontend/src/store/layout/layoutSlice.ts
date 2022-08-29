import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


/**
 * Types
 */
interface LayoutState {
  locale: string
  assetBaseUrl: string
  apiBaseUrl: string
}


/**
 * Slice
 */
const initialState: LayoutState = {
  locale: localStorage.getItem('locale') ?? 'en-US',
  assetBaseUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : 'http://bms.aelita.me',
  apiBaseUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : 'http://bms.aelita.me'
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      localStorage.setItem('locale', action.payload)
      state.locale = action.payload
    }
  }
})

export const { setLocale } = layoutSlice.actions

export default layoutSlice.reducer
