import web3 from '../web3';

// Make a checksum address
var toChecksumAddress = function (address) {
  address = address.toLowerCase().replace('0x', '');
  var addressHash = web3.sha3(address);
  var checksumAddress = '0x';

  for (var i = 0; i < address.length; i++) {
    // If ith character is 9 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 8) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }
  return checksumAddress;
};

//Check if address is checksum
export default function isAddress(address) {
  if (typeof(address) !== 'string') return false;
  address = toChecksumAddress(address);
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    address = address.replace('0x', '');
    var addressHash = web3.sha3(address.toLowerCase());

    for (var i = 0; i < 40; i++) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 8 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 8 && address[i].toLowerCase() !== address[i])) {
        return false;
      }
    }
    return true;
  }
};
