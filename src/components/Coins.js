import React from 'react';
import EthereumAddress from './EthereumAddress';

const Coins = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>All Simplecoins ({Object.keys(props.coins).length})</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Address </th>
                <th>Owner </th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(props.coins).map(key =>
                  <tr key={key} onClick={(e) => props.setUrl(props.coins[key]['coinId'])}>
                    <td>
                      <a href={`#${props.coins[key]['coinId']}`} onClick={(e) => props.setUrl(props.coins[key]['coinId'])}>
                        Go to Coin
                      </a>
                    </td>
                    <td>
                      <EthereumAddress address={props.coins[key]['coinId']} />
                    </td>
                    <td>
                      {props.coins[key].owner || '(Pending...)'}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Coins;
