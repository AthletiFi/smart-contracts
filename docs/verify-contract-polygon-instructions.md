# Contract Verification on Polygonscan: Step-by-Step Guide

## Option 1: Verifying Smart Contracts on Polygonscan using `truffle-plugin-verify`

### Prerequisites

- Your contract must be deployed on the Polygon network.
- You need to have Truffle installed and set up for your project.
- You need an API key from Polygonscan.

### Step-by-Step Guide

1. **Install the Plugin**:
   Install `truffle-plugin-verify` using npm:

   ```bash
   npm install truffle-plugin-verify
   ```

2. **Obtain Polygonscan API Key**:
   - Go to [Polygonscan](https://polygonscan.com/).
   - Create an account or log in if you already have one.
   - Navigate to the API-KEYs section under your account settings.
   - Generate a new API key.

3. **Set the API Key**:
   You can set the API key in one of two ways:

   - **Environment Variable**: Set the API key as an environment variable. This is the more secure method. In your ``.env`` file add:

     ```bash
     POLYGONSCAN_API_KEY=yourAPIkey
     ```

   - **Command Line**: You can provide the API key directly in the command line when verifying, but this is less secure as your key might end up in bash history.

4. **Configure Truffle**:
   Add the plugin to your `truffle-config.js`:

   ```javascript
   module.exports = {
     /* ... rest of truffle-config */

     plugins: [
       'truffle-plugin-verify'
     ],
       api_keys: {
        polygonscan: 'YOUR_POLYGONSCAN_API_KEY'
      }
   }
   ```

   Replace 'YOUR_POLYGONSCAN_API_KEY' with your actual Polygonscan API key.

5. **Verify the Contract**:
   Navigate to your project's root directory and run:

   ```bash
   truffle run verify YourContractName --network networkName --license SPDX-License-Identifier
   ```

   Replace:
   - `YourContractName` with the name of your contract.
   - `networkName` with the name of the network you deployed to (as defined in your Truffle config).
   - `SPDX-License-Identifier` with the appropriate license identifier (e.g., `MIT`, `GPL-3.0`, etc.).

   If you're providing the API key via the command line, use:

   ```bash
   truffle run verify YourContractName --network networkName --license SPDX-License-Identifier --apikey yourAPIkey
   ```

6. **Confirmation**:
   After executing the command, the plugin will attempt to verify your contract. If successful, you should see a confirmation message indicating that your contract has been verified on Polygonscan.

### Notes

- Ensure the contract you're trying to verify was deployed using Truffle to the specified network.
- The compiler version and optimization settings used by Truffle for deployment should match what's being used for verification.

### Option 2 Preparing the Contract Source Code using `sol-merger` to Flatten the Contract

1. Install `sol-merger`:

   ```bash
   yarn global add sol-merger
   ```

2. Navigate to your project's root directory and run:

   ```bash
   sol-merger "./contracts/YourContract.sol" "./flattened"
   ```

3. This will create a flattened version of your contract in the `flattened` directory.

## 2. Retrieving Constructor Arguments

### From Truffle Build Artifacts

1. Navigate to your Truffle project directory.
2. Go to the `build/contracts` directory.
3. Open the JSON file corresponding to your contract (`YourContractName.json`).
4. Look for the `networks` section.
5. Under the network ID for Polygon, find the `transactionHash` of your deployment transaction.
6. Go to Polygonscan and paste the transaction hash into the search bar.
7. On the transaction details page, scroll to the `Input Data` section.
8. At the end of the `Input Data`, you'll see the encoded constructor arguments.

### ABI Encoding Constructor Arguments

1. Identify the arguments and their types from your contract's constructor.
2. Use [ABI Hashed Online](https://abi.hashex.org/) to ABI-encode the arguments.
3. Compare the ABI-encoded string from the tool with the string from Polygonscan.

## 3. Verifying the Contract on Polygonscan

1. Go to the Polygonscan contract verification page.
2. Select the appropriate compiler version and optimization settings.
3. For "Contract Code", paste the flattened contract source code.
4. If your contract has constructor arguments, provide the ABI-encoded arguments.
5. Click on "Verify and Publish".

## 4. Troubleshooting

- If you encounter errors related to missing files or imports, ensure all dependencies are included in the flattened file.
- If the verification fails due to mismatched constructor arguments, double-check the ABI-encoded arguments and the original values used during deployment.
