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

## Testing

1. **Initiate a local Ethereum node**

```bash
npx hardhat node
```

2. **Run Tests**

```bash
npx hardhat test
```

## Deployment

### 1. Connect to Remix IDE

Establish a connection between your local file system and the Remix IDE:

```
remixd -s . --remix-ide https://remix.ethereum.org
```

### 2. Set Compiler Version in Remix

- Open [Remix IDE](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js) in your browser. 
- Navigate to the "Solidity Compiler" tab.
- Ensure the compiler version selected matches the version specified in your smart contract (e.g., `pragma solidity ^0.8.20;`).

### 3. Compile the Smart Contract in Remix

- Ensure the "Enable Hardhat Compilation" option is checked.
- Click the "Compile" button.

### 5. Set Up MetaMask

- Ensure MetaMask is connected and set to the correct network (e.g., Goerli testnet).

### 6. Deploy the Smart Contract in Remix

- Switch to the "Deploy & Run Transactions" tab.
- Ensure you've selected the correct network.
- Copy your Ethereum wallet address.
- In the "Deploy" section, input your wallet address in the appropriate field.
- Click the "Deploy" button.

### 7. Mint Tokens in Remix

- Once the contract is deployed, navigate to the "Deployed Contracts" section.
- Locate the `mint` function.
- Input the desired Ethereum address where you want the token to be minted.
- Execute the `mint` function.

### 8. Verify on OpenSea

After minting, check the NFT on OpenSea's testnet to ensure the metadata, image, and other assets display correctly.

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to 
discuss the changes.

