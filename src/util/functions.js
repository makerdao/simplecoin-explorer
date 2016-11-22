import { tokens } from '../tokens';

function addressToToken(network, address) {
  network = network || 'ropsten';
  const token = Object.keys(tokens[network]).find(key => tokens[network][key] === address) || address;
  return token;
}

export { addressToToken };
