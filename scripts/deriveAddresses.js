const dotenv = require('dotenv');
const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');

dotenv.config();

function deriveAddresses(mnemonic, count = 10) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdk = hdkey.fromMasterSeed(seed);
    const addresses = [];

    for (let i = 0; i < count; i++) {
        const wallet = hdk.derivePath(`m/44'/60'/0'/0/${i}`).getWallet();
        addresses.push(wallet.getAddressString());
    }

    return addresses;
}

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
    console.error("MNEMONIC not found in .env file.");
    process.exit(1);
}

console.log("Mnemonic from .env:", mnemonic);

const addresses = deriveAddresses(mnemonic, 10);
console.log("First 10 addresses derived from the mnemonic:");
addresses.forEach((address, index) => {
    console.log(`${index + 1}. ${address}`);
});
