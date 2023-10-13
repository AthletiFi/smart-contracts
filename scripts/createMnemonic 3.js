const bip39 = require('bip39');
const fs = require('fs');
const dotenv = require('dotenv');
const readline = require('readline');

function generateNewMnemonic() {
    return bip39.generateMnemonic();
}

function updateEnvMnemonic(mnemonic) {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));

    // Update the mnemonic in the parsed config
    envConfig.MNEMONIC = mnemonic;

    // Convert the config back to a string
    const newEnvConfig = Object.entries(envConfig).map(([key, value]) => `${key}=${value}`).join('\n');

    // Write the updated config back to the .env file
    fs.writeFileSync('.env', newEnvConfig);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const newMnemonic = generateNewMnemonic();

rl.question('Do you want to update the MNEMONIC in .env with this new mnemonic? (yes/no) ', (answer) => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        updateEnvMnemonic(newMnemonic);
        console.log("Updated MNEMONIC in .env with new mnemonic.");
    } else if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n') {
        console.log("Generated new mnemonic:", newMnemonic);
        console.log("Did not update the MNEMONIC in .env.");
    } else {
        console.error("Invalid answer. Please try again.");
    }
    rl.close();
});
