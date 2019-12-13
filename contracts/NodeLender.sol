pragma solidity 0.4.23;

contract LenderManagement {
    address public owner;
    mapping(address => mapping(uint => address)) public lendingContractsMappingByLender;
    mapping(address => mapping(uint => address)) public lendingContractsMappingByBorrower;
    mapping(address => uint) public lenderCountMapping;
    mapping(address => uint) public borrowerCountMapping;
    
    mapping(address => lendingContract) public lendingContractMapping;
    mapping(uint => address) public lendingContractCountMapping;
    
    mapping(address => mapping(uint => contractMessaging)) public lenderContractMessaging;
    mapping(address => uint) public messageCountMapping;
    
    uint public lendingContractCount;
    uint public gnCollateralRequirement;
    uint public mnCollateralRequirement;
    uint public snCollateralRequirement;
    
    uint public minOriginationFee;
    
    struct contractMessaging {
        address lendingContractAddress;
        string message;
        uint blockHeight;
        string side;
        uint timestamp;
    }
    
    struct lendingContract {
        string nodeType;
        uint index;
        uint lenderIndex;
        uint borrowerIndex;
        address lenderAddress;
        address borrowerAddress;
        address lendingContractAddress;
        uint originationFee;
        bool available;
        uint lenderSplit;
        string text;
    }
    
    constructor() public {
        owner = msg.sender;
        gnCollateralRequirement = 30000;
        mnCollateralRequirement = 15000;
        snCollateralRequirement = 5000;
        minOriginationFee = 100;
    }
    
    // This function is used to deploy a new lending contract - fee is desired origination fee
    function createLendingContract (uint split, string nodeType, uint fee, string contractText) public payable {
        require(keccak256(nodeType) == keccak256("GN") || keccak256(nodeType) == keccak256("MN") || keccak256(nodeType) == keccak256("SN") && fee >= minOriginationFee);

        if(keccak256(nodeType) == keccak256("GN")){ assert(msg.value == (gnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("MN")){ assert(msg.value == (mnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("SN")){ assert(msg.value == (snCollateralRequirement * (1 ether))); }
        
        address newLendingContract = (new NodeLender).value(msg.value)(split, nodeType, fee);
        
        lendingContract memory newContract = lendingContract({nodeType:nodeType, index:lendingContractCount, lenderIndex:lenderCountMapping[msg.sender], borrowerIndex:0, lenderAddress:msg.sender, borrowerAddress:address(0), lendingContractAddress:newLendingContract, originationFee:fee, available:true, lenderSplit:split, text:contractText});
       
        lendingContractMapping[newLendingContract] = newContract;
        lendingContractCountMapping[lendingContractCount] = newLendingContract;
        lendingContractCount++;
        
        lendingContractsMappingByLender[msg.sender][lenderCountMapping[msg.sender]] = newLendingContract;
        lenderCountMapping[msg.sender]++;
    } 
    
    function addContractMessage(address contractAddress, string contractMessage, string messageSide) public {
        require(lendingContractMapping[contractAddress].lenderAddress == msg.sender || lendingContractMapping[contractAddress].borrowerAddress == msg.sender);
        contractMessaging memory newMessage = contractMessaging({lendingContractAddress:contractAddress, message:contractMessage, blockHeight:block.number, side:messageSide, timestamp:block.timestamp});
        lenderContractMessaging[contractAddress][messageCountMapping[contractAddress]] = newMessage;
        messageCountMapping[contractAddress]++;
    }

    function totalContractMessages(address contractAddress) public view returns (uint){
        return messageCountMapping[contractAddress];
    }

    // This function is used for a borrower to select an available contract
    function borrowerContractSelection(address contractAddress) public payable {
        address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
	    require(msg.sender != lenderAddress);
        require(lendingContractMapping[contractAddress].available == true && NodeLender(contractAddress).setBorrower.value(msg.value)(msg.sender));
    
        lendingContractMapping[contractAddress].available = false;
        
        lendingContractMapping[contractAddress].borrowerAddress = msg.sender;
         
        lendingContractMapping[contractAddress].borrowerIndex = borrowerCountMapping[msg.sender]; 
        
        lendingContractsMappingByBorrower[msg.sender][borrowerCountMapping[msg.sender]] = contractAddress;

        borrowerCountMapping[msg.sender]++;
        
        // Prepare/Initialize the message mapping struct
        messageCountMapping[contractAddress] = 0;
    }

    function removeContract(address contractAddress) public {
	address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
	require(msg.sender == lenderAddress);
	    
        address borrowerAddress = lendingContractMapping[contractAddress].borrowerAddress;
        address contractLookup = lendingContractMapping[contractAddress].lendingContractAddress;
        
        // Rotate end mappings to current index
        rotateLastLenderContract(contractAddress);
        rotateLastBorrowerContract(contractAddress);
        rotateLastMainContract(contractAddress);
        
    	// Delete last contracts in mappings after rotation
        delete lendingContractsMappingByLender[lenderAddress][lenderCountMapping[lenderAddress] - 1];
        delete lendingContractsMappingByBorrower[borrowerAddress][borrowerCountMapping[borrowerAddress] - 1];
        delete lendingContractCountMapping[lendingContractCount - 1];
        delete lendingContractMapping[contractLookup];
        
        borrowerCountMapping[borrowerAddress]--;
        lenderCountMapping[lenderAddress]--;
        lendingContractCount--;

        NodeLender(contractAddress).deleteContract();
    }
    
    function resetContract(address contractAddress) public {
        address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
        address borrowerAddress = lendingContractMapping[contractAddress].borrowerAddress;
        require(msg.sender == lenderAddress || msg.sender == borrowerAddress);

        rotateLastBorrowerContract(contractAddress);
        
        lendingContractMapping[contractAddress].available = true;
        lendingContractMapping[contractAddress].borrowerAddress = address(0);
        
        delete lendingContractsMappingByBorrower[borrowerAddress][borrowerCountMapping[borrowerAddress] - 1];
        
        borrowerCountMapping[borrowerAddress]--;
        
        NodeLender(contractAddress).resetContract();
    }
    
    function rotateLastLenderContract(address contractAddress) internal {
        uint lenderIndex = lendingContractMapping[contractAddress].lenderIndex;
        address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
        
        address lendingContractAddressCopy = lendingContractsMappingByLender[lenderAddress][lenderCountMapping[lenderAddress] - 1];
        lendingContractsMappingByLender[lenderAddress][lenderIndex] = lendingContractAddressCopy;
        
        lendingContractMapping[lendingContractAddressCopy].lenderIndex = lenderIndex;
    }
    
    function rotateLastBorrowerContract(address contractAddress) internal {
        uint borrowerIndex = lendingContractMapping[contractAddress].borrowerIndex;
        address borrowerAddress = lendingContractMapping[contractAddress].borrowerAddress;
        
        address lendingContractAddressCopy = lendingContractsMappingByBorrower[borrowerAddress][borrowerCountMapping[borrowerAddress] - 1];
        lendingContractsMappingByBorrower[borrowerAddress][borrowerIndex] = lendingContractAddressCopy;
        
        lendingContractMapping[lendingContractAddressCopy].borrowerIndex = borrowerIndex;
    }
    
    function rotateLastMainContract(address contractAddress) internal {
        uint mainIndex = lendingContractMapping[contractAddress].index;
        
        address lendingContractAddressCopy = lendingContractCountMapping[lendingContractCount - 1];
        lendingContractCountMapping[mainIndex] = lendingContractAddressCopy;
        
        lendingContractMapping[lendingContractAddressCopy].index = mainIndex;
    }
    
    function rotateLastContractIndexes(address contractAddress) internal {
        uint mainIndex = lendingContractMapping[contractAddress].index;
        uint lenderIndex = lendingContractMapping[contractAddress].lenderIndex;
        uint borrowerIndex = lendingContractMapping[contractAddress].borrowerIndex;
        address lastLendingContractAddress = lendingContractCountMapping[lendingContractCount - 1];
        
        lendingContractMapping[lastLendingContractAddress].lenderIndex = lenderIndex;
        lendingContractMapping[lastLendingContractAddress].borrowerIndex = borrowerIndex;
        lendingContractMapping[lastLendingContractAddress].index = mainIndex;
    }
    
    function getContractCollateralAmount(address contractAddress) public view returns (uint) {
        return NodeLender(contractAddress).nodeCollateralAmount();
    }

    function getContractLastPaid(address contractAddress) public view returns (uint) {
        return NodeLender(contractAddress).lastPaid();
    }   

    function getContractLastReward(address contractAddress) public view returns (uint) {
        return NodeLender(contractAddress).lastRewardAmount();
    }  
       
    function setGnCollateralAmount(uint amount) public onlyOwner () {
        gnCollateralRequirement = amount;
    }
    
    function setMnCollateralAmount(uint amount) public onlyOwner () {
        mnCollateralRequirement = amount;
    }
    
    function setSnCollateralAmount(uint amount) public onlyOwner () {
        snCollateralRequirement = amount;
    }
    
    function contractBorrowerTransfer(address contractAddress, address to, uint value) public returns (bool) {
        return NodeLender(contractAddress).borrowerTransfer(to, value);
    }
    
    modifier onlyOwner {
        require(
            tx.origin == owner
        );
        _;
    }
}

contract NodeLender {

    address public lender;
    address public borrower;
    address public controller;

    uint public paymentThreshold;
    uint public lenderSplit;

    mapping(address => uint) public borrowerTxAllowance;
    
    bool public available;
    uint public originationFee;
    uint public lastPaid;
    uint public lastRewardAmount;
    uint public borrowerDeploymentBlock;

    string public nodeType;
    uint public nodeCollateralAmount;

    event logSender(address senderAddress);
    event logReceiver(address receiverAddress);

    // On Deployment - A Split of 10 Means 10% Lender Split
    constructor(uint split, string contractType, uint fee) public payable {
        lender = tx.origin;
        controller = msg.sender;
        lenderSplit = split;
        paymentThreshold = 100;
        nodeType = contractType;
        nodeCollateralAmount = msg.value;
        available = true;
        originationFee = fee;
    }

    function() payable external {
        if(msg.value < (paymentThreshold * (1 ether))) {
            uint lenderPayment = (msg.value / 100) * lenderSplit;
            uint borrowerPayment = (msg.value - lenderPayment);
            lender.transfer(lenderPayment);
            borrower.transfer(borrowerPayment);
            lastPaid = block.number;
            lastRewardAmount = msg.value;
        }
    }
    
    // borrowerTransfer allows borrower to send a tx to verify node (must be less than 1 etho) - value is in wei
    function borrowerTransfer(address to, uint value) public lenderOrBorrower returns (bool) {
        require(address(this).balance >= value && value < (1 ether) && borrowerTxAllowance[borrower] < 3);
        borrowerTxAllowance[borrower]++;
        to.transfer(value);
        emit logSender(address(this));
        emit logReceiver(to);
        return true;
    }

    // Will refund 95% origination fee if lender cancels within 50000 blocks of borrower agreement
    // Will not let lender reset if active and inside 200000 blocks from deployment
    function resetContract() public lenderOrBorrower() {
        if(tx.origin == lender) {
            require(!available && (block.number - borrowerDeploymentBlock) > 50000 && ((block.number - borrowerDeploymentBlock) > 200000 || (block.number - lastPaid) > 10000 || lastPaid == 0));
        } else if (tx.origin == borrower) {
            require(!available);
        }
        if(tx.origin == lender) {
            if((block.number - borrowerDeploymentBlock) > 200000) {
                borrower.transfer(((originationFee / 100) * 95) * (1 ether));
            }
            //if((block.number - borrowerDeploymentBlock) < 50000) {
            if((block.number - borrowerDeploymentBlock) < 50) {
            } else {
                borrowerTxAllowance[borrower] = 0;
            }        
        }
        if(tx.origin == borrower && (block.number - borrowerDeploymentBlock) > 200000) {
            borrower.transfer(((originationFee / 100) * 95) * (1 ether));
        }
        borrowerDeploymentBlock = 0;        
        available = true;
        borrower = address(0);
        lastPaid = 0;
    }
    
    // Lender cannot delete a borrower selected contract unless older than 200000 blocks or inactive after 50000 blocks
    // Lender can delete if contract is not yet selected
    function deleteContract() public onlyLender() {
        if(!available) {
            require((block.number - borrowerDeploymentBlock) > 50000 && ((block.number - borrowerDeploymentBlock) > 200000 || (block.number - lastPaid) > 10000 || lastPaid == 0));
            // If lender cancels contract borrower received origination fee if they keep the node alive. If they don't, lender can cancel and take fee
            if((block.number - borrowerDeploymentBlock) > 200000) {
                borrower.transfer(((originationFee / 100) * 95) * (1 ether));
            }
        }
        selfdestruct(lender);
    }
    
    function setBorrower(address newBorrower) payable public returns (bool) {
        require(available && tx.origin != lender && msg.sender == controller && msg.value == (originationFee * (1 ether)));
        borrower = newBorrower;
        borrowerDeploymentBlock = block.number;
        available = false;
        return true;
    }

    modifier onlyLender {
        require(
            tx.origin == lender
        );
        _;
    }

    modifier lenderOrBorrower() {
        require(
            tx.origin == lender || tx.origin == borrower
        );
        _;
    }
}
