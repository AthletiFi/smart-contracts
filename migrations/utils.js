/**
 * 
 * This utility module provides functions that help make the migration scripts more robust and user-friendly.
 * 
 * Functions:
 * - handleKnownErrors: used to handle common errors that might occur during the migration process.
 * 
 * Usage:
 * Import the required functions from this module in the migration scripts and use them in the appropriate error handling sections.
 */


// The errorMessages mapping of error keywords below is used for better error handling in the try/catch block below.
const errorMessages = {
  'ESOCKETTIMEDOUT': 'Network request timed out. Please check your internet connection and the status of your Ethereum provider.',
  'nonce too low': 'Nonce too low. There might be another transaction pending or a previous transaction might have failed. Please check and retry.',
  'insufficient funds': 'Insufficient funds for gas * price + value. Ensure your account has enough balance to cover the transaction costs.'
};

function handleKnownErrors(error) {
  // Flag to check if any known error keyword matches the current error message
  let matched = false;
  
  // Iterate over each known error keyword and its associated message
  for (const [keyword, errorMessage] of Object.entries(errorMessages)) {
    // If the current error message includes a known keyword, print the associated descriptive message
    if (error.message.includes(keyword)) {
      console.error(errorMessage);
      matched = true; // Set the flag to true indicating a match was found
      break; // Exit the loop as we've found a match
    }
  }
  
  // If no known error keywords matched the current error message, print a generic error message
  if (!matched) {
    console.error('A super weird error occurred my guy:', error.message);
    // Comment out the next line if you don't want to see the full error stack trace for unexpected errors.
    console.error(error.stack);
  }
}

const MAX_RETRIES = 4;
const RETRY_DELAY = 5000; // 5 seconds

async function checkConnection(web3Instance) {
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            await web3Instance.eth.net.isListening();
            console.log("Connected successfully!");
            return;
        } catch (error) {
            console.error(`Connection attempt ${i + 1} failed. Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
    throw new Error("Max connection retries reached. Exiting.");
}

module.exports = {
  handleKnownErrors,
  checkConnection
};

