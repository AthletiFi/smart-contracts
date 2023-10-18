
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0xa76d4057b8624b47801a7d78da0ca021c0d77bec6a6aaed5067126c93e796e49
*  > contract address:    0xD5274B9E5309540372e1c0Fa45db19aEE58A8961
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/
/*
* Polygon mainnet deployment: 
*  > transaction hash:    0x010f54e6afc08829602d157ab5f08b961757230a0a73e4a35dcc3675e41aa82d / 0xb6b864e87617034f7fb312016920151cd4a0f626f582dab61d2282c54d7cfe4d
*  > contract address:    0x2d729f379334e85eb03b421d0273bd9897012cd4 / 0x7d8a56f1b4a6b2bf720f4671860e4eee00fdb51c
*  > account:             0x0e3413c7d1aebd19d07111cb7d6d4885cc680c52
*/
require('../globalErrorHandler');

const prompt = require('prompt-sync')();
const { handleKnownErrors, checkConnection } = require('./utils');
const VSASummer23NFT = artifacts.require("VSASummer23NFT");


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

  // Determine the initial owner address based on the network
  let initialOwnerAddress = determineInitialOwner(network, defaultAccount);
 
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
    const currentGasPriceInGwei = web3.utils.fromWei(currentGasPriceInWei, 'gwei');

    // Prompt for gas price if on Polygon mainnet or testnet
    const gasPrice = prompt(`Enter the gas price in Gwei (recommended: ${currentGasPriceInGwei} Gwei): `);
    if (!gasPrice || isNaN(gasPrice) || parseFloat(gasPrice) <= 0) throw new Error("Invalid gas price entered.");

    // Convert gas price from Gwei to Wei
    const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');

    console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
    
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: gasPriceInWei });
  } else {
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress);
  }
}

