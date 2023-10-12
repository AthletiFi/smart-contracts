const VSASummer23NFT = artifacts.require("VSASummer23NFT");

module.exports = function(deployer, network, accounts) {
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
  deployer.deploy(VSASummer23NFT, initialOwnerAddress);
};
