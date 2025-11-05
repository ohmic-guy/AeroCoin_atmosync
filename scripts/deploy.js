const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  
  const balanceBefore = await deployer.provider.getBalance(deployer.address);
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance before:", ethers.formatEther(balanceBefore), "MATIC");

  
  const AeroCoin = await ethers.getContractFactory("AeroCoin");
  const aeroCoin = await AeroCoin.deploy(deployer.address);
  await aeroCoin.waitForDeployment();
  const aeroAddr = await aeroCoin.getAddress();
  console.log("AeroCoin deployed at:", aeroAddr);

  
  await new Promise((r) => setTimeout(r, 4000));

  
  const AirNFT = await ethers.getContractFactory("AirNFT");
  const airNFT = await AirNFT.deploy(aeroAddr, deployer.address);
  await airNFT.waitForDeployment();
  const airNFTAddr = await airNFT.getAddress();
  console.log("AirNFT deployed at:", airNFTAddr);

  
  const balanceAfter = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance after:", ethers.formatEther(balanceAfter), "MATIC");

  const gasUsed = balanceBefore - balanceAfter;
  console.log("Total gas used (approx):", ethers.formatEther(gasUsed), "MATIC");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
