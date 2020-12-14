import { Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import React, { Component } from 'react'

export default class SimpleMap extends Component {
  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            language: 'en' }}
          defaultCenter={{ lat: 39.801872, lng: -98.179372 }}
          defaultZoom={ 4 }
          onClick={ this.props.selectLocation }
        >
          <Icon.Group
            lat={ this.props.lat }
            lng={ this.props.lng }
            size='big'
          >
            <Icon
              color='red'
              name='home'
            />
            <Icon
              corner='top left'
              name='x'
            />
          </Icon.Group>
        </GoogleMapReact>
      </div>
    )
  }
}
