// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Assessment is ERC20 {
    address public owner;

    constructor() ERC20("Prachi Mittal", "PM") {
        owner = msg.sender;
        _mint(msg.sender, 100);
    }
 
    // Mint function
    function mint(uint256 value) public {
        _mint(msg.sender, value);
    }

    // Burn function
    function burn(uint256 value) public {
        _burn(msg.sender, value);
    }

    // New: Transfer function (already inherited from ERC20 but adding for frontend)
    function transferTokens(address to, uint256 value) public returns (bool) {
        return transfer(to, value);
    }

    // New: Function to get balance of any account
    function getBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
