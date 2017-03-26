import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Contract: administrated
adminContractAddress = "0x96f657996a660bcb3fded1e75366c4341762d94f" //Get from https://testnet.etherscan.io/address/[Block]
adminABIArray =  [{"constant":true,"inputs":[],"name":"will","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"willText","type":"string"}],"name":"changeWill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"patient","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}] //Called interface
adminData = "6060604052606060405190810160405280603381526020017f54686973206973207468652074657374656d6f6e79206f726967696e616c6c7981526020017f20637265617465642062792050617469656e7400000000000000000000000000815250600190805190602001906100769291906100c7565b50341561007f57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b61016c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010857805160ff1916838001178555610136565b82800160010185558215610136579182015b8281111561013557825182559160200191906001019061011a565b5b5090506101439190610147565b5090565b61016991905b8082111561016557600081600090555060010161014d565b5090565b90565b6104888061017b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063363210011461005c578063625c997d146100f55780638f2839701461014f578063bd96bd2014610185575bfe5b341561006457fe5b61006c6101d7565b60405180806020018281038252838181518152602001915080519060200190808383600083146100bb575b8051825260208311156100bb57602082019150602081019050602083039250610097565b505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100fd57fe5b61014d600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610275565b005b341561015757fe5b610183600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102ee565b005b341561018d57fe5b610195610391565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561026d5780601f106102425761010080835404028352916020019161026d565b820191906000526020600020905b81548152906001019060200180831161025057829003601f168201915b505050505081565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102d25760006000fd5b80600190805190602001906102e89291906103b7565b505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561034b5760006000fd5b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106103f857805160ff1916838001178555610426565b82800160010185558215610426579182015b8281111561042557825182559160200191906001019061040a565b5b5090506104339190610437565b5090565b61045991905b8082111561045557600081600090555060010161043d565b5090565b905600a165627a7a723058207b963c086f1f84469a03cd814c4891467355d29030cd34a2222f83e059b292f80029" //Called byteCode
myAdmin = web3.eth.contract(adminABIArray).at(adminContractAddress);
myAccount = "";
var template = Template.instance();

Template.Account.helpers({
  account() {
  	var template = Template.instance();
	myAdmin.patient(function(error, result){
	    if(!error) {
	        TemplateVar.set(template, "account", result);
	    	myAccount = result;
	    } else 
	        console.error(error);
	})
  },  
});

Template.Account.events({
 	'click .patient': function(){
		nameReg = "0xf9C8A7A6Ebf263A668605319f1B73851d5DB4322";
		myAdmin.changeAdmin(nameReg, {from: web3.eth.coinbase, gas: 1000000} ,function(error, result){
	    	if(!error)
	        	console.log(result);
	    	else {
	        	console.error(error);
	        	alert("This is not the owner, you do not have the permission");
	        }

		}) 
    },
  	'click .person1': function(){
     	nameReg = "0x5F9Eb74603e38dA36A48ECbB470457cF7BF2b324";
		myAdmin.changeAdmin(nameReg, {from: web3.eth.coinbase, gas: 1000000} ,function(error, result){
	    	if(!error)
	        	console.log(result);
	    	else {
	        	console.error(error);
	        	alert("This is not the owner, you do not have the permission");
	        }
		}) 
    }, 
  	'click .person2': function(){
    	nameReg = "0xac24Bc1267aa3B09eEC3b4d0BB21734520Dea65f";
		myAdmin.changeAdmin(nameReg, {from: web3.eth.coinbase, gas: 1000000} ,function(error, result){
	    	if(!error)
	        	console.log(result);
	    	else {
	        	console.error(error);
	        	alert("This is not the owner, you do not have the permission");
	        }
		}) 
    }
});

Template.Will.events({
	'click .viewWill': function(){
     	console.log("viewWill"); 
     	isWillVisible();
    }, 
  	'click .alterWill': function(){
    	myAdmin.patient(function(error, result){
		    if(!error) {
		    	myAccount = result;
		    	alterWill();
		    } else {
		        console.log("Permission denied");
		        document.getElementById("textareaWill").value = "Permission denied";
		        console.error(error);
		    }
		})
    }
});

function alterWill() {
	willText = document.getElementById("textareaWill").value;
	myAdmin.changeWill(willText, {from: web3.eth.coinbase, gas: 1000000} ,function(error, result){
		if(!error) document.getElementById("textareaWill").value = result;
		else console.error(error);
	})
}

function isWillVisible() {
	myAdmin.will(function(error, result){
	    if(!error) {
	        if (myAccount == "0xf9C8A7A6Ebf263A668605319f1B73851d5DB4322") {
	    		console.log("The will is not visible");
	    		document.getElementById("textareaWill").value = "The will is not visible";
	    	} else {
	    		console.log(result);
	    		document.getElementById("textareaWill").value = result;
	        }
	    } else {
	        console.error(error);
		}
	})
}

