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

Automated test using yarn:

```zsh
yarn test
```

### Manual Testing using Truffle's Built-in Development Blockchain and Console

1. **Start Truffle Console**:

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

**Note:** If you ever want to use an external Ganache or Geth instance for deployment while using the Truffle console, you can do so by running `migrate --network development`. This will use the "development" configuration in `truffle-config.js`.

**Another Note:** If you would like to use the built-in development blockchain without entering the Truffle console, you can run `truffle develop --log`. You would then need to run truffle commands in a separate terminal window and add the `--network develop` flag to each command.

### Interactive Testing with Truffle Console

After deploying your contracts, you can interact with them directly in the Truffle development console:

#### Interact with Your Contracts

   For example, to get the owner of the `VSASummer23NFT` contract:

  ```javascript
   const nft = await VSASummer23NFT.deployed();
   const owner = await nft.owner();
   console.log(owner);
  ```

#### Exit the Truffle Development Console

   Once you're done, you can exit the console by typing `.exit`.

## Deployment and Minting

For deployment and minting instructions, see [Deploying to Polygon](./docs/deployment-polygon.md).

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to discuss the changes.

## License

This software is licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in this repository.
