import { Button, Form, Label, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class EditSOSForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: this.props.sosToEdit.activity,
      description: this.props.sosToEdit.description,
      finish: this.props.sosToEdit.finish,
      location: this.props.sosToEdit.location,
      start: this.props.sosToEdit.start,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.updateSOS(this.state)
    this.props.toggleEditSOSForm()

    this.setState({
      activity: '',
      description: '',
      finish: '',
      location: '',
      start: ''
    })
  }

  render() {
    const closeOnDimmerClick = false
    return (
      <Modal
        closeIcon
        as={ Form }
        open={ this.props.displayEditSOSForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleEditSOSForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Update SOS</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Label>Activity:</Label>
            <Form.Input
              fluid
              type='text'
              name='activity'
              value={ this.state.activity }
              onChange={ this.handleChange }
            />
            <Label>Location:</Label>
            <Form.Input
              fluid
              type='text'
              name='location'
              value={ this.state.location }
              onChange={ this.handleChange }
            />
            <Label>Start Time:</Label>
            <Form.Input
              fluid
              type="text"
              name="start"
              value={ this.state.start }
              onChange={ this.handleChange }
            />
            <Label>End Time:</Label>
            <Form.Input
              fluid
              type="text"
              name="finish"
              value={ this.state.finish }
              onChange={ this.handleChange }
            />
            <Label>Description:</Label>
            <Form.Input
              rows='2'
              control='textarea'
              name='description'
              value={ this.state.description }
              onChange={ this.handleChange }
            />
            <Button
              fluid
              positive
              type='Submit'
              icon='checkmark'
              content='Update SOS'
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
