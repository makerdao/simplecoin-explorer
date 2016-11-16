import React, { Component } from 'react';
import feedbase from '../../simplecoin/vendor/feedbase-0.9';
import web3 from '../web3';
import './Coin.css';

class Coin extends Component {
  constructor(props) {
    super();
    this.simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.coin.coinId);

    this.getValueFromContract = this.getValueFromContract.bind(this);
    this.updateCoinValue = this.updateCoinValue.bind(this);
    this.updateCoinBalance = this.updateCoinBalance.bind(this);
    this.updateFeedbaseAndCollateral = this.updateFeedbaseAndCollateral.bind(this);
    this.getBalanceOfCollateral = this.getBalanceOfCollateral.bind(this);
    this.getBalanceOfCoin = this.getBalanceOfCoin.bind(this);
    this.getFeedPrice = this.getFeedPrice.bind(this);
    this.updateHistory = this.updateHistory.bind(this);

    this.state = {
      history: [],
    }


    //Testing purpose
    window.simplecoin = this.simplecoin;
    window.feedbase = feedbase;
    //
  }

  componentDidMount() {
    this.updateCoinValue('owner');
    this.updateCoinValue('rules');
    this.updateCoinValue('totalSupply');
    this.updateCoinBalance();
    this.updateFeedbaseAndCollateral('feedbase');

    this.simplecoin.Transfer({ }, { fromBlock: 0 }).get((error, result) => {
      if(!error) {
        this.updateHistory(result);
      }  
    });
  }

  updateHistory(result) {
    const transactions = [];
    for(let i=0; i<result.length; i++) {
      transactions.push({type: 'transfer', from: result[i].args.from,  to: result[i].args.to,  value: result[i].args.value})
    }
    let history = {...this.state.history};
    if(history.length > 0) {
      history = history.concat(transactions);
    } else {
      history = transactions;
    }
    this.setState({ history: history });
  }

  getValueFromContract(field, param) {
    const p = new Promise((resolve, reject) => {
      this.simplecoin[field](param, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  updateCoinValue(field) {
    this.getValueFromContract(field).then((result) => {
      this.props.updateCoin(this.props.coin.coinId, field, result);
    });
  }

  updateCoinBalance() {
    this.getBalanceOfCoin().then((result) => {
      this.props.updateCoin(this.props.coin.coinId, 'balanceOf', result);
    });
  }

  updateFeedbaseAndCollateral() {
    this.getValueFromContract('feedbase').then((result) => {
      this.props.updateCoin(this.props.coin.coinId, 'feedbase', result);
      feedbase.environments[this.props.network].feedbase['value'] = this.props.coin.feedbase;
      feedbase.class(web3, this.props.network);
      this.updateCoinCollateral();
    });
  }

  updateCoinCollateral() {
    this.getValueFromContract('nextType').then((typesCount) => {
      const collateralType = {
        token: null,
        vault: null,
        feed: null,
        spread: null,
        ceiling: null,
        debt: null,
        balanceOf: null,
      }

      const promises = [];
      const indexes = [];
      
      for(let collateralId=0; collateralId<typesCount; collateralId++) {
        Object.keys(collateralType).map(key => {
          if(key !== 'balanceOf') {
            promises.push(this.getValueFromContract(key, collateralId));
            indexes.push({key, collateralId});
          }
          return true;
        }); 
      }

      Promise.all(promises).then((resultProm) => {
        const types = [];
        const feedIds = [];

        for(let i=0; i<resultProm.length; i++) {
          if (typeof(types[indexes[i]['collateralId']]) === 'undefined') {
            types[indexes[i]['collateralId']] = {...collateralType};
          }
          types[indexes[i]['collateralId']][indexes[i]['key']] = resultProm[i];
          
          if(indexes[i]['key'] === 'feed' && feedIds.indexOf(resultProm[i].toNumber()) === -1) {
            feedIds.push(resultProm[i].toNumber());
          }
        }
        const promises2 = [];
        for(let i=0; i<types.length; i++) {
          promises2.push(this.getBalanceOfCollateral(types[i]['token']));
        }

        Promise.all(promises2).then((resultProm2) => {
          for(let i=0; i<types.length; i++) {
            types[i]['balanceOf'] = resultProm2[i];
          }
          this.props.updateCoin(this.props.coin.coinId, 'types', types);
        });

        for(let i=0; i<feedIds.length; i++) {
          this.getFeedPrice(feedIds[i]).then((result) => {
            this.props.updateFeedPrices(this.props.coin.feedbase, feedIds[i], web3.toBigNumber(result[0]));
          });
        }
      });
    });
  }

  getBalanceOfCoin() {
    const p = new Promise((resolve, reject) => {
      this.simplecoin.balanceOf(this.props.account, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  getBalanceOfCollateral(token) {
    const p = new Promise((resolve, reject) => {
      const tokenContract = this.props.simplecoinFactory.classes.Simplecoin.at(token);
      //Testing purpose
      if(typeof(window.tokenContracts) === 'undefined') {
        window.tokenContracts = [];
      }
      window.tokenContracts.push(tokenContract);
      //
      tokenContract.balanceOf(this.props.account, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  getFeedPrice(feedId) {
    const p = new Promise((resolve, reject) => {
      feedbase.objects.feedbase.get.call(feedId, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  renderCollateralType(key, row) {
    let feedPrice = '';
    if(row['feed'].toNumber()
        && typeof(this.props.feedPrices[this.props.coin.feedbase]) !== 'undefined'
        && typeof(this.props.feedPrices[this.props.coin.feedbase][row['feed']]) !== 'undefined'
        && this.props.feedPrices[this.props.coin.feedbase][row['feed'].toNumber()]) {
      feedPrice = web3.fromWei(this.props.feedPrices[this.props.coin.feedbase][row['feed'].toNumber()].toNumber());
    }
    return(
      <tr key={key}>
        <td>{key}{Number(row['token']) ? '' : ' (cancelled)'}</td>
        <td>{row['token']}</td>
        <td>{row['vault']}</td>
        <td>{row['feed'].toNumber()}</td>
        <td>{feedPrice}</td>
        <td>{row['spread'].toNumber()}</td>
        <td>{web3.fromWei(row['ceiling'].toNumber())}</td>
        <td>{web3.fromWei(row['debt'].toNumber())}</td>
        <td>{web3.fromWei(row['balanceOf'].toNumber())}</td>
      </tr>
    )
  }

  renderHistory(key, row) {
    return(
      <tr key={key}>
        <td>{row['type']}</td>
        <td>{row['from']}</td>
        <td>{row['to']}</td>
        <td>{web3.fromWei(row['value'].toNumber())}</td>
      </tr>
    )
  }
  
  render() {
    const collateralTypes = [];
    for (let i=0; i<this.props.coin.types.length; i++) {
      collateralTypes.push(this.renderCollateralType(i, this.props.coin.types[i]));
    }

    const history = [];
    for (let i=0; i<this.state.history.length; i++) {
      history.push(this.renderHistory(i, this.state.history[i]));
    }
    
    const  rules = typeof(this.props.coin.rules) === 'string' ? web3.toAscii(this.props.coin.rules) : this.props.coin.rules;
    const  totalSupply = this.props.coin.totalSupply !== null ? web3.fromWei(this.props.coin.totalSupply.toNumber()) : null;
    const  balanceOf = this.props.coin.balanceOf !== null ? web3.fromWei(this.props.coin.balanceOf.toNumber()) : null;
    return (
      <div>
        <h2>Coin {this.props.coin.coinId}</h2>
        <p><strong>Owner:</strong> {this.props.coin.owner}</p>
        <p><strong>Rules:</strong> {rules}</p>
        <p><strong>Feedbase:</strong> {this.props.coin.feedbase}</p>       
        <p><strong>Total Supply:</strong> {totalSupply}</p>
        <p><strong>Your balance:</strong> {balanceOf}</p>
        <p><a href="#" onClick={(e) => this.props.setUrl('') }>Back</a></p>
        <h3>Collateral types: {this.props.coin.types.length}</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Token</th>
              <th>Vault</th>
              <th>Price Feed Id</th>
              <th>Price</th>
              <th>Spread</th>
              <th>Debt Ceiling</th>
              <th>Debt</th>
              <th>Your balance</th>
            </tr>
          </thead>
          <tbody>
            { collateralTypes }
          </tbody>
        </table>
        <h3>History</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            { history }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Coin;
