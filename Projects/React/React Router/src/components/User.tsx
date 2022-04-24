import { Component } from 'react'
import { Navigate } from 'react-router-dom'


interface UserState {
  isLogin: boolean
}

class User extends Component<{}, UserState> {
  public state: Readonly<UserState> = {
    isLogin: false
  }

  public render() {
    const user = (
      <div>
        <h1>User</h1>
        <p>Username: Aelita</p>
        <p>Password: 123456</p>
      </div>
    )

    const login = <Navigate to="/login" replace />

    return this.state.isLogin ? user : login
  }
}

export default User
