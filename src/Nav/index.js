import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import LoginUserForm from '../LoginUserForm'
import NewUserForm from '../NewUserForm'
import NewPetForm from '../NewPetForm'

export default class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayLoginUserForm: false,
      displayRegisterUserForm: false,
      displayCreatePetForm: false
    }
  }

  toggleLoginUserForm = () => {
    this.setState({
      displayLoginUserForm: !this.state.displayLoginUserForm
    })
  }

  toggleRegisterUserForm = () => {
    this.setState({
      displayRegisterUserForm: !this.state.displayRegisterUserForm
    })
  }

  toggleCreatePetForm = () => {
    this.setState({
      displayCreatePetForm: !this.state.displayCreatePetForm
    })
  }

  render() {
    return (
      <Menu pointing secondary>
        {
          this.props.loggedIn
            ?
            <React.Fragment>
              <Menu.Item
                icon='box'
                name='All Listings'
                onClick={this.props.getPets}
              />
              <Menu.Item
                icon='box'
                name='My Listings'
                onClick={this.props.getMyPets}
              />
              <Menu.Item
                icon='paper plane outline'
                name='New Listing'
                position='right'
                onClick={this.toggleCreatePetForm}
              />
              <Menu.Item
                icon='sign-out'
                name='Log Out'
                position='right'
                onClick={this.props.logoutUser}
              />
            </React.Fragment>
            :
            <React.Fragment>
              <Menu.Item
                icon='sign-in'
                name='Log In'
                position='right'
                onClick={this.toggleLoginUserForm}
              />
              <Menu.Item
                icon='address card outline'
                name='Register'
                onClick={this.toggleRegisterUserForm}
              />
            </React.Fragment>
        }
        {
          this.state.displayLoginUserForm
          && <LoginUserForm
            loginUser={this.props.loginUser}
            toggleLoginUserForm={this.toggleLoginUserForm}
            displayLoginUserForm={this.state.displayLoginUserForm}
          />
        }
        {
          this.state.displayRegisterUserForm
          && <NewUserForm
            createUser={this.props.createUser}
            toggleRegisterUserForm={this.toggleRegisterUserForm}
            displayRegisterUserForm={this.state.displayRegisterUserForm}
          />
        }
        {
          this.state.displayCreatePetForm
          && <NewPetForm
            createPet={this.props.createPet}
            toggleCreatePetForm={this.toggleCreatePetForm}
            displayCreatePetForm={this.state.displayCreatePetForm}
          />
        }
      </Menu>
    )
  }
}
