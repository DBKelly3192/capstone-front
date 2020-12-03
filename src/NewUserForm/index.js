import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Input, Label, Modal } from 'semantic-ui-react'

export default class NewUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      phone: '',
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
    this.props.toggleRegisterUserForm()

    this.setState({
      username: '',
      email: '',
      phone: '',
      password: ''
    })
  }

  render() {
    return (
      <Modal
        as={Form}
        open={this.props.displayRegisterUserForm}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>Register New User</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg" wrapped />
          <Modal.Description>
            <Header>Enter your information</Header>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Label>Username:</Label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Enter a Username"
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Label>Email:</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter an Email"
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Label>Phone Number:</Label>
                <Input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  placeholder="Enter a Phone Number"
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Label>Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter a Password"
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='black'
            onClick={this.props.toggleRegisterUserForm}>Cancel</Button>
          <Button
            content="Login"
            labelPosition="right"
            icon="checkmark"
            type="Submit"
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
