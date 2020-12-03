import React from 'react'
import PetCard from '../PetCard'

export default function PetContainer(props) {
  return (
    <PetCard
      pets={props.pets}
      loggedIn={props.loggedIn}
      getPet={props.getPet}
      toggleEditPetForm={props.toggleEditPetForm}
    />
  )
}
