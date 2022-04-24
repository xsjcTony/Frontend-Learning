import { forwardRef, useRef, useImperativeHandle } from 'react'


// Types
interface FocusHandle {
  myFocus(): void
}

const App = (): JSX.Element => {
  const homeRef = useRef<FocusHandle>(null)

  const btnClick = (): void => {
    if (!homeRef.current) {
      throw new Error('input is not rendered')
    }

    homeRef.current.myFocus()
  }

  return (
    <>
      <Home ref={homeRef} />
      <hr />
      <button onClick={() => void btnClick()}>focus</button>
    </>
  )
}

const Home = forwardRef<FocusHandle, {}>((props, homeRef): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle<FocusHandle, FocusHandle>(homeRef, () => {
    return {
      myFocus: () => {
        if (!inputRef.current) {
          throw new Error('input is not rendered')
        }

        inputRef.current.focus()
      }
    }
  })

  return (
    <div>
      <p>Home</p>
      <input type="text" placeholder="Enter some contents" ref={inputRef} />
    </div>
  )
})

export default App
