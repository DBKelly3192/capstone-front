import PostContainer from '../Post/PostContainer'
import SOSContainer from '../SOS/SOSContainer'
import { Button, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayPostContainer: false,
      displaySOSContainer: false
    }
  }

  viewPostContainer = () => {
    this.setState({
      displayPostContainer: true,
      displaySOSContainer: false
    })
  }

  viewSOSContainer = () => {
    this.setState({
      displaySOSContainer: true,
      displayPostContainer: false
    })
  }

  render() {
    return(
      <React.Fragment>
        <Menu
          className='mainMenu'
          size='huge'>
          <Menu.Item>
            <Button
              content='View SOS'
              onClick={ this.viewSOSContainer }
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              content='View Posts'
              onClick={ this.viewPostContainer }
            />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button
              content='Log Out'
              onClick={ this.props.logOutUser }
            />
          </Menu.Item>
        </Menu>
        {
          this.state.displayPostContainer
          &&
            <PostContainer
              getPost={ this.getPost }
              loggedIn={ this.props.loggedIn }
              loggedInUserID={ this.props.loggedInUserID }
            />
        }
        {
          this.state.displaySOSContainer
          &&
            <SOSContainer
              getSOS={ this.getSOS }
              loggedIn={ this.props.loggedIn }
              loggedInUserID={ this.props.loggedInUserID }
            />
        }
      </React.Fragment>
    )
  }
}
