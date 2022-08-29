import { createSlice } from '@reduxjs/toolkit'
import type { User } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'


/**
 * Types
 */
interface AuthenticationState {
  loggedIn: boolean
  currentUser: User | null
}


/**
 * Slice
 */
const initialState: AuthenticationState = {
  loggedIn: false,
  currentUser: null
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    }
  }
})

export const { setLoggedIn, setCurrentUser } = authenticationSlice.actions

export default authenticationSlice.reducer
