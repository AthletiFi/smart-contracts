
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0x1a2b27d0321d1844436830d9e52079fa0500c51ef47002cc2195cfb5bfaa4535
*  > contract address:    0xb20688A7A905908082ECA8EE89784DdcF9784504
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/

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