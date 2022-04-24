import { useLocation } from 'react-router-dom'


const Other = (): JSX.Element => {
  const { state } = useLocation()

  console.log(state)

  return (
    <div>Other</div>
  )
}

export default Other
