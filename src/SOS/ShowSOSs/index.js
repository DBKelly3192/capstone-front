import { Item, Label, Segment } from 'semantic-ui-react'
import React from 'react'

export default function ShowSOSs(props) {

  const soss = props.soss.map(sos => {
    return (
      <Item
        key={ sos.id }
        onClick={ () => props.getOneSOS(sos.id) }>
      <Item.Image
        size='small'
        src={ sos.user.photo }
      />
      <Item.Content>
        <Item.Header verticalalign='middle'>
          { sos.user.username }
        </Item.Header>
        <Item.Meta>
          <span>From { sos.start } to { sos.finish }.</span>
        </Item.Meta>
        <Item.Description>
          <p>{ sos.description }</p>
        </Item.Description>
        <Item.Extra>
          <Label>{ sos.activity }</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
    )
  })

  return (
    <Segment id='showContainer'>
      <Item.Group>
        { soss }
      </Item.Group>
    </Segment>
  )
}
