import CreatePostForm from '../CreatePostForm'
import ShowPost from '../ShowPost'
import ShowPosts from '../ShowPosts'
import { Button, Container, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class PostContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCreatePostForm: false,
      displayShowPost: false,
      displayShowPosts: false,
      posts: [],
      postToEdit: [],
      postIDToDelete: -1,
      postIDToEdit: -1
    }
  }

  getAllPosts = async () => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/all'
      const postsResponse = await fetch(url)
      const postsJson = await postsResponse.json()

      this.setState({
        displayShowPost: false,
        displayShowPosts: true,
        posts: postsJson.data
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  getMyPosts = async () => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/my'
      const postsResponse = await fetch(url, { credentials: 'include' })
      const postsJson = await postsResponse.json()

      this.setState({
        displayShowPost: false,
        displayShowPosts: true,
        posts: postsJson.data
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  getOnePost = async (idOfPost) => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/' + idOfPost
      const postResponse = await fetch(url)
      const postJson = await postResponse.json()

      this.setState({
        displayShowPost: true,
        displayShowPosts: false,
        postToEdit: postJson.data,
        postIDToEdit: postJson.data.id,
        postIDToDelete: postJson.data.id
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  createPost = async (postToCreate) => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/create'
      const createPostResponse = await fetch(url, {
        body: JSON.stringify(postToCreate),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const createPostJson = await createPostResponse.json()
      console.log(createPostResponse.status)
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
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/' + this.state.postIDToEdit
      const updatePostResponse = await fetch(url, {
        body: JSON.stringify(updatedPostInfo),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      const updatePostJson = await updatePostResponse.json()
      console.log(updatePostResponse.status)
      if(updatePostResponse.status === 200) {
        console.log('POST UPDATED.')
        this.setState({
          displayShowPost: false,
          displayShowPosts: false,
          posts: updatePostJson.data,
          postToEdit: [],
          postIDToEdit: -1
        })
      }
      this.getAllPosts()
    } catch(err) {
      console.log('ERROR UPDATING POST.', err)
    }
  }

  deletePost = async () => {
    try {
      const url = process.env.REACT_APP_DATABASE_URL + '/posts/' + this.state.postIDToDelete
      const deletePostResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deletePostJson = await deletePostResponse.json()

      if(deletePostResponse.status === 200) {
        console.log('POST DELETED.', deletePostJson)
        this.setState({
          displayShowPost: false,
          posts: this.state.posts.filter(post => post.id !== this.state.postIDToDelete),
          postToEdit: [],
          postIDToDelete: -1,
          postIDToEdit: -1
        })
      }
    } catch(err) {
      console.log('ERROR DELETING POST.', err)
    }
  }

  toggleCreatePostForm = () => {
    this.setState({
      displayCreatePostForm: !this.state.displayCreatePostForm
    })
  }

  viewPost = () => {
    this.setState({
      displayShowPost: true,
      displayShowPosts: false
    })
  }

  viewPosts = () => {
    this.setState({
      displayShowPosts: true,
      displayShowPost: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <Menu size='small'>
          <Container>
          <Menu.Item>
            <Button
              content='View All Posts'
              onClick={ this.getAllPosts }
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              content='View Your Posts'
              onClick={ this.getMyPosts }
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              content='Create a Post'
              onClick={ this.toggleCreatePostForm }
            />
          </Menu.Item>
          </Container>
        </Menu>
        {
          this.state.displayShowPost
          &&
            <ShowPost
              updatePost={ this.updatePost }
              deletePost={ this.deletePost }
              postToEdit={ this.state.postToEdit }
              loggedIn={ this.props.loggedIn }
              loggedInUserID={ this.props.loggedInUserID }
            />
        }
        {
          this.state.displayShowPosts
          &&
            <ShowPosts
              getOnePost={ this.getOnePost }
              posts={ this.state.posts }
              loggedIn={ this.props.loggedIn }
              loggedInUserID={ this.props.loggedInUserID }
            />
        }
        {
          this.state.displayCreatePostForm
          &&
          <CreatePostForm
            createPost={ this.createPost }
            toggleCreatePostForm={ this.toggleCreatePostForm }
            displayCreatePostForm={ this.state.displayCreatePostForm }
          />
        }
      </React.Fragment>
    )
  }
}
