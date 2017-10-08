import React, { Component } from 'react';
import './Sources.css'
import AddSource from './AddSource';
import AddClient from './AddClient';

class Sources extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addSourceModal: false,
      addClientModal: false,
      navigation: 'client'
    }
    // This binding is necessary to make `this` work in the callback
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(action, type){
    const self = this;
    return function () {
      const open = (action === 'open' ? true : false);
      if (type === 'client') {
        self.setState({
          addClientModal: open
        })
      } else {
        self.setState({
          addSourceModal: open
        })
      }
    }
  }

  render() {
    const closeAddSource = this.toggleModal('close', 'source');
    const openAddSource = this.toggleModal('open', 'source');
    const openAddClient = this.toggleModal('open', 'client');
    const closeAddClient = this.toggleModal('close', 'client');

    const buyingFrom = [
      {companyName: 'Mining cooperative', type:'mine', location: 'DR Congo'},
      {companyName: 'Processor Inc.', type:'intermediary', location: 'India'},
      {companyName: 'Smelter Inc.', type:'intermediary', location: 'China'}
    ]
    const SellingTo = [
      {companyName: 'Apple Inc.', type:'enduser', location: 'New York'},
      {companyName: 'Fairphone', type:'enduser', location: 'Amsterdam'},
      {companyName: 'Cisco Systems', type:'enduser', location: 'California'}
    ]
    const actors = this.props.navigation === 'client' ? buyingFrom : SellingTo;

    return (
      <div>
        { !this.state.addSourceModal ? null : <AddSource closeAddSource={closeAddSource} /> }
        { !this.state.addClientModal ? null : <AddClient closeAddClient={closeAddClient} /> }

        <div className="sourcesContainer">
          {this.props.user.type !=='enduser' ?
          <div className="sources-navigation">
            <div className={"sources-navigation-item " + (this.props.navigation === 'source' ? "active" : '')} onClick={this.props.switchSource('source')}>
              Sources
            </div>
            <div className={"sources-navigation-item " + (this.props.navigation === 'client' ? "active" : '')} onClick={this.props.switchSource('client')}>
              Clients
            </div>
          </div> : null }
          {this.props.navigation === 'source' ?
          <div className="addSource" onClick={openAddSource}>Add Source</div>
          :
          <div className="addSource" onClick={openAddClient}>Add Client</div>
          }
          {this.props.companies.map((company, index) => (company.contactPerson !== this.props.user.email ?
            <div key={index} className={"source "+ company.type}>
              <div className="source-company-name">
                {company.companyName}
              </div>
              <div className="source-company-details">
                {company.type}, {company.location}
              </div>
            </div> : null
          ))}

        </div>
      </div>
    );
  }
}

export default Sources
