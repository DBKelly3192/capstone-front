import PostCard from '../PostCard'
import React from 'react'

export default function PostContainer(props) {
  return (
    <PostCard
      getPost={ props.getPost }
      posts={ props.posts }
      loggedIn={ props.loggedIn }
    />
  )
}
