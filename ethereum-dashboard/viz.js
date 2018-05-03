// NOTE: Need to compile with browserify viz.js -o main.js
var SolidityCoder = require("web3/lib/solidity/coder.js");

//var account = '0x4cf24bf15bfead008b22ea33b7c99a82326031a7'; // Pi
// Dev
var contractAddress = '0x98e560a9a18e5d7fbdf2c3d28213c3038ea0f85e';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8042"));
web3.eth.defaultAccount = '0xbB2c74738F8F8Ff04352E744e9480598359fF0c1'
var MyContract = web3.eth.contract(abiArray);
var applicationInterface = MyContract.at(contractAddress);



let [a, b] = applicationInterface.listAllObjectsOwned.call();

console.log(a);
console.log(b);

 
$('#label2').text(web3.eth.defaultAccount);

for (i = 0; i < 10; i++) {
	if(a[i] != 0)
		$('#objects').append('<tr><td>' + web3.toAscii(a[i]) + '</td><td>' + 'Yes </td><td>' + applicationInterface.getObjectPrice.call(web3.toAscii(a[i])) + '</td><td> Yes </td><td>' + applicationInterface.getObjectPph.call(web3.toAscii(a[i])) + '</td></tr>');
		$('#objNameRemove').append('<option value="' + web3.toAscii(a[i]) + '">' + web3.toAscii(a[i]) + '</option>')
}
// Get hold of contract instance


$(document).ready(function(){
    // Do stuff here, including _calling_ codeAddress(), but not _defining_ it!
	function addObject(){
	var name = web3.fromAscii(document.getElementById("objName").value, 32);
	var forSale = document.getElementById("forSale").value;
	var price = document.getElementById("price").value;
	var forRent = document.getElementById("forRent").value;
	var pph = document.getElementById("pph").value;
	
	applicationInterface.registerNewObject.sendTransaction(name, forSale, price, forRent, pph,{
            from:web3.eth.defaultAccount,
            gas:4000000},function (error, result){ //get callback from function which is your transaction key
                if(!error){
                    console.log(result);
                } else{
                    console.log(error);
                }
        });

	$('#objects').append('<tr><td>' + document.getElementById("objName").value + '</td><td>')
}	
	$("#form-submit").click(addObject);
});
// Setup filter to watch transactions



// Update labels every second

setInterval(function() {

  // Account balance in Ether
  var balanceWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber();
  var balance = web3.fromWei(balanceWei, 'ether');
  $('#label1').text(balance);
	
}, 1000);


