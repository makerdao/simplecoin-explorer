import React, { Component } from 'react';
import EthereumAddress from './EthereumAddress';
import feedbase from '../../simplecoin/vendor/feedbase-0.9';
import web3 from '../web3';

class Coin extends Component {
  constructor(props) {
    super();
    this.simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.coin.coinId);

    this.getValueFromContract = this.getValueFromContract.bind(this);
    this.updateCoinValue = this.updateCoinValue.bind(this);
    this.updateCoinBalance = this.updateCoinBalance.bind(this);
    this.updateFeedbaseAndCollateral = this.updateFeedbaseAndCollateral.bind(this);
    this.getBlock = this.getBlock.bind(this);
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

  getBlock(blockNumber) {
    const p = new Promise((resolve, reject) => {
      web3.eth.getBlock(blockNumber, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
    return p;
  }

  updateHistory(result) {
    const transactions = [];
    const promises = [];
    for(let i=0; i<result.length; i++) {
      promises.push(this.getBlock(result[i].blockNumber));
    }

    Promise.all(promises).then((resultProm) => {
      console.log(resultProm);
      for(let i=0; i<result.length; i++) {
        transactions.push({timestamp: resultProm[i].timestamp, type: 'transfer', from: result[i].args.from,  to: result[i].args.to,  value: result[i].args.value});
      }

      let history = {...this.state.history};
      if(history.length > 0) {
        history = history.concat(transactions);
      } else {
        history = transactions;
      }
      this.setState({ history: history });
    });


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
        <td><EthereumAddress address={row['token']} short={true} /></td>
        <td><EthereumAddress address={row['vault']} short={true} /></td>
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
        <td>{row['timestamp']}</td>
        <td>{row['type']}</td>
        <td><EthereumAddress address={row['from']} /></td>
        <td><EthereumAddress address={row['to']} /></td>
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
      <div className="row">
        <div className="col-md-6">
          <p><strong>Coin: </strong><EthereumAddress address={this.props.coin.coinId} /></p>
          <p><strong>Owner: </strong><EthereumAddress address={this.props.coin.owner} /></p>
        </div>
        <div className="col-md-6">
          <p><strong>Rules: </strong>{rules}</p>
          <p><strong>Price Supplier (Feedbase): </strong><EthereumAddress address={this.props.coin.feedbase} /></p>
        </div>
        <div className="col-md-6 text-center">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Total Supply</h3>
            </div>
            <div className="panel-body"><span>{totalSupply}</span></div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Your Balance</h3>
            </div>
            <div className="panel-body"><span>{balanceOf}</span></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="well">
            <h2>Transfer</h2>
            <form className="form-horizontal">
              <div className="form-group">
                <div className="col-sm-4">
                  <label className="control-label" htmlFor="recipient">Recipient </label>
                </div>
                <div className="col-sm-8">
                  <input className="form-control" type="text" required placeholder="0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6" id="recipient" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4">
                  <label className="control-label" htmlFor="amount">Amount </label>
                </div>
                <div className="col-sm-8">
                  <input className="form-control text-right" type="number" required placeholder="0.00" id="amount" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-8 col-sm-offset-4" id="transfer-column">
                  <button className="btn btn-default btn-lg" type="submit">Transfer </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-12">
          <h2>Collaterals ({this.props.coin.types.length})</h2>
        </div>
        <div className="col-md-5">
          <div className="thumbnail"><img src="assets/img/meta-chart.svg" alt="Collaterals" />
            <div className="caption">
              <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget
                quam. Donec id elit non mi porta gravida at eget metus.</p>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Token </th>
                  <th>Vault </th>
                  <th>Price Feed</th>
                  <th>Spread </th>
                  <th>Debt Ceiling</th>
                  <th>Debt </th>
                  <th>Your Balance</th>
                </tr>
              </thead>
              <tbody>
                { collateralTypes }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-12">
          <h2>Transactions </h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Date </th>
                  <th>Type </th>
                  <th>Sender </th>
                  <th>Receiver </th>
                  <th>Amount </th>
                </tr>
              </thead>
              <tbody>
                { history }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Coin;
