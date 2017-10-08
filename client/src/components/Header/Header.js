import React, { Component } from 'react';
import { Link } from 'react-router';
import './Header.css'
import Signup from '../Auth/Signup';



class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signupModal: false,
    }
    // This binding is necessary to make `this` work in the callback
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentWillMount() {

  }

  toggleModal(action){
    const self = this;
    return function () {
      const open = (action === 'open' ? true : false);
      self.setState({
        signupModal: open
      })
    }
  }

  render() {
    const openSignup = this.toggleModal('open');
    const closeSignup = this.toggleModal('close');

    return (
      <div className="Header">
        { !this.state.signupModal ? null : <Signup closeSignup={closeSignup} /> }
        <div className="caption">
          <div className="caption-title">Mineral Track</div>
        </div>
        <div className="cta">
          <Link className="cta-signup" to="#" onClick={openSignup} >Sign Up</Link>
          <a href="#" className="cta-learnmore">Learn more</a>
        </div>
        <div className="caption-bottom">
          <div className="caption-subtitle">We provide a protocol to handle varying international standards of compliance and traceability that are challenging to identify.</div>
        </div>

    </div>
    );
  }
}

export default Header
