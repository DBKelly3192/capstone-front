import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import EditPetForm from '../EditPetForm'

export default class ShowPet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditPetForm: false
    }
  }

  toggleEditPetForm = () => {
    this.setState({
      displayEditPetForm: !this.state.displayEditPetForm
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card key={this.props.pets.id}  raised={true} color={'blue'} centered={true}>
          <Image src={this.props.pets.photo} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.pets.petName}</Card.Header>
            <Card.Meta>Missing in {this.props.pets.zipCode}</Card.Meta>
            <Card.Description>{this.props.pets.aboutPet }</Card.Description>
            {
              this.props.pets.user.id === this.props.currentUserId
              &&
                <React.Fragment>
                  <Button onClick={this.props.deletePet}>DELETE</Button>
                  <Button onClick={this.toggleEditPetForm}>EDIT</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditPetForm
          && <EditPetForm
                pets={this.props.pets}
                displayEditPetForm={this.state.displayEditPetForm}
                toggleEditPetForm={this.toggleEditPetForm}
                updatePet={this.props.updatePet}
              />
        }
      </React.Fragment>
    )
  }
}
