const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VSASummer23NFT", function() {
    let VSASummer23NFT;
    let nft;
    let deployer;  
    let owner;
    let signers;

    beforeEach(async function() {
      VSASummer23NFT = await ethers.getContractFactory("VSASummer23NFT");
      [deployer] = await ethers.getSigners();  // Assign the first signer to deployer
      nft = await VSASummer23NFT.deploy(deployer.address); 
      // await nft.deployed();
    });

    // Tests will go here
    it("Should deploy the contract", async function() {
      expect(nft.address).to.not.be.null;
    });

    it("Should mint a new token", async function() {
      signers = await ethers.getSigners();
      owner = await signers[0].getAddress();
      await nft.safeMint(owner);
      const tokenId = 1;
      expect(await nft.ownerOf(tokenId)).to.equal(owner);
    });
    
    it("Should set token URI correctly", async function() {
      // Mint the token
      const tokenId = 1; // Since the first token was minted in the previous test
      await nft.safeMint(owner);
    
      // Check if the token exists
      const tokenExists = await nft.ownerOf(tokenId);
      expect(tokenExists).to.equal(owner, "Token was not minted");
    
      // Check the token URI
      const expectedTokenURI = "https://scarlet-electric-boar-374.mypinata.cloud/ipfs/QmQrUMcCzXZYw3Fm12bpqPRUy6yGMexmM5JoH7xX6xRGts/" + tokenId.toString() + "/metadata.json";
      const actualTokenURI = await nft.tokenURI(tokenId);
      expect(actualTokenURI).to.equal(expectedTokenURI);
    });

});
