var ContractsManager = artifacts.require("ContractsManager");
var ContractsManagerEnabled = artifacts.require("ContractsManagerEnabled");
var ApplicationInterfaceEnabled = artifacts.require("ApplicationInterfaceEnabled");
var ContractProvider = artifacts.require("ContractProvider");
var ApplicationInterface = artifacts.require("ApplicationInterface");
var ObjectsDB = artifacts.require("ObjectsDB");
var UsersDB = artifacts.require("UsersDB");

module.exports = function(deployer) {
  deployer.deploy(ContractsManager).then( ()=> deployer.deploy(ContractsManagerEnabled).then( ()=> deployer.deploy(ApplicationInterfaceEnabled).then( ()=> deployer.deploy(ContractProvider).then( ()=> deployer.deploy(ApplicationInterface).then( ()=> deployer.deploy(ObjectsDB).then( ()=> deployer.deploy(UsersDB) ) ) ) ) ) );
};
