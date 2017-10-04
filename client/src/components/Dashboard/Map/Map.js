import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps"
import mapStyles from './mapStyles';
import marker from './assets/marker.svg';

const pathCoordinates=[
{lat:-3.418669, lng:24.488443},
{lat:7.418669,lng: 80.488443},
]
const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 0.6,
  scale: 2,
};
const polyLineOptions = {
  strokeColor: '#ffffff',
  strokeWeight: 0,
  icons: [{
    icon: lineSymbol,
    repeat: '10px',
    offset: '50%',
  }],
}



const CustomGoogleMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 20.378615, lng: 38.900161 }}
    defaultOptions={{
      styles: mapStyles,
      streetViewControl: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
  >

  <Marker position={{ lat: -3.418669, lng: 24.488443 }} icon={{url: marker, anchor:{x:14,y:15}}} />
  <Marker position={{ lat: 20.418669, lng: 78.488443 }} icon={{url: marker, anchor:{x:14,y:15}}} />
  <Marker position={{ lat: 30.418669, lng: 110.488443 }} icon={{url: marker, anchor:{x:14,y:15}}} />
  <Marker position={{ lat: 52.378615, lng: 4.900161 }} icon={{url: marker, anchor:{x:14,y:15}}} />
  <Polyline
    path={[{ lat: -3.418669, lng: 24.488443 }, { lat: 20.418669, lng: 78.488443 } ]}
    geodesic={true}
    options={polyLineOptions}
  />
  <Polyline
    path={[{ lat: 20.418669, lng: 78.488443 }, {lat: 30.418669, lng: 110.488443}]}
    geodesic={true}
    options={polyLineOptions}
  />
  <Polyline
    path={[{lat: 30.418669, lng: 110.488443},{ lat: 52.378615, lng: 4.900161 }]}
    geodesic={true}
    options={polyLineOptions}
  />
  </GoogleMap>
))


export default CustomGoogleMap
