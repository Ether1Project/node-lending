const Web3 = require('web3');
//window.Web3 = require('web3');
const web3 = new Web3('https://rpc.ether1.org');
const CONTRACT_ADDRESS = '0xa5c9108b2d8bE472B9eE8D624d39fDbccA354875';
const CONTRACT_ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"newLender","type":"address"}],"name":"contractUpdateLender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"threshold","type":"uint256"}],"name":"contractUpdateThreshold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"contractWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"split","type":"uint256"},{"name":"nodeType","type":"string"},{"name":"fee","type":"uint256"}],"name":"createLendingContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"removeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"calculateContractCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"borrower","type":"address"}],"name":"getBorrowerContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractAvailability","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractAvailability","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractBorrowerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractBorrowerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractLenderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractLenderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractLenderSplit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractLenderSplit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lenderAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getContractNodeType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getContractNodeType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"lender","type":"address"}],"name":"getLenderContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenderCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lendingContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lendingContractCountMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lendingContractMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByBorrower","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByLender","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
var contract;
var loginAddress;
var loginPrivateKey;
//var loginAddress = "0x1f756cF3E5bee774B3fC7E271f324a6A9B343570";

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

async function callContract(){

  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const totalContractCount = await contract.methods.getTotalContractCount().call()
  console.log("Total Contract Count: " + totalContractCount);

  callAvailableData(await contract, await totalContractCount);
}

function getLoginData(privateKey) {
  loginPrivateKey = '0x' + privateKey;
  let account = web3.eth.accounts.privateKeyToAccount(loginPrivateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  loginAddress = account.address;
  //For Testing
  //loginAddress = "0x1f756cF3E5bee774B3fC7E271f324a6A9B343570";

  console.log("Login Private Key: " + loginPrivateKey + " Login Address: " + loginAddress);

  callLenderData();
  callBorrowerData();
}

async function callAvailableData(contract, totalContractCount) {
  if(totalContractCount > 0) {
    for (var i = 0; i < totalContractCount; i++) {
      const availability = await contract.methods.getContractAvailability(i).call({})
      //const availability = true;
      if(availability == true) {
        const contractAddress = await contract.methods.getContractAddress(i).call({})
        const contractNodeType = await contract.methods.getContractNodeType(i).call({})
        const contractLenderAddress = await contract.methods.getContractLenderAddress(i).call({})
        const contractLenderSplit = await contract.methods.getContractLenderSplit(i).call({})
        const contractCollateralAmount = await contract.methods.getContractCollateralAmount(i).call({})
        const contractAvailability = "Yes"
        console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
        $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;">' + contractLenderAddress + '</div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"><button type="button" class="btn btn-success">Select</button></div></div>');
      }
    }
  } else {
    $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  }
}

async function callLenderData() {
  const lenderContractCount = await contract.methods.getLenderContractCount(loginAddress).call()
  console.log("Lender Contract Count: " + lenderContractCount);

  if(lenderContractCount > 0) {
    for (var i = 0; i < lenderContractCount; i++) {
      const availability = await contract.methods.getContractAvailability(loginAddress, i).call({})

      var contractAvailability;

      if(availability == true) {
        contractAvailability = "Yes"
      } else {
        contractAvailability = "No"
      }
      const contractAddress = await contract.methods.getContractAddress(loginAddress, i).call({})
      const contractNodeType = await contract.methods.getContractNodeType(loginAddress, i).call({})
      const contractBorrowerAddress = await contract.methods.getContractBorrowerAddress(loginAddress, i).call({})
      const contractLenderSplit = await contract.methods.getContractLenderSplit(loginAddress, i).call({})
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(loginAddress, i).call({})

      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Borrower Address: " + contractBorrowerAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;">' + contractBorrowerAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning">Reset</button></div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-danger">Remove</button></div></div>');
    }
  } else {
    $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  }
}

async function callBorrowerData() {
  const borrowerContractCount = await contract.methods.getBorrowerContractCount(loginAddress).call()
  console.log("Borrower Contract Count: " + borrowerContractCount);

  if(borrowerContractCount > 0) {
    for (var i = 0; i < borrowerContractCount; i++) {
      const contractAddress = await contract.methods.getContractAddress(loginAddress, i).call({})
      const contractNodeType = await contract.methods.getContractNodeType(loginAddress, i).call({})
      const contractLenderAddress = await contract.methods.getContractLenderAddress(loginAddress, i).call({})
      const contractLenderSplit = await contract.methods.getContractLenderSplit(loginAddress, i).call({})
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(loginAddress, i).call({})

      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;">' + contractLenderAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning">Abandon</button></div></div>');
    }
  } else {
    $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
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
    console.log("Waiting For TX Confirmation...");
    $(".status").html("Waiting For TX Confirmation...");
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
