import './App.css'
import Dashboard from './Dashboard'
import LoginUserForm from './User/LoginUserForm'
import Logo from './Image/happyTrails.png'
import CreateUserForm from './User/CreateUserForm'
import { Button, Grid, Image, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDashboard: false,
      displayCreateUserForm: false,
      loggedIn: false,
      loggedInUserID: ''
    }
  }

  createUser = async (userToAdd) => {
    console.log(userToAdd)
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/users/create'
      const createUserResponse = await fetch(url, {
        body: JSON.stringify(userToAdd),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const createUserJson = await createUserResponse.json()
      if (createUserResponse.status === 201) {
        console.log('CREATED USER', createUserJson)
      } else {
        alert(createUserJson.message)
      }
    } catch(err) {
      console.log('ERROR CREATING USER.', err)
    }
  }

  logInUser = async (userToLogIn) => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/users/login'
      const logInUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogIn),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const logInUserJson = await logInUserResponse.json()
      if (logInUserResponse.status === 200) {
        console.log('USER LOGGED IN', logInUserJson)
        this.setState({
          loggedIn: !this.state.loggedIn,
          loggedInUserID: logInUserJson.data.id,
          displayDashboard: !this.state.displayDashboard
        })
      } else {
        alert(logInUserJson.message)
      }
    } catch(err) {
      console.log('ERROR LOGGING IN.', err)
    }
  }

  logOutUser = async () => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/users/logout'
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()

      if(logoutResponse.status === 200) {
        console.log('USER LOGGED OUT.', logoutJson)
        this.setState({
          loggedIn: false,
          loggedInUserID: '',
          displayDashboard: false
        })
      }
    } catch(err) {
      console.error('ERROR LOGGING OUT.', err)
    }
  }

  toggleCreateUserForm = () => {
    this.setState({
      displayCreateUserForm: !this.state.displayCreateUserForm
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.displayDashboard
          ?
          <Dashboard
            logOutUser={ this.logOutUser }
            loggedIn={ this.state.loggedIn }
            loggedInUserID={ this.state.loggedInUserID }
          />
          :
          <Grid
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Image
                background-color='white'
                src={ Logo }
              />
              <Segment stacked>
                <LoginUserForm logInUser={ this.logInUser } />
                <Button
                  fluid
                  content="Create New User"
                  onClick={ this.toggleCreateUserForm }
                />
                {
                  this.state.displayCreateUserForm
                  &&
                  <CreateUserForm
                    createUser={ this.createUser }
                    toggleCreateUserForm={ this.toggleCreateUserForm }
                    displayCreateUserForm={ this.state.displayCreateUserForm }
                  />
                }
              </Segment>
            </Grid.Column>
          </Grid>
        }
      </React.Fragment>
    )
  }
}
