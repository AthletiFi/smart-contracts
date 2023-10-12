const readline = require('readline');
const VSASummer23NFT = artifacts.require("VSASummer23NFT");

module.exports = function(deployer, network, accounts) {
  const defaultAccount = "0xde3670c315cd69d81e90d3714788635aaf011860"

  return new Promise(async (resolve, reject) => {
    console.log("Current network:", network);
    let initialOwnerAddress;
    const promptOwner = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });


    // Local development configurations (both for truffle develop and external Ganache/Geth)
    if (network === "development" || network === "develop") {
      initialOwnerAddress = accounts[0];
    } 
    // Polygon testnet configuration
    else if (network === "mumbai" || network === "polygon") {
      // initialOwnerAddress = "0xYourTestnetAddressHere";
      // You can add other configurations specific to Mumbai testnet here
      initialOwnerAddress = await new Promise((resolve, reject) => {
        promptOwner.question(`Enter the inital owner address for this contract (or just press enter to use the hardcoded address): `, (ownerAddress) => {
          promptOwner.close();
          resolve(ownerAddress ? ownerAddress : defaultAccount);
        });
      });
      // You can add other configurations specific to Polygon here
      // For example, setting a specific gas price or adding safety checks
    } else {
      console.error(`Unsupported network: ${network}. Please add configurations for this network in 2_deploy_VSASummer23NFT.js`);
      reject();
    }

    console.log("Deploying with initial owner:", initialOwnerAddress);
  
    // Prompt for gas price if on Polygon mainnet or testnet
    if (network === "polygon" || network === "mumbai") {
      const gasPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      gasPrompt.question('Enter the gas price in Gwei: ', (gasPrice) => {
        // Convert gas price from Gwei to Wei
        const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');
        console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network}`);
        deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: gasPriceInWei })
          .then(() => {
            gasPrompt.close();
            resolve();
          })
          .catch(reject);
      });
    } else {
      deployer.deploy(VSASummer23NFT, initialOwnerAddress)
        .then(resolve)
        .catch(reject);
    }});
};
