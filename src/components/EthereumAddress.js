import React from 'react';
import isAddress from '../util/address.js';
import { addressToToken } from '../util/functions';

const EthereumAddress = (props) => {
  const address = isAddress(props.address) ? props.address : 'INVALID';
  const myToken = addressToToken('ropsten', address);
  const shortAddress = myToken || (props.short ? `${address.substring(0, 10)}...` : address);
  return (
    <span title={address}>{shortAddress}</span>
  )
}

export default EthereumAddress;
