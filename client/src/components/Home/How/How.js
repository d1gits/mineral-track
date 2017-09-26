import React, { Component } from 'react'

import './How.css'

class How extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="How">
        <div className="find-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div className="value-title">Find chain</div>
                <div className="value-subtext">Find a chain, end-to end, from mine to retailer.</div>
              </div>
              <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                <div className="find-illustration"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default How
