import React from 'react';
import isAddress from '../util/address.js';

const EthereumAddress = (props) => {
  const address = isAddress(props.address) ? props.address : 'INVALID';
  return (
    <span>{address}</span>
  )
}

export default EthereumAddress;
