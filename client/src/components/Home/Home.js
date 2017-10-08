import React, { Component } from 'react'
import Header from '../Header'
import Value from './Value'
import How from './How'


import './Home.css'

class Home extends Component {

  componentWillMount() {

  }

  render() {

    return (
      <div className="Home">
        <Header />
        <div className="container">
          <Value />
        </div>
        <How />
      </div>
    );
  }
}

export default Home
