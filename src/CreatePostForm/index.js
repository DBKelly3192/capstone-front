import { Button, Form, Modal, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class CreatePostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: '',
      description: '',
      location: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createPost(this.state)
    this.props.toggleCreatePostForm()

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
        open={ this.props.displayCreatePostForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleCreatePostForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Create New Post</Modal.Header>
        <Modal.Content>
          <Segment stacked>
            <Modal.Description>
              <Form.Input
                fluid
                required
                type="text"
                name="activity"
                placeholder="Enter an Activity"
                value={ this.state.activity }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                name="location"
                placeholder="Enter a Location"
                value={ this.state.location }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="textarea"
                name="description"
                placeholder="Enter a Description"
                value={ this.state.description }
                onChange={ this.handleChange }
              />
              <Button
                fluid
                positive
                type="Submit"
                content="Create Post"
              />
            </Modal.Description>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}
