import { Button, Item, Label, Segment } from 'semantic-ui-react'
import React from 'react'

export default function ShowPosts(props) {
  const posts = props.posts.map(post => {
    return (
      <Item
        className='displayItem'
        key={ post.id }>
      <Item.Image
        className='avatar'
        size='small'
        src={ post.user.photo }
      />
      <Item.Content>
        <Item.Header verticalalign='middle'>
          { post.user.username }
        </Item.Header>
        <Item.Meta>
          <span>{ post.location }</span>
        </Item.Meta>
        <Item.Description>
          <p>{ post.description }</p>
        </Item.Description>
        <Item.Extra>
          <Button
            primary
            floated='right'
            onClick={ () => props.getOnePost(post.id) }
          >
            View Post
          </Button>
          <Label>{ post.activity }</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
    )
  })

  return (
    <Segment raised>
      <Item.Group>
        { posts }
      </Item.Group>
    </Segment>
  )
}
