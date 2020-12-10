import { Button, Form, Label, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class EditPostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: this.props.postToEdit.activity,
      description: this.props.postToEdit.description,
      location: this.props.postToEdit.location
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.updatePost(this.state)
    this.props.toggleEditPostForm()

    this.setState({
      activity: '',
      description: '',
      location: ''
    })
  }

  render() {
    const closeOnDimmerClick = false
    return (
      <Modal
        closeIcon
        as={ Form }
        open={ this.props.displayEditPostForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleEditPostForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Update Post</Modal.Header>
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
              content='Update Post'
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
