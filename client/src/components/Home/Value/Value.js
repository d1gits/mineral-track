import React, { Component } from 'react'

import './Value.css'

class Value extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="Value">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div className="value-title">Mining community</div>
            <div className="value-subtext">Get all the benefits of an in-wall or in-ceiling speaker system without any of the hassle. Just replace a few lights around your house, and start streaming crisp, clear audio, everywhere.</div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div className="value-title">Supply chain actor</div>
            <div className="value-subtext">Get all the benefits of an in-wall or in-ceiling speaker system without any of the hassle. Just replace a few lights around your house, and start streaming crisp, clear audio, everywhere.</div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div className="value-title">End-users (Retail)</div>
            <div className="value-subtext">Get all the benefits of an in-wall or in-ceiling speaker system without any of the hassle. Just replace a few lights around your house, and start streaming crisp, clear audio, everywhere.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Value
