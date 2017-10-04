import React, { Component } from 'react'
import Header from '../Header'
import Value from './Value'
import How from './How'


import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
  }

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
