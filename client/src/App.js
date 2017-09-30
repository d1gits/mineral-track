import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import MineralTrackContract from '../build/contracts/MineralTrack.json'

import getWeb3 from './utils/getWeb3'

import Header from './components/Header'
import Home from './components/Home'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contract = require('truffle-contract')
const mineralTrack = contract(MineralTrackContract)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hashedData: null,
      ownerAddress: null,
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  /* 
   * MINERAL TRACK CONTRACT INTERACTIONS
   *
   * Use these functions as an example how to interact with the
   * MineralTrack.sol contract. 
   * 
   * 1. Get Fingerprints for owner; @params: address
   * 
   * 2. Store Fingerprints for owner; @params: hashedData 
   *
  */

  getFingerprints() {
    mineralTrack.setProvider(this.state.web3.currentProvider)
    var mineralTrackInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      mineralTrack.deployed().then((instance) => {
        mineralTrackInstance = instance
        // Get the fingerprint value for specified owner address.
        return mineralTrackInstance.get.call(this.owner, {from: accounts[0]}).then((result) => {
          // Update state with the result.
          return this.setState({ ownerAddress: result.c[0] })
        })
      })
    })
  }

  storeFingerprints() {
    mineralTrack.setProvider(this.state.web3.currentProvider)
    var mineralTrackInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      mineralTrack.deployed().then((instance) => {
        mineralTrackInstance = instance
        // Stores hash of fingerprint value.
        return mineralTrackInstance.set(this.hashedData, {from: accounts[0]}).then((result) => {
          console.log(result.c[0])
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header />

        <Home />
      </div>
    );
  }
}

export default App
