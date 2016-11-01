import React, { Component } from 'react';
import web3 from '../web3';
import Coins from './Coins';
import Coin from './Coin';
import NavBar from './NavBar';
import Accounts from './Accounts';
import NoEthereum from './NoEthereum';
import simplecoinFactory from '../../simplecoin/build/js_module';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const params = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.state = {
      url: params.length > 0 ? params[0] : '',
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
      feedPrices: {}
    };

    this.checkNetwork = this.checkNetwork.bind(this);
    this.initNetwork = this.initNetwork.bind(this);
    this.checkAccounts = this.checkAccounts.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.initContracts = this.initContracts.bind(this);
    this.getCoin = this.getCoin.bind(this);
    this.updateCoin = this.updateCoin.bind(this);
    this.updateFeedPrices = this.updateFeedPrices.bind(this);
    this.renderNoWeb3 = this.renderNoWeb3.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.parseUrl = this.parseUrl.bind(this);

    web3.eth.isSyncing((error, sync) => {
      if (!error) {
        const networkState = {...this.state.network};
        networkState['syncing'] = (sync !== false);
        this.setState({ network: networkState });

        // Stop all app activity
        if (sync === true) {
          // We use `true`, so it stops all filters, but not the web3.eth.syncing polling
          web3.reset(true);
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
            feedbase: null,
            spread: null,
            balanceOf: null,
            totalSupply: null,
            types: []   
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

  updateFeedPrices(feedbaseToken, id, value) {
    const feedPrices = {...this.state.feedPrices};
    if(typeof(feedPrices[feedbaseToken]) === 'undefined') {
      feedPrices[feedbaseToken] = {};
    }
    feedPrices[feedbaseToken][id] = value;
    this.setState({ feedPrices: feedPrices });
  }

  initContracts() {
    // Testing purpose
    window.simplecoinFactory = simplecoinFactory;
    //
    simplecoinFactory.class(web3, this.state.network.network);
    
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
    web3.version.getNode((error) => {
      const isConnected = !error;

      // Check if we are synced
      if (isConnected) {
        web3.eth.getBlock('latest', (e, res) => {
          if (typeof(res) === 'undefined') {
            console.debug('YIKES! getBlock returned undefined!');
          }
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
          web3.eth.getBlock(0, (e, res) => {
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
    web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        const networkState = {...this.state.network};
        networkState['accounts'] = accounts;
        networkState['defaultAccount'] = accounts[0];
        this.setState({ network: networkState });
      }
    });
  }

  setUrl(hash) {
    this.setState({ url: hash });
  }

  parseUrl() {
    if(this.state.url !== '' && this.state.coins[this.state.url]) {
      return this.state.url;
    }
    else {
      return null;
    }
  }

  renderNoWeb3() {
    return (
      <NoEthereum />
    );
  }

  changeAccount(newAccount) {
    console.log('New account: ', newAccount);
    const networkState = {...this.state.network};
    networkState['defaultAccount'] = newAccount;
    this.setState({ network: networkState });
  }

  renderContent() {
    return (
      <div className="row">
        <div className="col-md-12">
          {
          (this.parseUrl() !== null)
                ? <Coin coin={this.state.coins[this.parseUrl()]}
                        account={this.state.network.defaultAccount}
                        feedPrices={this.state.feedPrices}
                        network={this.state.network.network}
                        simplecoinFactory={simplecoinFactory}
                        updateCoin={this.updateCoin}
                        updateFeedPrices={this.updateFeedPrices}
                        setUrl={this.setUrl}/>
                : <Coins coins={this.state.coins}
                         setUrl={this.setUrl}/>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <NavBar {...this.state.network} setUrl={this.setUrl}/>
        <div className="container">
          {
            this.state.network.isConnected ? this.renderContent() : this.renderNoWeb3() 
          }
        </div>
      </div>     
    );
  }
}

export default App;
