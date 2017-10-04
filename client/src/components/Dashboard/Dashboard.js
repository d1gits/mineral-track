import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GoogleMaps from './Map';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <GoogleMaps
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDokG-Qjpj5CLuwLFEQ81yCowmqEmFEDII&callback=initMap"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ position:'fixed', top:'0', bottom:0, left:0, right:0, zIndex:-1 }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Dashboard);
