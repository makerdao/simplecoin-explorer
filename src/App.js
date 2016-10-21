import React, { Component } from 'react';
import Web3 from 'web3';
import simplecoin from '../simplecoin/build/js_module';
import feedbase from '../node_modules/feedbase/build/js_module';
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
      syncing: null,
      startingBlock: null,
      currentBlock: null,
      highestBlock: null,
      latestBlock: null,
      outOfSync: null,
      isConnected: null,
      network: null,
      accounts: null,
      defaultAccount: null
    }

    this.checkNetwork = this.checkNetwork.bind(this);
    this.initNetwork = this.initNetwork.bind(this);
    this.checkAccounts = this.checkAccounts.bind(this);
    this.initContracts = this.initContracts.bind(this);

    this.web3.eth.isSyncing((error, sync) => {
      if (!error) {
        this.setState({
          syncing: sync !== false
        });

        // Stop all app activity
        if (sync === true) {
          // We use `true`, so it stops all filters, but not the web3.eth.syncing polling
          this.web3.reset(true);
          console.log('Is Syncing - ', new Date().getTime() / 1000);
          this.checkNetwork();
        // show sync info
        } else if (sync) {
          this.setState({
            startingBlock: sync.startingBlock,
            currentBlock: sync.currentBlock,
            highestBlock: sync.highestBlock,
          });
        } else {
          this.setState({
            outOfSync: false
          });
        }
      }
    });
  }

  initContracts() {
    window.simplecoin = simplecoin;
    window.feedbase = feedbase;
  }

  componentDidMount() {
    this.checkNetwork();
    this.checkAccounts();
    this.initContracts();

    const checkAccountsInterval = setInterval(this.checkAccounts, 10000);
    const checkNetworkInterval = setInterval(this.checkNetwork, 3000);
    // store checkAccountsInterval in the state so it can be accessed later:
    this.setState({
      checkAccountsInterval, 
      checkNetworkInterval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.checkAccountsInterval);
    clearInterval(this.state.checkNetworkInterval);
  }

  checkNetwork() {
    console.log('Check Network - ', new Date().getTime() / 1000);
    this.web3.version.getNode((error) => {
      const isConnected = !error;

      // Check if we are synced
      if (isConnected) {
        this.web3.eth.getBlock('latest', (e, res) => {
          if (res.number >= this.state.latestBlock) {
            this.setState({
              latestBlock: res.number,
              outOfSync: e != null || ((new Date().getTime() / 1000) - res.timestamp) > 600 
            });
          } else {
            // XXX MetaMask frequently returns old blocks
            // https://github.com/MetaMask/metamask-plugin/issues/504
            console.debug('Skipping old block');
          }
        });
      }

      // Check which network are we connected to
      // https://github.com/ethereum/meteor-dapp-wallet/blob/90ad8148d042ef7c28610115e97acfa6449442e3/app/client/lib/ethereum/walletInterface.js#L32-L46
      if (this.state.isConnected !== isConnected) {
        if (isConnected === true) {
          this.web3.eth.getBlock(0, (e, res) => {
            let network = false;
            if (!e) {
              switch (res.hash) {
                case '0x0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303':
                  network = 'morden';
                  break;
                case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
                  network = 'live';
                  break;
                default:
                  console.log('setting network to private');
                  console.log('res.hash:', res.hash);
                  network = 'private';
              }
            }
            if (this.state.network !== network) {
              this.initNetwork(network);
            }
          });
        } else {
          this.setState({
            isConnected,
            network: false,
            latestBlock: 0
          });
        }
      }
    });
  }

  initNetwork(newNetwork) {
    //checkAccounts();
    this.setState({
      network: newNetwork,
      isConnected: true,
      latestBlock: 0,
    });
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
        {
          Object.keys(this.state).map(key => <p key={key}>{key}:
          &nbsp;{typeof(this.state[key]) === 'boolean' ? (this.state[key] ? 'true' : 'false') : this.state[key]}</p>)
        }
      </div>
    );
  }
}

export default App;
