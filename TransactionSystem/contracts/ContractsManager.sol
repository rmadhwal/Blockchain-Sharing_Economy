pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

    /**
    * Script for object lending contracts
    */

contract ContractsManagerEnabled {
    address ContractsManager;

    function setContractsManagerAddress(address contractsManagerAddr) returns (bool result){
        // Once the ContractsManager address is set, don't allow it to be set again, except by the
        // ContractsManager contract itself.
        if(ContractsManager != 0x0 && msg.sender != ContractsManager){
            return false;
        }
        ContractsManager = contractsManagerAddr;
        return true;
    }

    // Makes it so that ContractsManager is the only contract that may kill it.
    function remove(){
        if(msg.sender == ContractsManager){
            selfdestruct(ContractsManager);
        }
    }

}

// The Doug contract.
contract ContractsManager {

    address owner;

    // This is where we keep all the contracts.
    mapping (bytes32 => address) public contracts;

    modifier onlyOwner { //a modifier to reduce code replication
        if (msg.sender == owner) // this ensures that only the owner can access the function
            _;
    }
    
    // Constructor
    function ContractsManager(){
        owner = msg.sender;
    }

    // Add a new contract to ContractsManager. This will overwrite an existing contract.
    function addContract(bytes32 name, address addr) onlyOwner returns (bool result) {
        ContractsManagerEnabled cme = ContractsManagerEnabled(addr);
        // Don't add the contract if this does not work.
        if(!cme.setContractsManagerAddress(address(this))) {
            return false;
        }
        contracts[name] = addr;
        return true;
    }

    // Remove a contract from setContractsManagerAddress.
    function removeContract(bytes32 name) onlyOwner returns (bool result) {
        if (contracts[name] == 0x0){
            return false;
        }
        contracts[name] = 0x0;
        return true;
    }

    function remove() onlyOwner {
        address ai = contracts["applicationinterface"];
        address usersdb = contracts["usersdb"];
        address objectsdb = contracts["objectsdb"];

        // Remove everything.
        if(ai != 0x0){ ContractsManagerEnabled(ai).remove(); }
        if(usersdb != 0x0){ ContractsManagerEnabled(usersdb).remove(); }
        if(objectsdb != 0x0){ ContractsManagerEnabled(objectsdb).remove(); }
        selfdestruct(owner);
    }

}

// Interface for getting contracts from ContractsManager
contract ContractProvider {
    function contracts(bytes32 name) returns (address addr) {}
}

