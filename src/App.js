import './App.css'
import React, { Component } from 'react'
import Body from './Body'
import Nav from './Nav'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      pets: [],
      showPet: false,
      currentUserId: '',
      petIdToEdit: -1
    }
  }

  componentDidMount() {
    this.getPets()
  }

  getPets = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/all'
      const petsResponse = await fetch(url)
      const petsJson = await petsResponse.json()

      this.setState({
        pets: petsJson.data,
        showPet: false
      })
    } catch(err) {
      console.log('ERROR RETRIEVING PET DATA.', err)
    }
  }

  getPet = async (idOfPet) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/' + idOfPet
      const petResponse = await fetch(url)
      const petJson = await petResponse.json()

      this.setState({
        pets: petJson.data,
        showPet: !this.state.showPet,
        petIdToEdit: petJson.data.id
      })
    } catch(err) {
      console.log('ERROR RETRIEVING PET DATA.', err)
    }
  }

  getMyPets = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/'
      const petsResponse = await fetch(url, {credentials: 'include'})
      const petsJson = await petsResponse.json()

      this.setState({
        pets: petsJson.data,
        showPet: false
      })
    } catch(err) {
      console.log('ERROR RETRIEVING PET DATA.', err)
    }
  }

  createUser = async (userToAdd) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
      const createUserResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToAdd)
      })
      const createUserJson = await createUserResponse.json()

      if (createUserResponse.status === 200) {
        console.log('CREATED USER', createUserJson)
      }
    } catch(err) {
      console.log('ERROR CREATING USER.', err)
    }
  }

  loginUser = async (userToLogin) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
      const loginUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogin),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const loginUserJson = await loginUserResponse.json()

      if (loginUserResponse.status === 200) {
        console.log('USER LOGGED IN')
        this.setState({
          loggedIn: !this.state.loggedIn,
          currentUserId: loginUserJson.data.id
        })
      }
      this.getPets()
    } catch(err) {
      console.log('ERROR LOGGING IN.', err)
    }
  }

  logoutUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()

      if(logoutResponse.status === 200) {
        console.log('USER LOGGED OUT.', logoutJson)
        this.setState({
          loggedIn: false
        })
      }
      this.getPets()
    } catch(err) {
      console.error('ERROR LOGGING OUT.', err)
    }
  }

  createPet = async (petToCreate) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/'
      const createPetResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(petToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const createPetJson = await createPetResponse.json()

      if (createPetResponse.status === 200) {
        console.log('PET CREATED.')
        this.setState({
          pets: [...this.state.pets, createPetJson.data]
        })
      }
      this.getMyPets()
    } catch(err) {
      console.log('ERROR CREATING PET.', err)
    }
  }

  updatePet = async (updatedPetInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/' + this.state.petIdToEdit
      const updatePetResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedPetInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updatePetJson = await updatePetResponse.json()

      if(updatePetResponse.status === 200) {
        console.log('PET UPDATED.')
        this.setState({
          pets: updatePetJson.data,
          petIdToEdit: -1
        })
      }
      this.getMyPets()
    } catch(err) {
      console.log('ERROR UPDATING PET.', err)
    }
  }

  deletePet = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/pets/' + this.state.petIdToEdit
      const deletePetResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deletePetJson = await deletePetResponse.json()

      if(deletePetResponse.status === 200) {
        console.log('PET DELETED.', deletePetJson)
        this.setState({
          pets: [],
          showPet: false
        })
      }
      this.getMyPets()
    } catch(err) {
      console.log('ERROR DELETING PET.', err)
    }
  }

  render() {
    return (
      <div className='App'>
        <Nav
          loggedIn={this.state.loggedIn}
          createUser={this.createUser}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          createPet={this.createPet}
          getPets={this.getPets}
          getMyPets={this.getMyPets}
        />
        <Body
          pets={this.state.pets}
          showPet={this.state.showPet}
          loggedIn={this.state.loggedIn}
          currentUserId={ this.state.currentUserId}
          getPet={this.getPet}
          updatePet={this.updatePet}
          deletePet={this.deletePet}
        />
      </div>
    )
  }
}
