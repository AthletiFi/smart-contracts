const readline = require('readline');
const VSASummer23NFT = artifacts.require("VSASummer23NFT");

module.exports = function(deployer, network, accounts) {
  return new Promise((resolve, reject) => {
    let initialOwnerAddress;
    console.log("Current network:", network);
  
    // Local development configurations (both for truffle develop and external Ganache/Geth)
    if (network === "development" || network === "develop") {
      initialOwnerAddress = accounts[0];
    } 
    // Polygon testnet configuration
    else if (network === "mumbai") {
      initialOwnerAddress = "0xYourTestnetAddressHere";
      // You can add other configurations specific to Mumbai testnet here
    } 
    // Polygon mainnet configuration
    else if (network === "polygon") {
      initialOwnerAddress = "0xYourMainnetAddressHere";
      // You can add other configurations specific to Polygon mainnet here
      // For example, setting a specific gas price or adding safety checks
    }

    console.log("Deploying with initial owner:", initialOwnerAddress);
  
    // Prompt for gas price if on Polygon mainnet or testnet
    if (network === "polygon" || network === "mumbai" || true) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Enter the gas price in Gwei: ', (gasPrice) => {
        // Convert gas price from Gwei to Wei
        const gasPriceInWei = web3.utils.toWei(gasPrice, 'gwei');
        console.log(`Using gas price of ${gasPriceInWei} Wei (${gasPrice} Gwei) for deployment on ${network} Ya FUCKIN HEARD MOFUCKA??!`);
        deployer.deploy(VSASummer23NFT, initialOwnerAddress, { gasPrice: gasPriceInWei })
          .then(() => {
            rl.close();
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
