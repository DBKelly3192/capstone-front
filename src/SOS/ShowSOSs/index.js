import { Button, Item, Label, Segment } from 'semantic-ui-react'
import React from 'react'


export default function ShowSOSs(props) {

  const soss = props.soss.map(sos => {
    return (
      <Item key={ sos.id }>
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
          <Button
            primary
            floated='right'
            onClick={ () => props.sendEmail(sos.id) }
          >
            Notify { sos.user.emergencyFirst } { sos.user.emergencyLast }
          </Button>
          <Button
            primary
            floated='right'
            onClick={ () => props.getOneSOS(sos.id) }
          >
            View SOS
          </Button>
          <Label>{ sos.activity }</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
    )
  })




  return (
    <Segment raised>
      <Item.Group>
        { soss }
      </Item.Group>
    </Segment>
  )
}
