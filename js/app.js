const Web3 = require('web3');
//window.Web3 = require('web3');
const web3 = new Web3('https://rpc.ether1.org');
const CONTRACT_ADDRESS = '0x9e8daeD9AE38b3551BFD7d8907FeDeBad9cEbd99';
const CONTRACT_ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"contractWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"split","type":"uint256"},{"name":"nodeType","type":"string"},{"name":"fee","type":"uint256"}],"name":"createLendingContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"removeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"side","type":"string"}],"name":"resetContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"calculateContractCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"},{"name":"index","type":"uint256"},{"name":"side","type":"string"}],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenderCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lendingContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lendingContractCountMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lendingContractMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByBorrower","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByLender","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minOriginationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
var contract;
var loginAddress;
var loginPrivateKey;
//var loginAddress = "0x1f756cF3E5bee774B3fC7E271f324a6A9B343570";

window.initiateLogin = function(){
  $('#modalLogin').modal();
  $(document).on('click', '#loginModalButton', function() {
    if(document.getElementById("private-key") !== null) {
      var privateKey = document.getElementById("private-key").value;
      getLoginData(privateKey);
      $('#modalLogin').modal('hide');
    } else {
      console.log("No Private Key Detected - Please Login Correctly");
    }
  });
}

async function callContract(){
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const totalContractCount = await contract.methods.lendingContractCount().call()
  console.log("Total Contract Count: " + totalContractCount);

  callAvailableData(await contract, await totalContractCount);
  $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
  $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
  $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Borrower Data Found</div></div>');
}

async function refreshContractData(){

  const totalContractCount = await contract.methods.lendingContractCount().call()
  console.log("Total Contract Count: " + totalContractCount);

  callAvailableData(contract, await totalContractCount);
  callLenderData();
  callBorrowerData();
}

function getLoginData(privateKey) {
  loginPrivateKey = '0x' + privateKey;
  let account = web3.eth.accounts.privateKeyToAccount(loginPrivateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  loginAddress = account.address;

  console.log("Login Private Key: " + loginPrivateKey + " Login Address: " + loginAddress);

  $("#add-contract-button").css('display', 'block');
  callLenderData();
  callBorrowerData();
}

async function callAvailableData(contract, totalContractCount) {
  if(totalContractCount > 0) {
    $('#available-data-table').children().not('#available-header1, #available-header2').remove();
    for (var i = 0; i < totalContractCount; i++) {
      const contractData = await contract.methods.lendingContractCountMapping(i).call({})
      //const availability = true;
      if(contractData.available == true) {
        const contractAddress = contractData.lendingContractAddress;
        const contractNodeType = contractData.nodeType;
        const contractLenderAddress = contractData.lenderAddress;
        const contractLenderSplit = contractData.lenderSplit;
        const contractCollateralAmount = await contract.methods.getContractCollateralAmount(i).call({})
        const contractAvailability = "Yes"
        console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
        $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;">' + contractLenderAddress + '</div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"><button type="button" class="btn btn-success">Select</button></div></div>');
      }
    }
  } else {
    $('#available-data-table').children().not('#available-header1, #available-header2').remove();
    $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Contract Data Found</div></div>');
  }
}

async function callLenderData() {
  const lenderContractCount = await contract.methods.lenderCountMapping(loginAddress).call()
  console.log("Lender Contract Count: " + lenderContractCount);

  if(lenderContractCount > 0) {
    $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
    for (var i = 0; i < lenderContractCount; i++) {
      const lenderContractData = await contract.methods.lendingContractsMappingByLender(loginAddress, i).call({})
      var contractAvailability;
      if(lenderContractData.available == true) {
        contractAvailability = "Yes"
      } else {
        contractAvailability = "No"
      }
      const contractAddress = lenderContractData.lendingContractAddress;
      const contractNodeType = lenderContractData.nodeType;
      const contractBorrowerAddress = lenderContractData.borrowerAddress;
      const contractLenderSplit = lenderContractData.lenderSplit;
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(loginAddress, i).call({})

      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Borrower Address: " + contractBorrowerAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;">' + contractBorrowerAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning">Reset</button></div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-danger">Remove</button></div></div>');
    }
  } else {
    $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
    $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  }
}

