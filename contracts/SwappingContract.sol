//SPDX-License-Identifer:MIT
pragma solidity 0.8.7;

//Here importing the IERC20 interface 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//I have divided it into 
//1.setting the price of token "CAR"  to default 1
//2.Getting the price of token "CAR" 

//NOTE : this swappingTokens contract is nothing but pool

contract SwappingTokens{
    address public appleTokenAddress;                  //token address of apple token
    address public batTokenAddress;                    //token address of bat token
    address public carTokenAddress;                    //token address of car token
    uint256 public carTokenPrice=1;                    //default CAR token price=1

    //STEP-1 :getting the token contract addresses
     constructor(address _appleTokenAddress,address _batTokenAddress,address _carTokenAddress){
        require(_appleTokenAddress!=address(0) && _batTokenAddress!=address(0) && _carTokenAddress!=address(0),"invalid token address");
        appleTokenAddress=_appleTokenAddress;
        batTokenAddress=_batTokenAddress;
        carTokenAddress=_carTokenAddress;
    }

    //STEP-2 :Adding liquidity

    //STEP-2.1 : Adding AP/CR liquidity to the pool
    //NOTE: the liquidity provider should approve the swapping contract to use the tokens
    function apple_To_Car_Liquidity(address _apTokenAddress,uint256 _apTokenAMt,address _crTokenAddress,uint256 _crTokenAmt)external{

    }

    //STEP-2.2 : Adding BT/CR liquidity to the pool
    //NOTE: the liquidity provider should approve the swapping contract to use the tokens
    function bat_To_Car_Liquidity(address _apTokenAddress,uint256 _apTokenAMt,address _crTokenAddress,uint256 _crTokenAmt)external{
        
    }

    //STEP-3 : getting the "CAR" token reserves
    

    //STEP-4 : swapping "APPLE" || "BAT" => "CAR"
    function swap(address _token,uint amount)external{

    }

    //STEP-5: unswaping the swapped tokens
    function unSwap(address _token, uint amount)external{

    }

    //getting the APPLE, BAT, CAR token address 
    //Setting CAR price
    function setCarPrice(uint _price)external returns(uint256 price_){
        carTokenPrice=_price;
        return carTokenPrice;
    }

    //Getting the carTokenPrice
    function getCarPrice()external view returns(uint256 price_){
        return carTokenPrice;
    }
}