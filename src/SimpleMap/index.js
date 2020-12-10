import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 38.999715,
      lng: -77.025305
    },
    zoom: 17
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBeVpUUOAZC3o810e1K-zjZzl3bTf_z0nw',
            language: 'en' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={38.999715}
            lng={-77.025305}
            text="X"
          />
        </GoogleMapReact>
      </div>
    )
  }
}
