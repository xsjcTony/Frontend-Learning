import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, AnyAction, ThunkAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'


interface CounterState {
  count: number
  name: string
  hobby: string
}

const initialState: CounterState = {
  count: 0,
  name: 'Aelita',
  hobby: 'JavaScript'
}

type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    changeHobby: (state, action: PayloadAction<string>) => {
      state.hobby = action.payload
    },
    fetchHobby: () => {} // type为 'counter/fetchHobby'
  }
})

export const { increment, decrement, changeName, changeHobby, fetchHobby } = counterSlice.actions

export const fetchName = (name: string): AppThunk<void> => (dispatch, getState) => {
  setTimeout(() => { // 模拟网络请求
    dispatch(changeName(name))
  }, 2000)
}

export default counterSlice.reducer
