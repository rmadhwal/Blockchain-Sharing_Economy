// NOTE: Need to compile with browserify viz.js -o main.js
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

var SolidityCoder = require("web3/lib/solidity/coder.js");
Web3 = require('web3')
//var account = '0x4cf24bf15bfead008b22ea33b7c99a82326031a7'; // Pi
// Dev
var contractAddress = '0x4c7a66534dc0cd55e4b18573c3a0c0dc47fc37b6';
var PythonShell = require('python-shell');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8042"));
web3.eth.defaultAccount = '0xbB2c74738F8F8Ff04352E744e9480598359fF0c1'
var MyContract = web3.eth.contract(abiArray);
var applicationInterface = MyContract.at(contractAddress);

var currentBlock = web3.eth.blockNumber;

var myEvent = applicationInterface.rentingEvent({},{fromBlock: currentBlock, toBlock: 'latest'});
myEvent.watch(function(error, result){
		        var renterEmail = web3.toAscii(arguments[1].args.renterEmail).replace(/\u0000/g, '');
			console.log(renterEmail);
		 	var options = {
			  mode: 'text',
	    		pythonOptions: ['-u'],
  			scriptPath: '/home/egdelw0nk/EthereumResources/Projects/EthereumScript',
  			args: [renterEmail]
			};  
			PythonShell.run('OTPtest.py', options, function (err, results) {
			       console.log(err);
		       		console.log(results);
		 	});		
			    });
