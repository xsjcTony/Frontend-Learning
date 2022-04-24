import { useReducer } from 'react'


const App = (): JSX.Element => {
  return (
    <>
      <Home />
      <hr />
      <About />
    </>
  )
}

// Types
type NumAction =
  | { type: 'increment', payload: number }
  | { type: 'decrementBy1' }

interface NumState {
  num: number
}

// 初始值
const initialNum: NumState = { num: 0 }

// 初始化函数
const initNum = (initialNum: NumState): NumState => initialNum

// reducer
const numReducer = (state: NumState, action: NumAction): NumState => {
  switch (action.type) {
    case 'increment':
      return { ...state, num: state.num + action.payload }
    case 'decrementBy1':
      return { ...state, num: state.num - 1 }
    default:
      console.warn(`Invalid action type: "${(action as NumAction).type}". The original state is returned`)
      return state
  }
}

const Home = (): JSX.Element => {
  const [state, dispatch] = useReducer(numReducer, initialNum, initNum)

  return (
    <div>
      <p>Home</p>
      <p>{state.num}</p>
      <button onClick={() => void dispatch({ type: 'increment', payload: 7 })}>+7</button>
      <button onClick={() => void dispatch({ type: 'decrementBy1' })}>-1</button>
    </div>
  )
}

const About = (): JSX.Element => {
  const [state, dispatch] = useReducer(numReducer, initialNum, initNum)

  return (
    <div>
      <p>About</p>
      <p>{state.num}</p>
      <button onClick={() => void dispatch({ type: 'increment', payload: 3 })}>+3</button>
      <button onClick={() => void dispatch({ type: 'decrementBy1' })}>-1</button>
    </div>
  )
}

export default App
