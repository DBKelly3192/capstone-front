import SimpleMap from '../../SimpleMap'
import { Button, Form, Label, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class EditPostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: this.props.postToEdit.activity,
      description: this.props.postToEdit.description,
      lat: this.props.postToEdit.lat,
      lng: this.props.postToEdit.lng
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
      lat: '',
      lng: ''
    })
  }

  selectLocation = (event) => {
    this.setState({
      lat: event.lat,
      lng: event.lng
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
            <Label>Description:</Label>
            <Form.Input
              rows='2'
              control='textarea'
              name='description'
              value={ this.state.description }
              onChange={ this.handleChange }
            />
            <Form.Input
              className='hidden'
              required
              type="text"
              name="lat"
              value={ this.state.lat }
              onChange={ this.handleChange }
            />
            <SimpleMap
              selectLocation={ this.selectLocation }
              lat={ this.state.lat }
              lng={ this.state.lng }
            />
            <Form.Input
              className='hidden'
              required
              type="text"
              name="lng"
              value={ this.state.lng }
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
