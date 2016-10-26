import React from 'react';
import web3 from '../web3';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6">
        <p>{web3.eth.accounts}</p>
        <p>{this.props.account}</p>
        <button onClick={() => this.props.changeAccount(web3.eth.accounts[0])}>Change Account</button>
      </div>
    )
  }
}

export default Accounts;
