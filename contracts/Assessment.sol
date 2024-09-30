// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Assessment is ERC20 {
    address public owner;

    constructor() ERC20("Prachi Mittal", "PM") {
        owner = msg.sender;
        _mint(msg.sender, 100);
    }
 
    function mint(uint256 value) public{
        _mint(msg.sender, value);
    }

    function burn(uint256 value) public {
       

        _burn(msg.sender, value);
    }
}