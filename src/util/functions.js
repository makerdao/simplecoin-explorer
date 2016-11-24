import { tokens } from '../tokens';

function addressToToken(network, address) {
  network = network || 'ropsten';
  const token = Object.keys(tokens[network]).find(key => tokens[network][key] === address) || address;
  return token;
}

function formatTokenValue(value, precision = 18, round = false) {

  //Divides by token precision (most cases = 18)
  if(precision) {
    value /= Math.pow(10, precision);
  }

  if(round) {
    //Use approximation to reduce longitude of very big numbers
    if(value.toString().indexOf('e+') !== -1) {
      let num = null;
      let exp = null;
      [ num, exp ] = value.toString().split('e+');
      num = Math.round(Number(num) * 100) / 100;

      value = num * Math.pow(10, Number(exp));
    }

    //Use aproximation to 2 decimals
    value = value.toFixed(2);
  }

  return value;
}

export { addressToToken, formatTokenValue };
