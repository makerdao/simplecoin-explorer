import React, { Component } from 'react';

class Coin extends Component {
  constructor(props) {
    super();
    this.simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.index);

    //Testing purpose
    window.simplecoin = this.simplecoin;
    //

    this.getValueAndUpdate('owner');
    this.getValueAndUpdate('rules');
    this.getValueAndUpdate('feed');
    this.getValueAndUpdate('spread');
    this.getValueAndUpdate('totalSupply');
  }

  getValueAndUpdate(field) {
    this.simplecoin[field]((error, result) => {
      this.props.updateCoin(this.props.index, field, result);
    });
  }
  
  render() {
    return (
      <div>
        {
          Object.keys(this.props.state.coins[this.props.index]).map(key => <p key={key}> {key + ": " + this.props.state.coins[this.props.index][key]} </p>)
        }
        <p><a href="#">Back</a></p>
      </div>
    );
  }
}

export default Coin;
