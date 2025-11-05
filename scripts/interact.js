const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Using account:", signer.address);

  const AEROCOIN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const aeroCoin = await ethers.getContractAt("contracts/AeroCoin.sol:AeroCoin", AEROCOIN_ADDRESS);

  // Fetch balance
  const balance = await aeroCoin.balanceOf(signer.address);
  console.log(`💰 AERO Balance of ${signer.address}: ${ethers.formatEther(balance)} AERO`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
