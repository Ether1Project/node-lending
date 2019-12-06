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
    }
    
    constructor() public {
        owner = msg.sender;
        lendingContractCount = 0;
        gnCollateralRequirement = 30000;
        mnCollateralRequirement = 15000;
        snCollateralRequirement = 5000;
    }
    
    // This function is used to deploy a new lending contract - fee is desired origination fee
    function createLendingContract (uint split, string nodeType, uint fee) public payable {
        assert(keccak256(nodeType) == keccak256("GN") || keccak256(nodeType) == keccak256("MN") || keccak256(nodeType) == keccak256("SN"));

        if(keccak256(nodeType) == keccak256("GN")){ assert(msg.value == (gnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("MN")){ assert(msg.value == (mnCollateralRequirement * (1 ether))); }
        else if(keccak256(nodeType) == keccak256("SN")){ assert(msg.value == (snCollateralRequirement * (1 ether))); }
        
        address newLendingContract = new NodeLender(split, nodeType);
        
        lendingContract memory newContract = lendingContract({nodeType:nodeType, index:lendingContractCount, lenderIndex:lenderCountMapping[msg.sender], borrowerIndex:0, lenderAddress:msg.sender, borrowerAddress:msg.sender, lendingContractAddress:newLendingContract, originationFee:fee, available:true});
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
    
    function removeContract(uint index) public {
        address borrowerAddress = lendingContractsMappingByLender[msg.sender][index].borrowerAddress;
        uint borrowerIndex = lendingContractsMappingByLender[msg.sender][index].borrowerIndex;
        uint lenderIndex = lendingContractsMappingByLender[msg.sender][index].lenderIndex;
        address contractAddress = lendingContractsMappingByLender[msg.sender][index].contractAddress;
        uint mainIndex = lendingContractsMappingByLender[msg.sender][index].index;
        
        uint lenderCount = lenderCountMapping[msg.sender];
        uint borrowerCount = borrowerCountMapping[borrowerAddress];
        
        rotateLastLenderContract(msg.sender, lenderIndex, lenderCount);
        rotateLastBorrowerContract(borrowerIndex, borrowerCount);
        rotateLastMainContract(mainIndex);
        
        lenderCountMapping[msg.sender]--;
        borrowerCountMapping[borrowerAddress]--;
        
        delete lendingContractsMappingByLender[msg.sender][index];
        delete lendingContractsMappingByBorrower[borrowerAddress][borrowerIndex];
        delete lendingContractMapping[contractAddress];
        delete lendingContractCountMapping[mainIndex];
    }
    
    function rotateLastLenderContract(address lender, uint index, uint count) internal {
        lendingContractsMappingByLender[lender][index];
    }
    
    function rotateLastBorrowerContract(uint index) internal {
        
    }
    
    function rotateLastMainContract(uint index) internal {
        
    }
    
    function 
    function getTotalContractCount() public view returns (uint) {
        return lendingContractCount;
    }
    
    function getLenderContractCount(address lender) public view returns (uint) {
        return lenderCountMapping[lender];
    }
    
    function getBorrowerContractCount(address borrower) public view returns (uint) {
        return lenderCountMapping[borrower];
    }
    
    function updateGnCollateralRequirement(uint requirement) public onlyOwner() {
        gnCollateralRequirement = requirement;
    }
    
    function updateMnCollateralRequirement(uint requirement) public onlyOwner() {
        mnCollateralRequirement = requirement;
    }
    
    function updateSnCollateralRequirement(uint requirement) public onlyOwner() {
        snCollateralRequirement = requirement;
    }
    
    // Start remote contract interactions
    function contractTransfer(address contractAddress, address to, uint value) public returns (bool) {
        return NodeLender(contractAddress).transfer(to, value);
    }
    
    function contractBorrowerTransfer(address contractAddress, address to, uint value) public returns (bool) {
        return NodeLender(contractAddress).borrowerTransfer(to, value);
    }

    function contractUpdateBorrowerTxAllowance(address contractAddress, uint allowance) public {
        NodeLender(contractAddress).updateBorrowerTxAllowance(allowance);
    }
    
    function contractUpdateThreshold(address contractAddress, uint threshold) public {
        NodeLender(contractAddress).updateThreshold(threshold);
    }
    
    function contractWithdraw(address contractAddress) public {
        NodeLender(contractAddress).withdraw();
    }
    
    function contractUpdateLender(address contractAddress, address newLender) public {
        NodeLender(contractAddress).updateLender(newLender);
    }

    function coontractUpdateBorrower(address contractAddress, address newBorrower) public {
        NodeLender(contractAddress).updateBorrower(newBorrower);
    }
    
    modifier onlyOwner {
        require(
            msg.sender == owner
        );
        _;
    }
}

contract NodeLender {

    address public lender;
    address public borrower;

    uint public paymentThreshold;
    uint public lenderSplit;
    uint public borrowerTxAllowance;
    bool public available;
    
    uint public originationFee;
    
    string public nodeType;
    uint nodeCollateralAmount;
    
    // On Deployment - A Split of 10 Means 10% Lender Split
    constructor(uint split, string contractType, uint fee) public payable {
        assert(fee > 100);
        lender = msg.sender;
        borrower = address(0);
        lenderSplit = split;
        paymentThreshold = 100;
        borrowerTxAllowance = 2;
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

    function resetContract() public lenderOrBorrower() {
        available = true;
        borrower = address(0);
    }
    
    function deleteContract() public onlyLender() {
        selfdestruct(lender);
    }
    
    function setBorrower(address newBorrower) public payable () {
        assert(available && msg.value == (originationFee * (1 ether)));
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
