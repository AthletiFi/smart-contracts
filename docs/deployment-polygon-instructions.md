# Deployment and Minting

This project is currently set up for deployment on a local development environment, Polygon's Mumbai testnet, and Polygon's POS mainnet.

For Local Development instructions see section [Testing](#testing)

## Prerequisites for Deployment on Polygon

Ensure you have the necessary environment variables set up. The `truffle-config.js` file references several environment variables for deployment:

- `MNEMONIC`: Your 12-word MetaMask mnemonic phrase for the mainnet.
- `TEST_MNEMONIC`: Your 12-word MetaMask mnemonic phrase for the testnet.
- `ALCHEMY_POLYGON_MAINNET_API_KEY`: Your Alchemy API key for the Polygon mainnet.
- `ALCHEMY_POLYGON_TESTNET_API_KEY`: Your Alchemy API key for the Polygon testnet.

   Set these environment variables in a `.env` file or your system's environment. Remember to never commit sensitive data like mnemonics or API keys to version control.

Make sure you have enough MATIC tokens in your wallet. If you're deploying on the Mumbai testnet, you can get test tokens from the [Polygon Faucet](https://faucet.polygon.technology).

### Deploying the Contract

Deploy the contract using the `truffle migrate` command. The `--network` flag specifies the network to deploy to:

#### Polygon Mumbai Testnet

   ```zsh
   truffle migrate --reset --network mumbai
   ```

#### Polygon Mainnet

   ```zsh
   truffle migrate --network polygon
   ```

You will be prompted to enter the owner address as well as the gas price in Gwei. After deployment, note down the contract address from the logs.

#### Using the `--reset` Flag in Truffle Migrations

The `--reset` flag in Truffle forces a redeployment of all contracts and reruns all migration scripts. It's handy when you've updated contract code or want a fresh state during development/testing. However, using it can increase gas costs, change contract addresses, and erase previous contract data. While it's common for local testing, exercise caution on mainnets or production environments.

For development and testing, especially on local networks, using `--reset` is common. However, on mainnets or production environments, use `--reset` with caution.

## After Deployment

After deploying the contract, you can retrieve the contract address from the deployment logs. This address is essential for interacting with the contract on the respective network. You can interact with the deployed contracts using tools Remix, MyEtherWallet, or programmatically using Web3.js or Ethers.js.

You can verify the contract's source code on [PolygonScan](https://polygonscan.com/) ([PolygonScan Mumbai](https://mumbai.polygonscan.com/) for testnet).

**Note**: If you're deploying the contract yourself, remember to note down the contract address from the deployment logs. If you're using a pre-deployed version or collaborating with others, ensure you have the correct contract address for the network you're working on.

## Minting NFTs

There are two ways to mint NFTs. You can either mint manually by interacting with the contract to mint NFTs using Truffle Console, or you can run the `mint_all` script.

### Minting manually using Truffle Console

1. **Start the Truffle Console**:
   Launch the Truffle console connected to the network where you deployed your contract. For instance, if you deployed on the Mumbai testnet:

   ```zsh
   truffle console --network mumbai
   ```

2. **Get an Instance of Your Contract**:
   Once inside the console, retrieve an instance of your deployed contract:

   ```javascript
   const contract = await VSASummer23NFT.deployed();
   ```

   Or, if you are having issues and have the contract address:

   ```javascript
   const contract = await VSASummer23NFT.at("DEPLOYED_CONTRACT_ADDRESS");
   ```

3. **Mint NFTs**:
   Call the mint function of your contract. Replace `YOUR_DESIRED_ADDRESS` with the address you want to mint the NFT to:

   ```javascript
   await contract.safeMint("YOUR_DESIRED_ADDRESS");
   ```

   For example, to mint an NFT with token ID `1` to address `0xde3670c315cd69d81e90d3714788635aaf011860`:

   ```javascript
   await contract.mint("0xde3670c315cd69d81e90d3714788635aaf011860", 1);
   ```

4. **Exit the Console**:

   ```javascript
   .exit
   ```

### Minting using the `mint_all` script

To mint all the NFTs in the VSASummer23NFT contract, run:

```zsh
yarn mint-vsa
```

More generally, if you're minting a different NFT contract, run:

```zsh
truffle exec scripts/mint_all.js "CONTRACT_NAME" "TOTAL_NFTS" "NETWORK" "MINTING_ADDRESS"
```
