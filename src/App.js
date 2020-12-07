import './App.css'
import Dashboard from './Dashboard'
import LoginUserForm from './LoginUserForm'
import CreateUserForm from './CreateUserForm'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDashboard: false,
      displayCreateUserForm: false,
      loggedIn: false,
      loggedInUserId: ''
    }
  }

  createUser = async (userToAdd) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/register'
      const createUserResponse = await fetch(url, {
        body: JSON.stringify(userToAdd),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const createUserJson = await createUserResponse.json()

      console.log(createUserJson.message)

      if (createUserResponse.status === 200) {
        console.log('CREATED USER', createUserJson)
      }
    } catch(err) {
      console.log('ERROR CREATING USER.', err)
    }
  }

  logInUser = async (userToLogIn) => {
    console.log(userToLogIn)
    try {
      const url = process.env.REACT_APP_API_URL + '/users/login'
      const logInUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogIn),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const logInUserJson = await logInUserResponse.json()

      console.log(logInUserJson.message)

      if (logInUserResponse.status === 200) {
        console.log('USER LOGGED IN')
        this.setState({
          loggedIn: !this.state.loggedIn,
          loggedInUserId: logInUserJson.data.id,
          displayDashboard: !this.state.displayDashboard
        })
      }
    } catch(err) {
      console.log('ERROR LOGGING IN.', err)
    }
  }

  logOutUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/logout'
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()

      if(logoutResponse.status === 200) {
        console.log('USER LOGGED OUT.', logoutJson)
        this.setState({
          loggedIn: false,
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
            loggedInUserId={ this.state.loggedInUserId }
          />
          :
          <Grid
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Icon.Group>
                <Icon
                  color='green'
                  name='tree'
                  size='massive'
                />
                <Icon
                  color='olive'
                  name='play circle outline'
                  size='big'
                />
              </Icon.Group>
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
