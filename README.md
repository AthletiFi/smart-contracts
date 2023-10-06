# AthletiFi Smart Contracts

This repository contains the smart contracts for AthletiFi, developed on the Polygon network.

## Technologies Used

- **Solidity**: The primary language for Ethereum smart contracts.
- **Hardhat**: A development environment for compiling, testing, and deploying Ethereum smart contracts.
- **OpenZeppelin**: A library for secure smart contract development.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AthletiFi/smart-contracts.git
   cd smart-contracts
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile Contracts**:
   ```bash
   npx hardhat compile
   ```

4. **Run Tests** (if available):
   ```bash
   npx hardhat test
   ```
## Deployment
- start local node `npx hardhat node`
- run deploy script `npx hardhat run --network localhost scripts/deploy.js`
- connect to remix `remixd -s . --remix-ide https://remix.ethereum.org`
-  check the "use hardhat" checkbox or whatever its called and press the compile button
- copy your wallet address then enter it for the deploy button and click deploy
- look at the  all the buttons for the contract in the deployed contracts section and find the one for mint and enter an address and mint!

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to 
discuss the changes.


# TODO:

1. re-upload all videos the Pinata in new directory
2. replace "animation_url" with new path to videos on ipfs
3. redeploy smart contract (look at deployment instructions.)