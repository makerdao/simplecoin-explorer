import React from 'react';
import web3 from '../web3';

const Accounts = (props) => {
  const text = props.isConnected ? `${props.network}` : 'No connection';
  //const dotColor = props.isConnected ? (props.syncing ? 'yellow' : 'green') : 'red';
  return (
    <div className="row">
      <div className="col-sm-4">
        <p><strong>Network Status</strong></p>
        <p><i className="icon ion-checkmark-circled text-success"></i> Connected: <strong>{text}</strong></p>
      </div>
      <div className="col-sm-8">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-3">
              <label className="control-label">Account </label>
            </div>
            <div className="col-sm-9">
              <select className="form-control" onChange={(e) => this.props.changeAccount(e.target.value)}>
                {Object.keys(web3.eth.accounts).map(key => <option key={web3.eth.accounts[key]}>{web3.eth.accounts[key]}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3">
              <label className="control-label">Contract </label>
            </div>
            <div className="col-sm-9">
              <p className="form-control-static">0xa33f1ca6d2d2f230f8aec1e8f15a8a77e8e83256</p>
            </div>
          </div>
        </form>
      </div>
      <div className="col-sm-12">
        <div className="alert alert-success text-left" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><span><strong>Alert</strong> text.</span></div>
      </div>
    </div>
  )
}

export default Accounts;
