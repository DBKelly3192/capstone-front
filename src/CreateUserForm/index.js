import React, { Component } from 'react'
import { Button, Form, Image, Modal, Segment } from 'semantic-ui-react'

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
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

    this.props.createUser(this.state)
    this.props.toggleCreateUserForm()

    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  render() {
    const closeOnDimmerClick = false
    return (
      <Modal
        closeIcon
        as={ Form }
        size='mini'
        open={ this.props.displayCreateUserForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleCreateUserForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Create New User</Modal.Header>
        <Modal.Content image>
          <Segment stacked>
            <Image
              fluid
              src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg"
            />
            <Modal.Description>
              <Form.Input
                fluid
                required
                type="text"
                autoComplete="username"
                name="username"
                placeholder="Enter a Username"
                value={ this.state.username }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="email"
                autoComplete="email"
                name="email"
                placeholder="Enter an Email"
                value={ this.state.email }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="password"
                autoComplete="new-password"
                name="password"
                placeholder="Enter a Password"
                value={ this.state.password }
                onChange={ this.handleChange }
              />
              <Button
                fluid
                positive
                type="Submit"
                content="Create User"
              />
            </Modal.Description>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}
