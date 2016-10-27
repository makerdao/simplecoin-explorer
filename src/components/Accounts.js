import React from 'react';
import web3 from '../web3';

const Accounts = (props) => {

  return (
    <div className="col-sm-12">
      <p>{web3.eth.accounts}</p>
      <p>{props.account}</p>
      <button onClick={() => props.changeAccount(web3.eth.accounts[0])}>Change Account</button>
    </div>
    )
}

export default Accounts;
