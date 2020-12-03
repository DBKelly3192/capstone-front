import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Input, Label, Modal } from 'semantic-ui-react'

export default class LoginUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

    this.props.loginUser(this.state)
    this.props.toggleLoginUserForm()

    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <Modal
        as={Form}
        open={this.props.displayLoginUserForm}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg" wrapped />
          <Modal.Description>
            <Header>Enter your information</Header>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Label>Email:</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Label>Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='black'
            onClick={this.props.toggleLoginUserForm}>Cancel</Button>
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
