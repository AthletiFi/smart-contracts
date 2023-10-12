# AthletiFi Smart Contracts

This repository contains the smart contracts for AthletiFi, developed on the Polygon network.

## Technologies Used

- **Solidity**: The primary language for Ethereum smart contracts.
- **Truffle**: A development environment for compiling, testing, and deploying Ethereum smart contracts.
- **OpenZeppelin**: A library for secure smart contract development.

## Setup and Installation

1. **Clone the Repository**:

   ```zsh
   git clone https://github.com/AthletiFi/smart-contracts.git
   cd smart-contracts
   ```

2. **Install Dependencies**:

   ```zsh
   yarn install
   ```

3. **Compile Contracts**:

   ```zsh
   truffle compile
   ```

## Testing

1. **Start Truffle's Built-in Development Blockchain**:

   ```zsh
   truffle develop
   ```

   This command starts a local Ethereum blockchain and provides you with a set of available accounts and their private keys. It also opens a Truffle console where you can run Truffle commands directly.

2. **Compile Contracts** (if you haven't already):

   Inside the Truffle console:

   ```zsh
   compile
   ```

3. **Migrate Contracts**:

   Deploy your contracts to the local development network:

   ```zsh
   migrate --reset
   ```

4. **Run Tests**:

   ```zsh
   test
   ```

5. **Exit the Truffle Console**:

   To leave the Truffle console, type:

   ```zsh
   .exit
   ```

Remember, when using `truffle develop`, you don't need to prefix commands with `truffle` inside the Truffle console.

**Note:** If you ever use an external Ganache or Geth instance, rather than the built-in `truffle develop` instance, you will need to run `truffle migrate --network development`, which will use the "development" configuration in `truffle-config.js`.

### Interactive Testing with Truffle Console

After deploying your contracts, you can interact with them directly in the Truffle development console:

**Enter the Truffle Console**:

  ```zsh
   truffle develop
  ```

**Interact with Your Contracts**:

   For example, to get the owner of the `VSASummer23NFT` contract:

  ```javascript
   const nft = await VSASummer23NFT.deployed();
   const owner = await nft.owner();
   console.log(owner);
  ```

**Exit the Truffle Development Console**:
   Once you're done, you can exit the console by typing `.exit`.

This provides a hands-on way to understand and test contract functionality.

## Deployment

This project is currently set up for deployment on a local development environment, Polygon's Mumbai testnet, and Polygon's POS mainnet.

For Local Development instructions see section [Testing](#testing)

### Deployment on Polygon

Ensure you have the necessary environment variables set up. The `truffle-config.js` file references several environment variables for deployment:

- `MNEMONIC`: Your 12-word MetaMask mnemonic phrase for the mainnet.
- `TEST_MNEMONIC`: Your 12-word MetaMask mnemonic phrase for the testnet.
- `ALCHEMY_POLYGON_MAINNET_API_KEY`: Your Alchemy API key for the Polygon mainnet.
- `ALCHEMY_POLYGON_TESTNET_API_KEY`: Your Alchemy API key for the Polygon testnet.

   Set these environment variables in a `.env` file or your system's environment. Remember to never commit sensitive data like mnemonics or API keys to version control.

#### Polygon Mumbai Testnet

1. Ensure you have some test Matic tokens in your MetaMask wallet. You can get them from the [Matic Faucet](https://faucet.matic.network/).

2. Deploy the contract to the Mumbai testnet:

   ```bash
   truffle migrate --network mumbai
   ```

   After deployment, note down the contract address from the logs.

#### Polygon Mainnet

1. Ensure you have enough Matic tokens in your MetaMask wallet to cover gas fees.

2. Deploy the contract to the Polygon mainnet:

   ```bash
   truffle migrate --network polygon
   ```

   After deployment, note down the contract address from the logs.

### Using the `--reset` Flag in Truffle Migrations

The `--reset` flag in Truffle forces a redeployment of all contracts and reruns all migration scripts. It's handy when you've updated contract code or want a fresh state during development/testing. However, using it can increase gas costs, change contract addresses, and erase previous contract data. While it's common for local testing, exercise caution on mainnets or production environments.

For development and testing, especially on local networks, using `--reset` is common. However, on mainnets or production environments, use `--reset` with caution.

### Interacting with the Contract

After deploying the contract, you can retrieve the contract address from the deployment logs. This address is essential for interacting with the contract on the respective network. You can interact with the deployed contracts using tools Remix, MyEtherWallet, or programmatically using Web3.js or Ethers.js.

You can verify the contract's source code on [PolygonScan](https://polygonscan.com/) ([PolygonScan Mumbai](https://mumbai.polygonscan.com/) for testnet).

**Note**: If you're deploying the contract yourself, remember to note down the contract address from the deployment logs. If you're using a pre-deployed version or collaborating with others, ensure you have the correct contract address for the network you're working on.

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to discuss the changes.
