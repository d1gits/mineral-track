import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './Navigation.css'
import Signin from '../Auth/Signin';
import UserNavigation from './UserNavigation'


class Navigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signinModal: false
    }
    // This binding is necessary to make `this` work in the callback
    this.toggleModal = this.toggleModal.bind(this);
  }

  renderLinks() {

    const openSignin = this.toggleModal('open');

    if (this.props.authenticated) {
      return (<UserNavigation />)
    } else {
      return [
        <Link to="#" className="nav-item">Home</Link>,
        <Link to="#" className="nav-item">About</Link>,
        <Link to="#" className="nav-item">Team</Link>,
        <Link className="nav-item" key={1} to="#" onClick={openSignin}>Log In</Link>,

      ];
    }
  }

  toggleModal(action){
    const self = this;
    return function () {
      const open = (action == 'open' ? true : false);
      self.setState({
        signinModal: open
      })
    }
  }

  render() {
    const closeSignin = this.toggleModal('close');

    return (
      <nav className="Navigation">
          {this.renderLinks()}
          { !this.state.signinModal ? null : <Signin closeSignin={closeSignin} /> }
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navigation);
