import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authenticationSlice'
import layoutReducer from './layout/layoutSlice'
import type { AnyAction, ThunkAction } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: {
    layout: layoutReducer,
    authentication: authenticationReducer
  }
})


/**
 * Types
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store
