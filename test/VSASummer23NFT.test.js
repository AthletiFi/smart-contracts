const VSASummer23NFT = artifacts.require("VSASummer23NFT");
const assert = require("chai").assert;


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("VSASummer23NFT", function(accounts) {
    let nft;
    const deployer = accounts[0];
    const owner = accounts[0];

    beforeEach(async function() {
        nft = await VSASummer23NFT.new(deployer);
    });

    // Tests will go here
    it("should assert true", async function () {
      await VSASummer23NFT.deployed();
      return assert.isTrue(true);
    });

    it("Should deploy the contract", async function() {
        assert.notEqual(nft.address, null);
    });

    it("Should mint a new token", async function() {
        await nft.safeMint(owner);
        const tokenId = 1;
        const actualOwner = await nft.ownerOf(tokenId);
        assert.equal(actualOwner, owner);
    });

    it("Should set token URI correctly", async function() {
        // Mint the token
        const tokenId = 1; // Since the first token was minted in the previous test
        await nft.safeMint(owner);

        // Check if the token exists
        const tokenExists = await nft.ownerOf(tokenId);
        assert.equal(tokenExists, owner, "Token was not minted");

        // Check the token URI
        const expectedTokenURI = "https://scarlet-electric-boar-374.mypinata.cloud/ipfs/QmQrUMcCzXZYw3Fm12bpqPRUy6yGMexmM5JoH7xX6xRGts/" + tokenId.toString() + "/metadata.json";
        const actualTokenURI = await nft.tokenURI(tokenId);
        assert.equal(actualTokenURI, expectedTokenURI);
    });
});
