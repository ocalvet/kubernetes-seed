import React, { Component } from 'react';
import { SERVICES, POL_INTERVAL } from './constants';
import Account from './components/Account';
import fetch from 'isomorphic-fetch';
import './App.css';
import Shipping from './components/Shipping';
import User from './components/User';

class App extends Component {

  state = {
    accounts: {
      data: []
    },
    shipping: {
      data: []
    },
    users: {
      data: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.getServiceData('accounts');
      this.getServiceData('shipping');
      this.getServiceData('users');
    }, POL_INTERVAL);
  }

  request (url, options, timeout = 1000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
  }

  async getServiceData(service) {
    try {
      const serviceResponse = await this.request(`${SERVICES[service]}`);
      console.log(`${service} response`, serviceResponse);
      if (serviceResponse.status !== 200) {
        this.setError(service, `Service ${service} not available`);
      } else {
        const serviceData = await serviceResponse.json();
        console.log(`${service} response`, serviceData);
        this.setServiceData(service, serviceData);
      }
    } catch (e) {
      this.setError(service, `Error retrieving service ${service}`, e);
    }
  }

  setServiceData(service, data) {
    const newState = { ...this.state };
    newState[service] = {
      data: data,
      errorMessage: undefined,
      errorData: undefined,
    };
    this.setState(newState);
  }

  setError(service, errorMessage, errorData) {
    const newState = { ...this.state };
    newState[service] = {
      data: [],
      errorMessage,
      errorData
    };
    this.setState(newState);
  }

  render() {
    const serviceContainerStyles = { border: '1px solid black', padding: 15, width: '30%', height: 500, overflowY: 'auto' };
    const { accounts, shipping, users } = this.state;
    const accountStyles = { ...serviceContainerStyles, backgroundColor: accounts.errorMessage ? '#ffbba0' : 'white' };
    const shippingStyles = { ...serviceContainerStyles, backgroundColor: shipping.errorMessage ? '#ffbba0' : 'white' };
    const userStyles = { ...serviceContainerStyles, backgroundColor: users.errorMessage ? '#ffbba0' : 'white' };
    return (
      <div>
        {(accounts && shipping && users) ?
          <div style={{ padding: 20 }}>
            {/* <h1>Kubernetes services testing application</h1> */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={accountStyles}>
                <h4>Accounts Service Data</h4>
                <div style={{ height: 2, borderBottom: '2px black solid ', marginBottom: 10 }} />
                {!accounts.errorMessage ?
                  accounts.data.map((account, i) => (<Account key={i} account={account} />)) :
                  <div>{accounts.errorMessage}</div>}
              </div>
              <div style={shippingStyles}>
                <h4>Shipping Service Data</h4>
                <div style={{ height: 2, borderBottom: '2px black solid ', marginBottom: 10 }} />
                {!shipping.errorMessage ?
                  shipping.data.map((shipment, i) => (<Shipping key={i} shipping={shipment} />)) :
                  <div>{shipping.errorMessage}</div>}
              </div>
              <div style={userStyles}>
                <h4>Users Service Data</h4>                
                <div style={{ height: 2, borderBottom: '2px black solid ', marginBottom: 10 }} />
                {!users.errorMessage ?
                  users.data.map((user, i) => (<User key={i} user={user} />)) :
                  <div>{users.errorMessage}</div>}
              </div>
            </div>
          </div> :
          <h4>Starting...</h4>}
      </div>
    );
  }
}

export default App;
