import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
