const hre = require("hardhat");

async function main() {
    const accounts = await hre.ethers.getSigners();

    console.log("Accounts:");
    accounts.forEach((account, index) => {
        console.log(`${index + 1}. ${account.address}`);
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
