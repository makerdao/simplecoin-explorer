import React, { Component } from 'react';

class Coins extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>Coins: {this.props.state.coinsCount}</div>
        {
          Object.keys(this.props.state.coins).map(key => <p key={key}>{this.props.state.coins[key]['coinId']}</p>)
        }
      </div>
    );
  }
}

export default Coins;