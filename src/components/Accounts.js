import React from 'react';
import web3 from '../web3';

const Accounts = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <select className="form-control" onChange={(e) => this.props.changeAccount(e.target.value)}>
            {Object.keys(web3.eth.accounts).map(key => <option key={web3.eth.accounts[key]}>{web3.eth.accounts[key]}</option> )}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Accounts;
