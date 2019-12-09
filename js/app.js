const Web3 = require('web3');
const web3 = new Web3('https://rpc.ether1.org');
const CONTRACT_ADDRESS = '0x6Fd4b029afbd499366CC688aDAdfD0DDCe67dbcF';
const CONTRACT_ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"split","type":"uint256"},{"name":"nodeType","type":"string"},{"name":"fee","type":"uint256"}],"name":"createLendingContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"removeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"side","type":"string"}],"name":"resetContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"rewardDispersals","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"calculateContractCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"},{"name":"index","type":"uint256"},{"name":"side","type":"string"}],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenderCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lendingContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lendingContractCountMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lendingContractMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByBorrower","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByLender","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minOriginationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
var contract;
var loginAddress;
var loginPrivateKey;
var loggedInFlag = false;
var contractDataArray = [];

$(document).on('click', '#help-button', function() {
  $('#helpModal').modal();
});

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
  if(loggedInFlag) {updateAccountBalance(loginAddress);}
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
  loggedInFlag = true;
  console.log("Login Private Key: " + loginPrivateKey + " Login Address: " + loginAddress);
  updateAccountBalance(loginAddress);

  $("#add-contract-button").css('display', 'block');
  callLenderData();
  callBorrowerData();
}

async function updateAccountBalance(loginAddress) {
  web3.eth.getBalance(loginAddress).then(
    function(response) {
      var balance = Number(response / 1000000000000000000).toFixed(2);
      $('#login-account').text(loginAddress + "  Balance: " + balance);
      console.log(loginAddress + "  Balance: " + response);
    }
  );
}

async function callAvailableData(contract, totalContractCount) {
  if(totalContractCount > 0) {
    $('#available-data-table').children().not('#available-header1, #available-header2').remove();
    var data = false;
    var totalLending = 0;
    var totalAvailable = 0;
    for (var i = 0; i < totalContractCount; i++) {
      const contractData = await contract.methods.lendingContractCountMapping(i).call({})
      contractDataArray.push(contractData); //Save contract data for sorting
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(contractData.lendingContractAddress).call({})
      totalLending += Number(contractCollateralAmount);
      if(contractData.available == true) {
        totalAvailable += Number(contractCollateralAmount);
        data = true;
        const contractAddress = contractData.lendingContractAddress;
        const contractNodeType = getNodeTypeString(contractData.nodeType);
        const contractLenderAddress = contractData.lenderAddress;
        const contractLenderSplit = contractData.lenderSplit;
        const contractLenderFee = contractData.originationFee;
        var contractAvailability;
        if(contractData.available == true) {
          contractAvailability = "Yes"
        } else {
          contractAvailability = "No"
        }
        console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
        $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Lender Fee">' + contractLenderFee + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;">' + contractLenderAddress + '</div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"><button type="button" class="btn btn-success" onclick="window.selectContractSetup(\'' + contractAddress + '\');">Select</button></div></div>');
      }
    }
    var totalLendingString = (totalLending / 1000000000000000000).toFixed(2);
    var totalAvailableString = (totalAvailable / 1000000000000000000).toFixed(2);
    console.log("Total Collateral in Lending System: ", totalLendingString);
    console.log("Total Collateral in Available Contracts: ", totalAvailableString);
    $('#total-lending').text("Total Collateral Lent: " + totalLendingString + " ETHO");
    $('#total-available').text("Total Collateral Available: " + totalAvailableString + " ETHO");
  }
  if(!data) {
    $('#available-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Contract Data Found</div></div>');
  }
}

