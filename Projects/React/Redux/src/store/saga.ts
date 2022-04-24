import { takeEvery, put } from 'redux-saga/effects'
import { changeHobby } from './slices/counterSlice'


function* myHandler() {
  yield new Promise(resolve => setTimeout(resolve, 2000)) // 模拟网络请求
  yield put(changeHobby('TypeScript'))
}

export default function* mySaga() {
  yield takeEvery('counter/fetchHobby', myHandler)
}
