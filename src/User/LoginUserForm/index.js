import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

export default class LoginUserForm extends Component {
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
      <Form onSubmit={ this.handleSubmit }>
        <Segment
          className='green'
          stacked
        >
          <Form.Input
            required
            type='text'
            autoComplete="username email"
            icon='user'
            iconPosition='left'
            name='emailOrUsername'
            placeholder='Email or Username'
            value={ this.state.emailOrUsername }
            onChange={ this.handleChange }
          />
          <Form.Input
            required
            type='password'
            autoComplete="current-password"
            icon='lock'
            iconPosition='left'
            name='password'
            placeholder='Password'
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <Form.Button
            fluid
            type='submit'
            content="Log In"
          />
        </Segment>
      </Form>
    )
  }
}