contract ApplicationInterface is ContractsManagerEnabled {

	event rentingEvent(bytes32 objName, bytes32 renterEmail, bytes32 ownerEmail, uint userHours);
	event sellingEvent(bytes32 objName, bytes32 newOwnerEmail, bytes32 oldOwnerEmail);
	event newUserRegistered(bytes32 email);
	event newObjectAdded(bytes32 email, bytes32 objName);

	function registerNewUser(bytes32 emailAddress) returns (bool res) {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");
		if(UsersDB(usersdb).addUser(msg.sender, emailAddress)) {
			newUserRegistered(emailAddress);
			return true;
		}
		else {
			return false;
		}		
	}

	function deleteUser() returns (bool res) {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");	
		if(UsersDB(usersdb).removeUser(msg.sender)) {
			return true;
		}
		else {
			return false;
		}
	}

	function registerNewObject(bytes32 objName, bool forSale, uint price, bool forRent, uint pph) returns (bool res) {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");	
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		if(UsersDB(usersdb).userRegistered(msg.sender)) {
			if(ObjectsDB(objectsdb).addObject(msg.sender, forSale, price, forRent, pph, objName)) {
				newObjectAdded(UsersDB(usersdb).getUserEmailAddress(msg.sender), objName);
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	function deleteObject(bytes32 objName) returns (bool res) {
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		if(ObjectsDB(objectsdb).getObjectOwner(objName) == msg.sender) {
			if(ObjectsDB(objectsdb).removeObject(objName)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	function buyObject(bytes32 objName) public payable returns (bool res)  {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");	
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		if(UsersDB(usersdb).userRegistered(msg.sender) && ObjectsDB(objectsdb).getObjectSaleStatus(objName) && ObjectsDB(objectsdb).getObjectPrice(objName) <= msg.value) {
			ObjectsDB(objectsdb).getObjectOwner(objName).transfer(msg.value);
			ObjectsDB(objectsdb).modifyOwner(msg.sender, objName);
			sellingEvent(objName, UsersDB(usersdb).getUserEmailAddress(msg.sender), UsersDB(usersdb).getUserEmailAddress(ObjectsDB(objectsdb).getObjectOwner(objName)));
			return true;
		}
		else {
			return false;
		}
	}
		
	function rentObject(bytes32 objName) public payable returns (bool res) {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");	
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		if(UsersDB(usersdb).userRegistered(msg.sender) && ObjectsDB(objectsdb).getObjectRentStatus(objName)) {
			ObjectsDB(objectsdb).getObjectOwner(objName).transfer(msg.value);
			rentingEvent(objName, UsersDB(usersdb).getUserEmailAddress(msg.sender), UsersDB(usersdb).getUserEmailAddress(ObjectsDB(objectsdb).getObjectOwner(objName)), msg.value/ObjectsDB(objectsdb).getObjectPph(objName));
			return true;
		}
		else {
			return false;
		}
	}

	function listAllObjectsOwned() public returns (bytes32[10] memory objArray, bool res) {
		address usersdb = ContractProvider(ContractsManager).contracts("usersdb");	
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		bytes32[10] memory newObjArray;
		bool result;
		if(UsersDB(usersdb).userRegistered(msg.sender)) {
			(newObjArray, result) = ObjectsDB(objectsdb).returnAllObjectsOwnedByOwner(msg.sender);
			return(newObjArray, result);
		}
		else {
			return(newObjArray, false);
		}
	}

	function getObjectPrice(bytes32 objName) returns (uint price) {
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		return ObjectsDB(objectsdb).getObjectPrice(objName);
	}

	function getObjectPph(bytes32 objName) returns (uint pph) {
		address objectsdb = ContractProvider(ContractsManager).contracts("objectsdb");
		return ObjectsDB(objectsdb).getObjectPph(objName);
	}
}

contract ApplicationInterfaceEnabled is ContractsManagerEnabled {

    // Check if the call is properly permissioned
    function isRightPermission() constant returns (bool) {
        if(ContractsManager != 0x0){
            address ownerAddress = ContractProvider(ContractsManager).contracts("applicationinterface");
            return msg.sender == ownerAddress;
        }
        return false;
    }
}

contract ObjectsDB is ApplicationInterfaceEnabled {

	bytes32[] objectsIndex = new bytes32[](100);
	uint256 objectsInDB = 0;

	struct objectData {
		address objOwner;
		bool forSale;
		uint price;
		bool forRent;
		uint pph;
	}	

	mapping(bytes32 => objectData) objects;

	//Adds new object 
	function addObject(address objOwner, bool forSale, uint price, bool forRent, uint pph, bytes32 objName) returns (bool res) {
		if(!isRightPermission()  || objName == ""  || objects[objName].objOwner != address(0)) {
			return false;
		}
		else {
			objects[objName].objOwner= objOwner;
			objects[objName].forSale = forSale;
			objects[objName].price = price;
			objects[objName].forRent = forRent;
			objects[objName].pph = pph;
			objectsIndex[objectsInDB] = objName;
			objectsInDB++;
			return true;
		}
	}
	
	//Modifier functions
	function modifyOwner(address newObjOwner, bytes32 objName) returns (bool res) {
		if(isRightPermission()) {
			objects[objName].objOwner = newObjOwner; 
			return true;
		}
		else {
			return false;
		}
	}

	function modifySaleStatus(bool newForSale, bytes32 objName) returns (bool res) {
		if(isRightPermission()) {
			objects[objName].forSale = newForSale; 
			return true;
		}
		else {
			return false;
		}
	}

	function modifyPrice(uint newPrice, bytes32 objName) returns (bool res) {
		if(isRightPermission()) {
			objects[objName].price = newPrice; 
			return true;
		}
		else {
			return false;
		}
	}

	function modifyRentStatus(bool newForRent, bytes32 objName) returns (bool res) {
		if(isRightPermission()) {
			objects[objName].forRent = newForRent; 
			return true;
		}
		else {
			return false;
		}
	}
	
	function modifyPPH(uint newPph, bytes32 objName) returns (bool res) {
		if(isRightPermission()) {
			objects[objName].pph = newPph; 
			return true;
		}
		else {
			return false;
		}
	}

	//Removes object
	function removeObject(bytes32 objName) returns (bool res) {
		if(!isRightPermission() || objects[objName].objOwner == address(0) || objName == "") {
			return false;
		}
		else {
			delete objects[objName];
			return true;
		}
	}

	//Gets Objects data if it exists
	function getObjectOwner(bytes32 objName) returns (address objOwner) {
		if(isRightPermission() && objName != "" && objects[objName].objOwner != address(0)) {
			return objects[objName].objOwner;
		}
		else {
			return address(0);
		} 
	}

	function getObjectSaleStatus(bytes32 objName) returns (bool forSale) {
		if(isRightPermission() && objName != "" && objects[objName].objOwner != address(0)) {
			return objects[objName].forSale;
		}
		else {
			return false;
		} 
	}

	function getObjectPrice(bytes32 objName) returns (uint price) {
		if(isRightPermission() && objName != "" && objects[objName].objOwner != address(0)) {
			return objects[objName].price;
		}
		else {
			return 0;
		} 
	}

	function getObjectRentStatus(bytes32 objName) returns (bool forRent) {
		if(isRightPermission() && objName != "" && objects[objName].objOwner != address(0)) {
			return objects[objName].forRent;
		}
		else {
			return false;
		} 
	}

	function getObjectPph(bytes32 objName) returns (uint pph) {
		if(isRightPermission() && objName != "" && objects[objName].objOwner != address(0)) {
			return objects[objName].pph;
		}
		else {
			return 0;
		} 
	}

	function returnAllObjectsOwnedByOwner(address objOwner) returns (bytes32[10] memory objArray, bool res) {
		if(isRightPermission() && objOwner != address(0)) {
			uint256 i=0;
			uint256 j=0;
				bytes32[10] memory newObjArray;
				for(i;i<objectsInDB;i++) {
					if(objects[objectsIndex[i]].objOwner == objOwner) {
						newObjArray[j] = objectsIndex[i];
						j++;
					}
				}
				return (newObjArray, true);
		}
		else {
			return (newObjArray, false);
		}
	}

}


contract UsersDB is ApplicationInterfaceEnabled {

	struct userData {
		bool registered;
		bytes32 userEmailAddress;
	}	

	mapping(address => userData) users;
	
	//Add new user
	function addUser(address userAddress, bytes32 userEmailAddress) returns (bool res) {
		if(!isRightPermission()  ||  users[userAddress].registered || userEmailAddress=="") {
			return false;
		}
		else {
			users[userAddress].registered = true;
			users[userAddress].userEmailAddress = userEmailAddress; 
			return true;
		}
	}

	//Modifier function
	function modifyEmailAddress(address userAddress, bytes32 newUserEmailAddress) returns (bool res) {
		if(!isRightPermission() || !users[userAddress].registered || newUserEmailAddress=="" ) {
			return false;
		}
		else {
			users[userAddress].userEmailAddress = newUserEmailAddress;
			return true;
		}
	}

	function removeUser(address userAddress) returns (bool res) {
		if(!isRightPermission() || !users[userAddress].registered) {
			return false;
		}
		else {
			delete users[userAddress];
			return true;
		}
	}

	function getUserEmailAddress(address userAddress) returns (bytes32 emailAddress) {
		if(!isRightPermission() || !users[userAddress].registered) {
			return "";
		}
		else {
			return users[userAddress].userEmailAddress;
		}
	}

	function userRegistered(address userAddress) returns (bool res) {
		if(!isRightPermission() || !users[userAddress].registered) {
			return false;
		}
		else {
			return true;
		}
	}
}

