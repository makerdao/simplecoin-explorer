import React, { Component } from 'react';

class Coin extends Component {
  /*contructor() {
    super();
  }*/
  render() {
    return (
      <div>
        <div>Coin: {this.props.index}</div>
      </div>
    );
  }
}

export default Coin;