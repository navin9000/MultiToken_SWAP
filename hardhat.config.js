require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env"});

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.7",
//   // networks:{
//   //   rinkeby:{
//   //     url:process.env.INFURA_KEY_URL,
//   //     accounts:[process.env.RINKEBY_TESTNET_PRIVATE_KEY],
//   //   },
//   // },
// };

//This configuration  for multiToken contract

module.exports = {
  solidity: "0.8.7",
  networks:{
    mumbai:{
      url:process.env.ALCHEMY_KEY_URL,
      accounts:[process.env.MUMBAI_TESTNET_PRIVATE_KEY],
    },
  },
};

// This configuration if for the Apple token contract configuration
module.exports = {
  solidity: "0.8.7",
  networks:{
    mumbai:{
      url:process.env.ALCHEMY_KEY_URL_APPLE,
      accounts:[process.env.MUMBAI_TESTNET_PRIVATE_KEY_APPLE],
    },
  },
};

// This configuration if for the BAT token contract configuration
module.exports = {
  solidity: "0.8.7",
  networks:{
    mumbai:{
      url:process.env.ALCHEMY_KEY_URL_BAT,
      accounts:[process.env.MUMBAI_TESTNET_PRIVATE_KEY_BAT],
    },
  },
};




// //this is for the assignment register and login page 

// module.exports = {
//   solidity: "0.8.7",
//   networks:{
//     goerli:{
//       url:process.env.ALCHEMY_KEY_URL,
//       accounts:[process.env.GOERLI_TESTNET_PRIVATE_KEY],
//     },
//   },
// };


// This is for reward based fundraising project
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.7",
//   networks:{
//     rinkeby:{
//       url:process.env.INFURA_KEY_URL,
//       accounts:[process.env.RINKEBY_TESTNET_PRIVATE_KEY],
//     },
//   },
// };


//here deploying to polyon mumbai testnet