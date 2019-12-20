const Web3 = require('web3');
const web3 = new Web3('https://rpc.ether1.org');
const CONTRACT_ADDRESS = '0x7eE5B10cad23D36F8Ba9AD30aD1B67A741f39769';
const CONTRACT_ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"contractMessage","type":"string"},{"name":"messageSide","type":"string"}],"name":"addContractMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"split","type":"uint256"},{"name":"nodeType","type":"string"},{"name":"fee","type":"uint256"},{"name":"contractText","type":"string"}],"name":"createLendingContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"removeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"resetContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setGnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setMnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setSnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lenderContractMessaging","outputs":[{"name":"lendingContractAddress","type":"address"},{"name":"message","type":"string"},{"name":"blockHeight","type":"uint256"},{"name":"side","type":"string"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenderCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lendingContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lendingContractCountMapping","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lendingContractMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"},{"name":"text","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByBorrower","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByLender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"messageCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minOriginationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"totalContractMessages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
const INDIVIDUAL_CONTRACT_ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"borrowerDeploymentBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nodeType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"available","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerTxAllowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deleteContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lenderSplit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"borrower","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resetContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paymentThreshold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"originationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastRewardAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"borrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBorrower","type":"address"}],"name":"setBorrower","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"nodeCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"split","type":"uint256"},{"name":"contractType","type":"string"},{"name":"fee","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"senderAddress","type":"address"}],"name":"logSender","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"receiverAddress","type":"address"}],"name":"logReceiver","type":"event"}]');
var contract;
var loginAddress;
var loginPrivateKey;
var loggedInFlag = false;
var contractDataArray = [];
var currentBlockHeight;
window.mainContractDataArray = [];
window.lenderContractDataArray = [];
window.borrowerContractDataArray = [];


$(document).on('click', '#help-button', function() {
  $('#helpModal').modal();
});
$(document).on('click', '#terms-button', function() {
  $('#termsModal').modal();
});
$(document).on('click', '#filter-all-button', function() {
  async function filter() {
    const totalContractCount = await contract.methods.lendingContractCount().call()
    callAvailableData(contract, await totalContractCount, "All");
  }
  filter();
});
$(document).on('click', '#filter-open-button', function() {
  async function filter() {
    const totalContractCount = await contract.methods.lendingContractCount().call()
    callAvailableData(contract, await totalContractCount, "Open");
  }
  filter();
});
$(document).on('click', '#filter-closed-button', function() {
  async function filter() {
    const totalContractCount = await contract.methods.lendingContractCount().call()
    callAvailableData(contract, await totalContractCount, "Closed");
  }
  filter();
});
function showDataLoadingProgress() {
  var $bar = $('.bar');
  $bar.width(0);
  $('#loadingDataModal').modal();
}

function updateDataLoadingProgress(percent) {
  var newWidth = Math.round(500 * percent);
  var $bar = $('.bar');
  if (newWidth==500) {
    $bar.width(newWidth);
    $('#loadingDataModal').modal('hide');
  } else {
    $bar.width(newWidth);
  }
  $bar.text(Math.round(newWidth/5) + "%");
}
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
  currentBlockHeight = await web3.eth.getBlockNumber();
  const totalContractCount = await contract.methods.lendingContractCount().call()
  console.log("Total Contract Count: " + totalContractCount);
  console.log("Current Block Height: " + currentBlockHeight);

  callAvailableData(await contract, await totalContractCount, "Open");
  $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
  $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
  $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Borrower Data Found</div></div>');
}

async function resetContract(){
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract;
}

