import { Card, Image } from 'semantic-ui-react'
import React from 'react'

export default function PostCard(props) {

  const posts = props.posts.map(post => {
    return (
      <Card
        key={ post.id }
        raised={ true }
        color={ 'blue' }
        onClick={() => props.getPost(post.id)}
      >
        <Image
          wrapped
          src={ post.user.photo }
          ui={ false }
        />
        <Card.Content>
          <Card.Header>
            { post.user.username }
          </Card.Header>
          <Card.Meta>
            { post.activity } at { post.location }
          </Card.Meta>
          <Card.Description>
            { post.description }
          </Card.Description>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={ true }>
      { posts }
    </Card.Group>
  )
}