function sortContractData(sortItem) {
  function compareString(a, b) {
    var itemA;
    var itemB;
    if(sortItem == "nodeType") {
      itemA = a.nodeType.toUpperCase();
      itemB = b.nodeType.toUpperCase();
    } else if(sortItem == "lenderAddress") {
      itemA = a.lenderAddress.toUpperCase();
      itemB = b.lenderAddress.toUpperCase();
    }
    let comparison = 0;
    if(itemA > itemB) {
      comparison = 1;
    } else if(itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }

  function compareNumber(a, b) {
    var itemA;
    var itemB;
    if(sortItem == "lenderSplit") {
      itemA = a.lenderSplit;
      itemB = b.lenderSplit;
    } else if(sortItem == "originationFee") {
      itemA = a.originationFee;
      itemB = b.originationFee;
    }
    let comparison = 0;
    if(itemA > itemB) {
      comparison = 1;
    } else if(itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }

  if(sortItem == "nodetype" || sortItem == "lenderAddress") {
    contractDataArray.sort(compareString).then(sortAvailableDataTable());
  } else if(sortIterm == "lenderAddress" || sortItem == "originationFee") {
    contractDataArray.sort(compareNumber).then(sortAvailableDataTable());
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
      const contractNodeType = getNodeTypeString(lenderContractData.nodeType);
      const contractLenderSplit = lenderContractData.lenderSplit;
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(contractAddress).call({})
      const contractLenderFee = lenderContractData.originationFee;
      const lastPaid = await contract.methods.getContractLastPaid(contractAddress).call({});
      var contractLastPaid;
      if(lastPaid > 0) {
        contractLastPaid = lastPaid;
      } else {
        contractLastPaid = "Inactive";
      }
      var contractBorrowerAddress;
      if(lenderContractData.available == true) {
        contractBorrowerAddress = "No Borrower";
        $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;">' + contractBorrowerAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 50px;"></div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-danger" onclick="window.removeContractSetup(\'' + contractAddress + '\');">Remove</button></div></div>');
      } else {
        contractBorrowerAddress = lenderContractData.borrowerAddress;
        $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;">' + contractBorrowerAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning" onclick="window.resetContractSetup(\'' + contractAddress + '\');">Reset</button></div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-danger" onclick="window.removeContractSetup(\'' + contractAddress + '\');">Remove</button></div></div>');
      }
      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Borrower Address: " + contractBorrowerAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
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
      const borrowerContractData = await contract.methods.lendingContractsMappingByBorrower(loginAddress, i).call({});
      const contractAddress = borrowerContractData.lendingContractAddress;
      const contractNodeType = getNodeTypeString(borrowerContractData.nodeType);
      const contractLenderAddress = borrowerContractData.lenderAddress;
      const contractLenderSplit = borrowerContractData.lenderSplit;
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(contractAddress).call({});
      const lastPaid = await contract.methods.getContractLastPaid(contractAddress).call({});
      var contractLastPaid;
      if(lastPaid > 0) {
        contractLastPaid = lastPaid;
      } else {
        contractLastPaid = "Inactive";
      }
      console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '%</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Address" style="padding-right: 15px;">' + contractAddress + '</div><div class="cell" data-title="Reset Contract" style="padding-right: 15px;"><button type="button" class="btn btn-warning" onclick="window.abandonContractSetup(\'' + contractAddress + '\');">Abandon</button></div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"><button type="button" class="btn btn-success" onclick="window.verifyNodeSetup(\'' + contractAddress + '\');">Verify Node</button></div></div>');
    }
  } else {
    $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
    $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Borrower Data Found</div></div>');
  }
}

