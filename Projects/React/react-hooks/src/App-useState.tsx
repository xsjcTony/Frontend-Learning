import { useState } from 'react'


const App = (): JSX.Element => {
  const [age, setAge] = useState<number>(0)
  const [name, setName] = useState<string>('Aelita')
  const [student, setStudent] = useState({ // 自动推断类型为 { lastName: string, age: number }
    lastName: 'Schaeffer',
    age: 24
  })

  return (
    <div>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(prevAge => prevAge - 1)}>-1</button>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change to "Tequila"</button>
      <button onClick={() => void setName('Aelita')}>change to "Aelita"</button>
      <p>{student.lastName}</p>
      <p>{student.age}</p>
      <button onClick={() => void setStudent({ ...student, age: 77 })}>change AGE to "77"</button>
    </div>
  )
}

export default App
