# AthletiFi Smart Contracts

This repository contains the smart contracts for AthletiFi, developed on the Polygon network.

## Technologies Used

- **Solidity**: The primary language for Ethereum smart contracts.
- **Truffle**: A development environment for compiling, testing, and deploying Ethereum smart contracts.
- **OpenZeppelin**: A library for secure smart contract development.

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AthletiFi/smart-contracts.git
   cd smart-contracts
   ```

2. **Install Dependencies**:

   ```bash
   yarn install
   ```

3. **Compile Contracts**:

   ```bash
   truffle compile
   ```

## Testing

1. **Start Truffle's Built-in Development Blockchain**:

   ```bash
   truffle develop
   ```

   This command starts a local Ethereum blockchain and provides you with a set of available accounts and their private keys. It also opens a Truffle console where you can run Truffle commands directly.

2. **Compile Contracts** (if you haven't already):

   Inside the Truffle console:

   ```bash
   compile
   ```

3. **Migrate Contracts**:

   Deploy your contracts to the local development network:

   ```bash
   migrate --reset
   ```

4. **Run Tests**:

   ```bash
   test
   ```

5. **Exit the Truffle Console**:

   To leave the Truffle console, type:

   ```bash
   .exit
   ```

Remember, when using `truffle develop`, you don't need to prefix commands with `truffle` inside the Truffle console.

## Deployment

Follow the Truffle documentation or your preferred method for deploying contracts to a live network.

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to discuss the changes.
