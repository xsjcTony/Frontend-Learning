import { useParams } from 'react-router-dom'


const About = (): JSX.Element => {
  const params = useParams()

  console.log(params)

  return (
    <div>About</div>
  )
}

export default About
