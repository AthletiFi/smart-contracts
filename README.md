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

1. **Start a Local Ethereum Client**:

   Ensure you have a local Ethereum client like Ganache running. If you're using Ganache, make sure it's running and listening on the correct port (usually `7545` for the GUI version).

2. **Migrate Contracts**:

   Before running tests, deploy your contracts to the local development network:

   ```bash
   truffle migrate --reset
   ```

3. **Run Tests**:

   ```bash
   truffle test
   ```

## Deployment

Follow the Truffle documentation or your preferred method for deploying contracts to a live network.

## Contributing

If you wish to contribute to the development of these smart contracts, please submit a pull request or open an issue to discuss the changes.
