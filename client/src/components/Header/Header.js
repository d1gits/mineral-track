import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="Header">
        <nav className="Navigation">
            <a href="#" className="nav-item">Home</a>
            <a href="#" className="nav-item">About</a>
            <a href="#" className="nav-item">Team</a>
            <a href="#" className="nav-item">Log in</a>
        </nav>
        <div className="caption">
          <div className="caption-title">Decentrally mapping the global mineral supply chain</div>
          <div className="caption-subtitle">Mineral track is an application to track minerals down the supply chain in a decentralised way to make sure there's no central point of failure.</div>
        </div>
        <div className="cta">
          <a href="#" className="cta-signup">Sign up</a>
          <a href="#" className="cta-learnmore">Learn more</a>
        </div>
    </div>
    );
  }
}

export default Header
