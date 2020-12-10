import { Card, Image } from 'semantic-ui-react'
import React from 'react'

export default function ShowSOSs(props) {

  const soss = props.soss.map(sos => {
    return (
      <Card
        key={ sos.id }
        raised={ true }
        color={ 'blue' }
        onClick={ () => props.getOneSOS(sos.id) }
      >
        <Image
          wrapped
          src={ sos.user.photo }
          ui={ false }
        />
        <Card.Content>
          <Card.Header>
            { sos.user.username }
          </Card.Header>
          <Card.Meta>
            { sos.activity } at { sos.location }
          </Card.Meta>
          <Card.Description>
            { sos.description }
          </Card.Description>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={ true }>
      { soss }
    </Card.Group>
  )
}
