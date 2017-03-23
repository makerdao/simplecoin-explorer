/* eslint-disable */

// For geth
if (typeof dapp === 'undefined') {
  var dapp = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapp['simplecoin'] = (function builder () {
  var environments = {
      'develop': {},
      'morden': {},
      'live': {},
      'kovan': {
        'factory': {
          'value': '0x393de83a3b83cc62901c2461ef0cc116dadfc05a',
          'type': 'SimplecoinFactory[3749109b14cd1f30f12aecd1d1bb6d411d3660ba69ece85b26e0ae1b9e7265e0]'
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    // if (!env) {
    //   env = {
    //   'objects': {
    //     'factory': {
    //       'value': '',
    //       'type': 'SimplecoinFactory[]'
    //     }
    //   },
    //   'type': 'kovan'
    // };
    // }
    if(typeof env === "object" && !("objects" in env)) {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = {objects: environments[env]};
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
  "DSAuth": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "authority_",
            "type": "address"
          }
        ],
        "name": "setAuthority",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "authority",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "authority",
            "type": "address"
          }
        ],
        "name": "LogSetAuthority",
        "type": "event"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b5b60008054600160a060020a03191633600160a060020a03908116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b610201806100686000396000f300606060405263ffffffff60e060020a6000350416637a9e5e4b811461002c578063bf7e214f1461004a575bfe5b341561003457fe5b610048600160a060020a0360043516610076565b005b341561005257fe5b61005a6100ef565b60408051600160a060020a039092168252519081900360200190f35b61009461008f33600035600160e060020a0319166100fe565b6101c4565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03838116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b50565b600054600160a060020a031681565b60008054600160a060020a038481169116141561011d575060016101bd565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529251929093169363b70096139360648082019492918390030190829087803b15156101a157fe5b60325a03f115156101ae57fe5b50506040515191506101bd9050565b5b92915050565b8015156100eb5760006000fd5b5b505600a165627a7a723058202b040270f89dee721c872e309c012ba3089557c1a4bbc740a92c5ae700a53d600029"
  },
  "DSAuthEvents": {
    "interface": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "authority",
            "type": "address"
          }
        ],
        "name": "LogSetAuthority",
        "type": "event"
      }
    ],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a72305820ca3b089c56ed65d1011acae97e50bd2af3c5fce40aaf39e15880b5ea74e037510029"
  },
  "DSAuthority": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          },
          {
            "name": "dst",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "canCall",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": ""
  },
  "DSBase": {
    "interface": [],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a72305820e93dbf3321cf2e3876baf1415298da65b7da8e80e9e25ceb8ae199ac15618d640029"
  },
  "DSFeeds": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "expired",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          },
          {
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "set_label",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "expiration",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "timestamp",
        "outputs": [
          {
            "name": "",
            "type": "uint40"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "label",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "set_owner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      }
    ],
    "bytecode": "6060604052600180546001606060020a03191681179055341561001e57fe5b5b6106f58061002e6000396000f3006060604052361561009e5763ffffffff60e060020a6000350416632020296581146100a05780633f29cd27146100d15780634e71d92d146100fd578063770eb5bb1461012a5780638981d5131461014c578063a160bdf514610185578063a69a5588146101bc578063a99ffb7b146101de578063ac016a3114610215578063b47a2f1014610244578063ba22e56214610275578063c9085820146102a4575bfe5b34156100a857fe5b6100bd600160a060020a0319600435166102cf565b604080519115158252519081900360200190f35b34156100d957fe5b6100fb600160a060020a03196004351660243564ffffffffff604435166102fa565b005b341561010557fe5b61010d6103d9565b60408051600160a060020a03199092168252519081900360200190f35b341561013257fe5b6100fb600160a060020a031960043516602435610485565b005b341561015457fe5b610169600160a060020a031960043516610504565b60408051600160a060020a039092168252519081900360200190f35b341561018d57fe5b6101a2600160a060020a03196004351661052d565b6040805164ffffffffff9092168252519081900360200190f35b34156101c457fe5b6100fb600160a060020a031960043516602435610560565b005b34156101e657fe5b6101a2600160a060020a031960043516610572565b6040805164ffffffffff9092168252519081900360200190f35b341561021d57fe5b610232600160a060020a03196004351661059c565b60408051918252519081900360200190f35b341561024c57fe5b6100bd600160a060020a0319600435166105bf565b604080519115158252519081900360200190f35b341561027d57fe5b610232600160a060020a0319600435166105d3565b60408051918252519081900360200190f35b34156102ac57fe5b6100fb600160a060020a031960043516602435600160a060020a031661060f565b005b60006102da8261052d565b64ffffffffff166102e961069e565b64ffffffffff16101590505b919050565b8261032061030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a03198416600090815260208190526040902060020183905561034761069e565b600160a060020a0319851660008181526020818152604091829020600301805464ffffffffff191664ffffffffff9586161769ffffffffff0000000000191665010000000000958816958602179055815187815290810193909352805191927f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd228929081900390910190a25b5b50505050565b60015460a060020a026103f7600160a060020a0319821615156106a3565b6001805460a060020a80820281900483018102046bffffffffffffffffffffffff19909116179055600160a060020a0319808216600081815260208181526040918290208054600160a060020a0333169516851790558151938452905191927fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f49929081900390910190a25b90565b816104ab61030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319831660008181526020818152604091829020600101859055815185815291517f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779029281900390910190a25b5b505050565b600160a060020a03198116600090815260208190526040902054600160a060020a03165b919050565b600160a060020a0319811660009081526020819052604090206003015465010000000000900464ffffffffff165b919050565b61056d82826000196102fa565b5b5050565b600160a060020a0319811660009081526020819052604090206003015464ffffffffff165b919050565b600160a060020a031981166000908152602081905260409020600101545b919050565b60006105cb33836106b4565b90505b919050565b60006105df33836106b4565b15156105eb5760006000fd5b50600160a060020a031981166000908152602081905260409020600201545b919050565b8161063561030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319808416600081815260208181526040918290208054600160a060020a0388169516851790558151938452905191927ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d929081900390910190a25b5b505050565b425b90565b8015156106b05760006000fd5b5b50565b60006106bf826102cf565b1590505b929150505600a165627a7a723058207a3cadc16d7a3afbd57ad57370cd9ff198ac5179baba70fb5a804013645281c30029"
  },
  "DSFeedsEvents": {
    "interface": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogClaim",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "LogSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "LogSetOwner",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "id",
            "type": "bytes12"
          },
          {
            "indexed": false,
            "name": "label",
            "type": "bytes32"
          }
        ],
        "name": "LogSetLabel",
        "type": "event"
      }
    ],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a72305820a740ef62490a13381d84916bc829daf4c854297c96f3da4f3a39b69cc392a2610029"
  },
  "DSFeedsInterface": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          },
          {
            "name": "value",
            "type": "bytes32"
          },
          {
            "name": "expiration",
            "type": "uint40"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "claim",
        "outputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "peek",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "bytes12"
          }
        ],
        "name": "read",
        "outputs": [
          {
            "name": "value",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": ""
  },
  "DSIAuthority": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          },
          {
            "name": "dst",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "canCall",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": ""
  },
  "DSRoleAuth": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "getUserRoles",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "getCapabilityRoles",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "isCapabilityPublic",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "role",
            "type": "uint8"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setUserRole",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "authority_",
            "type": "address"
          }
        ],
        "name": "setAuthority",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "role",
            "type": "uint8"
          },
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setRoleCapability",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "input",
            "type": "bytes32"
          }
        ],
        "name": "BITNOT",
        "outputs": [
          {
            "name": "output",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "role",
            "type": "uint8"
          }
        ],
        "name": "hasUserRole",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "caller",
            "type": "address"
          },
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "canCall",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "authority",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setPublicCapability",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setRootUser",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "isUserRoot",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "authority",
            "type": "address"
          }
        ],
        "name": "LogSetAuthority",
        "type": "event"
      }
    ],
    "bytecode": "60606040525b60008054600160a060020a03191633600160a060020a03908116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b610854806100606000396000f300606060405236156100a95763ffffffff60e060020a60003504166306a36aee81146100ab57806327538e90146100d95780632f47571f1461011457806367aff484146101515780637a9e5e4b1461017a5780637d40583d1461019857806393aa5ca8146101ce578063a078f737146101f3578063b700961314610229578063bf7e214f1461026c578063c6b0263e14610298578063d381ba7c146102c8578063fbf80773146102eb575bfe5b34156100b357fe5b6100c7600160a060020a036004351661031b565b60408051918252519081900360200190f35b34156100e157fe5b6100c7600160a060020a0360043516600160e060020a03196024351661033a565b60408051918252519081900360200190f35b341561011c57fe5b61013d600160a060020a0360043516600160e060020a03196024351661036f565b604080519115158252519081900360200190f35b341561015957fe5b610178600160a060020a036004351660ff6024351660443515156103a7565b005b341561018257fe5b610178600160a060020a0360043516610446565b005b34156101a057fe5b61017860ff60043516600160a060020a0360243516600160e060020a03196044351660643515156104bf565b005b34156101d657fe5b6100c760043561059b565b60408051918252519081900360200190f35b34156101fb57fe5b61013d600160a060020a036004351660ff602435166105a6565b604080519115158252519081900360200190f35b341561023157fe5b61013d600160a060020a0360043581169060243516600160e060020a0319604435166105d1565b604080519115158252519081900360200190f35b341561027457fe5b61027c61067a565b60408051600160a060020a039092168252519081900360200190f35b34156102a057fe5b610178600160a060020a0360043516600160e060020a0319602435166044351515610689565b005b34156102d057fe5b610178600160a060020a036004351660243515156106e7565b005b34156102f357fe5b61013d600160a060020a036004351661072f565b604080519115158252519081900360200190f35b600160a060020a0381166000908152600260205260409020545b919050565b600160a060020a0382166000908152600360209081526040808320600160e060020a0319851684529091529020545b92915050565b600160a060020a0382166000908152600460209081526040808320600160e060020a03198516845290915290205460ff165b92915050565b600060006103c96103c433600035600160e060020a031916610751565b610817565b5050600160a060020a0383166000908152600260208190526040909120549060ff8416900a821561041657600160a060020a0385166000908152600260205260409020828217905561043d565b61041f8161059b565b600160a060020a038616600090815260026020526040902090831690555b5b5b5050505050565b6104646103c433600035600160e060020a031916610751565b610817565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03838116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b50565b600060006104e16103c433600035600160e060020a031916610751565b610817565b5050600160a060020a0383166000908152600360209081526040808320600160e060020a03198616845290915290205460ff851660020a821561055557600160a060020a0385166000908152600360209081526040808320600160e060020a03198816845290915290208282179055610591565b61055e8161059b565b600160a060020a0386166000908152600360209081526040808320600160e060020a031989168452909152902090831690555b5b5b505050505050565b60001981185b919050565b6000600060006105b58561031b565b60ff851660020a8082161515945090925090505b505092915050565b600160a060020a03831660009081526001602052604081205460ff16806106255750600160a060020a0383166000908152600460209081526040808320600160e060020a03198616845290915290205460ff165b1561063257506001610673565b50600160a060020a038083166000908152600360209081526040808320600160e060020a031986168452825280832054938716835260029091529020541615155b9392505050565b600054600160a060020a031681565b6106a76103c433600035600160e060020a031916610751565b610817565b600160a060020a0383166000908152600460209081526040808320600160e060020a0319861684529091529020805460ff19168215151790555b5b505050565b6107056103c433600035600160e060020a031916610751565b610817565b600160a060020a0382166000908152600160205260409020805460ff19168215151790555b5b5050565b600160a060020a03811660009081526001602052604090205460ff165b919050565b60008054600160a060020a038481169116141561077057506001610369565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529251929093169363b70096139360648082019492918390030190829087803b15156107f457fe5b60325a03f1151561080157fe5b50506040515191506103699050565b5b92915050565b8015156104bb5760006000fd5b5b505600a165627a7a723058203d7c1fc891d350af1cdeecbde5440e36b94dd2548593eca2399263dcf1a29d420029"
  },
  "DSTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b5b6000805460ff191660011790555b5b6104388061002b6000396000f300606060405263ffffffff60e060020a6000350416630a9254e4811461004d5780638af784dc1461005f578063ba414fa61461008a578063f578fd85146100ae578063fa7626d414610143575bfe5b341561005557fe5b61005d610167565b005b341561006757fe5b61005d73ffffffffffffffffffffffffffffffffffffffff6004351661016a565b005b341561009257fe5b61009a6101bf565b604080519115158252519081900360200190f35b34156100b657fe5b61005d600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496506101cd95505050505050565b005b341561014b57fe5b61009a6103f1565b604080519115158252519081900360200190f35b5b565b6040805173ffffffffffffffffffffffffffffffffffffffff831681526001602082015281517f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8929181900390910190a15b50565b600054610100900460ff1681565b80518251600191600091141561028e575060005b83518160ff16101561028957828160ff168151811015156101fe57fe5b90602001015160f860020a900460f860020a027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff1681518110151561024457fe5b60209101015160f860020a90819004027fff00000000000000000000000000000000000000000000000000000000000000161461028057600091505b5b6001016101e1565b610293565b600091505b8115156103e957604080517f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a1604080517f202045787065637465640000000000000000000000000000000000000000000081527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a1604080517f202041637475616c00000000000000000000000000000000000000000000000081527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a16103e96103fa565b5b5b50505050565b60005460ff1681565b6000805461ff0019166101001790555b5600a165627a7a7230582017c2a6637f0e24cdc5767ba32cab10b9a5fcd7e736156e5792430dca7b4cf39c0029"
  },
  "DSTokenBase": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "guy",
            "type": "address"
          },
          {
            "name": "wad",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          },
          {
            "name": "dst",
            "type": "address"
          },
          {
            "name": "wad",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "dst",
            "type": "address"
          },
          {
            "name": "wad",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          },
          {
            "name": "guy",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "supply",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b6040516020806104ae83398101604052515b600160a060020a03331660009081526001602052604081208290558190555b505b6104608061004e6000396000f3006060604052361561005c5763ffffffff60e060020a600035041663095ea7b3811461005e57806318160ddd1461009157806323b872dd146100b357806370a08231146100ec578063a9059cbb1461011a578063dd62ed3e1461014d575bfe5b341561006657fe5b61007d600160a060020a0360043516602435610181565b604080519115158252519081900360200190f35b341561009957fe5b6100a16101ec565b60408051918252519081900360200190f35b34156100bb57fe5b61007d600160a060020a03600435811690602435166044356101f3565b604080519115158252519081900360200190f35b34156100f457fe5b6100a1600160a060020a0360043516610306565b60408051918252519081900360200190f35b341561012257fe5b61007d600160a060020a0360043516602435610325565b604080519115158252519081900360200190f35b341561015557fe5b6100a1600160a060020a03600435811690602435166103e8565b60408051918252519081900360200190f35b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b6000545b90565b600160a060020a0383166000908152600160205260408120546102199083901015610415565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461024d9083901015610415565b600160a060020a038316600090815260016020526040902054610279906102749084610426565b610415565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b600160a060020a0381166000908152600160205260409020545b919050565b600160a060020a03331660009081526001602052604081205461034b9083901015610415565b600160a060020a038316600090815260016020526040902054610377906102749084610426565b610415565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b8015156104225760006000fd5b5b50565b808201829010155b929150505600a165627a7a72305820f319d8bbc52243d020b4d90121607421b82a6073f20bcc13fcdb5d2d56afbb890029"
  },
  "ERC20": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "supply",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "ok",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "_allowance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      }
    ],
    "bytecode": ""
  },
  "FakePerson": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "addr",
            "type": "address"
          }
        ],
        "name": "setVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "spread",
            "type": "uint256"
          }
        ],
        "name": "setSpread",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "token",
            "type": "address"
          }
        ],
        "name": "register",
        "outputs": [
          {
            "name": "",
            "type": "uint48"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "cover",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          }
        ],
        "name": "unregister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "feed",
            "type": "bytes12"
          }
        ],
        "name": "setFeed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "addr",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "id",
            "type": "uint48"
          },
          {
            "name": "ceiling",
            "type": "uint256"
          }
        ],
        "name": "setCeiling",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "how_much",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "coin_",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b60405160208061087983398101604052515b60008054600160a060020a031916600160a060020a0383161790555b505b61082e8061004b6000396000f300606060405236156100935763ffffffff60e060020a6000350416630a17d71d811461009557806315aa15be146100be57806323b872dd146100de5780634420e4861461010557806344654c2e1461013c5780636000ee1d1461015c5780636bb52a8e146101795780638db21afc14610199578063a9059cbb146101d0578063cb38727f146101f1578063e1f21c6714610211575bfe5b341561009d57fe5b6100bc65ffffffffffff60043516600160a060020a0360243516610238565b005b34156100c657fe5b6100bc65ffffffffffff600435166024356102bb565b005b34156100e657fe5b6100bc600160a060020a036004358116906024351660443561033b565b005b341561010d57fe5b610121600160a060020a03600435166103cc565b6040805165ffffffffffff9092168252519081900360200190f35b341561014457fe5b6100bc65ffffffffffff60043516602435610452565b005b341561016457fe5b6100bc65ffffffffffff600435166104e0565b005b341561018157fe5b6100bc65ffffffffffff60043516602435610558565b005b34156101a157fe5b6100bc65ffffffffffff6004351673ffffffffffffffffffffffffffffffffffffffff19602435166105e6565b005b34156101d857fe5b6100bc600160a060020a036004351660243561067c565b005b34156101f957fe5b6100bc65ffffffffffff60043516602435610704565b005b341561021957fe5b6100bc600160a060020a0360043581169060243516604435610784565b005b60008054604080517f0a17d71d00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152600160a060020a03858116602483015291519190921692630a17d71d926044808201939182900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f15aa15be00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152602481018590529051600160a060020a03909216926315aa15be9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b6000805460408051602090810184905281517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a038881166004830152878116602483015260448201879052925192909316936323b872dd9360648082019492918390030190829087803b15156103b657fe5b60325a03f115156103c357fe5b5050505b505050565b6000805460408051602090810184905281517f4420e486000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015292519290931692634420e486926024808301939282900301818787803b151561043657fe5b60325a03f1151561044357fe5b5050604051519150505b919050565b6000805460408051602090810184905281517f44654c2e00000000000000000000000000000000000000000000000000000000815265ffffffffffff87166004820152602481018690529151600160a060020a03909316936344654c2e936044808501949192918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f6000ee1d00000000000000000000000000000000000000000000000000000000815265ffffffffffff851660048201529051600160a060020a0390921692636000ee1d9260248084019382900301818387803b151561054457fe5b60325a03f1151561055157fe5b5050505b50565b6000805460408051602090810184905281517f6bb52a8e00000000000000000000000000000000000000000000000000000000815265ffffffffffff87166004820152602481018690529151600160a060020a0390931693636bb52a8e936044808501949192918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f8db21afc00000000000000000000000000000000000000000000000000000000815265ffffffffffff8616600482015273ffffffffffffffffffffffffffffffffffffffff19851660248201529051600160a060020a0390921692638db21afc9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b6000805460408051602090810184905281517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152602482018790529251929093169363a9059cbb9360448082019492918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517fcb38727f00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152602481018590529051600160a060020a039092169263cb38727f9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b82600160a060020a031663095ea7b383836000604051602001526040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b15156103b657fe5b60325a03f115156103c357fe5b5050505b5050505600a165627a7a723058205ec335ca1f5e825f41cc0fc70095cd04fa3ac522023bb6cdc228a6b4ae0fb3bc0029"
  },
  "SimpleAuthTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderRegister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailNonHolderReceive",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testCreatorCanTransferOwnership",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderUnregister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testHolderCanTransfer",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanSetSpread",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderIssue",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanSetVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testSetUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanSetCeiling",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerRegister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerSetCeiling",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderSetVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderSetSpread",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderSetFeed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerSetFeed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderSetCeiling",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssuerCanCover",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerSetSpread",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailNonHolderTransfer",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailHolderCover",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanSetFeed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerUnregister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testHolderCanReceive",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testFailIssuerSetVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanUnregister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssuerCanIssue",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAdminCanRegister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "60606040525b6000805460ff191660011790555b5b6179c6806100236000396000f300606060405236156101855763ffffffff60e060020a60003504166303ca538a81146101875780630a9254e4146101995780631d7eae1d146101ab5780631ee9d580146101bd5780631ef38b95146101cf57806320e92b76146101e157806326336583146101f35780633b317e9f146102055780634b589a4c146102175780635babb758146102295780636ace04a51461023b5780636d30b90e1461024d57806370d059ff1461025f57806373a95a87146102715780638af784dc146102835780638e957c75146102a157806391e4e837146102b35780639275cb16146102c557806397b0395c146102d7578063a2528c1f146102e9578063aac4e1bd146102fb578063b1db96ad1461030d578063ba414fa61461031f578063be0e83db14610343578063c306653614610355578063ca08cea814610367578063d51f7f2e14610379578063e1799b841461038b578063f3492b1d1461039d578063f578fd85146103af578063f644e61314610444578063fa7626d414610456578063fbca66661461047a575bfe5b341561018f57fe5b61019761048c565b005b34156101a157fe5b61019761051f565b005b34156101b357fe5b6101976110ea565b005b34156101c557fe5b610197611270565b005b34156101d757fe5b610197611465565b005b34156101e957fe5b6101976114d4565b005b34156101fb57fe5b610197611619565b005b341561020d57fe5b61019761173a565b005b341561021f57fe5b6101976117b0565b005b341561023157fe5b6101976118d1565b005b341561024357fe5b6101976119a9565b005b341561025557fe5b610197611aca565b005b341561026757fe5b610197611b5d565b005b341561027957fe5b610197611bd4565b005b341561028b57fe5b610197600160a060020a0360043516611c4b565b005b34156102a957fe5b610197611c93565b005b34156102bb57fe5b610197611d0a565b005b34156102cd57fe5b610197611d86565b005b34156102df57fe5b610197611e02565b005b34156102f157fe5b610197611e79565b005b341561030357fe5b610197611f61565b005b341561031557fe5b610197611fd8565b005b341561032757fe5b61032f612188565b604080519115158252519081900360200190f35b341561034b57fe5b610197612196565b005b341561035d57fe5b61019761227e565b005b341561036f57fe5b6101976123aa565b005b341561038157fe5b610197612419565b005b341561039357fe5b610197612578565b005b34156103a557fe5b6101976125ef565b005b34156103b757fe5b610197600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965061270795505050505050565b005b341561044c57fe5b61019761291b565b005b341561045e57fe5b61032f612a12565b604080519115158252519081900360200190f35b341561048257fe5b610197612a1b565b005b60006103e8610499612d95565b90815260405190819003602001906000f08015156104b357fe5b6006546040805160006020918201819052825160e160020a6322107243028152600160a060020a03808716600483015293519596509290931693634420e486936024808501948390030190829087803b151561050b57fe5b60325a03f1151561051857fe5b5050505b50565b6000610529612da5565b60405190819003906000f080151561053d57fe5b60018054600160a060020a031916600160a060020a0392909216919091179055610565612db5565b60405190819003906000f080151561057957fe5b60028054600160a060020a031916600160a060020a039283161790819055600154604080516000602091820181905282517f796d5836000000000000000000000000000000000000000000000000000000008152948616600486015260606024860152600f60648601527f5465737420436f696e20546f6b656e0000000000000000000000000000000000608486015260a06044860152600360a48601527f544354000000000000000000000000000000000000000000000000000000000060c48601529151929094169363796d58369360e4808201949293918390030190829087803b151561066557fe5b60325a03f1151561067257fe5b50506040515160008054600160a060020a03909216620100000275ffffffffffffffffffffffffffffffffffffffff000019909216919091179055506103e86106b9612d95565b90815260405190819003602001906000f08015156106d357fe5b60078054600160a060020a031916600160a060020a0392831617905560005462010000900416610701612dc5565b600160a060020a03909116815260405190819003602001906000f080151561072557fe5b60048054600160a060020a031916600160a060020a0392831617905560005462010000900416610753612dc5565b600160a060020a03909116815260405190819003602001906000f080151561077757fe5b60058054600160a060020a031916600160a060020a03928316179055600054620100009004166107a5612dc5565b600160a060020a03909116815260405190819003602001906000f08015156107c957fe5b60068054600160a060020a031916600160a060020a039283161790556000805460408051602090810184905281517fbf7e214f0000000000000000000000000000000000000000000000000000000081529151620100009093049094169363bf7e214f9360048084019492938390030190829087803b151561084757fe5b60325a03f1151561085457fe5b5050604080518051600480547f70480275000000000000000000000000000000000000000000000000000000008452600160a060020a0390811691840191909152925192169250637048027591602480830192600092919082900301818387803b15156108bd57fe5b60325a03f115156108ca57fe5b505050600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561092857fe5b60325a03f1151561093557fe5b50506040805180516005547f20694db0000000000000000000000000000000000000000000000000000000008352600160a060020a0390811660048401529251921692506320694db091602480830192600092919082900301818387803b151561099b57fe5b60325a03f115156109a857fe5b505050600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b1515610a0657fe5b60325a03f11515610a1357fe5b50506040805180516006547fac1e17df000000000000000000000000000000000000000000000000000000008352600160a060020a03908116600484015292519216925063ac1e17df91602480830192600092919082900301818387803b1515610a7957fe5b60325a03f11515610a8657fe5b505060008054600754604080516020908101859052815160e160020a6322107243028152600160a060020a0393841660048201529151620100009094049092169450634420e48693602480830194928390030190829087803b1515610ae757fe5b60325a03f11515610af457fe5b50506040805180516007805465ffffffffffff90921660a060020a0279ffffffffffff00000000000000000000000000000000000000001990921691909117908190556004805460006020948501819052855160e060020a63a9059cbb028152600160a060020a03928316938101939093526064602484015294519216945063a9059cbb9360448083019493928390030190829087803b1515610b9357fe5b60325a03f11515610ba057fe5b50506040805160075460065460006020938401819052845160e060020a63a9059cbb028152600160a060020a03928316600482015260646024820152945191909216945063a9059cbb9360448082019493918390030190829087803b1515610c0457fe5b60325a03f11515610c1157fe5b50506040805160075460055460006020938401819052845160e060020a63a9059cbb028152600160a060020a03928316600482015260646024820152945191909216945063a9059cbb9360448082019493918390030190829087803b1515610c7557fe5b60325a03f11515610c8257fe5b5050604080516002546000602092830181905283517f4e71d92d0000000000000000000000000000000000000000000000000000000081529351600160a060020a039092169450634e71d92d936004808201949392918390030190829087803b1515610cea57fe5b60325a03f11515610cf757fe5b505060408051805160025460008054602094850182905285517fed435e580000000000000000000000000000000000000000000000000000000081529551939750600160a060020a039283169650633f29cd27958895620100009092049093169363ed435e5893600480820194918390030190829087803b1515610d7757fe5b60325a03f11515610d8457fe5b505060408051805160e060020a63ffffffff8716028252600160a060020a03199094166004820152602481019390935264ffffffffff6044840152516064808401936000935082900301818387803b1515610ddb57fe5b60325a03f11515610de857fe5b5050600080546007546040805160e260020a63236c86bf02815260a060020a90920465ffffffffffff166004830152600160a060020a0319861660248301525162010000909204600160a060020a03169350638db21afc92604480830193919282900301818387803b1515610e5957fe5b60325a03f11515610e6657fe5b505050610e71612dd5565b60405190819003906000f0801515610e8557fe5b60038054600160a060020a031916600160a060020a039283161790819055600754600080546040805160e060020a63e1f21c6702815293861660048501526201000090910485166024840152600019604484015251929093169263e1f21c679260648084019382900301818387803b1515610efc57fe5b60325a03f11515610f0957fe5b5050600080546007546003546040805160e060020a630a17d71d02815260a060020a90930465ffffffffffff166004840152600160a060020a0391821660248401525162010000909304169350630a17d71d92604480830193919282900301818387803b1515610f7557fe5b60325a03f11515610f8257fe5b5050600080546007546040805160e160020a630ad50adf02815260a060020a90920465ffffffffffff16600483015260001960248301525162010000909204600160a060020a031693506315aa15be92604480830193919282900301818387803b1515610feb57fe5b60325a03f11515610ff857fe5b5050600080546007546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff16600483015260001960248301525162010000909204600160a060020a0316935063cb38727f92604480830193919282900301818387803b151561106157fe5b60325a03f1151561106e57fe5b5050600554600754600080546040805160e060020a63e1f21c67028152600160a060020a039485166004820152620100009092048416602483015260001960448301525192909316935063e1f21c67926064808201939182900301818387803b151561050b57fe5b60325a03f1151561051857fe5b5050505b50565b60008054620100009004600160a060020a0316611105612dc5565b600160a060020a03909116815260405190819003602001906000f080151561112957fe5b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251929350600160a060020a0390911691636bb52a8e9160448082019260009290919082900301818387803b151561118f57fe5b60325a03f1151561119c57fe5b50506005546006546040805160e060020a63a9059cbb028152600160a060020a03928316600482015260326024820152905191909216925063a9059cbb9160448082019260009290919082900301818387803b15156111f757fe5b60325a03f1151561120457fe5b50506006546040805160e060020a63a9059cbb028152600160a060020a03858116600483015260196024830152915191909216925063a9059cbb9160448082019260009290919082900301818387803b151561050b57fe5b60325a03f1151561051857fe5b5050505b50565b60008054620100009004600160a060020a031661128b612dc5565b600160a060020a03909116815260405190819003602001906000f08015156112af57fe5b9050600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561130c57fe5b60325a03f1151561131957fe5b50506040805180517f7a9e5e4b000000000000000000000000000000000000000000000000000000008252600160a060020a038581166004840152925192169250637a9e5e4b91602480830192600092919082900301818387803b151561137c57fe5b60325a03f1151561138957fe5b50505061051c600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b15156113ea57fe5b60325a03f115156113f757fe5b50505060405180519050600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561144657fe5b60325a03f1151561145357fe5b505060405151905082612b6b565b5b50565b6006546007546040805160e060020a636000ee1d02815260a060020a90920465ffffffffffff16600483015251600160a060020a0390921691636000ee1d9160248082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b151561153757fe5b60325a03f1151561154457fe5b50506005546006546040805160e060020a63a9059cbb028152600160a060020a03928316600482015260326024820152905191909216925063a9059cbb9160448082019260009290919082900301818387803b151561159f57fe5b60325a03f115156115ac57fe5b5050600654600480546040805160e060020a63a9059cbb028152600160a060020a039283169381019390935260196024840152519216925063a9059cbb91604480830192600092919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b600480546007546040805160e160020a630ad50adf02815260a060020a90920465ffffffffffff16938201939093526103e860248201529151600160a060020a03909116916315aa15be91604480830192600092919082900301818387803b151561168057fe5b60325a03f1151561168d57fe5b5050506114d2600060029054906101000a9004600160a060020a0316600160a060020a031663ba80794e600760149054906101000a900465ffffffffffff166000604051602001526040518263ffffffff1660e060020a028152600401808265ffffffffffff1665ffffffffffff168152602001915050602060405180830381600087803b151561171a57fe5b60325a03f1151561172757fe5b50506040515190506103e8612c85565b5b565b6006546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b600480546007546040805160e060020a630a17d71d02815260a060020a90920465ffffffffffff169382019390935261012360248201529151600160a060020a0390911691630a17d71d91604480830192600092919082900301818387803b151561181757fe5b60325a03f1151561182457fe5b5050506114d2600060029054906101000a9004600160a060020a0316600160a060020a031663d36f8469600760149054906101000a900465ffffffffffff166000604051602001526040518263ffffffff1660e060020a028152600401808265ffffffffffff1665ffffffffffff168152602001915050602060405180830381600087803b15156118b157fe5b60325a03f115156118be57fe5b5050604051519050610123612b6b565b5b565b6114d2600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561192f57fe5b60325a03f1151561193c57fe5b50505060405180519050600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561198b57fe5b60325a03f1151561199857fe5b505060405151905030612b6b565b5b565b600480546007546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff16938201939093526103e860248201529151600160a060020a039091169163cb38727f91604480830192600092919082900301818387803b1515611a1057fe5b60325a03f11515611a1d57fe5b5050506114d2600060029054906101000a9004600160a060020a0316600160a060020a03166351be13b5600760149054906101000a900465ffffffffffff166000604051602001526040518263ffffffff1660e060020a028152600401808265ffffffffffff1665ffffffffffff168152602001915050602060405180830381600087803b151561171a57fe5b60325a03f1151561172757fe5b50506040515190506103e8612c85565b5b565b60006103e8611ad7612d95565b90815260405190819003602001906000f0801515611af157fe5b6005546040805160006020918201819052825160e160020a6322107243028152600160a060020a03808716600483015293519596509290931693634420e486936024808501948390030190829087803b151561050b57fe5b60325a03f1151561051857fe5b5050505b50565b6005546007546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff1660048301526103e8602483015251600160a060020a039092169163cb38727f9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6006546007546040805160e060020a630a17d71d02815260a060020a90920465ffffffffffff166004830152610123602483015251600160a060020a0390921691630a17d71d9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b60408051600160a060020a03831681526001602082015281517f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8929181900390910190a15b50565b6006546007546040805160e160020a630ad50adf02815260a060020a90920465ffffffffffff1660048301526103e8602483015251600160a060020a03909216916315aa15be9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6006546007546040805160e260020a63236c86bf02815260a060020a90920465ffffffffffff16600483015260a060020a607b02602483015251600160a060020a0390921691638db21afc9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6005546007546040805160e260020a63236c86bf02815260a060020a90920465ffffffffffff16600483015260a060020a607b02602483015251600160a060020a0390921691638db21afc9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6006546007546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff1660048301526103e8602483015251600160a060020a039092169163cb38727f9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b1515611edc57fe5b60325a03f11515611ee957fe5b50506005546007546040805160e160020a632232a61702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921692506344654c2e91604480830192600092919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6005546007546040805160e160020a630ad50adf02815260a060020a90920465ffffffffffff1660048301526103e8602483015251600160a060020a03909216916315aa15be9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b60008054620100009004600160a060020a0316611ff3612dc5565b600160a060020a03909116815260405190819003602001906000f080151561201757fe5b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251929350600160a060020a0390911691636bb52a8e9160448082019260009290919082900301818387803b151561207d57fe5b60325a03f1151561208a57fe5b5050600554600080546040805160e060020a63e1f21c6702815262010000909204600160a060020a039081166004840152868116602484015260646044840181905291519416945063e1f21c6793828201939290919082900301818387803b15156120f157fe5b60325a03f115156120fe57fe5b5050600554600654604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a0393841660048201529183166024830152601960448301525191841692506323b872dd91606480830192600092919082900301818387803b151561050b57fe5b60325a03f1151561051857fe5b5050505b50565b600054610100900460ff1681565b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b15156121f957fe5b60325a03f1151561220657fe5b50506006546007546040805160e160020a632232a61702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921692506344654c2e91604480830192600092919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b600480546007546040805160e260020a63236c86bf02815260a060020a90920465ffffffffffff169382019390935260a060020a607b0260248201529151600160a060020a0390911691638db21afc91604480830192600092919082900301818387803b15156122ea57fe5b60325a03f115156122f757fe5b5050506114d2600060029054906101000a9004600160a060020a0316600160a060020a031663048cfe32600760149054906101000a900465ffffffffffff166000604051602001526040518263ffffffff1660e060020a028152600401808265ffffffffffff1665ffffffffffff168152602001915050602060405180830381600087803b151561238457fe5b60325a03f1151561239157fe5b50506040515160a060020a90049050607b612c85565b5b565b6005546007546040805160e060020a636000ee1d02815260a060020a90920465ffffffffffff16600483015251600160a060020a0390921691636000ee1d9160248082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b151561247c57fe5b60325a03f1151561248957fe5b50506005546006546040805160e060020a63a9059cbb028152600160a060020a03928316600482015260646024820152905191909216925063a9059cbb9160448082019260009290919082900301818387803b15156124e457fe5b60325a03f115156124f157fe5b505060008054600654604080516020908101859052815160e060020a6370a08231028152600160a060020a03938416600482015291516114d2965062010000909404909216936370a0823193602480840194939192918390030190829087803b151561255957fe5b60325a03f1151561256657fe5b50506040515190506064612c85565b5b565b6005546007546040805160e060020a630a17d71d02815260a060020a90920465ffffffffffff166004830152610123602483015251600160a060020a0390921691630a17d71d9160448082019260009290919082900301818387803b15156114c157fe5b60325a03f115156114ce57fe5b5050505b565b600480546007546040805160e060020a636000ee1d02815260a060020a90920465ffffffffffff16938201939093529151600160a060020a0390911691636000ee1d91602480830192600092919082900301818387803b151561264e57fe5b60325a03f1151561265b57fe5b5050506114d2600060029054906101000a9004600160a060020a0316600160a060020a0316636a1ae03d600760149054906101000a900465ffffffffffff166000604051602001526040518263ffffffff1660e060020a028152600401808265ffffffffffff1665ffffffffffff168152602001915050602060405180830381600087803b15156126e857fe5b60325a03f115156126f557fe5b50506040515190506000612b6b565b5b565b8051825160019160009114156127c8575060005b83518160ff1610156127c357828160ff1681518110151561273857fe5b90602001015160f860020a900460f860020a027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff1681518110151561277e57fe5b60209101015160f860020a90819004027fff0000000000000000000000000000000000000000000000000000000000000016146127ba57600091505b5b60010161271b565b6127cd565b600091505b81151561051857604080517f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd19590281527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a1604080517f202041637475616c00000000000000000000000000000000000000000000000081527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a1610518612d83565b5b5b50505050565b6005546007546040805160e160020a6335da954702815260a060020a90920465ffffffffffff1660048301526064602483015251600160a060020a0390921691636bb52a8e9160448082019260009290919082900301818387803b151561297e57fe5b60325a03f1151561298b57fe5b505060008054600554604080516020908101859052815160e060020a6370a08231028152600160a060020a03938416600482015291516114d2965062010000909404909216936370a0823193602480840194939192918390030190829087803b151561255957fe5b60325a03f1151561256657fe5b50506040515190506064612c85565b5b565b60005460ff1681565b600060006103e8612a2a612d95565b90815260405190819003602001906000f0801515612a4457fe5b9150600460009054906101000a9004600160a060020a0316600160a060020a0316634420e486836000604051602001526040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1515612abb57fe5b60325a03f11515612ac857fe5b505060408051805160008054602093840182905284517f6a1ae03d00000000000000000000000000000000000000000000000000000000815265ffffffffffff841660048201529451929650612b669550620100009004600160a060020a031693636a1ae03d93602480830194919391928390030190829087803b1515612b4b57fe5b60325a03f11515612b5857fe5b505060405151905083612b6b565b5b5050565b600160a060020a0382811690821614612b6657604080517f4572726f723a2057726f6e67206061646472657373272076616c756500000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd1959028152600160a060020a038316602082015281517f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b1825929181900390910190a16040805160b260020a69080808081058dd1d585b028152600160a060020a038416602082015281517f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b1825929181900390910190a1612b66612d83565b5b5b5050565b818114612b6657604080517f4572726f723a2057726f6e67206075696e74272076616c756500000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd19590281526020810183905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a16040805160b260020a69080808081058dd1d585b0281526020810184905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a1612b66612d83565b5b5b5050565b6000805461ff0019166101001790555b565b6040516104ae80612de683390190565b6040516136648061329483390190565b604051610723806168f883390190565b6040516108798061701b83390190565b604051610107806178948339019056006060604052341561000c57fe5b6040516020806104ae83398101604052515b600160a060020a03331660009081526001602052604081208290558190555b505b6104608061004e6000396000f3006060604052361561005c5763ffffffff60e060020a600035041663095ea7b3811461005e57806318160ddd1461009157806323b872dd146100b357806370a08231146100ec578063a9059cbb1461011a578063dd62ed3e1461014d575bfe5b341561006657fe5b61007d600160a060020a0360043516602435610181565b604080519115158252519081900360200190f35b341561009957fe5b6100a16101ec565b60408051918252519081900360200190f35b34156100bb57fe5b61007d600160a060020a03600435811690602435166044356101f3565b604080519115158252519081900360200190f35b34156100f457fe5b6100a1600160a060020a0360043516610306565b60408051918252519081900360200190f35b341561012257fe5b61007d600160a060020a0360043516602435610325565b604080519115158252519081900360200190f35b341561015557fe5b6100a1600160a060020a03600435811690602435166103e8565b60408051918252519081900360200190f35b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b6000545b90565b600160a060020a0383166000908152600160205260408120546102199083901015610415565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461024d9083901015610415565b600160a060020a038316600090815260016020526040902054610279906102749084610426565b610415565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b600160a060020a0381166000908152600160205260409020545b919050565b600160a060020a03331660009081526001602052604081205461034b9083901015610415565b600160a060020a038316600090815260016020526040902054610377906102749084610426565b610415565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b8015156104225760006000fd5b5b50565b808201829010155b929150505600a165627a7a72305820f319d8bbc52243d020b4d90121607421b82a6073f20bcc13fcdb5d2d56afbb8900296060604052341561000c57fe5b5b6136488061001c6000396000f300606060405263ffffffff60e060020a60003504166306661abd81146200003a578063796d5836146200005f578063c6610657146200011b575bfe5b34156200004357fe5b6200004d6200014d565b60408051918252519081900360200190f35b34156200006857fe5b60408051602060046024803582810135601f8101859004850286018501909652858552620000ff958335600160a060020a0316959394604494939290920191819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496506200015395505050505050565b60408051600160a060020a039092168252519081900360200190f35b34156200012457fe5b620000ff6004356200043d565b60408051600160a060020a039092168252519081900360200190f35b60015481565b600060008484846200016462000458565b600160a060020a038416815260606020808301828152855192840192909252845160408401916080850191908701908083838215620001c0575b805182526020831115620001c057601f1990920191602091820191016200019e565b505050905090810190601f168015620001ed5780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838382156200022f575b8051825260208311156200022f57601f1990920191602091820191016200020d565b505050905090810190601f1680156200025c5780820380516001836020036101000a031916815260200191505b5095505050505050604051809103906000f08015156200027857fe5b9150816200028562000469565b600160a060020a03909116815260405190819003602001906000f0801515620002aa57fe5b905081600160a060020a0316637a9e5e4b826040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050600060405180830381600087803b15156200030457fe5b60325a03f115156200031257fe5b5050604080517fd381ba7c000000000000000000000000000000000000000000000000000000008152600160a060020a033381166004830152600160248301529151918416925063d381ba7c91604480830192600092919082900301818387803b15156200037c57fe5b60325a03f115156200038a57fe5b50505080600160a060020a0316637a9e5e4b336040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050600060405180830381600087803b1515620003e557fe5b60325a03f11515620003f357fe5b5050600180548082019091556000908152602081905260409020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038516179055505b509392505050565b600060208190529081526040902054600160a060020a031681565b604051611bdf806200047b83390190565b6040516115c3806200205a833901905600606060408190527f7472616e7366657228616464726573732c75696e74323536290000000000000090526008805463ffffffff191663a9059cbb17905534156200004557fe5b60405162001bdf38038062001bdf8339810160409081528151602083015191830151909291820191015b5b60005b600160a060020a03331660009081526001602052604081208290558190555b5060038054600160a060020a03191633600160a060020a0390811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b60048054600160a060020a031916600160a060020a03851617905581516200011290600590602085019062000133565b5080516200012890600690602084019062000133565b505b505050620001dd565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017657805160ff1916838001178555620001a6565b82800160010185558215620001a6579182015b82811115620001a657825182559160200191906001019062000189565b5b50620001b5929150620001b9565b5090565b620001da91905b80821115620001b55760008155600101620001c0565b5090565b90565b6119f280620001ed6000396000f3006060604052361561014e5763ffffffff60e060020a600035041663048cfe32811461015057806306fdde0314610188578063095ea7b3146102185780630a17d71d1461024b57806315aa15be1461027457806318160ddd1461029457806323b872dd146102b6578063313ce567146102ef5780634420e4861461031557806344654c2e1461034c57806351be13b51461037c5780636000ee1d146103a95780636a1ae03d146103c65780636a3ed2f3146103fd5780636bb52a8e1461042857806370a08231146104585780637a9e5e4b146104865780638db21afc146104a457806395d89b41146104ce578063a9059cbb1461055e578063ba80794e14610591578063bf7e214f146105be578063cb38727f146105ea578063d36f84691461060a578063d5c4b87a14610641578063d63605b81461066e578063dd62ed3e1461069a578063ed435e58146106ce575bfe5b341561015857fe5b61016b65ffffffffffff600435166106f0565b60408051600160a060020a03199092168252519081900360200190f35b341561019057fe5b61019861072e565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561022057fe5b610237600160a060020a03600435166024356107bc565b604080519115158252519081900360200190f35b341561025357fe5b61027265ffffffffffff60043516600160a060020a0360243516610827565b005b341561027c57fe5b61027265ffffffffffff60043516602435610896565b005b341561029c57fe5b6102a46108e8565b60408051918252519081900360200190f35b34156102be57fe5b610237600160a060020a03600435811690602435166044356108ef565b604080519115158252519081900360200190f35b34156102f757fe5b6102ff6109c1565b6040805160ff9092168252519081900360200190f35b341561031d57fe5b610331600160a060020a03600435166109c6565b6040805165ffffffffffff9092168252519081900360200190f35b341561035457fe5b6102a465ffffffffffff60043516602435610a88565b60408051918252519081900360200190f35b341561038457fe5b6102a465ffffffffffff60043516610d90565b60408051918252519081900360200190f35b34156103b157fe5b61027265ffffffffffff60043516610dc7565b005b34156103ce57fe5b6103e165ffffffffffff60043516610e3d565b60408051600160a060020a039092168252519081900360200190f35b341561040557fe5b610331610e7a565b6040805165ffffffffffff9092168252519081900360200190f35b341561043057fe5b6102a465ffffffffffff60043516602435610e81565b60408051918252519081900360200190f35b341561046057fe5b6102a4600160a060020a0360043516611191565b60408051918252519081900360200190f35b341561048e57fe5b610272600160a060020a03600435166111b0565b005b34156104ac57fe5b61027265ffffffffffff60043516600160a060020a031960243516611220565b005b34156104d657fe5b61019861128b565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561056657fe5b610237600160a060020a0360043516602435611319565b604080519115158252519081900360200190f35b341561059957fe5b6102a465ffffffffffff600435166113e9565b60408051918252519081900360200190f35b34156105c657fe5b6103e1611420565b60408051600160a060020a039092168252519081900360200190f35b34156105f257fe5b61027265ffffffffffff6004351660243561142f565b005b341561061257fe5b6103e165ffffffffffff60043516611481565b60408051600160a060020a039092168252519081900360200190f35b341561064957fe5b6102a465ffffffffffff600435166114c1565b60408051918252519081900360200190f35b341561067657fe5b6103e16114f8565b60408051600160a060020a039092168252519081900360200190f35b34156106a257fe5b6102a4600160a060020a0360043581169060243516611507565b60408051918252519081900360200190f35b34156106d657fe5b6102a4611534565b60408051918252519081900360200190f35b600060078265ffffffffffff1681548110151561070957fe5b906000526020600020906005020160005b505460a060020a908190040290505b919050565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b61084561084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561085d57fe5b906000526020600020906005020160005b506001018054600160a060020a031916600160a060020a03929092169190911790555b5b5050565b6108b461084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff168154811015156108cc57fe5b906000526020600020906005020160005b50600201555b5b5050565b6000545b90565b600061090f61084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956109a89591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6109b3868686611605565b92505b5b50505b9392505050565b601281565b60006109e661084033600035600160e060020a031916611540565b6115f4565b6001600780548060010182816109fc919061194d565b916000526020600020906005020160005b506040805160c081018252600160a060020a03808816808352600060208401819052938301849052606083018490526080830184905260a09092018390528354600160a060020a0319908116909217168355600183018054909116905560028201819055600382018190556004909101550390505b5b919050565b6000600060006000610aae61084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ac857fe5b906000526020600020906005020160005b508054909150610af390600160a060020a031615156115f4565b6001810154610b0c90600160a060020a031615156115f4565b8054610b2d9060a060020a9081900402600160a060020a03191615156115f4565b600354610b449060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610b7057fe5b906000526020600020906005020160005b50600160a060020a033316600090815260016020526040902054909550610bb1906108409089611718565b6115f4565b600160a060020a03331660009081526001602052604081208054899003905554610be4906108409089611718565b6115f4565b6000805488900390556003850154610c05906108409089611718565b6115f4565b60038501805488900390558454610c259060a060020a9081900402611723565b9350846002015484811515610c3657fe5b0484039250610c4d6108408885611856565b6115f4565b670de0b6b3a76400008784025b865460018801546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a039485166004820152338516602482015296909504604487018190529151919b50610ceb9592909316936323b872dd93606480850194919392918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b610cff8560040154866003015411156115f4565b60008054600160a060020a03331682526001602052604090912054610d26919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f7a84a15d8c233623337647a2fdf0314e2af7adee97face3b5f10f49fcc2e2bdb928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600060078265ffffffffffff16815481101515610da957fe5b906000526020600020906005020160005b506004015490505b919050565b610de561084033600035600160e060020a031916611540565b6115f4565b6007805465ffffffffffff8316908110610dfb57fe5b906000526020600020906005020160005b506000808255600182018054600160a060020a031916905560028201819055600382018190556004909101555b5b50565b600060078265ffffffffffff16815481101515610e5657fe5b906000526020600020906005020160005b5054600160a060020a031690505b919050565b6007545b90565b6000600060006000610ea761084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ec157fe5b906000526020600020906005020160005b508054909150610eec90600160a060020a031615156115f4565b6001810154610f0590600160a060020a031615156115f4565b8054610f269060a060020a9081900402600160a060020a03191615156115f4565b600354610f3d9060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610f6957fe5b906000526020600020906005020160005b50805460018201546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a0333811660048301529485166024820152604481018e90529251959a506110079593909416936323b872dd936064808501949192918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b845461101c9060a060020a9081900402611723565b935084600201548481151561102d57fe5b048401925061104c610840670de0b6b3a764000089611856565b6115f4565b8287670de0b6b3a76400000281151561106157fe5b600160a060020a033316600090815260016020526040902054919004965061109290610840908861187c565b6115f4565b600160a060020a0333166000908152600160205260408120805488019055546110c490610840908861187c565b6115f4565b600080548701905560038501546110e490610840908861187c565b6115f4565b60038501805487019081905560048601546111009111156115f4565b60008054600160a060020a03331682526001602052604090912054611127919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f9d8d20bc9c0bd5458165b7e07e9f93cd7ed8015434bf1df833834f26aac24479928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600160a060020a0381166000908152600160205260409020545b919050565b6111ce61084033600035600160e060020a031916611540565b6115f4565b60038054600160a060020a031916600160a060020a0383811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b5b50565b61123e61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561125657fe5b906000526020600020906005020160005b508054600160a060020a031660a060020a928390049092029190911790555b5b5050565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600061133961084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956113d29591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6113dc858561188a565b92505b5b50505b92915050565b600060078265ffffffffffff1681548110151561140257fe5b906000526020600020906005020160005b506002015490505b919050565b600354600160a060020a031681565b61144d61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561146557fe5b906000526020600020906005020160005b50600401555b5b5050565b600060078265ffffffffffff1681548110151561149a57fe5b906000526020600020906005020160005b5060010154600160a060020a031690505b919050565b600060078265ffffffffffff168154811015156114da57fe5b906000526020600020906005020160005b506003015490505b919050565b600454600160a060020a031681565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b670de0b6b3a764000081565b600354600090600160a060020a038481169116141561156157506001610821565b6003546040805160006020918201819052825160e060020a63b7009613028152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529351939094169363b7009613936064808301949391928390030190829087803b15156115d157fe5b60325a03f115156115de57fe5b50506040515191506108219050565b5b92915050565b801515610e395760006000fd5b5b50565b600160a060020a03831660009081526001602052604081205461162b90839010156115f4565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461165f90839010156115f4565b600160a060020a03831660009081526001602052604090205461168b90610840908461187c565b6115f4565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b808210155b92915050565b60048054604080516000602091820181905282517fb47a2f10000000000000000000000000000000000000000000000000000000008152600160a060020a03198716958101959095529151919384938493600160a060020a039091169263b47a2f10926024808201939182900301818787803b151561179e57fe5b60325a03f115156117ab57fe5b50506040515192506117be9050826115f4565b60048054604080516000602091820181905282517fba22e562000000000000000000000000000000000000000000000000000000008152600160a060020a03198a16958101959095529151600160a060020a039093169363ba22e5629360248083019491928390030190829087803b151561183557fe5b60325a03f1151561184257fe5b5050604051519350839150505b5050919050565b6000828202831580611872575082848281151561186f57fe5b04145b91505b5092915050565b808201829010155b92915050565b600160a060020a0333166000908152600160205260408120546118b090839010156115f4565b600160a060020a0383166000908152600160205260409020546118dc90610840908461187c565b6115f4565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b81548183558181151161197957600502816005028360005260206000209182019101611979919061197f565b5b505050565b6108ec91905b808211156119bf576000808255600182018054600160a060020a031916905560028201819055600382018190556004820155600501611985565b5090565b905600a165627a7a72305820d4b7ace5d48400dcf710573350688573f8859418ae6e6c82ad2eed21aca1cd42002960606040526005805461010061ffff199091161762ff000019166202000017905534156200002957fe5b604051602080620015c383398101604052515b5b60008054600160a060020a03191633600160a060020a03908116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b60055460408051808201909152601181527f72656769737465722861646472657373290000000000000000000000000000006020820152620000f99160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601881527f7365745661756c742875696e7434382c6164647265737329000000000000000060208201526200016a9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601781527f736574466565642875696e7434382c62797465733132290000000000000000006020820152620001db9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7365745370726561642875696e7434382c75696e74323536290000000000000060208201526200024c9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601a81527f7365744365696c696e672875696e7434382c75696e74323536290000000000006020820152620002bd9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601281527f756e72656769737465722875696e74343829000000000000000000000000000060208201526200032e9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f69737375652875696e7434382c75696e743235362900000000000000000000006020820152620003a491610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f636f7665722875696e7434382c75696e7432353629000000000000000000000060208201526200041a91610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7472616e7366657228616464726573732c75696e7432353629000000000000006020820152620004919162010000900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b62000537600560029054906101000a900460ff1682620000e3606060405190810160405280602581526020017f7472616e7366657246726f6d28616464726573732c616464726573732c75696e81526020017f74323536290000000000000000000000000000000000000000000000000000008152506200053f6401000000000262000718176401000000009004565b600164010000000062000934620005a882021704565b5b5062000814565b6000816040518082805190602001908083835b60208310620005735780518252601f19909201916020918201910162000552565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b60008062000600620005ec337fffffffff0000000000000000000000000000000000000000000000000000000084351664010000000062000c9c6200071482021704565b64010000000062000d62620007f782021704565b5050600160a060020a03831660009081526003602090815260408083207fffffffff000000000000000000000000000000000000000000000000000000008616845290915290205460ff851660020a8215620006a657600160a060020a03851660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000088168452909152902082821790556200070a565b620006bf8164010000000062000a6f6200080982021704565b600160a060020a03861660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000089168452909152902090831690555b5b5b505050505050565b60008054600160a060020a03848116911614156200073557506001620007f0565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a03888116600483015230811660248301527fffffffff00000000000000000000000000000000000000000000000000000000881660448301529251929093169363b70096139360648082019492918390030190829087803b1515620007d257fe5b60325a03f11515620007e057fe5b5050604051519150620007f09050565b5b92915050565b801515620008055760006000fd5b5b50565b60001981185b919050565b610d9f80620008246000396000f300606060405236156101385763ffffffff60e060020a60003504166306a36aee811461013a5780631d1438481461016857806320694db01461018e57806324d7806c146101ac57806327538e90146101dc5780632f47571f1461021757806334becfb4146102545780634b8082151461027257806362d91855146102e557806367aff48414610303578063704802751461032c5780637a9e5e4b1461034a5780637d40583d14610368578063877b9a671461039e578063891ba702146103ce57806393aa5ca8146103ec578063a078f73714610411578063ac1e17df14610447578063b700961314610465578063bf7e214f146104a8578063c6b0263e146104d4578063d381ba7c14610504578063d4d7b19a14610527578063e534155d14610557578063f851a4401461057d578063fbf80773146105a3575bfe5b341561014257fe5b610156600160a060020a03600435166105d3565b60408051918252519081900360200190f35b341561017057fe5b6101786105f2565b6040805160ff9092168252519081900360200190f35b341561019657fe5b6101aa600160a060020a0360043516610600565b005b34156101b457fe5b6101c8600160a060020a0360043516610654565b604080519115158252519081900360200190f35b34156101e457fe5b610156600160a060020a0360043516600160e060020a031960243516610670565b60408051918252519081900360200190f35b341561021f57fe5b6101c8600160a060020a0360043516600160e060020a0319602435166106a5565b604080519115158252519081900360200190f35b341561025c57fe5b6101aa600160a060020a03600435166106dd565b005b341561027a57fe5b6102c8600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061071895505050505050565b60408051600160e060020a03199092168252519081900360200190f35b34156102ed57fe5b6101aa600160a060020a036004351661077f565b005b341561030b57fe5b6101aa600160a060020a036004351660ff6024351660443515156107b5565b005b341561033457fe5b6101aa600160a060020a0360043516610854565b005b341561035257fe5b6101aa600160a060020a03600435166108bb565b005b341561037057fe5b6101aa60ff60043516600160a060020a0360243516600160e060020a0319604435166064351515610934565b005b34156103a657fe5b6101c8600160a060020a0360043516610a10565b604080519115158252519081900360200190f35b34156103d657fe5b6101aa600160a060020a0360043516610a33565b005b34156103f457fe5b610156600435610a6f565b60408051918252519081900360200190f35b341561041957fe5b6101c8600160a060020a036004351660ff60243516610a7a565b604080519115158252519081900360200190f35b341561044f57fe5b6101aa600160a060020a0360043516610aa5565b005b341561046d57fe5b6101c8600160a060020a0360043581169060243516600160e060020a031960443516610ae1565b604080519115158252519081900360200190f35b34156104b057fe5b6104b8610b8a565b60408051600160a060020a039092168252519081900360200190f35b34156104dc57fe5b6101aa600160a060020a0360043516600160e060020a0319602435166044351515610b99565b005b341561050c57fe5b6101aa600160a060020a03600435166024351515610bf7565b005b341561052f57fe5b6101c8600160a060020a0360043516610c3f565b604080519115158252519081900360200190f35b341561055f57fe5b610178610c62565b6040805160ff9092168252519081900360200190f35b341561058557fe5b610178610c71565b6040805160ff9092168252519081900360200190f35b34156105ab57fe5b6101c8600160a060020a0360043516610c7a565b604080519115158252519081900360200190f35b600160a060020a0381166000908152600260205260409020545b919050565b600554610100900460ff1681565b61061e61061933600035600160e060020a031916610c9c565b610d62565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b60055460009061066890839060ff16610a7a565b90505b919050565b600160a060020a0382166000908152600360209081526040808320600160e060020a0319851684529091529020545b92915050565b600160a060020a0382166000908152600460209081526040808320600160e060020a03198516845290915290205460ff165b92915050565b6106fb61061933600035600160e060020a031916610c9c565b610d62565b60055461064f908290610100900460ff1660006107b5565b5b5b50565b6000816040518082805190602001908083835b6020831061074a5780518252601f19909201916020918201910161072b565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b61079d61061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829060ff1660006107b5565b5b5b50565b600060006107d761061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600260208190526040909120549060ff8416900a821561082457600160a060020a0385166000908152600260205260409020828217905561084b565b61082d81610a6f565b600160a060020a038616600090815260026020526040902090831690555b5b5b5050505050565b61087261061933600035600160e060020a031916610c9c565b610d62565b60055461061e90829060ff1660016107b5565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b6108d961061933600035600160e060020a031916610c9c565b610d62565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03838116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b50565b6000600061095661061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600360209081526040808320600160e060020a03198616845290915290205460ff851660020a82156109ca57600160a060020a0385166000908152600360209081526040808320600160e060020a03198816845290915290208282179055610a06565b6109d381610a6f565b600160a060020a0386166000908152600360209081526040808320600160e060020a031989168452909152902090831690555b5b5b505050505050565b600061066882600560019054906101000a900460ff16610a7a565b90505b919050565b610a5161061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660006107b5565b5b5b50565b60001981185b919050565b600060006000610a89856105d3565b60ff851660020a8082161515945090925090505b505092915050565b61063661061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b600160a060020a03831660009081526001602052604081205460ff1680610b355750600160a060020a0383166000908152600460209081526040808320600160e060020a03198616845290915290205460ff165b15610b4257506001610b83565b50600160a060020a038083166000908152600360209081526040808320600160e060020a031986168452825280832054938716835260029091529020541615155b9392505050565b600054600160a060020a031681565b610bb761061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0383166000908152600460209081526040808320600160e060020a0319861684529091529020805460ff19168215151790555b5b505050565b610c1561061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0382166000908152600160205260409020805460ff19168215151790555b5b5050565b600061066882600560029054906101000a900460ff16610a7a565b90505b919050565b60055462010000900460ff1681565b60055460ff1681565b600160a060020a03811660009081526001602052604090205460ff165b919050565b60008054600160a060020a0384811691161415610cbb5750600161069f565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529251929093169363b70096139360648082019492918390030190829087803b1515610d3f57fe5b60325a03f11515610d4c57fe5b505060405151915061069f9050565b5b92915050565b80151561064f5760006000fd5b5b505600a165627a7a72305820ce449f43149ccaa7321f0fa5b98e727bf9908a76648a3e2f13317c04eaac79ad0029a165627a7a72305820f9082dd16aa17471c558cfe754239d0cf9d229b7969cd90c286638d32b59ae3400296060604052600180546001606060020a03191681179055341561001e57fe5b5b6106f58061002e6000396000f3006060604052361561009e5763ffffffff60e060020a6000350416632020296581146100a05780633f29cd27146100d15780634e71d92d146100fd578063770eb5bb1461012a5780638981d5131461014c578063a160bdf514610185578063a69a5588146101bc578063a99ffb7b146101de578063ac016a3114610215578063b47a2f1014610244578063ba22e56214610275578063c9085820146102a4575bfe5b34156100a857fe5b6100bd600160a060020a0319600435166102cf565b604080519115158252519081900360200190f35b34156100d957fe5b6100fb600160a060020a03196004351660243564ffffffffff604435166102fa565b005b341561010557fe5b61010d6103d9565b60408051600160a060020a03199092168252519081900360200190f35b341561013257fe5b6100fb600160a060020a031960043516602435610485565b005b341561015457fe5b610169600160a060020a031960043516610504565b60408051600160a060020a039092168252519081900360200190f35b341561018d57fe5b6101a2600160a060020a03196004351661052d565b6040805164ffffffffff9092168252519081900360200190f35b34156101c457fe5b6100fb600160a060020a031960043516602435610560565b005b34156101e657fe5b6101a2600160a060020a031960043516610572565b6040805164ffffffffff9092168252519081900360200190f35b341561021d57fe5b610232600160a060020a03196004351661059c565b60408051918252519081900360200190f35b341561024c57fe5b6100bd600160a060020a0319600435166105bf565b604080519115158252519081900360200190f35b341561027d57fe5b610232600160a060020a0319600435166105d3565b60408051918252519081900360200190f35b34156102ac57fe5b6100fb600160a060020a031960043516602435600160a060020a031661060f565b005b60006102da8261052d565b64ffffffffff166102e961069e565b64ffffffffff16101590505b919050565b8261032061030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a03198416600090815260208190526040902060020183905561034761069e565b600160a060020a0319851660008181526020818152604091829020600301805464ffffffffff191664ffffffffff9586161769ffffffffff0000000000191665010000000000958816958602179055815187815290810193909352805191927f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd228929081900390910190a25b5b50505050565b60015460a060020a026103f7600160a060020a0319821615156106a3565b6001805460a060020a80820281900483018102046bffffffffffffffffffffffff19909116179055600160a060020a0319808216600081815260208181526040918290208054600160a060020a0333169516851790558151938452905191927fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f49929081900390910190a25b90565b816104ab61030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319831660008181526020818152604091829020600101859055815185815291517f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779029281900390910190a25b5b505050565b600160a060020a03198116600090815260208190526040902054600160a060020a03165b919050565b600160a060020a0319811660009081526020819052604090206003015465010000000000900464ffffffffff165b919050565b61056d82826000196102fa565b5b5050565b600160a060020a0319811660009081526020819052604090206003015464ffffffffff165b919050565b600160a060020a031981166000908152602081905260409020600101545b919050565b60006105cb33836106b4565b90505b919050565b60006105df33836106b4565b15156105eb5760006000fd5b50600160a060020a031981166000908152602081905260409020600201545b919050565b8161063561030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319808416600081815260208181526040918290208054600160a060020a0388169516851790558151938452905191927ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d929081900390910190a25b5b505050565b425b90565b8015156106b05760006000fd5b5b50565b60006106bf826102cf565b1590505b929150505600a165627a7a723058207a3cadc16d7a3afbd57ad57370cd9ff198ac5179baba70fb5a804013645281c300296060604052341561000c57fe5b60405160208061087983398101604052515b60008054600160a060020a031916600160a060020a0383161790555b505b61082e8061004b6000396000f300606060405236156100935763ffffffff60e060020a6000350416630a17d71d811461009557806315aa15be146100be57806323b872dd146100de5780634420e4861461010557806344654c2e1461013c5780636000ee1d1461015c5780636bb52a8e146101795780638db21afc14610199578063a9059cbb146101d0578063cb38727f146101f1578063e1f21c6714610211575bfe5b341561009d57fe5b6100bc65ffffffffffff60043516600160a060020a0360243516610238565b005b34156100c657fe5b6100bc65ffffffffffff600435166024356102bb565b005b34156100e657fe5b6100bc600160a060020a036004358116906024351660443561033b565b005b341561010d57fe5b610121600160a060020a03600435166103cc565b6040805165ffffffffffff9092168252519081900360200190f35b341561014457fe5b6100bc65ffffffffffff60043516602435610452565b005b341561016457fe5b6100bc65ffffffffffff600435166104e0565b005b341561018157fe5b6100bc65ffffffffffff60043516602435610558565b005b34156101a157fe5b6100bc65ffffffffffff6004351673ffffffffffffffffffffffffffffffffffffffff19602435166105e6565b005b34156101d857fe5b6100bc600160a060020a036004351660243561067c565b005b34156101f957fe5b6100bc65ffffffffffff60043516602435610704565b005b341561021957fe5b6100bc600160a060020a0360043581169060243516604435610784565b005b60008054604080517f0a17d71d00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152600160a060020a03858116602483015291519190921692630a17d71d926044808201939182900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f15aa15be00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152602481018590529051600160a060020a03909216926315aa15be9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b6000805460408051602090810184905281517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a038881166004830152878116602483015260448201879052925192909316936323b872dd9360648082019492918390030190829087803b15156103b657fe5b60325a03f115156103c357fe5b5050505b505050565b6000805460408051602090810184905281517f4420e486000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015292519290931692634420e486926024808301939282900301818787803b151561043657fe5b60325a03f1151561044357fe5b5050604051519150505b919050565b6000805460408051602090810184905281517f44654c2e00000000000000000000000000000000000000000000000000000000815265ffffffffffff87166004820152602481018690529151600160a060020a03909316936344654c2e936044808501949192918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f6000ee1d00000000000000000000000000000000000000000000000000000000815265ffffffffffff851660048201529051600160a060020a0390921692636000ee1d9260248084019382900301818387803b151561054457fe5b60325a03f1151561055157fe5b5050505b50565b6000805460408051602090810184905281517f6bb52a8e00000000000000000000000000000000000000000000000000000000815265ffffffffffff87166004820152602481018690529151600160a060020a0390931693636bb52a8e936044808501949192918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517f8db21afc00000000000000000000000000000000000000000000000000000000815265ffffffffffff8616600482015273ffffffffffffffffffffffffffffffffffffffff19851660248201529051600160a060020a0390921692638db21afc9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b6000805460408051602090810184905281517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152602482018790529251929093169363a9059cbb9360448082019492918390030190829087803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b60008054604080517fcb38727f00000000000000000000000000000000000000000000000000000000815265ffffffffffff86166004820152602481018590529051600160a060020a039092169263cb38727f9260448084019382900301818387803b15156102a657fe5b60325a03f115156102b357fe5b5050505b5050565b82600160a060020a031663095ea7b383836000604051602001526040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b15156103b657fe5b60325a03f115156103c357fe5b5050505b5050505600a165627a7a723058205ec335ca1f5e825f41cc0fc70095cd04fa3ac522023bb6cdc228a6b4ae0fb3bc00296060604052341561000c57fe5b5b60ec8061001b6000396000f300606060405263ffffffff60e060020a600035041663e1f21c6781146020575bfe5b3415602757fe5b6042600160a060020a03600435811690602435166044356044565b005b82600160a060020a031663095ea7b383836000604051602001526040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b151560ab57fe5b60325a03f1151560b757fe5b5050505b5050505600a165627a7a72305820e49f0e2e8e84d374a7cba06e727879f93f0d8f7f57343a3adfb7c25bfe176a170029a165627a7a7230582087799ad44df7f72022d1db9b361fcdcf0bb6fa77981ad542fa448601f0fb1b5f0029"
  },
  "SimpleRoleAuth": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "getUserRoles",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "issuer",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "addIssuer",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "isAdmin",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "getCapabilityRoles",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "isCapabilityPublic",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "delIssuer",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "name",
            "type": "string"
          }
        ],
        "name": "sig",
        "outputs": [
          {
            "name": "",
            "type": "bytes4"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "delAdmin",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "role",
            "type": "uint8"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setUserRole",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "addAdmin",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "authority_",
            "type": "address"
          }
        ],
        "name": "setAuthority",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "role",
            "type": "uint8"
          },
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setRoleCapability",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "isIssuer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "delHolder",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "input",
            "type": "bytes32"
          }
        ],
        "name": "BITNOT",
        "outputs": [
          {
            "name": "output",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "role",
            "type": "uint8"
          }
        ],
        "name": "hasUserRole",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "addHolder",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "caller",
            "type": "address"
          },
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "canCall",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "authority",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "code",
            "type": "address"
          },
          {
            "name": "sig",
            "type": "bytes4"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setPublicCapability",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ],
        "name": "setRootUser",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "isHolder",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "holder",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "isUserRoot",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "authority",
            "type": "address"
          }
        ],
        "name": "LogSetAuthority",
        "type": "event"
      }
    ],
    "bytecode": "60606040526005805461010061ffff199091161762ff000019166202000017905534156200002957fe5b604051602080620015c383398101604052515b5b60008054600160a060020a03191633600160a060020a03908116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b60055460408051808201909152601181527f72656769737465722861646472657373290000000000000000000000000000006020820152620000f99160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601881527f7365745661756c742875696e7434382c6164647265737329000000000000000060208201526200016a9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601781527f736574466565642875696e7434382c62797465733132290000000000000000006020820152620001db9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7365745370726561642875696e7434382c75696e74323536290000000000000060208201526200024c9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601a81527f7365744365696c696e672875696e7434382c75696e74323536290000000000006020820152620002bd9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601281527f756e72656769737465722875696e74343829000000000000000000000000000060208201526200032e9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f69737375652875696e7434382c75696e743235362900000000000000000000006020820152620003a491610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f636f7665722875696e7434382c75696e7432353629000000000000000000000060208201526200041a91610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7472616e7366657228616464726573732c75696e7432353629000000000000006020820152620004919162010000900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b62000537600560029054906101000a900460ff1682620000e3606060405190810160405280602581526020017f7472616e7366657246726f6d28616464726573732c616464726573732c75696e81526020017f74323536290000000000000000000000000000000000000000000000000000008152506200053f6401000000000262000718176401000000009004565b600164010000000062000934620005a882021704565b5b5062000814565b6000816040518082805190602001908083835b60208310620005735780518252601f19909201916020918201910162000552565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b60008062000600620005ec337fffffffff0000000000000000000000000000000000000000000000000000000084351664010000000062000c9c6200071482021704565b64010000000062000d62620007f782021704565b5050600160a060020a03831660009081526003602090815260408083207fffffffff000000000000000000000000000000000000000000000000000000008616845290915290205460ff851660020a8215620006a657600160a060020a03851660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000088168452909152902082821790556200070a565b620006bf8164010000000062000a6f6200080982021704565b600160a060020a03861660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000089168452909152902090831690555b5b5b505050505050565b60008054600160a060020a03848116911614156200073557506001620007f0565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a03888116600483015230811660248301527fffffffff00000000000000000000000000000000000000000000000000000000881660448301529251929093169363b70096139360648082019492918390030190829087803b1515620007d257fe5b60325a03f11515620007e057fe5b5050604051519150620007f09050565b5b92915050565b801515620008055760006000fd5b5b50565b60001981185b919050565b610d9f80620008246000396000f300606060405236156101385763ffffffff60e060020a60003504166306a36aee811461013a5780631d1438481461016857806320694db01461018e57806324d7806c146101ac57806327538e90146101dc5780632f47571f1461021757806334becfb4146102545780634b8082151461027257806362d91855146102e557806367aff48414610303578063704802751461032c5780637a9e5e4b1461034a5780637d40583d14610368578063877b9a671461039e578063891ba702146103ce57806393aa5ca8146103ec578063a078f73714610411578063ac1e17df14610447578063b700961314610465578063bf7e214f146104a8578063c6b0263e146104d4578063d381ba7c14610504578063d4d7b19a14610527578063e534155d14610557578063f851a4401461057d578063fbf80773146105a3575bfe5b341561014257fe5b610156600160a060020a03600435166105d3565b60408051918252519081900360200190f35b341561017057fe5b6101786105f2565b6040805160ff9092168252519081900360200190f35b341561019657fe5b6101aa600160a060020a0360043516610600565b005b34156101b457fe5b6101c8600160a060020a0360043516610654565b604080519115158252519081900360200190f35b34156101e457fe5b610156600160a060020a0360043516600160e060020a031960243516610670565b60408051918252519081900360200190f35b341561021f57fe5b6101c8600160a060020a0360043516600160e060020a0319602435166106a5565b604080519115158252519081900360200190f35b341561025c57fe5b6101aa600160a060020a03600435166106dd565b005b341561027a57fe5b6102c8600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061071895505050505050565b60408051600160e060020a03199092168252519081900360200190f35b34156102ed57fe5b6101aa600160a060020a036004351661077f565b005b341561030b57fe5b6101aa600160a060020a036004351660ff6024351660443515156107b5565b005b341561033457fe5b6101aa600160a060020a0360043516610854565b005b341561035257fe5b6101aa600160a060020a03600435166108bb565b005b341561037057fe5b6101aa60ff60043516600160a060020a0360243516600160e060020a0319604435166064351515610934565b005b34156103a657fe5b6101c8600160a060020a0360043516610a10565b604080519115158252519081900360200190f35b34156103d657fe5b6101aa600160a060020a0360043516610a33565b005b34156103f457fe5b610156600435610a6f565b60408051918252519081900360200190f35b341561041957fe5b6101c8600160a060020a036004351660ff60243516610a7a565b604080519115158252519081900360200190f35b341561044f57fe5b6101aa600160a060020a0360043516610aa5565b005b341561046d57fe5b6101c8600160a060020a0360043581169060243516600160e060020a031960443516610ae1565b604080519115158252519081900360200190f35b34156104b057fe5b6104b8610b8a565b60408051600160a060020a039092168252519081900360200190f35b34156104dc57fe5b6101aa600160a060020a0360043516600160e060020a0319602435166044351515610b99565b005b341561050c57fe5b6101aa600160a060020a03600435166024351515610bf7565b005b341561052f57fe5b6101c8600160a060020a0360043516610c3f565b604080519115158252519081900360200190f35b341561055f57fe5b610178610c62565b6040805160ff9092168252519081900360200190f35b341561058557fe5b610178610c71565b6040805160ff9092168252519081900360200190f35b34156105ab57fe5b6101c8600160a060020a0360043516610c7a565b604080519115158252519081900360200190f35b600160a060020a0381166000908152600260205260409020545b919050565b600554610100900460ff1681565b61061e61061933600035600160e060020a031916610c9c565b610d62565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b60055460009061066890839060ff16610a7a565b90505b919050565b600160a060020a0382166000908152600360209081526040808320600160e060020a0319851684529091529020545b92915050565b600160a060020a0382166000908152600460209081526040808320600160e060020a03198516845290915290205460ff165b92915050565b6106fb61061933600035600160e060020a031916610c9c565b610d62565b60055461064f908290610100900460ff1660006107b5565b5b5b50565b6000816040518082805190602001908083835b6020831061074a5780518252601f19909201916020918201910161072b565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b61079d61061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829060ff1660006107b5565b5b5b50565b600060006107d761061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600260208190526040909120549060ff8416900a821561082457600160a060020a0385166000908152600260205260409020828217905561084b565b61082d81610a6f565b600160a060020a038616600090815260026020526040902090831690555b5b5b5050505050565b61087261061933600035600160e060020a031916610c9c565b610d62565b60055461061e90829060ff1660016107b5565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b6108d961061933600035600160e060020a031916610c9c565b610d62565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03838116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b50565b6000600061095661061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600360209081526040808320600160e060020a03198616845290915290205460ff851660020a82156109ca57600160a060020a0385166000908152600360209081526040808320600160e060020a03198816845290915290208282179055610a06565b6109d381610a6f565b600160a060020a0386166000908152600360209081526040808320600160e060020a031989168452909152902090831690555b5b5b505050505050565b600061066882600560019054906101000a900460ff16610a7a565b90505b919050565b610a5161061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660006107b5565b5b5b50565b60001981185b919050565b600060006000610a89856105d3565b60ff851660020a8082161515945090925090505b505092915050565b61063661061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b600160a060020a03831660009081526001602052604081205460ff1680610b355750600160a060020a0383166000908152600460209081526040808320600160e060020a03198616845290915290205460ff165b15610b4257506001610b83565b50600160a060020a038083166000908152600360209081526040808320600160e060020a031986168452825280832054938716835260029091529020541615155b9392505050565b600054600160a060020a031681565b610bb761061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0383166000908152600460209081526040808320600160e060020a0319861684529091529020805460ff19168215151790555b5b505050565b610c1561061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0382166000908152600160205260409020805460ff19168215151790555b5b5050565b600061066882600560029054906101000a900460ff16610a7a565b90505b919050565b60055462010000900460ff1681565b60055460ff1681565b600160a060020a03811660009081526001602052604090205460ff165b919050565b60008054600160a060020a0384811691161415610cbb5750600161069f565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529251929093169363b70096139360648082019492918390030190829087803b1515610d3f57fe5b60325a03f11515610d4c57fe5b505060405151915061069f9050565b5b92915050565b80151561064f5760006000fd5b5b505600a165627a7a723058203b0c4cf949c079fb4c6aab29ff97194852cb9e75933fa4377eb933841b1e43f20029"
  },
  "Simplecoin": {
    "interface": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "feed",
        "outputs": [
          {
            "name": "",
            "type": "bytes12"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "guy",
            "type": "address"
          },
          {
            "name": "wad",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          },
          {
            "name": "vault",
            "type": "address"
          }
        ],
        "name": "setVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          },
          {
            "name": "spread",
            "type": "uint256"
          }
        ],
        "name": "setSpread",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "token",
            "type": "address"
          }
        ],
        "name": "register",
        "outputs": [
          {
            "name": "id",
            "type": "uint48"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "name": "stablecoin_quantity",
            "type": "uint256"
          }
        ],
        "name": "cover",
        "outputs": [
          {
            "name": "returned_amount",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "ceiling",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "collateral_type",
            "type": "uint48"
          }
        ],
        "name": "unregister",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "token",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nextType",
        "outputs": [
          {
            "name": "",
            "type": "uint48"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "name": "pay_how_much",
            "type": "uint256"
          }
        ],
        "name": "issue",
        "outputs": [
          {
            "name": "issued_quantity",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "authority_",
            "type": "address"
          }
        ],
        "name": "setAuthority",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          },
          {
            "name": "feed",
            "type": "bytes12"
          }
        ],
        "name": "setFeed",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "spread",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "authority",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          },
          {
            "name": "ceiling",
            "type": "uint256"
          }
        ],
        "name": "setCeiling",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "vault",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "type_id",
            "type": "uint48"
          }
        ],
        "name": "debt",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "feeds",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "src",
            "type": "address"
          },
          {
            "name": "guy",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "PRICE_UNIT",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_feeds",
            "type": "address"
          },
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_symbol",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "indexed": false,
            "name": "stablecoin_quantity",
            "type": "uint256"
          }
        ],
        "name": "LogIssue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "indexed": false,
            "name": "stablecoin_quantity",
            "type": "uint256"
          }
        ],
        "name": "LogCover",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "authority",
            "type": "address"
          }
        ],
        "name": "LogSetAuthority",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      }
    ],
    "bytecode": "606060408190527f7472616e7366657228616464726573732c75696e74323536290000000000000090526008805463ffffffff191663a9059cbb17905534156200004557fe5b60405162001bdf38038062001bdf8339810160409081528151602083015191830151909291820191015b5b60005b600160a060020a03331660009081526001602052604081208290558190555b5060038054600160a060020a03191633600160a060020a0390811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b60048054600160a060020a031916600160a060020a03851617905581516200011290600590602085019062000133565b5080516200012890600690602084019062000133565b505b505050620001dd565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017657805160ff1916838001178555620001a6565b82800160010185558215620001a6579182015b82811115620001a657825182559160200191906001019062000189565b5b50620001b5929150620001b9565b5090565b620001da91905b80821115620001b55760008155600101620001c0565b5090565b90565b6119f280620001ed6000396000f3006060604052361561014e5763ffffffff60e060020a600035041663048cfe32811461015057806306fdde0314610188578063095ea7b3146102185780630a17d71d1461024b57806315aa15be1461027457806318160ddd1461029457806323b872dd146102b6578063313ce567146102ef5780634420e4861461031557806344654c2e1461034c57806351be13b51461037c5780636000ee1d146103a95780636a1ae03d146103c65780636a3ed2f3146103fd5780636bb52a8e1461042857806370a08231146104585780637a9e5e4b146104865780638db21afc146104a457806395d89b41146104ce578063a9059cbb1461055e578063ba80794e14610591578063bf7e214f146105be578063cb38727f146105ea578063d36f84691461060a578063d5c4b87a14610641578063d63605b81461066e578063dd62ed3e1461069a578063ed435e58146106ce575bfe5b341561015857fe5b61016b65ffffffffffff600435166106f0565b60408051600160a060020a03199092168252519081900360200190f35b341561019057fe5b61019861072e565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561022057fe5b610237600160a060020a03600435166024356107bc565b604080519115158252519081900360200190f35b341561025357fe5b61027265ffffffffffff60043516600160a060020a0360243516610827565b005b341561027c57fe5b61027265ffffffffffff60043516602435610896565b005b341561029c57fe5b6102a46108e8565b60408051918252519081900360200190f35b34156102be57fe5b610237600160a060020a03600435811690602435166044356108ef565b604080519115158252519081900360200190f35b34156102f757fe5b6102ff6109c1565b6040805160ff9092168252519081900360200190f35b341561031d57fe5b610331600160a060020a03600435166109c6565b6040805165ffffffffffff9092168252519081900360200190f35b341561035457fe5b6102a465ffffffffffff60043516602435610a88565b60408051918252519081900360200190f35b341561038457fe5b6102a465ffffffffffff60043516610d90565b60408051918252519081900360200190f35b34156103b157fe5b61027265ffffffffffff60043516610dc7565b005b34156103ce57fe5b6103e165ffffffffffff60043516610e3d565b60408051600160a060020a039092168252519081900360200190f35b341561040557fe5b610331610e7a565b6040805165ffffffffffff9092168252519081900360200190f35b341561043057fe5b6102a465ffffffffffff60043516602435610e81565b60408051918252519081900360200190f35b341561046057fe5b6102a4600160a060020a0360043516611191565b60408051918252519081900360200190f35b341561048e57fe5b610272600160a060020a03600435166111b0565b005b34156104ac57fe5b61027265ffffffffffff60043516600160a060020a031960243516611220565b005b34156104d657fe5b61019861128b565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561056657fe5b610237600160a060020a0360043516602435611319565b604080519115158252519081900360200190f35b341561059957fe5b6102a465ffffffffffff600435166113e9565b60408051918252519081900360200190f35b34156105c657fe5b6103e1611420565b60408051600160a060020a039092168252519081900360200190f35b34156105f257fe5b61027265ffffffffffff6004351660243561142f565b005b341561061257fe5b6103e165ffffffffffff60043516611481565b60408051600160a060020a039092168252519081900360200190f35b341561064957fe5b6102a465ffffffffffff600435166114c1565b60408051918252519081900360200190f35b341561067657fe5b6103e16114f8565b60408051600160a060020a039092168252519081900360200190f35b34156106a257fe5b6102a4600160a060020a0360043581169060243516611507565b60408051918252519081900360200190f35b34156106d657fe5b6102a4611534565b60408051918252519081900360200190f35b600060078265ffffffffffff1681548110151561070957fe5b906000526020600020906005020160005b505460a060020a908190040290505b919050565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b61084561084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561085d57fe5b906000526020600020906005020160005b506001018054600160a060020a031916600160a060020a03929092169190911790555b5b5050565b6108b461084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff168154811015156108cc57fe5b906000526020600020906005020160005b50600201555b5b5050565b6000545b90565b600061090f61084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956109a89591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6109b3868686611605565b92505b5b50505b9392505050565b601281565b60006109e661084033600035600160e060020a031916611540565b6115f4565b6001600780548060010182816109fc919061194d565b916000526020600020906005020160005b506040805160c081018252600160a060020a03808816808352600060208401819052938301849052606083018490526080830184905260a09092018390528354600160a060020a0319908116909217168355600183018054909116905560028201819055600382018190556004909101550390505b5b919050565b6000600060006000610aae61084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ac857fe5b906000526020600020906005020160005b508054909150610af390600160a060020a031615156115f4565b6001810154610b0c90600160a060020a031615156115f4565b8054610b2d9060a060020a9081900402600160a060020a03191615156115f4565b600354610b449060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610b7057fe5b906000526020600020906005020160005b50600160a060020a033316600090815260016020526040902054909550610bb1906108409089611718565b6115f4565b600160a060020a03331660009081526001602052604081208054899003905554610be4906108409089611718565b6115f4565b6000805488900390556003850154610c05906108409089611718565b6115f4565b60038501805488900390558454610c259060a060020a9081900402611723565b9350846002015484811515610c3657fe5b0484039250610c4d6108408885611856565b6115f4565b670de0b6b3a76400008784025b865460018801546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a039485166004820152338516602482015296909504604487018190529151919b50610ceb9592909316936323b872dd93606480850194919392918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b610cff8560040154866003015411156115f4565b60008054600160a060020a03331682526001602052604090912054610d26919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f7a84a15d8c233623337647a2fdf0314e2af7adee97face3b5f10f49fcc2e2bdb928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600060078265ffffffffffff16815481101515610da957fe5b906000526020600020906005020160005b506004015490505b919050565b610de561084033600035600160e060020a031916611540565b6115f4565b6007805465ffffffffffff8316908110610dfb57fe5b906000526020600020906005020160005b506000808255600182018054600160a060020a031916905560028201819055600382018190556004909101555b5b50565b600060078265ffffffffffff16815481101515610e5657fe5b906000526020600020906005020160005b5054600160a060020a031690505b919050565b6007545b90565b6000600060006000610ea761084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ec157fe5b906000526020600020906005020160005b508054909150610eec90600160a060020a031615156115f4565b6001810154610f0590600160a060020a031615156115f4565b8054610f269060a060020a9081900402600160a060020a03191615156115f4565b600354610f3d9060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610f6957fe5b906000526020600020906005020160005b50805460018201546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a0333811660048301529485166024820152604481018e90529251959a506110079593909416936323b872dd936064808501949192918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b845461101c9060a060020a9081900402611723565b935084600201548481151561102d57fe5b048401925061104c610840670de0b6b3a764000089611856565b6115f4565b8287670de0b6b3a76400000281151561106157fe5b600160a060020a033316600090815260016020526040902054919004965061109290610840908861187c565b6115f4565b600160a060020a0333166000908152600160205260408120805488019055546110c490610840908861187c565b6115f4565b600080548701905560038501546110e490610840908861187c565b6115f4565b60038501805487019081905560048601546111009111156115f4565b60008054600160a060020a03331682526001602052604090912054611127919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f9d8d20bc9c0bd5458165b7e07e9f93cd7ed8015434bf1df833834f26aac24479928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600160a060020a0381166000908152600160205260409020545b919050565b6111ce61084033600035600160e060020a031916611540565b6115f4565b60038054600160a060020a031916600160a060020a0383811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b5b50565b61123e61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561125657fe5b906000526020600020906005020160005b508054600160a060020a031660a060020a928390049092029190911790555b5b5050565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600061133961084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956113d29591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6113dc858561188a565b92505b5b50505b92915050565b600060078265ffffffffffff1681548110151561140257fe5b906000526020600020906005020160005b506002015490505b919050565b600354600160a060020a031681565b61144d61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561146557fe5b906000526020600020906005020160005b50600401555b5b5050565b600060078265ffffffffffff1681548110151561149a57fe5b906000526020600020906005020160005b5060010154600160a060020a031690505b919050565b600060078265ffffffffffff168154811015156114da57fe5b906000526020600020906005020160005b506003015490505b919050565b600454600160a060020a031681565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b670de0b6b3a764000081565b600354600090600160a060020a038481169116141561156157506001610821565b6003546040805160006020918201819052825160e060020a63b7009613028152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529351939094169363b7009613936064808301949391928390030190829087803b15156115d157fe5b60325a03f115156115de57fe5b50506040515191506108219050565b5b92915050565b801515610e395760006000fd5b5b50565b600160a060020a03831660009081526001602052604081205461162b90839010156115f4565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461165f90839010156115f4565b600160a060020a03831660009081526001602052604090205461168b90610840908461187c565b6115f4565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b808210155b92915050565b60048054604080516000602091820181905282517fb47a2f10000000000000000000000000000000000000000000000000000000008152600160a060020a03198716958101959095529151919384938493600160a060020a039091169263b47a2f10926024808201939182900301818787803b151561179e57fe5b60325a03f115156117ab57fe5b50506040515192506117be9050826115f4565b60048054604080516000602091820181905282517fba22e562000000000000000000000000000000000000000000000000000000008152600160a060020a03198a16958101959095529151600160a060020a039093169363ba22e5629360248083019491928390030190829087803b151561183557fe5b60325a03f1151561184257fe5b5050604051519350839150505b5050919050565b6000828202831580611872575082848281151561186f57fe5b04145b91505b5092915050565b808201829010155b92915050565b600160a060020a0333166000908152600160205260408120546118b090839010156115f4565b600160a060020a0383166000908152600160205260409020546118dc90610840908461187c565b6115f4565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b81548183558181151161197957600502816005028360005260206000209182019101611979919061197f565b5b505050565b6108ec91905b808211156119bf576000808255600182018054600160a060020a031916905560028201819055600382018190556004820155600501611985565b5090565b905600a165627a7a72305820d4b7ace5d48400dcf710573350688573f8859418ae6e6c82ad2eed21aca1cd420029"
  },
  "SimplecoinEvents": {
    "interface": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "indexed": false,
            "name": "stablecoin_quantity",
            "type": "uint256"
          }
        ],
        "name": "LogIssue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "collateral_type",
            "type": "uint48"
          },
          {
            "indexed": false,
            "name": "stablecoin_quantity",
            "type": "uint256"
          }
        ],
        "name": "LogCover",
        "type": "event"
      }
    ],
    "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a723058202059962099af1013de85210e434468f481fefebb964f1d9b99514b92355300860029"
  },
  "SimplecoinFactory": {
    "interface": [
      {
        "constant": true,
        "inputs": [],
        "name": "count",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "feeds",
            "type": "address"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          }
        ],
        "name": "create",
        "outputs": [
          {
            "name": "coin",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "coins",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b5b6136488061001c6000396000f300606060405263ffffffff60e060020a60003504166306661abd81146200003a578063796d5836146200005f578063c6610657146200011b575bfe5b34156200004357fe5b6200004d6200014d565b60408051918252519081900360200190f35b34156200006857fe5b60408051602060046024803582810135601f8101859004850286018501909652858552620000ff958335600160a060020a0316959394604494939290920191819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496506200015395505050505050565b60408051600160a060020a039092168252519081900360200190f35b34156200012457fe5b620000ff6004356200043d565b60408051600160a060020a039092168252519081900360200190f35b60015481565b600060008484846200016462000458565b600160a060020a038416815260606020808301828152855192840192909252845160408401916080850191908701908083838215620001c0575b805182526020831115620001c057601f1990920191602091820191016200019e565b505050905090810190601f168015620001ed5780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838382156200022f575b8051825260208311156200022f57601f1990920191602091820191016200020d565b505050905090810190601f1680156200025c5780820380516001836020036101000a031916815260200191505b5095505050505050604051809103906000f08015156200027857fe5b9150816200028562000469565b600160a060020a03909116815260405190819003602001906000f0801515620002aa57fe5b905081600160a060020a0316637a9e5e4b826040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050600060405180830381600087803b15156200030457fe5b60325a03f115156200031257fe5b5050604080517fd381ba7c000000000000000000000000000000000000000000000000000000008152600160a060020a033381166004830152600160248301529151918416925063d381ba7c91604480830192600092919082900301818387803b15156200037c57fe5b60325a03f115156200038a57fe5b50505080600160a060020a0316637a9e5e4b336040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050600060405180830381600087803b1515620003e557fe5b60325a03f11515620003f357fe5b5050600180548082019091556000908152602081905260409020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038516179055505b509392505050565b600060208190529081526040902054600160a060020a031681565b604051611bdf806200047b83390190565b6040516115c3806200205a833901905600606060408190527f7472616e7366657228616464726573732c75696e74323536290000000000000090526008805463ffffffff191663a9059cbb17905534156200004557fe5b60405162001bdf38038062001bdf8339810160409081528151602083015191830151909291820191015b5b60005b600160a060020a03331660009081526001602052604081208290558190555b5060038054600160a060020a03191633600160a060020a0390811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b60048054600160a060020a031916600160a060020a03851617905581516200011290600590602085019062000133565b5080516200012890600690602084019062000133565b505b505050620001dd565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017657805160ff1916838001178555620001a6565b82800160010185558215620001a6579182015b82811115620001a657825182559160200191906001019062000189565b5b50620001b5929150620001b9565b5090565b620001da91905b80821115620001b55760008155600101620001c0565b5090565b90565b6119f280620001ed6000396000f3006060604052361561014e5763ffffffff60e060020a600035041663048cfe32811461015057806306fdde0314610188578063095ea7b3146102185780630a17d71d1461024b57806315aa15be1461027457806318160ddd1461029457806323b872dd146102b6578063313ce567146102ef5780634420e4861461031557806344654c2e1461034c57806351be13b51461037c5780636000ee1d146103a95780636a1ae03d146103c65780636a3ed2f3146103fd5780636bb52a8e1461042857806370a08231146104585780637a9e5e4b146104865780638db21afc146104a457806395d89b41146104ce578063a9059cbb1461055e578063ba80794e14610591578063bf7e214f146105be578063cb38727f146105ea578063d36f84691461060a578063d5c4b87a14610641578063d63605b81461066e578063dd62ed3e1461069a578063ed435e58146106ce575bfe5b341561015857fe5b61016b65ffffffffffff600435166106f0565b60408051600160a060020a03199092168252519081900360200190f35b341561019057fe5b61019861072e565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561022057fe5b610237600160a060020a03600435166024356107bc565b604080519115158252519081900360200190f35b341561025357fe5b61027265ffffffffffff60043516600160a060020a0360243516610827565b005b341561027c57fe5b61027265ffffffffffff60043516602435610896565b005b341561029c57fe5b6102a46108e8565b60408051918252519081900360200190f35b34156102be57fe5b610237600160a060020a03600435811690602435166044356108ef565b604080519115158252519081900360200190f35b34156102f757fe5b6102ff6109c1565b6040805160ff9092168252519081900360200190f35b341561031d57fe5b610331600160a060020a03600435166109c6565b6040805165ffffffffffff9092168252519081900360200190f35b341561035457fe5b6102a465ffffffffffff60043516602435610a88565b60408051918252519081900360200190f35b341561038457fe5b6102a465ffffffffffff60043516610d90565b60408051918252519081900360200190f35b34156103b157fe5b61027265ffffffffffff60043516610dc7565b005b34156103ce57fe5b6103e165ffffffffffff60043516610e3d565b60408051600160a060020a039092168252519081900360200190f35b341561040557fe5b610331610e7a565b6040805165ffffffffffff9092168252519081900360200190f35b341561043057fe5b6102a465ffffffffffff60043516602435610e81565b60408051918252519081900360200190f35b341561046057fe5b6102a4600160a060020a0360043516611191565b60408051918252519081900360200190f35b341561048e57fe5b610272600160a060020a03600435166111b0565b005b34156104ac57fe5b61027265ffffffffffff60043516600160a060020a031960243516611220565b005b34156104d657fe5b61019861128b565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561056657fe5b610237600160a060020a0360043516602435611319565b604080519115158252519081900360200190f35b341561059957fe5b6102a465ffffffffffff600435166113e9565b60408051918252519081900360200190f35b34156105c657fe5b6103e1611420565b60408051600160a060020a039092168252519081900360200190f35b34156105f257fe5b61027265ffffffffffff6004351660243561142f565b005b341561061257fe5b6103e165ffffffffffff60043516611481565b60408051600160a060020a039092168252519081900360200190f35b341561064957fe5b6102a465ffffffffffff600435166114c1565b60408051918252519081900360200190f35b341561067657fe5b6103e16114f8565b60408051600160a060020a039092168252519081900360200190f35b34156106a257fe5b6102a4600160a060020a0360043581169060243516611507565b60408051918252519081900360200190f35b34156106d657fe5b6102a4611534565b60408051918252519081900360200190f35b600060078265ffffffffffff1681548110151561070957fe5b906000526020600020906005020160005b505460a060020a908190040290505b919050565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b61084561084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561085d57fe5b906000526020600020906005020160005b506001018054600160a060020a031916600160a060020a03929092169190911790555b5b5050565b6108b461084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff168154811015156108cc57fe5b906000526020600020906005020160005b50600201555b5b5050565b6000545b90565b600061090f61084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956109a89591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6109b3868686611605565b92505b5b50505b9392505050565b601281565b60006109e661084033600035600160e060020a031916611540565b6115f4565b6001600780548060010182816109fc919061194d565b916000526020600020906005020160005b506040805160c081018252600160a060020a03808816808352600060208401819052938301849052606083018490526080830184905260a09092018390528354600160a060020a0319908116909217168355600183018054909116905560028201819055600382018190556004909101550390505b5b919050565b6000600060006000610aae61084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ac857fe5b906000526020600020906005020160005b508054909150610af390600160a060020a031615156115f4565b6001810154610b0c90600160a060020a031615156115f4565b8054610b2d9060a060020a9081900402600160a060020a03191615156115f4565b600354610b449060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610b7057fe5b906000526020600020906005020160005b50600160a060020a033316600090815260016020526040902054909550610bb1906108409089611718565b6115f4565b600160a060020a03331660009081526001602052604081208054899003905554610be4906108409089611718565b6115f4565b6000805488900390556003850154610c05906108409089611718565b6115f4565b60038501805488900390558454610c259060a060020a9081900402611723565b9350846002015484811515610c3657fe5b0484039250610c4d6108408885611856565b6115f4565b670de0b6b3a76400008784025b865460018801546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a039485166004820152338516602482015296909504604487018190529151919b50610ceb9592909316936323b872dd93606480850194919392918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b610cff8560040154866003015411156115f4565b60008054600160a060020a03331682526001602052604090912054610d26919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f7a84a15d8c233623337647a2fdf0314e2af7adee97face3b5f10f49fcc2e2bdb928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600060078265ffffffffffff16815481101515610da957fe5b906000526020600020906005020160005b506004015490505b919050565b610de561084033600035600160e060020a031916611540565b6115f4565b6007805465ffffffffffff8316908110610dfb57fe5b906000526020600020906005020160005b506000808255600182018054600160a060020a031916905560028201819055600382018190556004909101555b5b50565b600060078265ffffffffffff16815481101515610e5657fe5b906000526020600020906005020160005b5054600160a060020a031690505b919050565b6007545b90565b6000600060006000610ea761084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ec157fe5b906000526020600020906005020160005b508054909150610eec90600160a060020a031615156115f4565b6001810154610f0590600160a060020a031615156115f4565b8054610f269060a060020a9081900402600160a060020a03191615156115f4565b600354610f3d9060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610f6957fe5b906000526020600020906005020160005b50805460018201546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a0333811660048301529485166024820152604481018e90529251959a506110079593909416936323b872dd936064808501949192918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b845461101c9060a060020a9081900402611723565b935084600201548481151561102d57fe5b048401925061104c610840670de0b6b3a764000089611856565b6115f4565b8287670de0b6b3a76400000281151561106157fe5b600160a060020a033316600090815260016020526040902054919004965061109290610840908861187c565b6115f4565b600160a060020a0333166000908152600160205260408120805488019055546110c490610840908861187c565b6115f4565b600080548701905560038501546110e490610840908861187c565b6115f4565b60038501805487019081905560048601546111009111156115f4565b60008054600160a060020a03331682526001602052604090912054611127919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f9d8d20bc9c0bd5458165b7e07e9f93cd7ed8015434bf1df833834f26aac24479928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600160a060020a0381166000908152600160205260409020545b919050565b6111ce61084033600035600160e060020a031916611540565b6115f4565b60038054600160a060020a031916600160a060020a0383811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b5b50565b61123e61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561125657fe5b906000526020600020906005020160005b508054600160a060020a031660a060020a928390049092029190911790555b5b5050565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600061133961084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956113d29591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6113dc858561188a565b92505b5b50505b92915050565b600060078265ffffffffffff1681548110151561140257fe5b906000526020600020906005020160005b506002015490505b919050565b600354600160a060020a031681565b61144d61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561146557fe5b906000526020600020906005020160005b50600401555b5b5050565b600060078265ffffffffffff1681548110151561149a57fe5b906000526020600020906005020160005b5060010154600160a060020a031690505b919050565b600060078265ffffffffffff168154811015156114da57fe5b906000526020600020906005020160005b506003015490505b919050565b600454600160a060020a031681565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b670de0b6b3a764000081565b600354600090600160a060020a038481169116141561156157506001610821565b6003546040805160006020918201819052825160e060020a63b7009613028152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529351939094169363b7009613936064808301949391928390030190829087803b15156115d157fe5b60325a03f115156115de57fe5b50506040515191506108219050565b5b92915050565b801515610e395760006000fd5b5b50565b600160a060020a03831660009081526001602052604081205461162b90839010156115f4565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461165f90839010156115f4565b600160a060020a03831660009081526001602052604090205461168b90610840908461187c565b6115f4565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b808210155b92915050565b60048054604080516000602091820181905282517fb47a2f10000000000000000000000000000000000000000000000000000000008152600160a060020a03198716958101959095529151919384938493600160a060020a039091169263b47a2f10926024808201939182900301818787803b151561179e57fe5b60325a03f115156117ab57fe5b50506040515192506117be9050826115f4565b60048054604080516000602091820181905282517fba22e562000000000000000000000000000000000000000000000000000000008152600160a060020a03198a16958101959095529151600160a060020a039093169363ba22e5629360248083019491928390030190829087803b151561183557fe5b60325a03f1151561184257fe5b5050604051519350839150505b5050919050565b6000828202831580611872575082848281151561186f57fe5b04145b91505b5092915050565b808201829010155b92915050565b600160a060020a0333166000908152600160205260408120546118b090839010156115f4565b600160a060020a0383166000908152600160205260409020546118dc90610840908461187c565b6115f4565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b81548183558181151161197957600502816005028360005260206000209182019101611979919061197f565b5b505050565b6108ec91905b808211156119bf576000808255600182018054600160a060020a031916905560028201819055600382018190556004820155600501611985565b5090565b905600a165627a7a72305820d4b7ace5d48400dcf710573350688573f8859418ae6e6c82ad2eed21aca1cd42002960606040526005805461010061ffff199091161762ff000019166202000017905534156200002957fe5b604051602080620015c383398101604052515b5b60008054600160a060020a03191633600160a060020a03908116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b60055460408051808201909152601181527f72656769737465722861646472657373290000000000000000000000000000006020820152620000f99160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601881527f7365745661756c742875696e7434382c6164647265737329000000000000000060208201526200016a9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601781527f736574466565642875696e7434382c62797465733132290000000000000000006020820152620001db9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7365745370726561642875696e7434382c75696e74323536290000000000000060208201526200024c9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601a81527f7365744365696c696e672875696e7434382c75696e74323536290000000000006020820152620002bd9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601281527f756e72656769737465722875696e74343829000000000000000000000000000060208201526200032e9160ff16908390620000e390640100000000620007186200053f82021704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f69737375652875696e7434382c75696e743235362900000000000000000000006020820152620003a491610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601581527f636f7665722875696e7434382c75696e7432353629000000000000000000000060208201526200041a91610100900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b60055460408051808201909152601981527f7472616e7366657228616464726573732c75696e7432353629000000000000006020820152620004919162010000900460ff16908390620000e3906401000000006200053f8102620007181704565b600164010000000062000934620005a882021704565b62000537600560029054906101000a900460ff1682620000e3606060405190810160405280602581526020017f7472616e7366657246726f6d28616464726573732c616464726573732c75696e81526020017f74323536290000000000000000000000000000000000000000000000000000008152506200053f6401000000000262000718176401000000009004565b600164010000000062000934620005a882021704565b5b5062000814565b6000816040518082805190602001908083835b60208310620005735780518252601f19909201916020918201910162000552565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b60008062000600620005ec337fffffffff0000000000000000000000000000000000000000000000000000000084351664010000000062000c9c6200071482021704565b64010000000062000d62620007f782021704565b5050600160a060020a03831660009081526003602090815260408083207fffffffff000000000000000000000000000000000000000000000000000000008616845290915290205460ff851660020a8215620006a657600160a060020a03851660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000088168452909152902082821790556200070a565b620006bf8164010000000062000a6f6200080982021704565b600160a060020a03861660009081526003602090815260408083207fffffffff0000000000000000000000000000000000000000000000000000000089168452909152902090831690555b5b5b505050505050565b60008054600160a060020a03848116911614156200073557506001620007f0565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a03888116600483015230811660248301527fffffffff00000000000000000000000000000000000000000000000000000000881660448301529251929093169363b70096139360648082019492918390030190829087803b1515620007d257fe5b60325a03f11515620007e057fe5b5050604051519150620007f09050565b5b92915050565b801515620008055760006000fd5b5b50565b60001981185b919050565b610d9f80620008246000396000f300606060405236156101385763ffffffff60e060020a60003504166306a36aee811461013a5780631d1438481461016857806320694db01461018e57806324d7806c146101ac57806327538e90146101dc5780632f47571f1461021757806334becfb4146102545780634b8082151461027257806362d91855146102e557806367aff48414610303578063704802751461032c5780637a9e5e4b1461034a5780637d40583d14610368578063877b9a671461039e578063891ba702146103ce57806393aa5ca8146103ec578063a078f73714610411578063ac1e17df14610447578063b700961314610465578063bf7e214f146104a8578063c6b0263e146104d4578063d381ba7c14610504578063d4d7b19a14610527578063e534155d14610557578063f851a4401461057d578063fbf80773146105a3575bfe5b341561014257fe5b610156600160a060020a03600435166105d3565b60408051918252519081900360200190f35b341561017057fe5b6101786105f2565b6040805160ff9092168252519081900360200190f35b341561019657fe5b6101aa600160a060020a0360043516610600565b005b34156101b457fe5b6101c8600160a060020a0360043516610654565b604080519115158252519081900360200190f35b34156101e457fe5b610156600160a060020a0360043516600160e060020a031960243516610670565b60408051918252519081900360200190f35b341561021f57fe5b6101c8600160a060020a0360043516600160e060020a0319602435166106a5565b604080519115158252519081900360200190f35b341561025c57fe5b6101aa600160a060020a03600435166106dd565b005b341561027a57fe5b6102c8600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061071895505050505050565b60408051600160e060020a03199092168252519081900360200190f35b34156102ed57fe5b6101aa600160a060020a036004351661077f565b005b341561030b57fe5b6101aa600160a060020a036004351660ff6024351660443515156107b5565b005b341561033457fe5b6101aa600160a060020a0360043516610854565b005b341561035257fe5b6101aa600160a060020a03600435166108bb565b005b341561037057fe5b6101aa60ff60043516600160a060020a0360243516600160e060020a0319604435166064351515610934565b005b34156103a657fe5b6101c8600160a060020a0360043516610a10565b604080519115158252519081900360200190f35b34156103d657fe5b6101aa600160a060020a0360043516610a33565b005b34156103f457fe5b610156600435610a6f565b60408051918252519081900360200190f35b341561041957fe5b6101c8600160a060020a036004351660ff60243516610a7a565b604080519115158252519081900360200190f35b341561044f57fe5b6101aa600160a060020a0360043516610aa5565b005b341561046d57fe5b6101c8600160a060020a0360043581169060243516600160e060020a031960443516610ae1565b604080519115158252519081900360200190f35b34156104b057fe5b6104b8610b8a565b60408051600160a060020a039092168252519081900360200190f35b34156104dc57fe5b6101aa600160a060020a0360043516600160e060020a0319602435166044351515610b99565b005b341561050c57fe5b6101aa600160a060020a03600435166024351515610bf7565b005b341561052f57fe5b6101c8600160a060020a0360043516610c3f565b604080519115158252519081900360200190f35b341561055f57fe5b610178610c62565b6040805160ff9092168252519081900360200190f35b341561058557fe5b610178610c71565b6040805160ff9092168252519081900360200190f35b34156105ab57fe5b6101c8600160a060020a0360043516610c7a565b604080519115158252519081900360200190f35b600160a060020a0381166000908152600260205260409020545b919050565b600554610100900460ff1681565b61061e61061933600035600160e060020a031916610c9c565b610d62565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b60055460009061066890839060ff16610a7a565b90505b919050565b600160a060020a0382166000908152600360209081526040808320600160e060020a0319851684529091529020545b92915050565b600160a060020a0382166000908152600460209081526040808320600160e060020a03198516845290915290205460ff165b92915050565b6106fb61061933600035600160e060020a031916610c9c565b610d62565b60055461064f908290610100900460ff1660006107b5565b5b5b50565b6000816040518082805190602001908083835b6020831061074a5780518252601f19909201916020918201910161072b565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902090505b919050565b61079d61061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829060ff1660006107b5565b5b5b50565b600060006107d761061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600260208190526040909120549060ff8416900a821561082457600160a060020a0385166000908152600260205260409020828217905561084b565b61082d81610a6f565b600160a060020a038616600090815260026020526040902090831690555b5b5b5050505050565b61087261061933600035600160e060020a031916610c9c565b610d62565b60055461061e90829060ff1660016107b5565b600554610636908290610100900460ff1660016107b5565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b6108d961061933600035600160e060020a031916610c9c565b610d62565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03838116919091178083556040519116917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a25b5b50565b6000600061095661061933600035600160e060020a031916610c9c565b610d62565b5050600160a060020a0383166000908152600360209081526040808320600160e060020a03198616845290915290205460ff851660020a82156109ca57600160a060020a0385166000908152600360209081526040808320600160e060020a03198816845290915290208282179055610a06565b6109d381610a6f565b600160a060020a0386166000908152600360209081526040808320600160e060020a031989168452909152902090831690555b5b5b505050505050565b600061066882600560019054906101000a900460ff16610a7a565b90505b919050565b610a5161061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660006107b5565b5b5b50565b60001981185b919050565b600060006000610a89856105d3565b60ff851660020a8082161515945090925090505b505092915050565b61063661061933600035600160e060020a031916610c9c565b610d62565b60055461064f90829062010000900460ff1660016107b5565b5b5b50565b600160a060020a03831660009081526001602052604081205460ff1680610b355750600160a060020a0383166000908152600460209081526040808320600160e060020a03198616845290915290205460ff165b15610b4257506001610b83565b50600160a060020a038083166000908152600360209081526040808320600160e060020a031986168452825280832054938716835260029091529020541615155b9392505050565b600054600160a060020a031681565b610bb761061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0383166000908152600460209081526040808320600160e060020a0319861684529091529020805460ff19168215151790555b5b505050565b610c1561061933600035600160e060020a031916610c9c565b610d62565b600160a060020a0382166000908152600160205260409020805460ff19168215151790555b5b5050565b600061066882600560029054906101000a900460ff16610a7a565b90505b919050565b60055462010000900460ff1681565b60055460ff1681565b600160a060020a03811660009081526001602052604090205460ff165b919050565b60008054600160a060020a0384811691161415610cbb5750600161069f565b6000805460408051602090810184905281517fb7009613000000000000000000000000000000000000000000000000000000008152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529251929093169363b70096139360648082019492918390030190829087803b1515610d3f57fe5b60325a03f11515610d4c57fe5b505060405151915061069f9050565b5b92915050565b80151561064f5760006000fd5b5b505600a165627a7a72305820ce449f43149ccaa7321f0fa5b98e727bf9908a76648a3e2f13317c04eaac79ad0029a165627a7a72305820f9082dd16aa17471c558cfe754239d0cf9d229b7969cd90c286638d32b59ae340029"
  },
  "SimplecoinTest": {
    "interface": [
      {
        "constant": false,
        "inputs": [],
        "name": "testCoverTransferFromCaller",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "setUp",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testCoverTransferFromVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testCoverDestroysCoin",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testBasics",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssueTransferFromCaller",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testCoverTransferToCaller",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssueCreatesCoin",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testAuthSetup",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "target",
            "type": "address"
          }
        ],
        "name": "expectEventsExact",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "failed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssueTransferToVault",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "testIssueTransferToCaller",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "bytes"
          },
          {
            "name": "b",
            "type": "bytes"
          }
        ],
        "name": "assertEq0",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "IS_TEST",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "target",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "exact",
            "type": "bool"
          }
        ],
        "name": "eventListener",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "logs",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "log_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "address"
          }
        ],
        "name": "log_named_address",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "bytes32"
          }
        ],
        "name": "log_named_bytes32",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "decimals",
            "type": "uint256"
          }
        ],
        "name": "log_named_decimal_uint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "int256"
          }
        ],
        "name": "log_named_int",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "key",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "val",
            "type": "uint256"
          }
        ],
        "name": "log_named_uint",
        "type": "event"
      }
    ],
    "bytecode": "60606040525b6000805460ff191660011790555b5b614e2e806100236000396000f30060606040523615620000cf5763ffffffff60e060020a600035041663028a161f8114620000d15780630a9254e414620000e65780630ef72da514620000fb57806336a0ec171462000110578063539d67c214620001255780635d64d15e146200013a57806363dfde51146200014f578063794b462f1462000164578063869cb61014620001795780638af784dc146200018e578063ba414fa614620001af578063c710ba6e14620001d6578063db8cf3cc14620001eb578063f578fd851462000200578063fa7626d41462000298575bfe5b3415620000da57fe5b620000e4620002bf565b005b3415620000ef57fe5b620000e46200055a565b005b34156200010457fe5b620000e462000c4e565b005b34156200011957fe5b620000e462000ee1565b005b34156200012e57fe5b620000e462001166565b005b34156200014357fe5b620000e462001518565b005b34156200015857fe5b620000e462001718565b005b34156200016d57fe5b620000e4620019b7565b005b34156200018257fe5b620000e462001bbf565b005b34156200019757fe5b620000e4600160a060020a036004351662001c3f565b005b3415620001b857fe5b620001c262001c87565b604080519115158252519081900360200190f35b3415620001df57fe5b620000e462001c95565b005b3415620001f457fe5b620000e462001e9f565b005b34156200020957fe5b620000e4600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b01803591820183900483028401830190945280835297999881019791965091820194509250829150840183828082843750949650620020b095505050505050565b005b3415620002a157fe5b620001c2620022ce565b604080519115158252519081900360200190f35b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839283928392620100009004600160a060020a03169163cb38727f916044808301928692919082900301818387803b15156200033057fe5b60325a03f115156200033e57fe5b505060008054600354604080516020908101859052815160e160020a6335da954702815260a060020a90930465ffffffffffff166004840152620186a0602484018190529151919a5062010000909304600160a060020a03169450636bb52a8e93604480840194938390030190829087803b1515620003b957fe5b60325a03f11515620003c757fe5b5050604080518051600080546020938401829052845160e060020a6370a08231028152600160a060020a0330811660048301529551939a506201000090910490941694506370a08231936024808201949392918390030190829087803b15156200042d57fe5b60325a03f115156200043b57fe5b5050604080518051600080546003546020948501839052855160e160020a632232a61702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a031694506344654c2e936044808201949392918390030190829087803b1515620004b557fe5b60325a03f11515620004c357fe5b5050604080518051600080546020938401829052845160e060020a6370a08231028152600160a060020a03308116600483015295519398506201000090910490941694506370a08231936024808201949392918390030190829087803b15156200052957fe5b60325a03f115156200053757fe5b5050604051519150620005529050818403620f3e58620022d7565b5b5050505050565b60006200056662002507565b60405190819003906000f08015156200057b57fe5b60018054600160a060020a031916600160a060020a03928316179081905516620005a462002518565b600160a060020a039091168152606060208201819052600f908201527f5465737420436f696e20546f6b656e0000000000000000000000000000000000608082015260a060408083018290526003918301919091527f544354000000000000000000000000000000000000000000000000000000000060c0830152519081900360e001906000f08015156200063557fe5b60008054600160a060020a0392909216620100000275ffffffffffffffffffffffffffffffffffffffff00001990921691909117905569d3c21bcecceda10000006200068062002529565b90815260405190819003602001906000f08015156200069b57fe5b60038054600160a060020a031916600160a060020a0392831617908190556000805460408051602090810184905281517f095ea7b3000000000000000000000000000000000000000000000000000000008152620100009093048616600484015269d3c21bcecceda100000060248401529051939094169363095ea7b39360448084019492939192918390030190829087803b15156200073757fe5b60325a03f115156200074557fe5b5050604080516001546000602092830181905283517f4e71d92d0000000000000000000000000000000000000000000000000000000081529351600160a060020a039092169450634e71d92d936004808201949392918390030190829087803b1515620007ae57fe5b60325a03f11515620007bc57fe5b5050604080518051600480546bffffffffffffffffffffffff191660a060020a90920491909117815560008054602093840182905284517fed435e580000000000000000000000000000000000000000000000000000000081529451600a965060019562010000909204600160a060020a03169463ed435e58948381019491938390030190829087803b15156200084f57fe5b60325a03f115156200085d57fe5b50505060405180519050028115156200087257fe5b60015460048054604080517f3f29cd2700000000000000000000000000000000000000000000000000000000815260a060020a909202600160a060020a03191692820192909252939092046024840181905242600a0164ffffffffff1660448501529151919350600160a060020a031691633f29cd2791606480830192600092919082900301818387803b15156200090657fe5b60325a03f115156200091457fe5b505050620009216200253a565b60405190819003906000f08015156200093657fe5b60028054600160a060020a031916600160a060020a03928316179081905560035460008054604080517fe1f21c6700000000000000000000000000000000000000000000000000000000815293861660048501526201000090910485166024840152600019604484015251929093169263e1f21c679260648084019382900301818387803b1515620009c457fe5b60325a03f11515620009d257fe5b50506000805460035460408051602090810185905281517f4420e486000000000000000000000000000000000000000000000000000000008152600160a060020a0393841660048201529151620100009094049092169450634420e48693602480830194928390030190829087803b151562000a4a57fe5b60325a03f1151562000a5857fe5b50506040805180516003805479ffffffffffff0000000000000000000000000000000000000000191660a060020a65ffffffffffff93841681029190911791829055600080546002547f0a17d71d000000000000000000000000000000000000000000000000000000008752929093049093166004850152600160a060020a0390811660248501529351620100009091049093169350630a17d71d9260448084019382900301818387803b151562000b0c57fe5b60325a03f1151562000b1a57fe5b50506000805460035460048054604080517f8db21afc00000000000000000000000000000000000000000000000000000000815260a060020a9485900465ffffffffffff16938101939093529202600160a060020a0319166024820152905162010000909204600160a060020a03169350638db21afc92604480830193919282900301818387803b151562000bab57fe5b60325a03f1151562000bb957fe5b505060008054600354604080517f15aa15be00000000000000000000000000000000000000000000000000000000815260a060020a90920465ffffffffffff1660048301526103e860248301525162010000909204600160a060020a031693506315aa15be92604480830193919282900301818387803b151562000c3957fe5b60325a03f1151562000c4757fe5b5050505b50565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839283928392620100009004600160a060020a03169163cb38727f916044808301928692919082900301818387803b151562000cbf57fe5b60325a03f1151562000ccd57fe5b505060008054600354604080516020908101859052815160e160020a6335da954702815260a060020a90930465ffffffffffff166004840152620186a0602484018190529151919a5062010000909304600160a060020a03169450636bb52a8e93604480840194938390030190829087803b151562000d4857fe5b60325a03f1151562000d5657fe5b505060408051805160035460025460006020948501819052855160e060020a6370a08231028152600160a060020a0392831660048201529551939a50911694506370a08231936024808201949392918390030190829087803b151562000db857fe5b60325a03f1151562000dc657fe5b5050604080518051600080546003546020948501839052855160e160020a632232a61702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a031694506344654c2e936044808201949392918390030190829087803b151562000e4057fe5b60325a03f1151562000e4e57fe5b505060408051805160035460025460006020948501819052855160e060020a6370a08231028152600160a060020a0392831660048201529551939850911694506370a08231936024808201949392918390030190829087803b151562000eb057fe5b60325a03f1151562000ebe57fe5b5050604051519150620005529050818403620185d8620022d7565b5b5050505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839283928392620100009004600160a060020a03169163cb38727f916044808301928692919082900301818387803b151562000f5257fe5b60325a03f1151562000f6057fe5b505060008054600354604080516020908101859052815160e160020a6335da954702815260a060020a90930465ffffffffffff166004840152620186a0602484018190529151919a5062010000909304600160a060020a03169450636bb52a8e93604480840194938390030190829087803b151562000fdb57fe5b60325a03f1151562000fe957fe5b5050604080518051600080546020938401829052845160e060020a6318160ddd0281529451929950620100009004600160a060020a031694506318160ddd936004808201949392918390030190829087803b15156200104457fe5b60325a03f115156200105257fe5b5050604080518051600080546003546020948501839052855160e160020a632232a61702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a031694506344654c2e936044808201949392918390030190829087803b1515620010cc57fe5b60325a03f11515620010da57fe5b5050604080518051600080546020938401829052845160e060020a6318160ddd0281529451929750620100009004600160a060020a031694506318160ddd936004808201949392918390030190829087803b15156200052957fe5b60325a03f115156200053757fe5b5050604051519150620005529050818403620f3e58620022d7565b5b5050505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f424060248301525183928392839262010000909204600160a060020a03169163cb38727f91604480820192869290919082900301818387803b1515620011d757fe5b60325a03f11515620011e557fe5b505060008054600354604080516020908101859052815160e160020a6335da954702815260a060020a90930465ffffffffffff166004840152620186a06024840152905162010000909304600160a060020a03169450636bb52a8e9360448084019492938390030190829087803b15156200125c57fe5b60325a03f115156200126a57fe5b505060405151945062001283905084620f3e58620022d7565b6200131a84600060029054906101000a9004600160a060020a0316600160a060020a03166370a08231306000604051602001526040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1515620012fe57fe5b60325a03f115156200130c57fe5b5050604051519050620022d7565b6003546040805160006020918201819052825160e060020a6370a08231028152600160a060020a033081166004830152935193909416936370a08231936024808301949391928390030190829087803b15156200137357fe5b60325a03f115156200138157fe5b5050604080518051600080546003546020948501839052855160e060020a6370a08231028152600160a060020a0330811660048301529651949a506201000090920490951695506344654c2e9460a060020a900465ffffffffffff169386936370a08231936024808501948390030190829087803b1515620013ff57fe5b60325a03f115156200140d57fe5b505050604051805190506000604051602001526040518363ffffffff1660e060020a028152600401808365ffffffffffff1665ffffffffffff16815260200182815260200192505050602060405180830381600087803b15156200146d57fe5b60325a03f115156200147b57fe5b505060408051805160035460006020938401819052845160e060020a6370a08231028152600160a060020a03308116600483015295519398509490911694506370a08231936024808201949392918390030190829087803b1515620014dc57fe5b60325a03f11515620014ea57fe5b505060405151915062001502905082848303620022d7565b62000c4782620185d8620022d7565b5b50505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839262010000909104600160a060020a03169163cb38727f91604480820192869290919082900301818387803b15156200158757fe5b60325a03f115156200159557fe5b50506003546040805160006020918201819052825160e060020a6370a08231028152600160a060020a0330811660048301529351620186a099509390941694506370a082319360248082019492918390030190829087803b1515620015f657fe5b60325a03f115156200160457fe5b5050604080518051600080546003546020948501839052855160e160020a6335da954702815260a060020a90910465ffffffffffff166004820152602481018a90529451929750620100009004600160a060020a03169450636bb52a8e936044808201949392918390030190829087803b15156200167e57fe5b60325a03f115156200168c57fe5b505060408051805160035460006020938401819052845160e060020a6370a08231028152600160a060020a033081166004830152955193975062001712965094909116936370a0823193602480830194919391928390030190829087803b1515620016f357fe5b60325a03f115156200170157fe5b5050604051518403905084620022d7565b5b505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839283928392620100009004600160a060020a03169163cb38727f916044808301928692919082900301818387803b15156200178957fe5b60325a03f115156200179757fe5b505060008054600354604080516020908101859052815160e160020a6335da954702815260a060020a90930465ffffffffffff166004840152620186a0602484018190529151919a5062010000909304600160a060020a03169450636bb52a8e93604480840194938390030190829087803b15156200181257fe5b60325a03f115156200182057fe5b505060408051805160035460006020938401819052845160e060020a6370a08231028152600160a060020a0330811660048301529551939a509490911694506370a08231936024808201949392918390030190829087803b15156200188157fe5b60325a03f115156200188f57fe5b5050604080518051600080546003546020948501839052855160e160020a632232a61702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a031694506344654c2e936044808201949392918390030190829087803b15156200190957fe5b60325a03f115156200191757fe5b505060408051805160035460006020938401819052845160e060020a6370a08231028152600160a060020a03308116600483015295519398509490911694506370a08231936024808201949392918390030190829087803b15156200197857fe5b60325a03f115156200198657fe5b50506040515191506200199e905083820383620022d7565b62000552838203620185d8620022d7565b5b5050505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f424060248301525183928392839262010000909204600160a060020a03169163cb38727f91604480820192869290919082900301818387803b151562001a2857fe5b60325a03f1151562001a3657fe5b5050506001620186a0029350600060029054906101000a9004600160a060020a0316600160a060020a03166318160ddd6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151562001a9e57fe5b60325a03f1151562001aac57fe5b5050604080518051600080546003546020948501839052855160e160020a6335da954702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a03169450636bb52a8e936044808201949392918390030190829087803b151562001b2657fe5b60325a03f1151562001b3457fe5b5050604080518051600080546020938401829052845160e060020a6318160ddd0281529451929750620100009004600160a060020a031694506318160ddd936004808201949392918390030190829087803b151562001b8f57fe5b60325a03f1151562001b9d57fe5b505060405151915062000c479050838203620f3e58620022d7565b5b50505050565b62001c3c600060029054906101000a9004600160a060020a0316600160a060020a031663bf7e214f6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151562001c1f57fe5b60325a03f1151562001c2d57fe5b505060405151905030620023d8565b5b565b60408051600160a060020a03831681526001602082015281517f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8929181900390910190a15b50565b600054610100900460ff1681565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f42406024830152518392839262010000909104600160a060020a03169163cb38727f91604480820192869290919082900301818387803b151562001d0457fe5b60325a03f1151562001d1257fe5b50506003546002546040805160006020918201819052825160e060020a6370a08231028152600160a060020a0394851660048201529251620186a099509390941694506370a082319360248084019492938390030190829087803b151562001d7657fe5b60325a03f1151562001d8457fe5b5050604080518051600080546003546020948501839052855160e160020a6335da954702815260a060020a90910465ffffffffffff166004820152602481018a90529451929750620100009004600160a060020a03169450636bb52a8e936044808201949392918390030190829087803b151562001dfe57fe5b60325a03f1151562001e0c57fe5b505060408051805160035460025460006020948501819052855160e060020a6370a08231028152600160a060020a0392831660048201529551939750620017129650889591909216936370a082319360248084019492939192918390030190829087803b151562001e7957fe5b60325a03f1151562001e8757fe5b505050604051805190500384620022d7565b5b505050565b600080546003546040805160e060020a63cb38727f02815260a060020a90920465ffffffffffff166004830152620f424060248301525183928392839262010000909204600160a060020a03169163cb38727f91604480820192869290919082900301818387803b151562001f1057fe5b60325a03f1151562001f1e57fe5b505060008054604080516020908101849052815160e060020a6370a08231028152600160a060020a0330811660048301529251620186a09a506201000090940490921694506370a082319360248084019492938390030190829087803b151562001f8457fe5b60325a03f1151562001f9257fe5b5050604080518051600080546003546020948501839052855160e160020a6335da954702815260a060020a90910465ffffffffffff166004820152602481018b90529451929850620100009004600160a060020a03169450636bb52a8e936044808201949392918390030190829087803b15156200200c57fe5b60325a03f115156200201a57fe5b5050604080518051600080546020938401829052845160e060020a6370a08231028152600160a060020a03308116600483015295519398506201000090910490941694506370a08231936024808201949392918390030190829087803b151562001b8f57fe5b60325a03f1151562001b9d57fe5b505060405151915062000c479050838203620f3e58620022d7565b5b50505050565b80518251600191600091141562002178575060005b83518160ff1610156200217257828160ff16815181101515620020e457fe5b90602001015160f860020a900460f860020a027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848260ff168151811015156200212b57fe5b60209101015160f860020a90819004027fff0000000000000000000000000000000000000000000000000000000000000016146200216857600091505b5b600101620020c5565b6200217d565b600091505b81151562000c4757604080517f4572726f723a2057726f6e6720606279746573272076616c7565000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd19590281527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a1604080517f202041637475616c00000000000000000000000000000000000000000000000081527f5b63616e6e6f742073686f7720606279746573272076616c75655d0000000000602082015281517f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb929181900390910190a162000c47620024f5565b5b5b50505050565b60005460ff1681565b818114620023d257604080517f4572726f723a2057726f6e67206075696e74272076616c756500000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd19590281526020810183905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a16040805160b260020a69080808081058dd1d585b0281526020810184905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a1620023d2620024f5565b5b5b5050565b600160a060020a0382811690821614620023d257604080517f4572726f723a2057726f6e67206061646472657373272076616c756500000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a16040805160b260020a690808115e1c1958dd1959028152600160a060020a038316602082015281517f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b1825929181900390910190a16040805160b260020a69080808081058dd1d585b028152600160a060020a038416602082015281517f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b1825929181900390910190a1620023d2620024f5565b5b5b5050565b6000805461ff0019166101001790555b565b604051610723806200254c83390190565b604051611bdf8062002c6f83390190565b6040516104ae806200484e83390190565b6040516101078062004cfc8339019056006060604052600180546001606060020a03191681179055341561001e57fe5b5b6106f58061002e6000396000f3006060604052361561009e5763ffffffff60e060020a6000350416632020296581146100a05780633f29cd27146100d15780634e71d92d146100fd578063770eb5bb1461012a5780638981d5131461014c578063a160bdf514610185578063a69a5588146101bc578063a99ffb7b146101de578063ac016a3114610215578063b47a2f1014610244578063ba22e56214610275578063c9085820146102a4575bfe5b34156100a857fe5b6100bd600160a060020a0319600435166102cf565b604080519115158252519081900360200190f35b34156100d957fe5b6100fb600160a060020a03196004351660243564ffffffffff604435166102fa565b005b341561010557fe5b61010d6103d9565b60408051600160a060020a03199092168252519081900360200190f35b341561013257fe5b6100fb600160a060020a031960043516602435610485565b005b341561015457fe5b610169600160a060020a031960043516610504565b60408051600160a060020a039092168252519081900360200190f35b341561018d57fe5b6101a2600160a060020a03196004351661052d565b6040805164ffffffffff9092168252519081900360200190f35b34156101c457fe5b6100fb600160a060020a031960043516602435610560565b005b34156101e657fe5b6101a2600160a060020a031960043516610572565b6040805164ffffffffff9092168252519081900360200190f35b341561021d57fe5b610232600160a060020a03196004351661059c565b60408051918252519081900360200190f35b341561024c57fe5b6100bd600160a060020a0319600435166105bf565b604080519115158252519081900360200190f35b341561027d57fe5b610232600160a060020a0319600435166105d3565b60408051918252519081900360200190f35b34156102ac57fe5b6100fb600160a060020a031960043516602435600160a060020a031661060f565b005b60006102da8261052d565b64ffffffffff166102e961069e565b64ffffffffff16101590505b919050565b8261032061030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a03198416600090815260208190526040902060020183905561034761069e565b600160a060020a0319851660008181526020818152604091829020600301805464ffffffffff191664ffffffffff9586161769ffffffffff0000000000191665010000000000958816958602179055815187815290810193909352805191927f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd228929081900390910190a25b5b50505050565b60015460a060020a026103f7600160a060020a0319821615156106a3565b6001805460a060020a80820281900483018102046bffffffffffffffffffffffff19909116179055600160a060020a0319808216600081815260208181526040918290208054600160a060020a0333169516851790558151938452905191927fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f49929081900390910190a25b90565b816104ab61030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319831660008181526020818152604091829020600101859055815185815291517f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779029281900390910190a25b5b505050565b600160a060020a03198116600090815260208190526040902054600160a060020a03165b919050565b600160a060020a0319811660009081526020819052604090206003015465010000000000900464ffffffffff165b919050565b61056d82826000196102fa565b5b5050565b600160a060020a0319811660009081526020819052604090206003015464ffffffffff165b919050565b600160a060020a031981166000908152602081905260409020600101545b919050565b60006105cb33836106b4565b90505b919050565b60006105df33836106b4565b15156105eb5760006000fd5b50600160a060020a031981166000908152602081905260409020600201545b919050565b8161063561030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319808416600081815260208181526040918290208054600160a060020a0388169516851790558151938452905191927ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d929081900390910190a25b5b505050565b425b90565b8015156106b05760006000fd5b5b50565b60006106bf826102cf565b1590505b929150505600a165627a7a723058207a3cadc16d7a3afbd57ad57370cd9ff198ac5179baba70fb5a804013645281c30029606060408190527f7472616e7366657228616464726573732c75696e74323536290000000000000090526008805463ffffffff191663a9059cbb17905534156200004557fe5b60405162001bdf38038062001bdf8339810160409081528151602083015191830151909291820191015b5b60005b600160a060020a03331660009081526001602052604081208290558190555b5060038054600160a060020a03191633600160a060020a0390811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b60048054600160a060020a031916600160a060020a03851617905581516200011290600590602085019062000133565b5080516200012890600690602084019062000133565b505b505050620001dd565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017657805160ff1916838001178555620001a6565b82800160010185558215620001a6579182015b82811115620001a657825182559160200191906001019062000189565b5b50620001b5929150620001b9565b5090565b620001da91905b80821115620001b55760008155600101620001c0565b5090565b90565b6119f280620001ed6000396000f3006060604052361561014e5763ffffffff60e060020a600035041663048cfe32811461015057806306fdde0314610188578063095ea7b3146102185780630a17d71d1461024b57806315aa15be1461027457806318160ddd1461029457806323b872dd146102b6578063313ce567146102ef5780634420e4861461031557806344654c2e1461034c57806351be13b51461037c5780636000ee1d146103a95780636a1ae03d146103c65780636a3ed2f3146103fd5780636bb52a8e1461042857806370a08231146104585780637a9e5e4b146104865780638db21afc146104a457806395d89b41146104ce578063a9059cbb1461055e578063ba80794e14610591578063bf7e214f146105be578063cb38727f146105ea578063d36f84691461060a578063d5c4b87a14610641578063d63605b81461066e578063dd62ed3e1461069a578063ed435e58146106ce575bfe5b341561015857fe5b61016b65ffffffffffff600435166106f0565b60408051600160a060020a03199092168252519081900360200190f35b341561019057fe5b61019861072e565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561022057fe5b610237600160a060020a03600435166024356107bc565b604080519115158252519081900360200190f35b341561025357fe5b61027265ffffffffffff60043516600160a060020a0360243516610827565b005b341561027c57fe5b61027265ffffffffffff60043516602435610896565b005b341561029c57fe5b6102a46108e8565b60408051918252519081900360200190f35b34156102be57fe5b610237600160a060020a03600435811690602435166044356108ef565b604080519115158252519081900360200190f35b34156102f757fe5b6102ff6109c1565b6040805160ff9092168252519081900360200190f35b341561031d57fe5b610331600160a060020a03600435166109c6565b6040805165ffffffffffff9092168252519081900360200190f35b341561035457fe5b6102a465ffffffffffff60043516602435610a88565b60408051918252519081900360200190f35b341561038457fe5b6102a465ffffffffffff60043516610d90565b60408051918252519081900360200190f35b34156103b157fe5b61027265ffffffffffff60043516610dc7565b005b34156103ce57fe5b6103e165ffffffffffff60043516610e3d565b60408051600160a060020a039092168252519081900360200190f35b341561040557fe5b610331610e7a565b6040805165ffffffffffff9092168252519081900360200190f35b341561043057fe5b6102a465ffffffffffff60043516602435610e81565b60408051918252519081900360200190f35b341561046057fe5b6102a4600160a060020a0360043516611191565b60408051918252519081900360200190f35b341561048e57fe5b610272600160a060020a03600435166111b0565b005b34156104ac57fe5b61027265ffffffffffff60043516600160a060020a031960243516611220565b005b34156104d657fe5b61019861128b565b6040805160208082528351818301528351919283929083019185019080838382156101de575b8051825260208311156101de57601f1990920191602091820191016101be565b505050905090810190601f16801561020a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561056657fe5b610237600160a060020a0360043516602435611319565b604080519115158252519081900360200190f35b341561059957fe5b6102a465ffffffffffff600435166113e9565b60408051918252519081900360200190f35b34156105c657fe5b6103e1611420565b60408051600160a060020a039092168252519081900360200190f35b34156105f257fe5b61027265ffffffffffff6004351660243561142f565b005b341561061257fe5b6103e165ffffffffffff60043516611481565b60408051600160a060020a039092168252519081900360200190f35b341561064957fe5b6102a465ffffffffffff600435166114c1565b60408051918252519081900360200190f35b341561067657fe5b6103e16114f8565b60408051600160a060020a039092168252519081900360200190f35b34156106a257fe5b6102a4600160a060020a0360043581169060243516611507565b60408051918252519081900360200190f35b34156106d657fe5b6102a4611534565b60408051918252519081900360200190f35b600060078265ffffffffffff1681548110151561070957fe5b906000526020600020906005020160005b505460a060020a908190040290505b919050565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b61084561084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561085d57fe5b906000526020600020906005020160005b506001018054600160a060020a031916600160a060020a03929092169190911790555b5b5050565b6108b461084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff168154811015156108cc57fe5b906000526020600020906005020160005b50600201555b5b5050565b6000545b90565b600061090f61084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956109a89591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6109b3868686611605565b92505b5b50505b9392505050565b601281565b60006109e661084033600035600160e060020a031916611540565b6115f4565b6001600780548060010182816109fc919061194d565b916000526020600020906005020160005b506040805160c081018252600160a060020a03808816808352600060208401819052938301849052606083018490526080830184905260a09092018390528354600160a060020a0319908116909217168355600183018054909116905560028201819055600382018190556004909101550390505b5b919050565b6000600060006000610aae61084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ac857fe5b906000526020600020906005020160005b508054909150610af390600160a060020a031615156115f4565b6001810154610b0c90600160a060020a031615156115f4565b8054610b2d9060a060020a9081900402600160a060020a03191615156115f4565b600354610b449060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610b7057fe5b906000526020600020906005020160005b50600160a060020a033316600090815260016020526040902054909550610bb1906108409089611718565b6115f4565b600160a060020a03331660009081526001602052604081208054899003905554610be4906108409089611718565b6115f4565b6000805488900390556003850154610c05906108409089611718565b6115f4565b60038501805488900390558454610c259060a060020a9081900402611723565b9350846002015484811515610c3657fe5b0484039250610c4d6108408885611856565b6115f4565b670de0b6b3a76400008784025b865460018801546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a039485166004820152338516602482015296909504604487018190529151919b50610ceb9592909316936323b872dd93606480850194919392918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b610cff8560040154866003015411156115f4565b60008054600160a060020a03331682526001602052604090912054610d26919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f7a84a15d8c233623337647a2fdf0314e2af7adee97face3b5f10f49fcc2e2bdb928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600060078265ffffffffffff16815481101515610da957fe5b906000526020600020906005020160005b506004015490505b919050565b610de561084033600035600160e060020a031916611540565b6115f4565b6007805465ffffffffffff8316908110610dfb57fe5b906000526020600020906005020160005b506000808255600182018054600160a060020a031916905560028201819055600382018190556004909101555b5b50565b600060078265ffffffffffff16815481101515610e5657fe5b906000526020600020906005020160005b5054600160a060020a031690505b919050565b6007545b90565b6000600060006000610ea761084033600035600160e060020a031916611540565b6115f4565b85600060078265ffffffffffff16815481101515610ec157fe5b906000526020600020906005020160005b508054909150610eec90600160a060020a031615156115f4565b6001810154610f0590600160a060020a031615156115f4565b8054610f269060a060020a9081900402600160a060020a03191615156115f4565b600354610f3d9060a060020a900460ff16156115f4565b6003805460a060020a60ff02191660a060020a1790556007805465ffffffffffff8a16908110610f6957fe5b906000526020600020906005020160005b50805460018201546040805160006020918201819052825160e060020a6323b872dd028152600160a060020a0333811660048301529485166024820152604481018e90529251959a506110079593909416936323b872dd936064808501949192918390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b845461101c9060a060020a9081900402611723565b935084600201548481151561102d57fe5b048401925061104c610840670de0b6b3a764000089611856565b6115f4565b8287670de0b6b3a76400000281151561106157fe5b600160a060020a033316600090815260016020526040902054919004965061109290610840908861187c565b6115f4565b600160a060020a0333166000908152600160205260408120805488019055546110c490610840908861187c565b6115f4565b600080548701905560038501546110e490610840908861187c565b6115f4565b60038501805487019081905560048601546111009111156115f4565b60008054600160a060020a03331682526001602052604090912054611127919011156115f4565b6040805165ffffffffffff8a168152602081018890528151600160a060020a033316927f9d8d20bc9c0bd5458165b7e07e9f93cd7ed8015434bf1df833834f26aac24479928290030190a25b6003805460a060020a60ff02191690555b5b50505b50505092915050565b600160a060020a0381166000908152600160205260409020545b919050565b6111ce61084033600035600160e060020a031916611540565b6115f4565b60038054600160a060020a031916600160a060020a0383811691909117918290556040519116907f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada490600090a25b5b50565b61123e61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561125657fe5b906000526020600020906005020160005b508054600160a060020a031660a060020a928390049092029190911790555b5b5050565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107b45780601f10610789576101008083540402835291602001916107b4565b820191906000526020600020905b81548152906001019060200180831161079757829003601f168201915b505050505081565b600061133961084033600035600160e060020a031916611540565b6115f4565b6003546008546040805160006020918201819052825160e060020a63b7009613028152600160a060020a038981166004830152308116602483015260e060020a909502600160e060020a03191660448201529251889588956113d29591169363b70096139360648084019492938390030190829087803b151561098e57fe5b60325a03f1151561099b57fe5b50506040515190506115f4565b6113dc858561188a565b92505b5b50505b92915050565b600060078265ffffffffffff1681548110151561140257fe5b906000526020600020906005020160005b506002015490505b919050565b600354600160a060020a031681565b61144d61084033600035600160e060020a031916611540565b6115f4565b8060078365ffffffffffff1681548110151561146557fe5b906000526020600020906005020160005b50600401555b5b5050565b600060078265ffffffffffff1681548110151561149a57fe5b906000526020600020906005020160005b5060010154600160a060020a031690505b919050565b600060078265ffffffffffff168154811015156114da57fe5b906000526020600020906005020160005b506003015490505b919050565b600454600160a060020a031681565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b670de0b6b3a764000081565b600354600090600160a060020a038481169116141561156157506001610821565b6003546040805160006020918201819052825160e060020a63b7009613028152600160a060020a0388811660048301523081166024830152600160e060020a0319881660448301529351939094169363b7009613936064808301949391928390030190829087803b15156115d157fe5b60325a03f115156115de57fe5b50506040515191506108219050565b5b92915050565b801515610e395760006000fd5b5b50565b600160a060020a03831660009081526001602052604081205461162b90839010156115f4565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461165f90839010156115f4565b600160a060020a03831660009081526001602052604090205461168b90610840908461187c565b6115f4565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b808210155b92915050565b60048054604080516000602091820181905282517fb47a2f10000000000000000000000000000000000000000000000000000000008152600160a060020a03198716958101959095529151919384938493600160a060020a039091169263b47a2f10926024808201939182900301818787803b151561179e57fe5b60325a03f115156117ab57fe5b50506040515192506117be9050826115f4565b60048054604080516000602091820181905282517fba22e562000000000000000000000000000000000000000000000000000000008152600160a060020a03198a16958101959095529151600160a060020a039093169363ba22e5629360248083019491928390030190829087803b151561183557fe5b60325a03f1151561184257fe5b5050604051519350839150505b5050919050565b6000828202831580611872575082848281151561186f57fe5b04145b91505b5092915050565b808201829010155b92915050565b600160a060020a0333166000908152600160205260408120546118b090839010156115f4565b600160a060020a0383166000908152600160205260409020546118dc90610840908461187c565b6115f4565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b81548183558181151161197957600502816005028360005260206000209182019101611979919061197f565b5b505050565b6108ec91905b808211156119bf576000808255600182018054600160a060020a031916905560028201819055600382018190556004820155600501611985565b5090565b905600a165627a7a72305820d4b7ace5d48400dcf710573350688573f8859418ae6e6c82ad2eed21aca1cd4200296060604052341561000c57fe5b6040516020806104ae83398101604052515b600160a060020a03331660009081526001602052604081208290558190555b505b6104608061004e6000396000f3006060604052361561005c5763ffffffff60e060020a600035041663095ea7b3811461005e57806318160ddd1461009157806323b872dd146100b357806370a08231146100ec578063a9059cbb1461011a578063dd62ed3e1461014d575bfe5b341561006657fe5b61007d600160a060020a0360043516602435610181565b604080519115158252519081900360200190f35b341561009957fe5b6100a16101ec565b60408051918252519081900360200190f35b34156100bb57fe5b61007d600160a060020a03600435811690602435166044356101f3565b604080519115158252519081900360200190f35b34156100f457fe5b6100a1600160a060020a0360043516610306565b60408051918252519081900360200190f35b341561012257fe5b61007d600160a060020a0360043516602435610325565b604080519115158252519081900360200190f35b341561015557fe5b6100a1600160a060020a03600435811690602435166103e8565b60408051918252519081900360200190f35b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060015b92915050565b6000545b90565b600160a060020a0383166000908152600160205260408120546102199083901015610415565b600160a060020a038085166000908152600260209081526040808320339094168352929052205461024d9083901015610415565b600160a060020a038316600090815260016020526040902054610279906102749084610426565b610415565b600160a060020a03808516600081815260026020908152604080832033861684528252808320805488900390558383526001825280832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b9392505050565b600160a060020a0381166000908152600160205260409020545b919050565b600160a060020a03331660009081526001602052604081205461034b9083901015610415565b600160a060020a038316600090815260016020526040902054610377906102749084610426565b610415565b600160a060020a03338116600081815260016020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060015b92915050565b600160a060020a038083166000908152600260209081526040808320938516835292905220545b92915050565b8015156104225760006000fd5b5b50565b808201829010155b929150505600a165627a7a72305820f319d8bbc52243d020b4d90121607421b82a6073f20bcc13fcdb5d2d56afbb8900296060604052341561000c57fe5b5b60ec8061001b6000396000f300606060405263ffffffff60e060020a600035041663e1f21c6781146020575bfe5b3415602757fe5b6042600160a060020a03600435811690602435166044356044565b005b82600160a060020a031663095ea7b383836000604051602001526040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b151560ab57fe5b60325a03f1151560b757fe5b5050505b5050505600a165627a7a72305820e49f0e2e8e84d374a7cba06e727879f93f0d8f7f57343a3adfb7c25bfe176a170029a165627a7a72305820a87635d309d0213d33e6ed5e672b2466ecfafab770fed1dce560ef2e9753ff1d0029"
  },
  "Vault": {
    "interface": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "who",
            "type": "address"
          },
          {
            "name": "how_much",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "type": "function"
      }
    ],
    "bytecode": "6060604052341561000c57fe5b5b60ec8061001b6000396000f300606060405263ffffffff60e060020a600035041663e1f21c6781146020575bfe5b3415602757fe5b6042600160a060020a03600435811690602435166044356044565b005b82600160a060020a031663095ea7b383836000604051602001526040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b151560ab57fe5b60325a03f1151560b757fe5b5050505b5050505600a165627a7a72305820e49f0e2e8e84d374a7cba06e727879f93f0d8f7f57343a3adfb7c25bfe176a170029"
  }
};

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapp['simplecoin'];
}
