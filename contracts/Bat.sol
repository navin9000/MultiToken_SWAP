//SPDX-License-Identifier:MIT
pragma solidity 0.8.7;

//Importing the ERC20 contract 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//here creating a contract with token name as  "BAT" and symbol as "BT"
//And minting the 1000000 tokens to the deployer address
contract BatToken is ERC20{
    constructor() ERC20("BAT", "BT") {
        _mint(msg.sender, 100000);
    }
}
    
