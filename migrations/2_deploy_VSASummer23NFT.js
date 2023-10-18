
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0xa76d4057b8624b47801a7d78da0ca021c0d77bec6a6aaed5067126c93e796e49
*  > contract address:    0xD5274B9E5309540372e1c0Fa45db19aEE58A8961
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*

* Polygon Mainnet Deployment:
* Deploying 'VSASummer23NFT'
* --------------------------
* > transaction hash:    0x8cf2f6aeafafa7bb00f795f3a64e934a2925292888cf9572ecbfb98acccc624b
* > Blocks: 2            Seconds: 4
* > contract address:    0x6DF1a9d66Fd0a02A2A5d14dCAa17265C243376Cc
* > block number:        48867357
* > block timestamp:     1697639461
* > account:             0x0E3413C7d1aEBD19D07111Cb7D6D4885cc680c52
* > balance:             7.975420441
* > gas used:            2666771 (0x28b113)
* > gas price:           99 gwei
* > value sent:          0 MATIC
* > total cost:          0.264010329 MATIC
*/

require('../globalErrorHandler');

const prompt = require('prompt-sync')();
const { handleKnownErrors, checkConnection } = require('./utils');
const VSASummer23NFT = artifacts.require("VSASummer23NFT");
const truffleConfig = require('../truffle-config');

module.exports = async function(deployer, network, accounts) {
  try {
    await checkConnection(web3);  // Ensure connection before starting the migration
    await performMigration(deployer, network, accounts);
    console.log("Deployment successful!");
  } catch (error) {
    handleKnownErrors(error);
    // Exit the process with an error code to indicate a failed migration
    process.exit(1);
  }
};

async function performMigration(deployer, network, accounts) {
  const defaultAccount = accounts[0];
  console.log(`${defaultAccount} = 0xde3670c315cd69d81e90d3714788635aaf011860? (Mumbai)`)
  console.log(`${defaultAccount} = 0x0e3413c7d1aebd19d07111cb7d6d4885cc680c52? (Polygon mainnet))`)
  console.log("Current network:", network);

  /* This code block was commented out because the user prompts were causing network timeouts during deployment
  // Determine the initial owner address based on the network
  // let initialOwnerAddress = determineInitialOwner(network, defaultAccount);
  */

  const initialOwnerAddress = defaultAccount; // Hardcode the initial owner address for now
  console.log("Deploying with initial owner:", initialOwnerAddress);

  // Set the gas price and deploy the contract based on the network
  await setGasAndDeploy(network, deployer, initialOwnerAddress);
}

function determineInitialOwner(network, defaultAccount) {
  // Local development configurations (both for truffle develop and external Ganache/Geth)
  if (network === "development" || network === "develop") {
    return defaultAccount;
  } 
  // Polygon configurations
  else if (network === "mumbai" || network === "polygon") {
    return prompt(`Enter the initial owner address (or press enter for default): `) || defaultAccount;
  } else {
    throw new Error(`Unsupported network: ${network}. Please add configurations for this network in the migrations file.`);
  }
}

async function setGasAndDeploy(network, deployer, initialOwnerAddress) {
  if (network === "polygon" || network === "mumbai") {
    // Fetch current gas price from the network
    const currentGasPriceInWei = await web3.eth.getGasPrice();
    
/* This code block was commented out because the user prompts were causing network timeouts during deployment
 *        const currentGasPriceInGwei = web3.utils.fromWei(currentGasPriceInWei, 'gwei');
  *       // Prompt for gas price if on Polygon mainnet or testnet
   *      const gasPrice = prompt(`Enter the gas price in Gwei (recommended: ${currentGasPriceInGwei} Gwei): `);
    *     if (!gasPrice || isNaN(gasPrice) || parseFloat(gasPrice) <= 0) throw new Error("Invalid gas price entered.");
     *    // Convert gas price from Gwei to Wei
      *   const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');
       *  console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
        * await deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: gasPriceInWei });
         */
    console.log("WARNING: This deployment script is currently hardcoded with values for the Polygon mainnet. Please update the script before deploying to the Polygon testnet.");
    console.log(`Using gas price of ${truffleConfig.networks.polygon.gasPrice} Wei (${web3.utils.toWei(truffleConfig.networks.polygon.gasPrice + '', 'gwei')} Gwei) for deployment on ${network}`);
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: currentGasPriceInWei });
  } else {
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress);
  }
}

