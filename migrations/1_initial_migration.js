
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0x1a2b27d0321d1844436830d9e52079fa0500c51ef47002cc2195cfb5bfaa4535
*  > contract address:    0xb20688A7A905908082ECA8EE89784DdcF9784504
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/

const readline = require('readline');
const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer, network, accounts) {
  const defaultAccount = accounts[0];
  console.log("Current network:", network);
  console.log(readline);
  console.log("the fuckkkk");
  return new Promise(async (resolve, reject) => {
    try {
      if (network === "polygon" || network === "mumbai") {
        // Fetch current gas price from the network
        const currentGasPriceInWei = await web3.eth.getGasPrice();
        const currentGasPriceInGwei = web3.utils.fromWei(currentGasPriceInWei, 'gwei');
   
        // Prompt for gas price if on Polygon mainnet or testnet
        const gasPrice = await new Promise((response) => {
          const gasPrompt = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          gasPrompt.question(`Enter the gas price in Gwei (recommended: ${currentGasPriceInGwei} Gwei): `, (price) => {
            gasPrompt.close();
            if (!price || isNaN(price) || parseFloat(price) <= 0) throw new Error("Invalid gas price entered.");
            response(price);
          });
        });

        // Convert gas price from Gwei to Wei
        const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');

        console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
        
        await deployer.deploy(Migrations, { gasPrice: gasPriceInWei });
      } else {
        await deployer.deploy(Migrations);
      }

      resolve();
    } catch (error) {
      console.error(error.message);
      reject(error);
    }
  });
};


// NEW CODE TO TRY: 10/12/2023

// const prompt = require('prompt-sync')();
// const Migrations = artifacts.require("Migrations");

// module.exports = async function(deployer, network, accounts) {
//   const defaultAccount = accounts[0];
//   console.log("Current network:", network);

//   try {
//     if (network === "polygon" || network === "mumbai") {
//       // Fetch current gas price from the network
//       const currentGasPriceInWei = await web3.eth.getGasPrice();
//       const currentGasPriceInGwei = web3.utils.fromWei(currentGasPriceInWei, 'gwei');
   
//       // Prompt for gas price if on Polygon mainnet or testnet
//       const gasPrice = prompt(`Enter the gas price in Gwei (recommended: ${currentGasPriceInGwei} Gwei): `);
//       if (!gasPrice || isNaN(gasPrice) || parseFloat(gasPrice) <= 0) throw new Error("Invalid gas price entered.");
      
//       // Convert gas price from Gwei to Wei
//       const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');

//       console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
      
//       await deployer.deploy(Migrations, { gasPrice: gasPriceInWei });
//     } else {
//       await deployer.deploy(Migrations);
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };
