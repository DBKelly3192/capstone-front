import EditPostForm from '../EditPostForm'
import { Button, Card, Image } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class ShowPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditPostForm: false
    }
  }

  toggleEditPostForm = () => {
    this.setState({
      displayEditPostForm: !this.state.displayEditPostForm
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card
          centered={ true }
          color={ 'blue' }
          key={ this.props.posts.id }
          raised={ true }
        >
          <Image
            src={ this.props.posts.user.photo }
            wrapped ui={ false }
          />
          <Card.Content>
            <Card.Header>
              { this.props.posts.user.username }
            </Card.Header>
            <Card.Meta>
              { this.props.posts.activity } at { this.props.posts.location }
            </Card.Meta>
            <Card.Description>
              { this.props.posts.description }
            </Card.Description>
            {
              this.props.posts.user.id === this.props.loggedInUserId
              &&
                <React.Fragment>
                  <Button onClick={ this.props.deletePost }>DELETE</Button>
                  <Button onClick={ this.toggleEditPostForm }>EDIT</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditPostForm
          &&
            <EditPostForm
              toggleEditPostForm={ this.toggleEditPostForm }
              updatePost={ this.props.updatePost }
              displayEditPostForm={ this.state.displayEditPostForm }
              posts={ this.props.posts }
            />
        }
      </React.Fragment>
    )
  }
}
