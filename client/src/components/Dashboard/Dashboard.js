import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GoogleMaps from './Map';
import LinkedMap from './LinkedMap';
import Sources from './Sources';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      baseLocation : null,
      navigation : 'source',
      markers : [],
      links : []
    }
    this.switchSource = this.switchSource.bind(this);

  }

  componentWillMount() {
    this.props.fetchCompanies();
  }
  componentDidMount () {
    var geocoder =  new window.google.maps.Geocoder();
    var self = this;
    this.setState({
      markers: []
    })

    geocoder.geocode( { 'address': this.props.user.location }, function(results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        self.setState({
          baseLocation: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    var self = this;
    var geocoder =  new window.google.maps.Geocoder();
    this.setState({markers:[]})
    nextProps.companies.forEach((company)=>{
      geocoder.geocode( { 'address': company.location }, function(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          self.setState({
            markers: [...self.state.markers, {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}]
          });
          if (self.props.user.type !== 'enduser'){
            self.setState({
              links: [...self.state.links, {
                origin: self.state.baseLocation, target: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}}]
            });
          } else {
            // console.log('contactPerson': company.contactPerson);
            nextProps.companies.forEach((prevCompany)=>{

              if (prevCompany.contactPerson == company.assignerEmail) {

                geocoder.geocode( { 'address': prevCompany.location }, function(secondResults, status) {
                  if (status === window.google.maps.GeocoderStatus.OK) {
                    self.setState({
                      links: [...self.state.links, {
                        origin: {lat: secondResults[0].geometry.location.lat(), lng: secondResults[0].geometry.location.lng()},
                        target: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
                      }]
                    });
                  }
                });
              }
            });
          }
        }
      });
    })
  }

  switchSource(source) {
    const self = this;
    return function () {
      self.setState({
        navigation: source
      })
    }
  }

  render() {
    const visibleCompanies = (this.props.user.type ==="enduser" ?
      this.props.companies : 
      this.props.companies.filter((company)=>(company.order === this.state.navigation)));
    return (
      <div>
        <Sources user={this.props.user} companies={visibleCompanies} switchSource={this.switchSource} navigation={this.state.navigation} />
        { this.state.baseLocation ?
          <GoogleMaps
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2d0CQyqgpsNUPXc95hwu20neX1T0o8C8&callback=initMap"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ position:'fixed', top:'0', bottom:0, left:'390px', right:0, zIndex:-1 }} />}
            mapElement={<div style={{ height: `100%` }} />}
            baseLocation={this.state.baseLocation}
            markers={this.state.markers}
            links={this.state.links}
          /> : null }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { companies: state.auth.companies || [], user: state.auth.user };
}

export default connect(mapStateToProps, actions)(Dashboard);
