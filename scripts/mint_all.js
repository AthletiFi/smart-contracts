module.exports = async function(callback) {
    try {
        // Retrieve arguments from process.argv
        const contractName = process.argv[4];
        const lastTokenId = parseInt(process.argv[5]);
        const mintingAddress = process.argv[6];

        if (!contractName || isNaN(lastTokenId)) {
            throw new Error("Please provide the contract name and the last token ID.");
        }

        const Contract = artifacts.require(contractName);
        const contract = await Contract.deployed();

        // Fetch the current gas price from the network
        const currentGasPrice = await web3.eth.getGasPrice();
        const adjustedGasPrice = BigInt(currentGasPrice) + BigInt(web3.utils.toWei('1', 'gwei'));

        console.log(`Current Gas Price: ${web3.utils.fromWei(currentGasPrice, 'gwei')} Gwei`);
        console.log(`Adjusted Gas Price: ${web3.utils.fromWei(adjustedGasPrice.toString(), 'gwei')} Gwei`);

        for (let tokenId = 1; tokenId <= lastTokenId; tokenId++) {
            // Check if the token already exists
            try {
                await contract.ownerOf(tokenId);
                console.log(`Token ID: ${tokenId} already exists. Skipping.`);
                continue; // Skip to the next iteration
            } catch (error) {
                // If ownerOf throws an error, it means the token doesn't exist, so we can proceed with minting
                console.log(`Token ID: ${tokenId} does not exist. Minting...`);
            }

            // Mint the NFT with the adjusted gas price
            await contract.safeMint(mintingAddress, { gasPrice: adjustedGasPrice.toString() });

            // Get the token's metadata URI (optional, just for logging purposes)
            const uri = await contract.tokenURI(tokenId);
            console.log(`Minted token ID: ${tokenId} with URI: ${uri}`);

            // Wait for 2 seconds before the next iteration because of rate limits, most likely from Alchemy but maybe Pinata.
            console.log("Waiting 2 seconds... Patience young padawan.");
            await delay(2000);
        }

        console.log(`Minted all tokens up to ID: ${lastTokenId}`);
        callback();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        callback(error);
    }
};


// Delay function:
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}