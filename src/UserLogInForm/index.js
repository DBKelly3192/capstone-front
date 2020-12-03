import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class UserLogInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailOrUsername: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.logInUser(this.state)

    this.setState({
      emailOrUsername: '',
      password: ''
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
          <Form.Input
            type='text'
            placeholder='Email or Username'
            name='emailOrUsername'
            value={this.state.emailOrUsername}
            onChange={this.handleChange}
          />
          <Form.Input
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Button type='submit'>Log In</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
