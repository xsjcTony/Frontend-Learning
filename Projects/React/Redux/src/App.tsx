import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { decrement, fetchName, increment, fetchHobby } from './store/slices/counterSlice'


const App = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.count)
  const name = useSelector((state: RootState) => state.counter.name)
  const hobby = useSelector((state: RootState) => state.counter.hobby)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => void dispatch(increment(5))}>+5</button>
      <button onClick={() => void dispatch(decrement(5))}>-5</button>
      <p>{name}</p>
      <button onClick={() => void dispatch(fetchName( 'Tequila'))}>Thunk: Set name to "Tequila"</button>
      <p>{hobby}</p>
      <button onClick={() => void dispatch(fetchHobby())}>Saga: Set hobby to "TypeScript"</button>
    </div>
  )
}

export default App
