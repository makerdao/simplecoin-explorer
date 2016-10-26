import React, { Component } from 'react';

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
      <div key={key}>
        <p>Collateral type: {key}</p>
        <p>Token: {row['token']}</p>
        <p>Vault: {row['vault']}</p>
        <p>Price feed: {row['feed'].toNumber()}</p>
        <p>Spread: {row['spread'].toNumber()}</p>
        <p>Debt Ceiling: {row['ceiling'].toNumber()}</p>
        <p>Debt: {row['debt'].toNumber()}</p>
        <p>Your balance: {row['balanceOf'].toNumber()}</p>
      </div>
    )
  }
  
  render() {
    const collateralTypes = [];
    for (let i=0; i<this.props.coin.types.length; i++) {
      collateralTypes.push(this.renderCollateralType(i, this.props.coin.types[i]));
    }
    return (
      <div>
        <p>CoinId: {this.props.coin.coinId}</p>
        <p>Owner: {this.props.coin.owner}</p>
        <p>Rules: {this.props.coin.rules}</p>
        <p>Collateral types: {this.props.coin.types.length}</p>
        { collateralTypes }
        <p><a href="#">Back</a></p>
      </div>
    );
  }
}

export default Coin;
