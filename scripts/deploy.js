// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Get the ContractFactory for the VSASummer23NFT contract
  const VSASummer23NFT = await hre.ethers.getContractFactory("VSASummer23NFT");

  // Address of the initial owner
  const initialOwnerAddress = "0xBa5d5EC3d0BAc295987895F1E6f0DA926E5AD43D"

  // Deploy the contract with the initial owner address
  const nft = await VSASummer23NFT.deploy(initialOwnerAddress);

  // Log the address of the deployed contract
  console.log("VSASummer23NFT deployed to:", await nft.getAddress()); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
