import React from 'react';

import { withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps"
import mapStyles from './mapStyles';
import markericon from './assets/marker.svg';

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



const CustomGoogleMap = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={props.baseLocation}
    defaultOptions={{
      styles: mapStyles,
      streetViewControl: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
  >
    <Marker position={props.baseLocation} icon={{url: markericon, anchor:{x:14,y:15}}} />
    {props.markers.map((marker,index)=>(
      <Marker key={"marker"+index}position={marker} icon={{url: markericon, anchor:{x:14,y:15}}} />
    ))}
    {props.links.map((link,index)=>(
      <Polyline key={"polyline"+index}
        path={[link.origin, link.target ]}
        geodesic={true}
        options={polyLineOptions}
      />
    ))}
  </GoogleMap>
)


export default CustomGoogleMap