async function refreshContractData(){
  if(loggedInFlag) {updateAccountBalance(loginAddress);}
  const totalContractCount = await contract.methods.lendingContractCount().call()
  console.log("Total Contract Count: " + totalContractCount);

  $('#available-data-table').children().not('#available-header1, #available-header2').remove();
  $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
  $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();

  callAvailableData(contract, await totalContractCount, "Open");
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

  $("#add-contract-button").css('display', 'inherit');
  refreshContractData();
  //callLenderData();
  //callBorrowerData();
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

async function callAvailableData(contract, totalContractCount, filter) {
  window.mainContractDataArray.length = 0;
  contractDataArray.length = 0;
  if(totalContractCount > 0) {
    showDataLoadingProgress();
    $('#available-data-table').children().not('#available-header1, #available-header2').remove();
    var data = false;
    var totalLending = 0;
    var totalAvailable = 0;
    for (var i = 0; i < totalContractCount; i++) {
      try{
      const contractDataAddress = await contract.methods.lendingContractCountMapping(i).call({})
      const contractData = await contract.methods.lendingContractMapping(contractDataAddress).call({})
      console.log(contractData);

      window.mainContractDataArray[i] = contractData;
      contractDataArray.push(contractData); //Save contract data for sorting
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(contractData.lendingContractAddress).call({})
      totalLending += Number(contractCollateralAmount);
      data = true;
      const contractAddress = contractData.lendingContractAddress;
      const contractNodeType = getNodeTypeString(contractData.nodeType);
      const contractLenderAddress = contractData.lenderAddress;
      const contractBorrowerAddress = contractData.borrowerAddress;
      const contractLenderSplit = contractData.lenderSplit;
      const contractLenderFee = contractData.originationFee;
      const contractText = contractData.text;
      var contractAvailability;
      if(contractData.available == true) {
        totalAvailable += Number(contractCollateralAmount);
        contractAvailability = "Yes"
      } else {
        contractAvailability = "No"
      }
      const lastPaid = await contract.methods.getContractLastPaid(contractAddress).call({});
      const lastReward = await contract.methods.getContractLastReward(contractAddress).call({});
      contractData.lastReward = lastReward;
      var contractLastPaid;
      if(lastPaid > 0) {
        contractLastPaid = lastPaid;
      } else {
        contractLastPaid = "Inactive";
      }
      contractData.lastPaid = contractLastPaid;

      if(filter == "All" || (filter == "Open" && contractAvailability == "Yes") || (filter == "Closed" && contractAvailability == "No")) {
        console.log("Text: " + contractText + " Availability: " + contractAvailability + "Address: " + contractAddress + " Node Type: " + contractNodeType + "Borrower Address: " + contractBorrowerAddress + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
        if(contractData.available == true) {
          console.log("Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
          if(loggedInFlag && loginAddress.toString().toUpperCase() == contractLenderAddress.toString().toUpperCase()) {
            $('#available-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.mainContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Lender Fee">' + contractLenderFee + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractLenderAddress + '" target="_blank">' + contractLenderAddress + '</a></div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"></div></div>');
          } else {
            $('#available-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.mainContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Lender Fee">' + contractLenderFee + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractLenderAddress + '" target="_blank">' + contractLenderAddress+ '</a></div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"><button type="button" class="btn btn-success" style="font-size:10px;" onclick="window.selectContractSetup(\'' + contractAddress + '\');">Select</button></div></div>');
          }
        } else {
          $('#available-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.mainContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Lender Fee">' + contractLenderFee + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Lender Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractLenderAddress + '" target="_blank">' + contractLenderAddress + '</a></div><div class="cell" data-title="contract-signup" style="padding-right: 15px;"></div></div>');
        }
      }
      }catch(e){
        console.log("error: ", e);
      }
      updateDataLoadingProgress(i / totalContractCount);
    }
    var totalLendingString = (totalLending / 1000000000000000000).toFixed(2);
    var totalAvailableString = (totalAvailable / 1000000000000000000).toFixed(2);
    console.log("Total Collateral in Lending System: ", totalLendingString);
    console.log("Total Collateral in Available Contracts: ", totalAvailableString);
    $('#total-lending').text("Total Collateral Lent: " + totalLendingString + " ETHO");
    $('#total-available').text("Total Collateral Available: " + totalAvailableString + " ETHO");
    updateDataLoadingProgress(1);
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
  window.lenderContractDataArray.length = 0;
  console.log("Lender Contract Count: " + lenderContractCount);

  if(lenderContractCount > 0) {
    $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
    for (var i = 0; i < lenderContractCount; i++) {
      const lenderContractDataAddress = await contract.methods.lendingContractsMappingByLender(loginAddress, i).call({})
      const lenderContractData = await contract.methods.lendingContractMapping(lenderContractDataAddress).call({})
      window.lenderContractDataArray[i] = lenderContractData;
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
      const contractText = lenderContractData.text;
      const lastPaid = await contract.methods.getContractLastPaid(contractAddress).call({});
      const lastReward = await contract.methods.getContractLastReward(contractAddress).call({});
      lenderContractData.lastReward = lastReward;
      var contractLastPaid;
      if(lastPaid > 0) {
        contractLastPaid = lastPaid;
      } else {
        contractLastPaid = "Inactive";
      }
      lenderContractData.lastPaid = contractLastPaid;
      var contractBorrowerAddress;
      if(lenderContractData.available == true) {
        contractBorrowerAddress = "No Borrower";
        $('#lender-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.lenderContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractBorrowerAddress + '" target="_blank">' + contractBorrowerAddress + '</a></div><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 10px;">Options</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="padding-left: 20%;"><button type="button" class="btn btn-danger" style="font-size:10px;width:80%;" onclick="window.removeContractSetup(\'' + contractAddress + '\');">Remove</button><br></div>');
      } else {
        contractBorrowerAddress = lenderContractData.borrowerAddress;
        $('#lender-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.lenderContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Availability">' + contractAvailability + '</div><div class="cell" data-title="Borrower Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractBorrowerAddress + '" target="_blank">' + contractBorrowerAddress + '</a></div><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 10px;">Options</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="padding-left: 20%;"><button type="button" class="btn btn-warning" style="font-size: 10px; width:80%;" onclick="window.resetContractSetup(\'' + contractAddress + '\');">Reset</button><br><br><button type="button" class="btn btn-danger" style="font-size:10px;width:80%;" onclick="window.removeContractSetup(\'' + contractAddress + '\');">Remove</button><br><br><button type="button" class="btn btn-success" style="font-size: 10px; width:80%;" onclick="window.sendContractMessage(\'' + contractAddress + '\', \'Lender\');">Message</button></div></div><br></div>');
      }
      console.log("Text: " + contractText + " Address: " + contractAddress + " Node Type: " + contractNodeType + " Borrower Address: " + contractBorrowerAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
    }
  } else {
    $('#lender-data-table').children().not('#lender-header1, #lender-header2').remove();
    $('#lender-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Lender Data Found</div></div>');
  }
}

async function callBorrowerData() {
  window.borrowerContractDataArray.length = 0;
  const borrowerContractCount = await contract.methods.borrowerCountMapping(loginAddress).call()
  console.log("Borrower Contract Count: " + borrowerContractCount);
  if(borrowerContractCount > 0) {
    $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
    for (var i = 0; i < borrowerContractCount; i++) {
      const borrowerContractDataAddress = await contract.methods.lendingContractsMappingByBorrower(loginAddress, i).call({});
      const borrowerContractData = await contract.methods.lendingContractMapping(borrowerContractDataAddress).call({});
      window.borrowerContractDataArray[i] = borrowerContractData;
      const contractAddress = borrowerContractData.lendingContractAddress;
      const contractNodeType = getNodeTypeString(borrowerContractData.nodeType);
      const contractLenderAddress = borrowerContractData.lenderAddress;
      const contractLenderSplit = borrowerContractData.lenderSplit;
      const contractText = borrowerContractData.text;
      const contractCollateralAmount = await contract.methods.getContractCollateralAmount(contractAddress).call({});
      const lastPaid = await contract.methods.getContractLastPaid(contractAddress).call({});
      const lastReward = await contract.methods.getContractLastReward(contractAddress).call({});
      borrowerContractData.lastReward = lastReward;
      var contractLastPaid;
      if(lastPaid > 0) {
        contractLastPaid = lastPaid;
      } else {
        contractLastPaid = "Inactive";
      }
      borrowerContractData.lastPaid = contractLastPaid;
      console.log("Text: " + contractText + " Address: " + contractAddress + " Node Type: " + contractNodeType + " Lender Address: " + contractLenderAddress + " Lender Split: " + contractLenderSplit + " Collateral Amount: " + contractCollateralAmount);
      $('#borrower-data-table').append('<div class="row"><div class="cell" onclick="window.getContractDetails(window.borrowerContractDataArray[' + i + ']);" data-title="Node Type"><i class="fa fa-info-circle"></i>' + contractNodeType +'</div><div class="cell" data-title="Last Paid">' + contractLastPaid + '</div><div class="cell" data-title="Lender Split">' + contractLenderSplit + '%</div><div class="cell" data-title="Contract Address" style="padding-right: 15px;"><a href="https://explorer.ether1.org/address/' + contractAddress + '" target="_blank">' + contractAddress + '</a></div><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 10px;">Options</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="padding-left: 20%;"><button type="button" class="btn btn-warning" style="width: 80%; font-size:10px;" onclick="window.abandonContractSetup(\'' + contractAddress + '\');">Abandon</button><br><br><button type="button" class="btn btn-success" style="width: 80%; font-size:10px;" onclick="window.verifyNodeSetup(\'' + contractAddress + '\');">Verify Node</button><br><br><button type="button" class="btn btn-success" style="width: 80%; font-size:10px;" onclick="window.sendContractMessage(\'' + contractAddress + '\', \'Borrower\');">Message</button><br></div></div>');
    }
  } else {
    $('#borrower-data-table').children().not('#borrower-header1, #borrower-header2').remove();
    $('#borrower-data-table').append('<div class="row"><div class="cell" data-title="Node Type">No Borrower Data Found</div></div>');
  }
}

window.getContractDetails = async function(contractData){
  var individualContract = new web3.eth.Contract(INDIVIDUAL_CONTRACT_ABI, contractData.lendingContractAddress);
  const deploymentBlockHeight = await individualContract.methods.borrowerDeploymentBlock().call();

  var nodeStatus;
  if((currentBlockHeight - contractData.lastPaid) < 10000) { nodeStatus = "Active"; }
  else { nodeStatus = "Inactive"; }

  $('#modalDetails').modal();
  $('#node-type').text(getNodeTypeString(contractData.nodeType));
  $('#contract-text').text(contractData.text);
  $('#deploy-block').text(deploymentBlockHeight);
  var blocksSinceDeployment = 0;
  if(deploymentBlockHeight > 0) {
    blocksSinceDeployment = currentBlockHeight - deploymentBlockHeight;
  }
  $('#node-status').text(nodeStatus);
  $('#blocks-since').text(blocksSinceDeployment);
  var lastLenderReward = Number((Number(contractData.lastReward) / 1000000000000000000).toFixed(2) / 100 ) * Number(contractData.lenderSplit);
  var lastBorrowerReward = Number((Number(contractData.lastReward) / 1000000000000000000).toFixed(2) / 100 ) * (100 - Number(contractData.lenderSplit));
  console.log("Last Borrower Reward: " + lastBorrowerReward + "  Last Lender Reward: " + lastLenderReward);
  $('#last-lender-reward').text(lastLenderReward);
  $('#last-borrower-reward').text(lastBorrowerReward);
};

async function getMessageData(contractAddress) {
  const contractMessageCount = await contract.methods.totalContractMessages(contractAddress).call();
  $('#message-data-table').empty();
  for (var i = 0; i < contractMessageCount; i++) {
    const contractMessageData = await contract.methods.lenderContractMessaging(contractAddress, i).call({});
    console.log("Contract Message Data:");
    console.log(contractMessageData);
    var timeStamp = new Date(contractMessageData.timestamp * 1000).toISOString().split('T')[0];
    $('#message-data-table').append('<p>' + contractMessageData.side + ' ' + timeStamp + ': ' + contractMessageData.message + '</p>');
  }
}

window.sendContractMessage = function(contractAddress, side){
  $('#modalMessage').modal();
  document.getElementById("new-message").value = null;
  getMessageData(contractAddress);
  $('#sendMessageModalButton').unbind('click').click(function(event) {
    var message = document.getElementById("new-message").value;
    document.getElementById("new-message").value = null;
    sendMessage(contractAddress, message, side);
  });
};

async function sendMessage(contractAddress, message, side) {
  console.log("Preparing To Send Message - Address: " + contractAddress + " Message: " + message + " Side: " + side);
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 6000000,
    data: contract.methods.addContractMessage(contractAddress, message, side).encodeABI()
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
              getMessageData(contractAddress);
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

window.newLendingContractSetup = function(){
  $('#modalNewContractSetup').modal();
  var nodeType = document.getElementById("node-type-selection").value;
  var ethoCollateralAmount;
  if(nodeType == "GN") { ethoCollateralAmount = 30000; }
  else if(nodeType == "MN") { ethoCollateralAmount = 15000; }
  else if(nodeType == "SN") { ethoCollateralAmount = 5000; }
  $('#required-collateral').text(ethoCollateralAmount);

  $('#node-type-selection').unbind('change').click(function(event) {
    nodeType = document.getElementById("node-type-selection").value;
    if(nodeType == "GN") { ethoCollateralAmount = 30000; }
    else if(nodeType == "MN") { ethoCollateralAmount = 15000; }
    else if(nodeType == "SN") { ethoCollateralAmount = 5000; }
    $('#required-collateral').text(ethoCollateralAmount);
  });
  $('#submitNewContractButton').unbind('click').click(function(event) {
    $('#modalNewContractSetup').modal('hide');
    newLendingContract();
  });
};

async function newLendingContract() {
  var split = document.getElementById("split-value-selection").value;
  var nodeType = document.getElementById("node-type-selection").value;
  var fee = document.getElementById("fee-selection").value;
  var text = document.getElementById("additional-terms").value;

  const nodeCollateralAmount = getCollateralAmount(nodeType);
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    value: nodeCollateralAmount,
    gas: 6000000,
    data: contract.methods.createLendingContract(split, nodeType, fee, text).encodeABI()
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

    $('#confirmButton').unbind('click').click(function(event) {
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
  $('#generalConfirmButton').unbind('click').click(function(event) {
    $('#confirmationModal').modal('hide');
      resetLendingContract(contractAddress);
  });
}
async function resetLendingContract(contractAddress) {
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 8000000,
    data: contract.methods.resetContract(contractAddress).encodeABI()
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
  $('#confirm-message').text("Remove");
  $('#confirmationModal').modal();
  $('#generalConfirmButton').unbind('click').click(function(event) {
    $('#confirmationModal').modal('hide');
      removeLendingContract(contractAddress);
  });
}
async function removeLendingContract(contractAddress) {
  const tx = {
    to: CONTRACT_ADDRESS,
    from: web3.eth.defaultAccount,
    gas: 8000000,
    data: contract.methods.removeContract(contractAddress).encodeABI()
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
  $('#verifyNodeConfirmButton').unbind('click').click(function(event) {
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
