import CreateSOSForm from '../CreateSOSForm'
import ShowSOS from '../ShowSOS'
import ShowSOSs from '../ShowSOSs'
import { Button, Container, Grid, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class SOSContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCreateSOSForm: false,
      displayShowSOS: false,
      displayShowSOSs: false,
      soss: [],
      sosToEdit: [],
      sosIDToDelete: -1,
      sosIDToEdit: -1,
    }
  }

  getMySOSs = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/sos/my'
      const sosResponse = await fetch(url, { credentials: 'include' })
      const sosJson = await sosResponse.json()

      this.setState({
        displayShowSOS: false,
        displayShowSOSs: true,
        soss: sosJson.data
      })
    } catch(err) {
      console.log('ERROR RETRIEVING SOS DATA.', err)
    }
  }

  getOneSOS = async (idOfSOS) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/sos/' + idOfSOS
      const sosResponse = await fetch(url)
      const sosJson = await sosResponse.json()
      console.log(sosJson.data)
      this.setState({
        displayShowSOS: true,
        displayShowSOSs: false,
        sosToEdit: sosJson.data,
        sosIDToEdit: sosJson.data.id,
        sosIDToDelete: sosJson.data.id
      })
    } catch(err) {
      console.log('ERROR RETRIEVING POST DATA.', err)
    }
  }

  createSOS = async (sosToCreate) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/sos/create'
      const createSOSResponse = await fetch(url, {
        body: JSON.stringify(sosToCreate),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const createSOSJson = await createSOSResponse.json()
      console.log(createSOSResponse.status)
      if (createSOSResponse.status === 200) {
        console.log('SOS CREATED.')
        console.log(createSOSJson.data)
        this.setState({
          displayShowSOSs: false,
          soss: createSOSJson.data
        })
      }
    } catch(err) {
      console.log('ERROR CREATING SOS.', err)
    }
  }

  updateSOS = async (updatedSOSInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/sos/' + this.state.sosIDToEdit
      const updateSOSResponse = await fetch(url, {
        body: JSON.stringify(updatedSOSInfo),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      const updateSOSJson = await updateSOSResponse.json()
      console.log(updateSOSResponse.status)
      if(updateSOSResponse.status === 200) {
        console.log('SOS UPDATED.')
        this.setState({
          displayShowSOS: false,
          soss: updateSOSJson.data,
          sosToEdit: [],
          sosIDToEdit: -1
        })
      }
    } catch(err) {
      console.log('ERROR UPDATING SOS.', err)
    }
  }

  deleteSOS = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/sos/' + this.state.sosIDToEdit
      const deleteSOSResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deleteSOSJson = await deleteSOSResponse.json()

      if(deleteSOSResponse.status === 200) {
        console.log('SOS DELETED.', deleteSOSJson)
        this.setState({
          displayShowSOS: false,
          soss: this.state.soss.filter(sos => sos.id !== this.state.sosIDToDelete),
          sosToEdit: [],
          sosIDToDelete: -1,
          sosIDToEdit: -1,
        })
      }
    } catch(err) {
      console.log('ERROR DELETING SOS.', err)
    }
  }

  toggleCreateSOSForm = () => {
    this.setState({
      displayCreateSOSForm: !this.state.displayCreateSOSForm
    })
  }

  viewShowSOS = () => {
    this.setState({
      displayShowSOS: true,
      displayShowSOSs: false
    })
  }

  viewShowSOSs = () => {
    this.setState({
      displayShowSOS: false,
      displayShowSOSs: true
    })
  }

  render() {
    return (
      <React.Fragment>
        <Menu size='small'>
          <Menu.Item>
            <Button
              content='Create SOS'
              onClick={ this.toggleCreateSOSForm }
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              content='View Your SOSs'
              onClick={ this.getMySOSs }
            />
          </Menu.Item>
        </Menu>
        <Grid>
          <Grid.Column style={{ maxWidth: 1000 }}>
            {
              this.state.displayShowSOS
              &&
              <ShowSOS
                updateSOS={ this.updateSOS }
                deleteSOS={ this.deleteSOS }
                sosToEdit={ this.state.sosToEdit }
                loggedIn={ this.props.loggedIn }
                loggedInUserID={ this.props.loggedInUserID }
              />
            }
            {
              this.state.displayShowSOSs
              &&
              <ShowSOSs
                getOneSOS={ this.getOneSOS }
                soss={ this.state.soss }
                loggedIn={ this.props.loggedIn }
                loggedInUserID={ this.props.loggedInUserID }
              />
            }
            {
              this.state.displayCreateSOSForm
              &&
              <CreateSOSForm
                createSOS={ this.createSOS }
                toggleCreateSOSForm={ this.toggleCreateSOSForm }
                displayCreateSOSForm={ this.state.displayCreateSOSForm }
              />
            }
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}
