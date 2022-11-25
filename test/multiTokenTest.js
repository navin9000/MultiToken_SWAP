const { ethers } = require("hardhat");
const { time,loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Deploying Apple, Bat and SwappingContract",function(){


    async function deployLoadfixture(){
        const [owner,addr1,addr2,addr3,addr4]=await ethers.getSigners();

        //Apple contract deployment by owner
        const tokenFactory = await ethers.getContractFactory("AppleToken");
        const appleContractObj = await tokenFactory.deploy();
        await appleContractObj.deployed();
        console.log("Apple token contract address  :",appleContractObj.address);

        //Bat contract deployment by addr1
        const tokenFactory2 = await ethers.getContractFactory("BatToken");
        const batContractObj = await tokenFactory2.connect(addr1).deploy();
        await batContractObj.deployed();
        console.log("Bat token contract address    :",batContractObj.address);

        //swapping contract deployment by addr2
        const swappingFactory = await ethers.getContractFactory("SwappingTokens");
        const SwappingContractObj = await swappingFactory.connect(addr2).deploy();
        await SwappingContractObj.deployed();
        console.log("swapping contract address     :",SwappingContractObj.address);
        return [owner,addr1,addr2,addr3,addr4,appleContractObj,batContractObj,SwappingContractObj];
    }

    describe("Checking the token balances of the deployers",function(){
        it("token balances",async()=>{
            const [owner,addr1,addr2,addr3,addr4,appleContractObj,batContractObj,SwappingContractObj]= await loadFixture(deployLoadfixture);
         
            //owner address printing
            console.log("owner address                 :",owner.address);
            //getting appleTokens for owner address
            const appleTokens = await appleContractObj.balanceOf(owner.address);
            console.log("owner balance of apple tokens :",appleTokens);

            //checking the Bat token balanceOf(addr1)
            console.log("addr1 address                 :",addr1.address);
            const batTokens = await batContractObj.balanceOf(addr1.address);
            console.log("addr1 balance of bat tokens   :",batTokens);
        });


        //steps to follow :
        //owner ----> approve swapping contract
        //owner --------> swap() in swapping contract
        // mints CAR tokens -----------> owner
        //Apple tokens transfers -------->  swapping contract
        it("swpping the APPLE to CAR tokens :",async()=>{
            const [owner,addr1,addr2,addr3,addr4,appleContractObj,batContractObj,SwappingContractObj]= await loadFixture(deployLoadfixture);

            //getting the current Price of car token
            console.log("before :")
            console.log("car token price :",await SwappingContractObj.getCarPrice());


            //setting the car token price
            await SwappingContractObj.connect(addr2).setCarPrice(2);
            console.log("after");
            console.log("car token price :",await SwappingContractObj.getCarPrice());

            //here first approving the swapping contract to how many APPLE/BAT tokens to swap
            //owner address giving approval to Swapping contract of 100 APPLE tokens
            await appleContractObj.connect(owner).approve(SwappingContractObj.address,100);
            await SwappingContractObj.connect(owner).swap(appleContractObj.address,100);     //called swap()

            //checking the balance of APPLE tokens of swapping contract
            const apBalance = await appleContractObj.balanceOf(SwappingContractObj.address);
            console.log("apple tokens  of swapping contract :",apBalance);

            //checking the balance of CAR tokens of Owner
            const carBalance = await SwappingContractObj.balanceOf(owner.address);
            console.log("car tokens of owner                :",carBalance);

        });


        it("After changing the price of CAR ,unSwapping CAR to APPLE",async()=>{
            const [owner,addr1,addr2,addr3,addr4,appleContractObj,batContractObj,SwappingContractObj]= await loadFixture(deployLoadfixture);
            //swapping tokens APPLE to CAR
            //owner address giving approval to Swapping contract of 100 APPLE tokens
            await appleContractObj.connect(owner).approve(SwappingContractObj.address,100);
            await SwappingContractObj.connect(owner).swap(appleContractObj.address,100);

            //Changing the Price of CAR tokens
            //getting the current Price of car token
            console.log("before :")
            console.log("car token price :",await SwappingContractObj.getCarPrice());
            //setting the car token price
            await SwappingContractObj.connect(addr2).setCarPrice(2);
            console.log("after");
            console.log("car token price :",await SwappingContractObj.getCarPrice());

            //unswapping the CAR tokens to APPLE
            // 1.here the call reverts with reason : "the price of car token changed,insufficient balance"
            //await SwappingContractObj.connect(owner).unSwap(appleContractObj.address,100);

            //2.unswaps the tokens back to APPLE , ration 2 APPLES --> 1 CAR
            await SwappingContractObj.connect(owner).unSwap(appleContractObj.address,50);

            //checking the balance of APPLE tokens of swapping contract
            const apBalance = await appleContractObj.balanceOf(SwappingContractObj.address);
            console.log("apple tokens  of swapping contract :",apBalance);

            //checking the balance of CAR tokens of Owner
            const carBalance = await SwappingContractObj.balanceOf(owner.address);
            console.log("car tokens of owner                :",carBalance);

        });

        it("swapping 100 APPLE -> 100 CAR -> 100 BAT tokens",async()=>{
            const [owner,addr1,addr2,addr3,addr4,appleContractObj,batContractObj,SwappingContractObj]= await loadFixture(deployLoadfixture);
            // Now the swapping contract has, 
            // APPLE = 0 tokens 
            // BAT   = 0 tokens 
            // CAR   = 0 tokens

            //now the APPLE contract Owner has,
            // APPLE = 100000 tokens 
            // BAT   = 0 tokens 
            // CAR   = 0 tokens

            //now the BAT contract Owner(addr1) has,
            // APPLE = 0 tokens 
            // BAT   = 100000 tokens 
            // CAR   = 0 tokens


            //swapping [AP -> CR -> BT] for the Apple owner contract
            //step-1: swap AP->CR
            //step-2: swap BT->CR      add liquidty of BT tokens in the swapping contract

            //step-1: swapping tokens APPLE to CAR
            //owner address giving approval to Swapping contract of 100 APPLE tokens
            await appleContractObj.connect(owner).approve(SwappingContractObj.address,100);
            await SwappingContractObj.connect(owner).swap(appleContractObj.address,100);
            
            //step-2: swapping of tokens BAT to CAR
            await batContractObj.connect(addr1).approve(SwappingContractObj.address,100);
            await SwappingContractObj.connect(addr1).swap(batContractObj.address,100);

            // Now the contract has both 
            // APPLE = 100 tokens 
            // BAT   = 100 tokens
            // CAR   = 0 tokens

            //now the APPLE contract Owner has,
            // APPLE = 999900 tokens 
            // BAT   = 0 tokens 
            // CAR   = 100 tokens

            //now the BAT contract Owner(addr1) has,
            // APPLE = 0 tokens 
            // BAT   = 999900 tokens 
            // CAR   = 100 tokens

            //unswap CAR to BAT for Apple contract owner (CAR tokens burn here)
            await SwappingContractObj.connect(owner).unSwap(batContractObj.address,100);
            const apBal=await batContractObj.balanceOf(owner.address);
            console.log("BAT token balanceOf APPLe token owner :",apBal);

            // Now the contract has both 
            // APPLE = 100 tokens 
            // BAT   = 0 tokens
            // CAR   = 0 tokens

            //now the APPLE contract Owner has,
            // APPLE = 999900 tokens 
            // BAT   = 100 tokens 
            // CAR   = 0 tokens

            //now the BAT contract Owner(addr1) has,
            // APPLE = 0 tokens 
            // BAT   = 999900 tokens 
            // CAR   = 0 tokens
        });
    });


});
