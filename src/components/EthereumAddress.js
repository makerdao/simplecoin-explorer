import React from 'react';
import isAddress from '../util/address.js';
import { addressToToken } from '../util/functions';

const EthereumAddress = (props) => {
  let address = '-';
  let shortAddress = '-';
  if(isAddress(props.address)) {
    address = props.address;
    const myToken = addressToToken('ropsten', address);
    shortAddress = myToken !== address ? myToken : (props.short ? `${address.substring(0, 10)}...` : address);
  }

  return (
    <span title={address}>{shortAddress}</span>
  )
}

export default EthereumAddress;