async function callBorrowerData() {
  const borrowerContractCount = await contract.methods.borrowerCountMapping(loginAddress).call()
  console.log("Borrower Contract Count: " + borrowerContractCount);

  if(borrowerContractCount > 0) {
    $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
    for (var i = 0; i < borrowerContractCount; i++) {
      const borrowerContractData = await contract.methods.borrowerContractsMappingByLender(loginAddress, i).call({});
      const contractAddress = borrowerContractData.lendingContractAddress;
      const contractNodeType = borrowerContractData.nodeType;
      const contractLenderAddress = borrowerContractData.lenderAddress;
      const contractLenderSplit = borrowerContractData.lenderSplit;
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(loginAddress, i).call({})

      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;">' + contractLenderAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning">Abandon</button></div></div>');
    }
  } else {
    $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
    $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Borrower Data Found</div></div>');
  }
}

window.newLendingContractSetup = function(){
  $('#modalNewContractSetup').modal();
  $(document).on('click', '#submitNewContractButton', function() {
    $('#modalNewContractSetup').modal('hide');
    newLendingContract();
  });
};

async function newLendingContract() {
  var split = document.getElementById("split-value-selection").value;
  var nodeType = document.getElementById("node-type-selection").value;
  var fee = document.getElementById("fee-selection").value;
  const nodeCollateralAmount = getCollateralAmount(nodeType);
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    value: Number(nodeCollateralAmount),
    gas: 6000000,
    data: contract.methods.createLendingContract(split, nodeType, fee).encodeABI()
  };

  web3.eth.accounts.signTransaction(tx, loginPrivateKey)
    .then(function(signedTransactionData) {
      web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction, function(error, result) {
        if(!error) {
          if(result) {
            $('#minedBlockTrackerModal').modal();
            waitForReceipt(result, function(receipt) {
              console.log("Tx Has Been Mined: " + receipt);
              $(".status").html("TX Has Been Mined");
              $('#minedBlockTrackerModal').modal('hide');
              refreshContractData();
            });
          } else {
            console.log("There Was A Problem With TX");
            $(".status").html("There Was A Problem With TX");
          }
        } else {
          console.error(error);
        }
      });
    });
}

async function resetLendingContract() {
  var split = document.getElementById("split-value-selection").value;
  var nodeType = document.getElementById("node-type-selection").value;
  var fee = document.getElementById("fee-selection").value;
  const nodeCollateralAmount = getCollateralAmount(nodeType);
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    value: Number(nodeCollateralAmount),
    gas: 6000000,
    data: contract.methods.createLendingContract(split, nodeType, fee).encodeABI()
  };

  web3.eth.accounts.signTransaction(tx, loginPrivateKey)
    .then(function(signedTransactionData) {
      web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction, function(error, result) {
        if(!error) {
          if(result) {
            $('#minedBlockTrackerModal').modal();
            waitForReceipt(result, function(receipt) {
              console.log("Tx Has Been Mined: " + receipt);
              $(".status").html("TX Has Been Mined");
              $('#minedBlockTrackerModal').modal('hide');
            });
          } else {
            console.log("There Was A Problem With TX");
            $(".status").html("There Was A Problem With TX");
          }
        } else {
          console.error(error);
        }
      });
    });
}

function waitForReceipt(hash, cb) {
  web3.eth.getTransactionReceipt(hash, function(err, receipt) {
    console.log("Waiting For TX Confirmation");
    $(".status").html("Waiting For TX Confirmation");
    web3.eth.getBlock('latest', function(e, res) {
      if (!e) {}
    });
    if (err) {
      error(err);
    }
    if (receipt !== null) {
      console.log("TX Has Been Mined");
      $(".status").html("TX Has Been Mined");
      console.log(receipt);
      if (cb) {
        cb(receipt);
      }
    } else {
      window.setTimeout(function() {
        waitForReceipt(hash, cb);
      }, 5000);
    }
  });
}

function getCollateralAmount(nodeType) {
  if(nodeType == "GN") {
    //return 30000000000000000000000;
    return 3000000000000000000;
  } else if(nodeType == "MN") {
    //return 15000000000000000000000;
    return 2000000000000000000;
  } else if(nodeType == "SN") {
    //return 5000000000000000000000;
    return 1000000000000000000;
  }
}

callContract();
