import React, { Component } from 'react';

class Coin extends Component {
  constructor(props) {
    super(props);
    const simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.index);
    console.log(simplecoin);
  }
  render() {
    return (
      <div>
        <div>Coin: {this.props.index}</div>
        <p><a href="#">Back</a></p>
      </div>
    );
  }
}

export default Coin;
