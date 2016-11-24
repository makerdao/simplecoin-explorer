import React from 'react';
import { formatTokenValue } from '../util/functions';

const TokenValue = (props) => {
  const value = props.value;
  const precision = props.precision ? props.precision : 18;

  return (
    <span title={formatTokenValue(value, precision, false)}>{formatTokenValue(value, precision, true)}</span>
  )
}

export default TokenValue;
