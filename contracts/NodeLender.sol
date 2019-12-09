pragma solidity 0.4.23;
contract LenderManagement {
    address public owner;
    mapping (address => mapping(uint => lendingContract)) public lendingContractsMappingByLender;
    mapping (address => mapping(uint => lendingContract)) public lendingContractsMappingByBorrower;
    mapping(address => uint) public lenderCountMapping;
    mapping(address => uint) public borrowerCountMapping;
    mapping(address => lendingContract) public lendingContractMapping;
    mapping(uint => lendingContract) public lendingContractCountMapping;
    
    uint public lendingContractCount;
    uint public gnCollateralRequirement;
    uint public mnCollateralRequirement;
    uint public snCollateralRequirement;
    
    uint public minOriginationFee;
    
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
    }
    
    constructor() public {
        owner = msg.sender;
        gnCollateralRequirement = 30000;
        mnCollateralRequirement = 15000;
        snCollateralRequirement = 5000;
        minOriginationFee = 100;
    }
    
    // This function is used to deploy a new lending contract - fee is desired origination fee
    function createLendingContract (uint split, string nodeType, uint fee) public payable {
        assert(keccak256(nodeType) == keccak256("GN") || keccak256(nodeType) == keccak256("MN") || keccak256(nodeType) == keccak256("SN") && fee >= minOriginationFee);

        if(keccak256(nodeType) == keccak256("GN")){ assert(msg.value == (gnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("MN")){ assert(msg.value == (mnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("SN")){ assert(msg.value == (snCollateralRequirement * (1 ether))); }
        
        address newLendingContract = (new NodeLender).value(msg.value)(split, nodeType, fee);
        
        lendingContract memory newContract = lendingContract({nodeType:nodeType, index:lendingContractCount, lenderIndex:lenderCountMapping[msg.sender], borrowerIndex:0, lenderAddress:msg.sender, borrowerAddress:address(0), lendingContractAddress:newLendingContract, originationFee:fee, available:true, lenderSplit:split});
        lendingContractsMappingByLender[msg.sender][lenderCountMapping[msg.sender]] = newContract;
        lenderCountMapping[msg.sender]++;
        
        lendingContractMapping[newLendingContract] = newContract;
        lendingContractCountMapping[lendingContractCount] = newContract;
        lendingContractCount++;
    } 
    
    // This function is used for a borrower to select an available contract
    function borrowerContractSelection(address contractAddress) public payable {
        assert(lendingContractMapping[contractAddress].available == true && NodeLender(contractAddress).setBorrower.value(msg.value)(msg.sender));
    
        address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
        uint lenderIndex = lendingContractMapping[contractAddress].lenderIndex;
        lendingContractsMappingByLender[lenderAddress][lenderIndex].available = false; 
        lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerAddress = msg.sender;
        lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerIndex = borrowerCountMapping[msg.sender];
        
        uint mainIndex = lendingContractMapping[contractAddress].index;
        lendingContractCountMapping[mainIndex].available = false;
        lendingContractCountMapping[mainIndex].borrowerAddress = msg.sender;
        lendingContractCountMapping[mainIndex].borrowerIndex = borrowerCountMapping[msg.sender];
        
        lendingContractMapping[contractAddress].available = false;
        lendingContractMapping[contractAddress].borrowerAddress = msg.sender;
        lendingContractMapping[contractAddress].borrowerIndex = borrowerCountMapping[msg.sender];
        
        lendingContractsMappingByBorrower[msg.sender][borrowerCountMapping[msg.sender]] = lendingContractMapping[contractAddress];
        borrowerCountMapping[msg.sender]++;
    }
    
    function calculateContractCost(address contractAddress) public view returns (uint) {
         uint fees = NodeLender(contractAddress).originationFee();
         string memory nodeType =  lendingContractMapping[contractAddress].nodeType;
         if(keccak256(nodeType) == keccak256("GN")) {
             fees += gnCollateralRequirement;
         } else if(keccak256(nodeType) == keccak256("MN")) {
             fees += mnCollateralRequirement;
         } else if(keccak256(nodeType) == keccak256("SN")) {
             fees += snCollateralRequirement;
         }
         return (fees * (1 ether));
    }

    function removeContract(uint index) public {
	    address lenderAddress = lendingContractsMappingByLender[msg.sender][index].lenderAddress;
	    assert(msg.sender == lenderAddress);

        address borrowerAddress = lendingContractsMappingByLender[msg.sender][index].borrowerAddress;
        uint borrowerIndex = lendingContractsMappingByLender[msg.sender][index].borrowerIndex;
        uint lenderIndex = lendingContractsMappingByLender[msg.sender][index].lenderIndex;
        address contractLookup = lendingContractsMappingByLender[msg.sender][index].lendingContractAddress;
        uint mainIndex = lendingContractsMappingByLender[msg.sender][index].index;
        
        uint lenderCount = lenderCountMapping[msg.sender];
        uint borrowerCount = borrowerCountMapping[borrowerAddress];
        
	    // Rotate end mappings to current index
        rotateLastLenderContract(msg.sender, lenderIndex, lenderCount, borrowerIndex, mainIndex);
        rotateLastBorrowerContract(borrowerAddress, borrowerIndex, borrowerCount, lenderIndex, mainIndex);
        rotateLastMainContract(mainIndex, lenderIndex, borrowerIndex);
        
    	// Delete last contracts in mappings after rotation
        delete lendingContractsMappingByLender[msg.sender][lenderCount - 1];
        delete lendingContractsMappingByBorrower[borrowerAddress][borrowerCount - 1];
        delete lendingContractMapping[contractLookup];
        delete lendingContractCountMapping[lendingContractCount - 1];

        lenderCountMapping[msg.sender]--;
        borrowerCountMapping[borrowerAddress]--;
        lendingContractCount--;

        NodeLender(contractLookup).deleteContract();
    }
    
    function resetContract(uint index, string side) public {
	    assert(keccak256(side) == keccak256("lender") || keccak256(side) == keccak256("borrower"));
        address borrowerAddress;
	    address lenderAddress;
	    uint lenderIndex;
	    uint mainIndex;
	    address contractLookup;
        if(keccak256(side) == keccak256("borrower")) {
	        borrowerAddress = msg.sender;
		    lenderAddress = lendingContractsMappingByBorrower[msg.sender][index].lenderAddress;
		    lenderIndex = lendingContractsMappingByBorrower[msg.sender][index].lenderIndex;
		    mainIndex = lendingContractsMappingByBorrower[msg.sender][index].index;
		    contractLookup = lendingContractsMappingByBorrower[msg.sender][index].lendingContractAddress;
		
	    } else {
		    borrowerAddress = lendingContractsMappingByLender[msg.sender][index].borrowerAddress;
		    lenderAddress = msg.sender;
		    lenderIndex = index;
		    mainIndex = lendingContractsMappingByLender[msg.sender][index].index;
		    contractLookup = lendingContractsMappingByLender[msg.sender][index].lendingContractAddress;
	    }
	    assert(msg.sender == lenderAddress || msg.sender == borrowerAddress);

	    lendingContractsMappingByLender[lenderAddress][lenderIndex].available = true;
    	lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerAddress = address(0);
	    lendingContractCountMapping[mainIndex].available = true;
	    lendingContractCountMapping[mainIndex].borrowerAddress = address(0);
	    lendingContractMapping[contractLookup].available = true;
	    lendingContractMapping[contractLookup].borrowerAddress = address(0);

        uint borrowerIndex = lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerIndex;
        uint borrowerCount = borrowerCountMapping[borrowerAddress];

	rotateLastBorrowerContract(borrowerAddress, borrowerIndex, borrowerCount, lenderIndex, mainIndex);
        delete lendingContractsMappingByBorrower[borrowerAddress][borrowerCount - 1];
        borrowerCountMapping[borrowerAddress]--;
        NodeLender(contractLookup).resetContract();
    }
    
    function rotateLastLenderContract(address lender, uint lenderIndex, uint lenderCount, uint borrowerIndex, uint mainIndex) internal {
        lendingContractsMappingByLender[lender][lenderIndex] = lendingContractsMappingByLender[lender][lenderCount - 1];
        lendingContractsMappingByLender[lender][lenderIndex].lenderIndex = lenderIndex;
        lendingContractsMappingByLender[lender][lenderIndex].borrowerIndex = borrowerIndex;
        lendingContractsMappingByLender[lender][lenderIndex].index = mainIndex;
    }
    
    function rotateLastBorrowerContract(address borrower, uint borrowerIndex, uint borrowerCount, uint lenderIndex, uint mainIndex) internal {
        lendingContractsMappingByBorrower[borrower][borrowerIndex] = lendingContractsMappingByBorrower[borrower][borrowerCount - 1];
        lendingContractsMappingByBorrower[borrower][borrowerIndex].borrowerIndex = borrowerIndex;
        lendingContractsMappingByBorrower[borrower][borrowerIndex].lenderIndex = lenderIndex;
        lendingContractsMappingByBorrower[borrower][borrowerIndex].index = mainIndex;
    }
    
    function rotateLastMainContract(uint mainIndex, uint lenderIndex, uint borrowerIndex) internal {     
        lendingContractCountMapping[mainIndex] = lendingContractCountMapping[lendingContractCount - 1];
        lendingContractCountMapping[mainIndex].lenderIndex = lenderIndex;
        lendingContractCountMapping[mainIndex].borrowerIndex = borrowerIndex;
        lendingContractCountMapping[mainIndex].index = mainIndex;
        address newContractAddress = lendingContractCountMapping[lendingContractCount - 1].lendingContractAddress;
        lendingContractMapping[newContractAddress].lenderIndex = lenderIndex; 
        lendingContractMapping[newContractAddress].borrowerIndex = borrowerIndex; 
        lendingContractMapping[newContractAddress].index = mainIndex;     
    }

    function getContractAddress(address userAddress, uint index, string side) public view returns (address) {
        assert(keccak256(side) == keccak256("lender") || keccak256(side) == keccak256("borrower"));
        if(keccak256(side) == keccak256("lender")) {
            return lendingContractsMappingByLender[userAddress][index].lendingContractAddress;
        }
        return lendingContractsMappingByBorrower[userAddress][index].lendingContractAddress;
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
       
    function contractBorrowerTransfer(address contractAddress, address to, uint value) public returns (bool) {
        return NodeLender(contractAddress).borrowerTransfer(to, value);
    }

    function rewardDispersals(uint index) public {
        uint indexTracker = index;
        for (uint i = 0; i < 100; i++) {
             indexTracker++;
             if(indexTracker >= lendingContractCount) {
                  indexTracker = 0;
             }
             address contractLookup = lendingContractCountMapping[indexTracker].lendingContractAddress;
             NodeLender(contractLookup).disperseRewards();
        }
    }
}

contract NodeLender {

    address public lender;
    address public borrower;

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

    function disperseRewards() public {
        if(!available && borrower != address(0)) {
            int dispersalAmount = int(address(this).balance) - (int(nodeCollateralAmount) + int(originationFee * (1 ether)));
            if(dispersalAmount > 0) {
                uint lenderPayment = uint(dispersalAmount / 100) * lenderSplit;
                uint borrowerPayment = (uint(dispersalAmount) - lenderPayment);
                lender.transfer(lenderPayment);
                borrower.transfer(borrowerPayment);
                lastPaid = block.number;
                lastRewardAmount = uint(dispersalAmount);
            }
        }
    }
    
    // borrowerTransfer allows borrower to send a tx to verify node (must be less than 1 etho) - value is in wei
    function borrowerTransfer(address to, uint value) public lenderOrBorrower returns (bool) {
        assert(address(this).balance >= value && value < (1 ether) && borrowerTxAllowance[borrower] < 5);
        borrowerTxAllowance[borrower]++;
        to.transfer(value);
        emit logSender(address(this));
        emit logReceiver(to);
        return true;
    }

    // Will refund 90% origination fee if lender cancels within 50000 blocks of borrower agreement
    function resetContract() public lenderOrBorrower() {
        assert(!available);
        if(tx.origin == lender) {
            if((block.number - borrowerDeploymentBlock) < 50000) {
                borrower.transfer(((originationFee / 100) * 90) * (1 ether));
            } else {
                borrowerTxAllowance[borrower] = 0;
            }        
        }
        borrowerDeploymentBlock = 0;        
        available = true;
        borrower = address(0);
        lastPaid = 0;  
    }
    
    function deleteContract() public onlyLender() {
        if((block.number - borrowerDeploymentBlock) < 50000 && !available) {
            borrower.transfer(originationFee * (1 ether));
        }
        selfdestruct(lender);
    }
    
    function setBorrower(address newBorrower) payable public returns (bool) {
        assert(available && msg.value == (originationFee * (1 ether)));
        borrower = newBorrower;
        borrowerDeploymentBlock = block.number;
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
