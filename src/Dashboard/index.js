import CreatePostForm from '../CreatePostForm'
import PostContainer from '../PostContainer'
import ShowPost from '../ShowPost'
import { Button, Container, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state ={
      displayCreateUserForm: false,
      displayEditPostForm: false,
      displayPostContainer: true,
      displayShowPost: false,
      postIdToEdit: -1,
      posts: []
    }
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/all'
      const postsResponse = await fetch(url)
      const postsJson = await postsResponse.json()

      this.setState({
        posts: postsJson.data
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  getMyPosts = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/my'
      const postsResponse = await fetch(url, { credentials: 'include' })
      const postsJson = await postsResponse.json()

      this.setState({
        displayPostContainer: true,
        displayShowPost: false,
        posts: postsJson.data
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  getPost = async (idOfPost) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/' + idOfPost
      const postResponse = await fetch(url)
      const postJson = await postResponse.json()

      this.setState({
        displayPostContainer: !this.state.displayPostContainer,
        displayShowPost: !this.state.displayShowPost,
        posts: postJson.data,
        postIdToEdit: postJson.data.id
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  createPost = async (postToCreate) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/create'
      const createPostResponse = await fetch(url, {
        body: JSON.stringify(postToCreate),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const createPostJson = await createPostResponse.json()

      if (createPostResponse.status === 200) {
        console.log('POST CREATED.')
        this.setState({
          posts: [...this.state.posts, createPostJson.data]
        })
      }
    } catch(err) {
      console.log('ERROR CREATING POST.', err)
    }
  }

  updatePost = async (updatedPostInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/' + this.state.postIdToEdit
      const updatePostResponse = await fetch(url, {
        body: JSON.stringify(updatedPostInfo),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      const updatePostJson = await updatePostResponse.json()

      if(updatePostResponse.status === 200) {
        console.log('POST UPDATED.')
        this.setState({
          posts: updatePostJson.data,
          postIdToEdit: -1
        })
      }
      this.getMyPosts()
    } catch(err) {
      console.log('ERROR UPDATING POST.', err)
    }
  }

  deletePost = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/' + this.state.postIdToEdit
      const deletePostResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deletePostJson = await deletePostResponse.json()

      if(deletePostResponse.status === 200) {
        console.log('POST DELETED.', deletePostJson)
        this.setState({
          displayShowPost: false,
          posts: [],
        })
      }
      this.getMyPosts()
    } catch(err) {
      console.log('ERROR DELETING POST.', err)
    }
  }

  toggleCreatePostForm = () => {
    this.setState({
      displayPostContainer: !this.state.displayPostContainer,
      displayCreatePostForm: !this.state.displayCreatePostForm
    })
  }

  render() {
    return(
      <React.Fragment>
        <Menu size='huge'>
          <Container>
          <Menu.Item>
            <Button
              content='Create Post'
              onClick={ this.toggleCreatePostForm }
            />
          </Menu.Item>
            <Menu.Item>
              <Button
                content='Log Out'
                onClick={ this.props.logOutUser }
              />
            </Menu.Item>
          </Container>
        </Menu>
        {
          this.state.displayPostContainer
          &&
            <PostContainer
              getPost={ this.getPost }
              posts={ this.state.posts }
              loggedIn={ this.props.loggedIn }
            />
        }
        {
          this.state.displayShowPost
          &&
            <ShowPost
              deletePost={ this.deletePost }
              updatePost={ this.updatePost }
              posts={ this.state.posts }
              postIdToEdit={ this.state.postIdToEdit }
              loggedInUserId={ this.props.loggedInUserId }
            />
        }
        {
          this.state.displayCreatePostForm
          &&
            <CreatePostForm
              createPost={ this.createPost }
              toggleCreatePostForm={ this.toggleCreatePostForm }
              displayCreatePostForm={ this.state.displayCreatePostForm }
              posts={ this.state.posts }
            />
        }
      </React.Fragment>
    )
  }
}