window.newLendingContractSetup = function(){
  $('#modalNewContractSetup').modal();
  var nodeType = document.getElementById("node-type-selection").value;
  var ethoCollateralAmount;
  if(nodeType == "GN") { ethoCollateralAmount = 30000; }
  else if(nodeType == "MN") { ethoCollateralAmount = 15000; }
  else if(nodeType == "SN") { ethoCollateralAmount = 5000; }
  $('#required-collateral').text(ethoCollateralAmount);

  $(document).on('change', '#node-type-selection', function() {
    nodeType = document.getElementById("node-type-selection").value;
    if(nodeType == "GN") { ethoCollateralAmount = 30000; }
    else if(nodeType == "MN") { ethoCollateralAmount = 15000; }
    else if(nodeType == "SN") { ethoCollateralAmount = 5000; }
    $('#required-collateral').text(ethoCollateralAmount);
  });
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
    value: nodeCollateralAmount,
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

window.selectContractSetup = function(contractAddress){
  console.log(contractAddress);
  selectContract(contractAddress);
}

async function selectContract(contractAddress) {

  if(loggedInFlag) {
    const contractData = await contract.methods.lendingContractMapping(contractAddress).call({})
    $('#confirm-cost').text(contractData.originationFee);
    $('#costConfirmationModal').modal();
    $(document).on('click', '#confirmButton', function() {
      $('#costConfirmationModal').modal('hide');
      selectLendingContract(contractAddress, contractData.originationFee);
    });
  } else {
    window.initiateLogin();
  }
}

async function selectLendingContract(contractAddress, originationFee) {
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    value: Number(originationFee * 1000000000000000000),
    gas: 6000000,
    data: contract.methods.borrowerContractSelection(contractAddress).encodeABI()
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

window.abandonContractSetup = function(contractAddress){
  resetContract(contractAddress, "borrower");
}

window.resetContractSetup = function(contractAddress){
  resetContract(contractAddress, "lender");
}

async function resetContract(contractAddress, side) {
  const contractData = await contract.methods.lendingContractMapping(contractAddress).call({})
  var index;
  if(side == "borrower") {
    index = contractData.borrowerIndex;
    $('#confirm-message').text("Abandon");
  } else if(side == "lender") {
    index = contractData.lenderIndex
    $('#confirm-message').text("Reset");
  }
  $('#confirmationModal').modal();
  $(document).on('click', '#generalConfirmButton', function() {
    $('#confirmationModal').modal('hide');
      resetLendingContract(index, side);
  });
}
async function resetLendingContract(index, side) {
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 6000000,
    data: contract.methods.resetContract(index, side).encodeABI()
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

window.removeContractSetup = function(contractAddress){
  removeContract(contractAddress);
}

async function removeContract(contractAddress) {
  const contractData = await contract.methods.lendingContractMapping(contractAddress).call({})
  const index = contractData.lenderIndex;
  $('#confirm-message').text("Remove");
  $('#confirmationModal').modal();
  $(document).on('click', '#generalConfirmButton', function() {
    $('#confirmationModal').modal('hide');
      removeLendingContract(index);
  });
}
async function removeLendingContract(index) {
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 6000000,
    data: contract.methods.removeContract(index).encodeABI()
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

window.verifyNodeSetup = function(contractAddress){
  verifyNode(contractAddress);
}

async function verifyNode(contractAddress) {
  const contractData = await contract.methods.lendingContractMapping(contractAddress).call({})
  const index = contractData.lenderIndex;
  $('#verifyNodeModal').modal();
  $(document).on('click', '#verifyNodeConfirmButton', function() {
    if(document.getElementById("verify-node-address") !== null) {
      var to = document.getElementById("verify-node-address").value;
      $('#verifyNodeModal').modal('hide');
      verifyNodeContract(contractAddress, to);
    }
  });
}
async function verifyNodeContract(contractAddress, to) {
  const bnValue = web3.utils.toBN(100000000000000000);
  const sendValue = web3.utils.toHex(bnValue);
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 6000000,
    data: contract.methods.contractBorrowerTransfer(contractAddress, to, sendValue).encodeABI()
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
              $('#verification-tx-hash').text(receipt.transactionHash);
              $('#transactionHashModal').modal();
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
  var ethoValue;
  if(nodeType == "GN") {
    ethoValue = 30000;
  } else if(nodeType == "MN") {
    ethoValue = 15000;
  } else if(nodeType == "SN") {
    ethoValue = 5000;
  }
  var weiValue = web3.utils.toWei(ethoValue.toString(), 'ether')
  return web3.utils.toBN(weiValue);
}

function getNodeTypeString(nodeType) {
  var nodeTypeString;
  if(nodeType == "GN") {
    nodeTypeString = "Gateway Node";
  } else if(nodeType == "MN") {
    nodeTypeString = "Masternode";
  } else if(nodeType == "SN") {
    nodeTypeString = "Service Node";
  }
  return nodeTypeString;
}
callContract();
