import React, { Component } from 'react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'

export default class NewPetForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      petName: '',
      aboutPet: '',
      dateLost: '',
      status: '',
      photo: '',
      zipCode: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropChange = (event, data) => {
    this.setState({
      status: data.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createPet(this.state)
    this.props.toggleCreatePetForm()

    this.setState({
      petName: '',
      aboutPet: '',
      dateLost: '',
      status: '',
      photo: '',
      zipCode: ''
    })
  }

  render() {

    const statusOptions = [
      { text: "Lost", value: "lost" },
      { text: "Found", value: "found" }
    ]

    return (
      <Modal
        as={Form}
        open={this.props.displayCreatePetForm}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>Create New Pet Listing</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg" wrapped />
          <Modal.Description>
            <Header>Enter Pet Listing Information</Header>
            <Label>Pet Name:</Label>
              <Form.Input
                type="text"
                name="petName"
                value={this.state.petName}
                placeholder="Enter the name of the pet."
                onChange={this.handleChange}
              />
              <Label>Is this a pet that you have lost, or a pet that you have found?</Label>
              <Form.Select
                name="status"
                options={statusOptions}
                placeholder="Lost or Found"
                onChange={this.handleDropChange}
              />
              <Label>Date Lost or Found:</Label>
              <Form.Input
                type="text"
                name="dateLost"
                value={this.state.dateLost}
                placeholder="Enter the date the pet was either lost or found."
                onChange={this.handleChange}
              />
              <Label>Zipcode:</Label>
              <Form.Input
                type="text"
                name="zipCode"
                value={this.state.zipCode}
                placeholder="Enter zipcode where the pet was lost/found."
                onChange={this.handleChange}
              />
              <Label>Pet Description:</Label>
              <Form.Input
                control='textarea'
                name="aboutPet"
                rows='3'
                value={this.state.aboutPet}
                placeholder="Enter a description of the pet."
                onChange={this.handleChange}
              />
              <Label>Picture URL:</Label>
              <Form.Input
                type="text"
                name="photo"
                value={this.state.photo}
                placeholder="Enter the URL of the picture."
                onChange={this.handleChange}
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='black'
            onClick={this.props.toggleCreatePetForm}>Cancel</Button>
          <Button
            content="Create Pet Listing"
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
