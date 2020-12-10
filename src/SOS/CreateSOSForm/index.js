import { Button, Form, Modal, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class CreateSOSForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: '',
      description: '',
      finish: '',
      location: '',
      start: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createSOS(this.state)
    this.props.toggleCreateSOSForm()

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
        open={ this.props.displayCreateSOSForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleCreateSOSForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Create New SOS</Modal.Header>
        <Modal.Content>
          <Segment stacked>
            <Modal.Description>
              <Form.Input
                required
                type="text"
                name="activity"
                placeholder="Enter an Activity"
                value={ this.state.activity }
                onChange={ this.handleChange }
              />
              <Form.Input
                required
                type="text"
                name="location"
                placeholder="Enter a Location"
                value={ this.state.location }
                onChange={ this.handleChange }
              />
              <Form.Input
                required
                type="text"
                name="start"
                placeholder="Enter a Start Time"
                value={ this.state.start }
                onChange={ this.handleChange }
              />
              <Form.Input
                required
                type="text"
                name="finish"
                placeholder="Enter an End Time"
                value={ this.state.finish }
                onChange={ this.handleChange }
              />
              <Form.Input
                required
                control="textarea"
                name="description"
                placeholder="Enter a Description"
                value={ this.state.description }
                onChange={ this.handleChange }
              />
              <Button
                positive
                type="Submit"
                content="Create SOS"
              />
            </Modal.Description>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}
