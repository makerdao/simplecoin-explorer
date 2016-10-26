import React, { Component } from 'react';
import Web3 from 'web3';
import Coins from './Coins';
import Coin from './Coin';
import simplecoinFactory from '../../simplecoin/build/js_module';
import feedbase from '../../node_modules/feedbase/build/js_module';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let web3 = new Web3(window.web3 ? window.web3.currentProvider : (
      new Web3.providers.HttpProvider("http://localhost:8545")
    ))
    this.web3 = web3;
    this.state = {
      network: {
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
      },
      coins: {},
    };

    this.checkNetwork = this.checkNetwork.bind(this);
    this.initNetwork = this.initNetwork.bind(this);
    this.checkAccounts = this.checkAccounts.bind(this);
    this.initContracts = this.initContracts.bind(this);
    this.getCoin = this.getCoin.bind(this);
    this.updateCoin = this.updateCoin.bind(this);
    this.renderNoWeb3 = this.renderNoWeb3.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderNetworkVariables = this.renderNetworkVariables.bind(this);

    this.web3.eth.isSyncing((error, sync) => {
      if (!error) {
        const networkState = {...this.state.network};
        networkState['syncing'] = (sync !== false);
        this.setState({ network: networkState });

        // Stop all app activity
        if (sync === true) {
          // We use `true`, so it stops all filters, but not the web3.eth.syncing polling
          this.web3.reset(true);
          this.checkNetwork();
        // show sync info
        } else if (sync) {
          const networkState = {...this.state.network};
          networkState['startingBlock'] = sync.startingBlock;
          networkState['currentBlock'] = sync.currentBlock;
          networkState['highestBlock'] = sync.highestBlock;
          this.setState({ network: networkState });
        } else {
          const networkState = {...this.state.network};
          networkState['outOfSync'] = false;
          this.setState({ network: networkState });
        }
      }
    });
  }

  getCoin(i) {
    const p = new Promise((resolve, reject) => {
      simplecoinFactory.objects.factory.coins(i, (error, result) => {
        if (!error) {
          const coin = {
            coinId: result,
            owner: null,
            rules: null,
            feed: null,
            spread: null,
            totalSupply: null,
            collateralTypes: {}   
          };
          resolve(coin);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  updateCoin(index, field, value) {
    const coins = {...this.state.coins};
    coins[index][field] = value;
    this.setState({ coins: coins });
  }

  initContracts() {
    // Testing purpose
    window.simplecoinFactory = simplecoinFactory;
    window.feedbase = feedbase;
    //
    simplecoinFactory.class(this.web3, this.state.network.network);
    simplecoinFactory.objects.factory.count((e, r) => {
      const promises = [];
      for (let i=0; i<r; i++) {
        promises.push(this.getCoin(i));
      }
      Promise.all(promises).then((resultProm) => {
        const coins = {};
        for (let i=0; i<resultProm.length; i++) {
          coins[resultProm[i]['coinId']] = resultProm[i];
        }
        this.setState({ coins: coins });
      });
    });
  }

  componentDidMount() {
    this.checkNetwork();
    this.checkAccounts();
    this.initContracts();

    this.checkAccountsInterval = setInterval(this.checkAccounts, 10000);
    this.checkNetworkInterval = setInterval(this.checkNetwork, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.checkAccountsInterval);
    clearInterval(this.checkNetworkInterval);
  }

  checkNetwork() {
    this.web3.version.getNode((error) => {
      const isConnected = !error;

      // Check if we are synced
      if (isConnected) {
        this.web3.eth.getBlock('latest', (e, res) => {
          if (res.number >= this.state.network.latestBlock) {
            const networkState = {...this.state.network};
            networkState['latestBlock'] = res.number;
            networkState['outOfSync'] = e != null || ((new Date().getTime() / 1000) - res.timestamp) > 600;
            this.setState({ network: networkState });
          } else {
            // XXX MetaMask frequently returns old blocks
            // https://github.com/MetaMask/metamask-plugin/issues/504
            console.debug('Skipping old block');
          }
        });
      }

      // Check which network are we connected to
      // https://github.com/ethereum/meteor-dapp-wallet/blob/90ad8148d042ef7c28610115e97acfa6449442e3/app/client/lib/ethereum/walletInterface.js#L32-L46
      if (this.state.network.isConnected !== isConnected) {
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
            if (this.state.network.network !== network) {
              this.initNetwork(network);
            }
          });
        } else {
          const networkState = {...this.state.network};
          networkState['isConnected'] = isConnected;
          networkState['network'] = false;
          networkState['latestBlock'] = 0;
          this.setState({ network: networkState });
        }
      }
    });
  }

  initNetwork(newNetwork) {
    //checkAccounts();
    const networkState = {...this.state.network};
    networkState['network'] = newNetwork;
    networkState['isConnected'] = true;
    networkState['latestBlock'] = 0;
    this.setState({ network: networkState });
  }

  checkAccounts() {
    this.web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        const networkState = {...this.state.network};
        networkState['accounts'] = accounts;
        networkState['defaultAccount'] = accounts[0];
        this.setState({ network: networkState });
      }
    });
  }

  parseUrl() {
    const params = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    if(params.length > 0 && params[0] !== '' && this.state.coins[params[0]]) {
      return params[0];
    }
    else {
      return null;
    }
  }

  renderNoWeb3() {
    return (
      <div>
        No Web3
      </div>
    );
  }

  renderNetworkVariables() {
    return (
      <div>
        {
          Object.keys(this.state.network).map(key => <p key={key}>{key}:
          &nbsp;{typeof(this.state.network[key]) === 'boolean' ? (this.state.network[key] ? 'true' : 'false') : this.state.network[key]}</p>)
        }
        <hr />
      </div>
    );
  }

  renderContent() {
    return (
      <div>
        {this.renderNetworkVariables()}
        {
        (this.parseUrl() !== null)
              ? <Coin coin={this.state.coins[this.parseUrl()]} updateCoin={this.updateCoin} simplecoinFactory={simplecoinFactory}/>
              : <Coins coins={this.state.coins}/>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simplecoin Explorer</h2>
        </div>
        {
          this.state.network.isConnected ? this.renderContent() : this.renderNoWeb3() 
        }
        {}
      </div>     
    );
  }
}

export default App;
