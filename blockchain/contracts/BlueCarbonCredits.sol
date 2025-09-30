// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlueCarbonCredits {
    address public owner;
    uint256 public creditPrice = 0.01 ether;

    mapping(address => uint256) public balances;

    event CreditsGenerated(address indexed to, uint256 amount);
    event CreditsPurchased(address indexed buyer, uint256 amount, uint256 totalPaid);
    event CreditsTransferred(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function generateCredits(address to, uint256 amount) external onlyOwner {
        balances[to] += amount;
        emit CreditsGenerated(to, amount);
    }

    function buyCredits(uint256 amount) external payable {
        uint256 totalCost = amount * creditPrice;
        require(msg.value >= totalCost, "Not enough ETH sent");
        
        // Check if owner has enough credits to sell
        require(balances[owner] >= amount, "Owner doesn't have enough credits to sell");
        
        // Transfer credits from owner to buyer
        balances[owner] -= amount;
        balances[msg.sender] += amount;

        emit CreditsPurchased(msg.sender, amount, msg.value);
        emit CreditsTransferred(owner, msg.sender, amount);
    }

    function checkCredits(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function setPrice(uint256 newPrice) external onlyOwner {
        creditPrice = newPrice;
    }

    // Additional function to transfer credits between any two addresses (optional)
    function transferCredits(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient credit balance");
        require(to != address(0), "Cannot transfer to zero address");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        emit CreditsTransferred(msg.sender, to, amount);
    }

    // Function to check available credits for sale (owner's balance)
    function availableCreditsForSale() external view returns (uint256) {
        return balances[owner];
    }
}