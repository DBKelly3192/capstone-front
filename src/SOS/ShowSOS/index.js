import EditSOSForm from '../EditSOSForm'
import SimpleMap from '../../SimpleMap'
import { Button, Item, Label } from 'semantic-ui-react'
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

  selectLocation = (event) => {

  }

  render() {
    return (
      <React.Fragment>
        <Item
          className='displayItem'
          key={ this.props.sosToEdit.id }
        >
          <Item.Image
            className='avatar'
            size='small'
            src={ this.props.sosToEdit.user.photo }
          />
          <Item.Content>
            <Item.Header verticalalign='middle'>
              { this.props.sosToEdit.user.username }
            </Item.Header>
            <Item.Meta>
              <span>
                From { this.props.sosToEdit.start } to { this.props.sosToEdit.finish }.
              </span>
            </Item.Meta>
            <Item.Description>
              <p>{ this.props.sosToEdit.description }</p>
            </Item.Description>
            <Item.Extra>
              {
                this.props.sosToEdit.user.id === this.props.loggedInUserID
                &&
                  <React.Fragment>
                    <Button onClick={ this.props.deleteSOS }>DELETE</Button>
                    <Button onClick={ this.toggleEditSOSForm }>EDIT</Button>
                  </React.Fragment>
              }
              <Label>{ this.props.sosToEdit.activity }</Label>
            </Item.Extra>
          </Item.Content>
          <SimpleMap
            selectLocation={ this.selectLocation }
            lat={ this.props.sosToEdit.lat }
            lng={ this.props.sosToEdit.lng }
          />
        </Item>
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
