import React from 'react';
import isAddress from '../util/address.js';

const EthereumAddress = (props) => {
  const address = isAddress(props.address) ? props.address : 'INVALID';
  const shortAddress = props.short ? `${address.substring(0, 10)}...` : address;
  return (
    <span title={address}>{shortAddress}</span>
  )
}

export default EthereumAddress;
