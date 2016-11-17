import React from 'react';
import EthereumAddress from './EthereumAddress';
import './Coins.css';

const Coins = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <p>Coins: {Object.keys(props.coins).length}</p>
      </div>
      {
        Object.keys(props.coins).map(key =>
          <div className="col-sm-6 Coins-box" key={key}>
            <a href={`#${props.coins[key]['coinId']}`} onClick={(e) => props.setUrl(props.coins[key]['coinId']) }>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Coin Name...</h3>
                </div>
                <div className="panel-body">
                  <p>
                    <EthereumAddress address={props.coins[key]['coinId']} />
                  </p>
                  <p>
                    Owner: {props.coins[key].owner || '(Pending...)'}
                  </p>
                </div>
              </div>
            </a>
          </div>
        )
      }
    </div>
  );
}

export default Coins;
