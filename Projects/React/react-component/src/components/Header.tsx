import './Header.css'


function Header(props: { name: string, age: number }) {
  console.log(props) // { name: 'Aelita', age: 24 }

  return (
    <div className="header">Header</div>
  )
}

// 默认数据
Header.defaultProps = {
  name: 'Lily',
  age: 18
}

export default Header
