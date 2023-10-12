/*
* Mumbai testnet deployment: 
*  > transaction hash:    0xe86ffe9fcecf7c0d2e262f3ab2e3cc2275041d136d41fd3eecc1c5bc25f97fd0
*  > contract address:    0xb7f3E8BEFB36d4Eb01b2e7fd62FF30f304B942b7
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/

const readline = require('readline');
const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer, network, accounts) {
  const defaultAccount = accounts[0];
  console.log("Current network:", network);

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
