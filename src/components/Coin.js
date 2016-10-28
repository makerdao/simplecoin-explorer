import React, { Component } from 'react';
import web3 from '../web3';

class Coin extends Component {
  constructor(props) {
    super();
    this.simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.coin.coinId);

    this.getValueFromContract = this.getValueFromContract.bind(this);
    this.updateCoinValue = this.updateCoinValue.bind(this);
    this.getBalanceOfCollateral = this.getBalanceOfCollateral.bind(this);

    //Testing purpose
    window.simplecoin = this.simplecoin;
    //

    this.updateCoinValue('feedbase');
    this.updateCoinValue('owner');
    this.updateCoinValue('rules');
    this.updateCoinValue('totalSupply');
    this.updateCoinValue('balanceOf');
    
    this.updateCoinCollateral();
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
        for(let i=0; i<resultProm.length; i++) {
          if (typeof(types[indexes[i]['collateralId']]) === 'undefined') {
            types[indexes[i]['collateralId']] = collateralType;
          }
          types[indexes[i]['collateralId']][indexes[i]['key']] = resultProm[i];
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
      });
    });
  }

  getBalanceOfCollateral(token) {
    const p = new Promise((resolve, reject) => {
      const tokenContract = this.props.simplecoinFactory.classes.Simplecoin.at(token);
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

  renderCollateralType(key, row) {
    return(
      <table key={key}>
        <tbody>
          <tr><td>Collateral type:</td><td>{key}{Number(row['token']) ? '' : ' (cancelled)'}</td></tr>
          <tr><td>Token:</td><td>{row['token']}</td></tr>
          <tr><td>Vault:</td><td>{row['vault']}</td></tr>
          <tr><td>Price feed:</td><td>{row['feed'].toNumber()}</td></tr>
          <tr><td>Spread:</td><td>{row['spread'].toNumber()}</td></tr>
          <tr><td>Debt Ceiling:</td><td>{row['ceiling'].toNumber()}</td></tr>
          <tr><td>Debt:</td><td>{row['debt'].toNumber()}</td></tr>
          <tr><td>Your balance:</td><td>{web3.fromWei(row['balanceOf'].toNumber())}</td></tr>
        </tbody>
      </table>
    )
  }
  
  render() {
    const collateralTypes = [];
    for (let i=0; i<this.props.coin.types.length; i++) {
      collateralTypes.push(this.renderCollateralType(i, this.props.coin.types[i]));
    }
    
    const  rules = typeof(this.props.coin.rules) === 'string' ? web3.toAscii(this.props.coin.rules) : this.props.coin.rules;
    const  totalSupply = this.props.coin.totalSupply !== null ? this.props.coin.totalSupply.toNumber() : null;
    const  balanceOf = this.props.coin.balanceOf !== null ? this.props.coin.balanceOf.toNumber() : null;
    return (
      <div>
        <p>Coin: {this.props.coin.coinId}</p>
        <p>Feedbase: {this.props.coin.feedbase}</p>
        <p>Owner: {this.props.coin.owner}</p>
        <p>Rules: {rules}</p>
        <p>Total Supply: {totalSupply}</p>
        <p>Your balance: {balanceOf}</p>
        <p>Collateral types: {this.props.coin.types.length}</p>
        { collateralTypes }
        <p><a href="#" onClick={(e) => this.props.setUrl('') }>Back</a></p>
      </div>
    );
  }
}

export default Coin;
