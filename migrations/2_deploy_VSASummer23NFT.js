
/*
* Mumbai testnet deployment: 
*  > transaction hash:    0xa76d4057b8624b47801a7d78da0ca021c0d77bec6a6aaed5067126c93e796e49
*  > contract address:    0xD5274B9E5309540372e1c0Fa45db19aEE58A8961
*  > account:             0xde3670c315cD69d81e90D3714788635aaf011860
*/

const readline = require('readline');
const VSASummer23NFT = artifacts.require("VSASummer23NFT");

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

module.exports = async function(deployer, network, accounts) {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await performMigration(deployer, network, accounts);
      console.log("Deployment successful!");
      break;
    } catch (error) {
      console.error(`Deployment failed on attempt ${i + 1}:`, error.message);
      if (i < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error("Max retries reached. Exiting.");
        throw error;
      }
    }
  }
};

async function performMigration(deployer, network, accounts) {
  const defaultAccount = accounts[0];
  console.log(`${defaultAccount} = 0xde3670c315cd69d81e90d3714788635aaf011860? (Mumbai)`)
  console.log(`${defaultAccount} = 0xde3670c315cd69d81e90d3714788635aaf011860? (Polygon mainnet))`)
  console.log("Current network:", network);

  let initialOwnerAddress;

  // Local development configurations (both for truffle develop and external Ganache/Geth)
  if (network === "development" || network === "develop") {
    initialOwnerAddress = defaultAccount;
  } 
  // Polygon configurations
  else if (network === "mumbai" || network === "polygon") {
    initialOwnerAddress = await new Promise((response) => {
      const promptOwner = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      promptOwner.question(`Enter the initial owner address (or press enter for default): `, (ownerAddress) => {
        promptOwner.close();
        response(ownerAddress || defaultAccount);
      });
    });
    // You can add other configurations specific to Polygon here
    // For example, setting a specific gas price or adding safety checks
  } else {
    throw new Error(`Unsupported network: ${network}. Please add configurations for this network in the migrations file.`);
  }

  console.log("Deploying with initial owner:", initialOwnerAddress);

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
    
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: gasPriceInWei });
  } else {
    await deployer.deploy(VSASummer23NFT, initialOwnerAddress);
  }
}
