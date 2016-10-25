import React, { Component } from 'react';

class Coin extends Component {
  constructor(props) {
    super(props);
    const simplecoin = props.simplecoinFactory.classes.Simplecoin.at(props.index);
    window.simplecoin = simplecoin;
    console.log(simplecoin);

    simplecoin.owner((e,r) => {
      /*this.setState({
        network: networkState
      });*/
    });
  }

  getCoinDetail(i) {
    /*const p = new Promise((resolve, reject) => {
      simplecoinFactory.objects.factory.coins(i, (error, result) => {
        if (!error) {
          const coin = {
            coinId: result,
          };
          resolve(coin);
        } else {
          reject(error);
        }
      });
    });
    return p;*/
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
