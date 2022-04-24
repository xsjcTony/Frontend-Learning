import { useSearchParams } from 'react-router-dom'


const Home = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()

  searchParams.forEach((value, key) => {
    console.log(key, value)
  })

  return (
    <div>Home</div>
  )
}

export default Home
