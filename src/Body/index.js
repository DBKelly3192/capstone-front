import React, { Component } from 'react'
import PetContainer from '../PetContainer'
import ShowPet from '../ShowPet'

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditPetForm: false
    }
  }

  toggleEditPetForm = (petToEdit) => {
    this.setState({
      displayEditPetForm: !this.state.displayEditPetForm
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.showPet
          ? <ShowPet
              pets={this.props.pets}
              currentUserId={this.props.currentUserId}
              petIdToEdit={this.props.petIdToEdit}
              updatePet={this.props.updatePet}
              deletePet={this.props.deletePet}
            />
          : <PetContainer
              pets={this.props.pets}
              loggedIn={this.props.loggedIn}
              getPet={this.props.getPet}
              toggleEditPetForm={this.toggleEditPetForm}
            />
        }
      </React.Fragment>
    )
  }
}
