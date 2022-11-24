//SPDX-Licens-Identifier:MIT
pragma solidity 0.8.7;

//Importing the ERC20 contract 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//here creating a contract with token name as  "CAR" and symbol as "CR"
//And minting the 1000000 tokens to the deployer address

contract CarToken is ERC20{
    constructor() ERC20("CAR", "CR") {
        _mint(msg.sender, 1000000);
    }
}
    
