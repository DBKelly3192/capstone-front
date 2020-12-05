import './App.css'
import Dashboard from './Dashboard'
import UserLogInForm from './UserLogInForm'
import UserCreateForm from './UserCreateForm'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      displayDashboard: false,
      displayUserCreateForm: false,
      loggedIn: false,
      currentUserId: ''
    }
  }

  createUser = async (userToAdd) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/register'
      const createUserResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToAdd)
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
          currentUserId: logInUserJson.data.id,
          displayDashboard: !this.state.displayDashboard
        })
      }
    } catch(err) {
      console.log('ERROR LOGGING IN.', err)
    }
  }

  toggleUserCreateForm = () => {
    this.setState({
      displayUserCreateForm: !this.state.displayUserCreateForm
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.displayDashboard
          ?
          <Dashboard />
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
                <UserLogInForm logInUser={this.logInUser} />
                <Button
                  fluid
                  content="Create New User"
                  onClick={this.toggleUserCreateForm}
                />
                {
                  this.state.displayUserCreateForm
                  &&
                  <UserCreateForm
                    createUser={this.createUser}
                    toggleUserCreateForm={this.toggleUserCreateForm}
                    displayUserCreateForm={this.state.displayUserCreateForm}
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
