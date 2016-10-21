import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let web3 = new Web3(window.web3 ? window.web3.currentProvider : (
      new Web3.providers.HttpProvider("http://localhost:8545")
    ))
    this.web3 = web3;
    this.state = {
      accounts: null,
      defaultAccount: null
    }
    this.checkAccounts = this.checkAccounts.bind(this);
  }

  componentDidMount() {
    this.checkAccounts();
    
    const intervalId = setInterval(this.checkAccounts, 5000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  checkAccounts() {
    this.web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        this.setState({
          accounts,
          defaultAccount: accounts[0]
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          Account: {this.state.defaultAccount}
        </p>
      </div>
    );
  }
}

export default App;
