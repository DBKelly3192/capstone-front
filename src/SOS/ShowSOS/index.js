import EditSOSForm from '../EditSOSForm'
// import MapContainer from '../../MapContainer'
import SimpleMap from '../../SimpleMap'
import { Button, Card, Image } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class ShowSOS extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditSOSForm: false
    }
  }

  toggleEditSOSForm = () => {
    this.setState({
      displayEditSOSForm: !this.state.displayEditSOSForm
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card
          className='card'
          fluid
          centered={ true }
          color={ 'blue' }
          key={ this.props.sosToEdit.id }
          raised={ true }
        >
          <Image
            className='photo'
            wrapped
            src={ this.props.sosToEdit.user.photo }
            ui={ false }
          />
          <Card.Content>
            <Card.Header>
              { this.props.sosToEdit.user.username }
            </Card.Header>
            <Card.Meta>
              { this.props.sosToEdit.activity } at { this.props.sosToEdit.location }
            </Card.Meta>
            <Card.Description>
              { this.props.sosToEdit.description }
            </Card.Description>
            {
              this.props.sosToEdit.user.id === this.props.loggedInUserID
              &&
                <React.Fragment>
                  <Button onClick={ this.props.deleteSOS }>DELETE</Button>
                  <Button onClick={ this.toggleEditSOSForm }>EDIT</Button>
                </React.Fragment>
            }
            <SimpleMap />
          </Card.Content>
        </Card>
        {
          this.state.displayEditSOSForm
          &&
            <EditSOSForm
              toggleEditSOSForm={ this.toggleEditSOSForm }
              displayEditSOSForm={ this.state.displayEditSOSForm }
              sosToEdit={ this.props.sosToEdit }
              updateSOS={ this.props.updateSOS }
            />
        }
      </React.Fragment>
    )
  }
}

// <MapContainer
//   lat='38.551115'
//   lng='-78.315662'
// />
