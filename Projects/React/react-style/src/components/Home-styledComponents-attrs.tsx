import { Component } from 'react'
import styled from 'styled-components'


/*
const StyledInput = styled.input.attrs({
  type: 'password'
})`
    color: #f90;
`
*/
const StyledInput = styled.input.attrs({
  type: 'password'
})`
    color: #f90;
`


class Home extends Component {
  public render() {
    return (
      <StyledInput />
    )
  }
}

export default Home
