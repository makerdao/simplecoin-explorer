import React, { Component } from 'react';
import web3 from '../web3';

class Coin extends Component {
  constructor(props) {
    super();
    this.simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.coin.coinId);

    this.getValueFromContract = this.getValueFromContract.bind(this);
    this.updateCoinValue = this.updateCoinValue.bind(this);

    //Testing purpose
    window.simplecoin = this.simplecoin;
    //

    this.updateCoinValue('owner');
    this.updateCoinValue('rules');
    this.updateCoinValue('totalSupply');
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
          promises.push(this.getValueFromContract(key, collateralId));
          indexes.push({key, collateralId});
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
        this.props.updateCoin(this.props.coin.coinId, 'types', types);
      });
    });
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
          <tr><td>Your balance:</td><td>{row['balanceOf'].toNumber()}</td></tr>
        </tbody>
      </table>
    )
  }
  
  render() {
    const collateralTypes = [];
    for (let i=0; i<this.props.coin.types.length; i++) {
      collateralTypes.push(this.renderCollateralType(i, this.props.coin.types[i]));
    }
    let rules = this.props.coin.rules;
    if(typeof(this.props.coin.rules) === 'string') {
      rules = web3.toAscii(this.props.coin.rules);
    }
    
    return (
      <div>
        <p>CoinId: {this.props.coin.coinId}</p>
        <p>Owner: {this.props.coin.owner}</p>
        <p>Rules: {rules}</p>
        <p>Collateral types: {this.props.coin.types.length}</p>
        { collateralTypes }
        <p><a href="#">Back</a></p>
      </div>
    );
  }
}

export default Coin;
