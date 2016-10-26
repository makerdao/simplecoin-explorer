import React from 'react';
import './NoEthereum.css';
import ethereumlogo from '../ethereum-logo.svg';
import metamasklogo from '../metamask-logo.svg';
import mistlogo from '../mist-logo.svg';

const NoEthereum = () => {
  return (
    <div className="no-ethereum-section">
    <img className="img-ethereum-logo" alt="Ethereum" src={ethereumlogo} />
    <h2>NOT CONNECTED TO ETHEREUM</h2>
    <p className="p-not-found">Simplecoin Explorer requires an Ethereum client to be running and current. Simplecoin Explorer could not detect a client running which probably means it's not installed,
      running or is misconfigured.</p>
    <p className="p-use-clients">Please use one of the following clients to connect to Ethereum:</p>
    <div className="div-clients">
      <div className="div-metamask">
        <img className="img-logo" alt="Metamask" src={metamasklogo} />
        <h2>METAMASK</h2>
        <p><span className="align-number"><span className="numberCircle">1</span></span>Install <a className="span-montserrat-semi-bold a-link" href="https://metamask.io/" target="_blank">Metamask</a></p>
        <p><span className="align-number"><span className="numberCircle">2</span></span>Use Chrome to browse <a className="span-montserrat-semi-bold a-link" href="https://makerdao.github.io/simplecoin-explorer/" target="_blank">https://makerdao.github.io/simplecoin-explorer/</a></p>
      </div>
      <div className="div-mist">
        <img className="img-logo" alt="Mist" src={mistlogo} />
        <h2>MIST</h2>
        <p><span className="align-number"><span className="numberCircle">1</span></span>Install and run <a className="span-montserrat-semi-bold a-link" href="https://github.com/ethereum/mist/releases" target="_blank">Mist</a></p>
        <p><span className="align-number"><span className="numberCircle">2</span></span>Use Mist to browse <a className="span-montserrat-semi-bold a-link" href="https://makerdao.github.io/simplecoin-explorer/" target="_blank">https://makerdao.github.io/simplecoin-explorer/</a></p>
      </div>
    </div>
    <p className="p-connect-geth">While you can also connect with <b>geth</b> or <b>parity</b>, a more advanced configuration is needed. See the
      <a href="https://github.com/makerdao/simplecoin-explorer" target="_blank">Simplecoin Explorer documentation</a> for instructions.
    </p>
  </div>
  )
};

export default NoEthereum;
