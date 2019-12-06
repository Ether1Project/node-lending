pragma solidity 0.4.23;

contract LenderManagement {
    mapping (address => mapping(uint => lendingContract)) public lendingContractsMappingByLender;
    mapping (address => mapping(uint => lendingContract)) public lendingContractsMappingByBorrower;
    mapping(address => uint) lenderCountMapping;
    mapping(address => uint) borrowerCountMapping;
    
    mapping(address => lendingContract) public lendingContractMapping;
    mapping(uint => lendingContract) public lendingContractCountMapping;
    
    uint lendingContractCount;
    
    struct lendingContract {
        string nodeType;
        uint index;
        uint lenderIndex;
        uint borrowerIndex;
        address lenderAddress;
        address borrowerAddress;
        address lendingContractAddress;
        bool available;
    }
    
    constructor() public {
        lendingContractCount = 0;
    }
    
    // This function is used to deploy a new lending contract
    function createLendingContract (uint split, string nodeType) public {
        assert(keccak256(nodeType) == keccak256("GN") || keccak256(nodeType) == keccak256("MN") || keccak256(nodeType) == keccak256("SN"));
        
        address newLendingContract = new NodeLender(split);
        
        lendingContract memory newContract = lendingContract({nodeType:nodeType, index:lendingContractCount, lenderIndex:lenderCountMapping[msg.sender], borrowerIndex:0, lenderAddress:msg.sender, borrowerAddress:msg.sender, lendingContractAddress:newLendingContract, available:true});
        lendingContractsMappingByLender[msg.sender][lenderCountMapping[msg.sender]] = newContract;
        lenderCountMapping[msg.sender]++;
        
        lendingContractMapping[newLendingContract] = newContract;
        lendingContractCountMapping[lendingContractCount] = newContract;
        lendingContractCount++;
    } 
    
    // This function is used for a borrower to select an available contract
    function borrowerContractSelection(address contractAddress) public {
        assert(lendingContractMapping[contractAddress].available == true);
        
        address lenderAddress = lendingContractMapping[contractAddress].lenderAddress;
        uint lenderIndex = lendingContractMapping[contractAddress].lenderIndex;
        lendingContractsMappingByLender[lenderAddress][lenderIndex].available == false; 
        lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerAddress == msg.sender;
        lendingContractsMappingByLender[lenderAddress][lenderIndex].borrowerIndex == borrowerCountMapping[msg.sender];
        
        uint mainIndex = lendingContractMapping[contractAddress].index;
        lendingContractCountMapping[mainIndex].available == false;
        lendingContractCountMapping[mainIndex].borrowerAddress == msg.sender;
        lendingContractCountMapping[mainIndex].borrowerIndex == borrowerCountMapping[msg.sender];
        
        lendingContractMapping[contractAddress].available == false;
        lendingContractMapping[contractAddress].borrowerAddress == msg.sender;
        lendingContractMapping[contractAddress].borrowerIndex == borrowerCountMapping[msg.sender];
        
        lendingContractsMappingByBorrower[msg.sender][borrowerCountMapping[msg.sender]] = lendingContractMapping[contractAddress];
    }
}

contract NodeLender {

    address public lender;
    address public borrower;

    uint public paymentThreshold;
    uint public lenderSplit;
    uint public borrowerTxAllowance;

    // On Deployment - A Split of 10 Means 10% Lender Split
    constructor(uint split) public {
        lender = msg.sender;
        lenderSplit = split;
        paymentThreshold = 100;
        borrowerTxAllowance = 2;
    }

    function() payable external {
        if(msg.value < (paymentThreshold * (1 ether))) {
            uint lenderPayment = (msg.value / 100) * lenderSplit;
            uint borrowerPayment = (msg.value - lenderPayment);
            lender.transfer(lenderPayment);
            borrower.transfer(borrowerPayment);
        }
    }

    // transfer allows lender to transfer any remaining contract balance(ie node collateral) - value is in wei
    function transfer(address to, uint value) public onlyLender returns (bool) {
        assert(address(this).balance >= value);
        to.transfer(value);
        return true;
    }
    
    // borrowerTransfer allows borrower to send a tx to verify node (must be less than 1 etho) - value is in wei
    function borrowerTransfer(address to, uint value) public onlyBorrower returns (bool) {
        assert(address(this).balance >= value && value < (1 ether) && borrowerTxAllowance > 0);
        borrowerTxAllowance--;
        to.transfer(value);
        return true;
    }

    // updateBorrowerTxAllowance allows lender to allocate borrower more tranfers
    function updateBorrowerTxAllowance(uint allowance) public onlyLender() {
        borrowerTxAllowance = allowance;
    }
    
    function updateThreshold(uint threshold) public onlyLender() {
        paymentThreshold = threshold;
    }

    function withdraw() public onlyLender() {
        lender.transfer(address(this).balance);
    }

    function updateLender(address newLender) public onlyLender() {
        lender = newLender;
    }

    function updateBorrower(address newBorrower) public onlyLender() {
        borrower = newBorrower;
    }

    modifier onlyLender {
        require(
            msg.sender == lender
        );
        _;
    }

    modifier onlyBorrower {
        require(
            msg.sender == borrower
        );
        _;
    }

    modifier lenderOrBorrower() {
        require(
            msg.sender == lender || msg.sender == borrower
        );
        _;
    }

}
