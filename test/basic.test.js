const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AeroCoin + AirNFT basic flow", function () {
  let deployer, receiver, AeroCoin, AirNFT, aeroCoin, airNFT;

  beforeEach(async function () {
    [deployer, receiver] = await ethers.getSigners();

    
    AeroCoin = await ethers.getContractFactory("AeroCoin");
    aeroCoin = await AeroCoin.deploy();
    await aeroCoin.waitForDeployment();

    
    AirNFT = await ethers.getContractFactory("AirNFT");
    airNFT = await AirNFT.deploy(await aeroCoin.getAddress());
    await airNFT.waitForDeployment();

    
    const tx = await aeroCoin.transferOwnership(await airNFT.getAddress());
    await tx.wait();
  });

  it("Owner can mint an NFT and receiver gets AERO", async function () {
    const receiverAddress = receiver.address;

    
    await expect(airNFT.connect(deployer).mintNFT(receiverAddress, "ipfs:
      .to.emit(airNFT, "Transfer")
      .withArgs(ethers.ZeroAddress, receiverAddress, 1);

    
    const ownerOfNFT = await airNFT.ownerOf(1);
    expect(ownerOfNFT).to.equal(receiverAddress);

    
    const balance = await aeroCoin.balanceOf(receiverAddress);
    expect(balance).to.equal(ethers.parseEther("10")); 
  });
});
