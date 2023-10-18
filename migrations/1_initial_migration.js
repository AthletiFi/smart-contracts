
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0x1a2b27d0321d1844436830d9e52079fa0500c51ef47002cc2195cfb5bfaa4535
*  > contract address:    0xb20688A7A905908082ECA8EE89784DdcF9784504
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/
/*
* Polygon mainnet deployment: 
*  > transaction hash:    0x7f1b29e253c1c352dc57bca6b10eb7d7efa498aa75535d22b96036d0ce7bd5d8 / 0x37646dc38b1accfd5c05aa251deec623c78d67f7674bb2f895e9ad1a9e490894
*  > contract address:    0xAd966f7a158E728eA89ba062b627ee37c9d29Cc5 / 0xCF75983f36A3eB362BcBAC50E0C23B435A8c1282
*  > account:             0x0E3413C7d1aEBD19D07111Cb7D6D4885cc680c52
*/

require('../globalErrorHandler');

const prompt = require('prompt-sync')();
const { handleKnownErrors, checkConnection } = require('./utils');
const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer, network, accounts) {
    // Check connection before starting the migration
    await checkConnection(web3);  // Note: pass the web3 instance to the utility function
    
   console.log("Current network:", network);

  try {
    if (network === "polygon" || network === "mumbai") {
      // Fetch current gas price from the network
      const currentGasPriceInWei = await web3.eth.getGasPrice();
      const currentGasPriceInGwei = web3.utils.fromWei(currentGasPriceInWei, 'gwei');
  
      // Prompt for gas price if on Polygon mainnet or testnet
      const gasPrice = prompt(`Enter the gas price in Gwei (recommended: ${currentGasPriceInGwei} Gwei): `);
      if (!gasPrice || isNaN(gasPrice) || parseFloat(gasPrice) <= 0) throw new Error("Invalid gas price entered.");

      // Convert gas price from Gwei to Wei
      const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');

      console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
      
      await deployer.deploy(Migrations, { gasPrice: gasPriceInWei });
    } else {
      await deployer.deploy(Migrations);
    }

  } catch (error) {
    handleKnownErrors(error);
  }
};