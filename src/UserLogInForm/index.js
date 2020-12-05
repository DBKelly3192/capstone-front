import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

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
        <Segment stacked>
          <Form.Input
            required
            icon='user'
            iconPosition='left'
            type='text'
            placeholder='Email or Username'
            name='emailOrUsername'
            value={this.state.emailOrUsername}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            icon='lock'
            iconPosition='left'
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Button fluid type='submit'>Log In</Form.Button>
        </Segment>
      </Form>
    )
  }
}
