var abiArray =[
    {
      "constant": false,
      "inputs": [],
      "name": "deleteUser",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "getObjectPrice",
      "outputs": [
        {
          "name": "price",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "getObjectPph",
      "outputs": [
        {
          "name": "pph",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "buyObject",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "deleteObject",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "emailAddress",
          "type": "bytes32"
        }
      ],
      "name": "registerNewUser",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "rentObject",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "listAllObjectsOwned",
      "outputs": [
        {
          "name": "objArray",
          "type": "bytes32[10]"
        },
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "objName",
          "type": "bytes32"
        },
        {
          "name": "forSale",
          "type": "bool"
        },
        {
          "name": "price",
          "type": "uint256"
        },
        {
          "name": "forRent",
          "type": "bool"
        },
        {
          "name": "pph",
          "type": "uint256"
        }
      ],
      "name": "registerNewObject",
      "outputs": [
        {
          "name": "res",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "objName",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "renterEmail",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "ownerEmail",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "userHours",
          "type": "uint256"
        }
      ],
      "name": "rentingEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "objName",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "newOwnerEmail",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "oldOwnerEmail",
          "type": "bytes32"
        }
      ],
      "name": "sellingEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "email",
          "type": "bytes32"
        }
      ],
      "name": "newUserRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "email",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "objName",
          "type": "bytes32"
        }
      ],
      "name": "newObjectAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "contractsManagerAddr",
          "type": "address"
        }
      ],
      "name": "setContractsManagerAddress",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "remove",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
