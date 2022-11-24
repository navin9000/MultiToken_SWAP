//SPDX-License-Identifier:MIT
pragma solidity 0.8.7;

//Importing the ERC20 contract 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//here creating a contract with token name as  "APPLE" and symbol as "AP"
//And minting the 1000000 tokens to the deployer address
contract AppleToken is ERC20{

    constructor() ERC20("APPLE", "AP") {
        _mint(msg.sender, 100000);
    }
}
    
