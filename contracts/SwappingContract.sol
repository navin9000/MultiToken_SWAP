//SPDX-License-Identifier:MIT
pragma solidity 0.8.7;

//Here importing the IERC20 interface 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//Importing the ERC20 contract 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SwappingTokens is ERC20{
    uint256 public carTokenPrice;                    //default CAR token price=1
    address public owner;                            // deployer of the contract

    //STEP-1 :Creating the "CAR" contract with unlimited supply of tokens
     constructor()ERC20("CAR","CR"){
        carTokenPrice=1;
        owner=msg.sender;
    }

    //modifier
    //To check the owner
    modifier onlyOwner{
        require(msg.sender==owner,"you are not the owner");
        _;
    }


    //STEP-2 : swapping "APPLE" || "BAT" => "CAR"
    //Before swapping tokens to "CAR" tokens the token contract should approve the swapping contract to spend
    //Working of swap() function:
    // 1.checking for _token address is valid or not
    // 2.getting price of car Token
    // 3.carToken = amount/price is the formula to mint the desired no of car tokens
    // 4.minting the cartokens
    // 5.Before all this, the user should approve the swapping contract to use the funds behalf of user
    // 6. The transferFrom function calls and sends the AP/BT tokens to the contract.
    function swap(address _token,uint amount)external{
        require(_token!=address(0),"invalid token addresss");
        uint256 price= getCarPrice();
        uint256 carTokenAmt = amount/price;
        _mint(msg.sender,carTokenAmt);                                                   //here minting "CAR" tokens to the caller
        bool check = IERC20(_token).transferFrom(msg.sender,address(this),amount);    
        require(check,"transferFrom failed");                                            //getting  the tokens approved to contract 
    }


    //STEP-3: unswaping the swapped tokens CAR --> APPLE/BAT
    //Here the "CAR" tokens are going to burn and transfering the approved tokens back
    //"convert the amount of the output token to an equivalent amount of input _token"
    //Working of unSwap():
    // 1.amount < balanceOf(msg.sedner)
    // 2.if price car token is not hanged, user get the equivalent amount of tokens AP/BT
    //   else, the user required to use less CR to unswap to get more AP/BT
    // 3.tokens=amount*price;
    // 4.contract balance checking, is it having enough funds or not 
    // 5.transfering the tokens to msg.sender 
    // 6.the car tokens are burnt, so totalSupply decreases
    function unSwap(address _token, uint amount)external{
        require(_token!=address(0),"invalid token addresss");
        require(amount <= balanceOf(msg.sender),"insuffiecient balance");
        uint256 price= getCarPrice();
        uint256 tokensToTransfer = amount*price;
        uint256 balance=IERC20(_token).balanceOf(address(this));
        require(tokensToTransfer<=balance,"car token price increased, insufficient balance in contract");
        IERC20(_token).transfer(msg.sender,tokensToTransfer);                  
        _burn(msg.sender,amount);                                           
    }

    //STEP-4:
    //Setting carTokenPrice
    function setCarPrice(uint256 _price)external onlyOwner{
        require(_price>1,"check the price");
        carTokenPrice=_price;
    }
    //STEP-5:
    //Getting the carTokenPrice
    function getCarPrice()public view returns(uint256 price_){
        return carTokenPrice;
    }
}