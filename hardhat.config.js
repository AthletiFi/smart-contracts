// // require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
// // require("@nomiclabs/hardhat-etherscan");

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */


// module.exports = {
//   solidity: {
//     version: "0.8.20",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   defaultNetwork: "hardhat",
//   // defaultNetwork: "polygon_mumbai",
//   networks: {
//     hardhat: {
//     },
//     polygon_mumbai: {
//       url: "https://rpc-mumbai.maticvigil.com",
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   },
//   // etherscan: {
//   //   apiKey: process.env.POLYGONSCAN_API_KEY
//   // },
// };

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
};