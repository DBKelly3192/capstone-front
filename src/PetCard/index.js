import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default function PetCard(props) {

  const pets = props.pets.map(pet => {
    return (
      <Card key={pet.id} raised={true} color={'blue'} onClick={() => props.getPet(pet.id)}>
        <Image src={pet.photo} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{pet.petName}</Card.Header>
          <Card.Meta>Missing in {pet.zipCode}</Card.Meta>
          <Card.Description>{pet.aboutPet}</Card.Description>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={true}>
      {pets}
    </Card.Group>
  )
}
