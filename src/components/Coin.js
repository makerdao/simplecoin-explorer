import React, { Component } from 'react';

class Coin extends Component {
  constructor(props) {
    super();
    const simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.index);
    
    //Testing purpose
    window.simplecoin = simplecoin;
    //

    const me = this;
    simplecoin.owner((error, result) => {
      me.props.updateCoin(me.props.index, 'owner', result);
    });
    simplecoin.rules((error, result) => {
      me.props.updateCoin(me.props.index, 'rules', result);
    });
    simplecoin.feed((error, result) => {
      me.props.updateCoin(me.props.index, 'feed', result);
    });
    simplecoin.spread((error, result) => {
      me.props.updateCoin(me.props.index, 'spread', result);
    });
    simplecoin.totalSupply((error, result) => {
      me.props.updateCoin(me.props.index, 'totalSupply', result);
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
