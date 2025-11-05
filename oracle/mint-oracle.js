require('dotenv').config();
const { ethers } = require('ethers');
const { storeMetadata } = require('./upload-metadata');

const AIRNFT_ADDRESS = process.env.AIRNFT_ADDRESS;
if (!AIRNFT_ADDRESS) {
  console.error("Set AIRNFT_ADDRESS in .env before running.");
  process.exit(1);
}

const ABI = [
  "function mintAirNFT(address recipient, string calldata tokenURI) external returns (uint256)"
];

async function mint(recipient, metadata) {
  if (!process.env.PRIVATE_KEY || !process.env.ALCHEMY_MUMBAI_URL) {
    throw new Error("PRIVATE_KEY or ALCHEMY_MUMBAI_URL missing in .env");
  }

  
  const tokenURI = await storeMetadata(metadata);

  
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contract = new ethers.Contract(AIRNFT_ADDRESS, ABI, wallet);
  console.log("Calling mintAirNFT:", recipient, tokenURI);

  const tx = await contract.mintAirNFT(recipient, tokenURI, { gasLimit: 700000 });
  console.log("Transaction submitted:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction mined:", receipt.transactionHash);

  return receipt;
}


if (require.main === module) {
  (async () => {
    const recipient = process.argv[2];
    if (!recipient) {
      console.error("Usage: node mint-oracle.js <recipientAddress>");
      process.exit(1);
    }

    const metadata = {
      name: `Air Quality NFT - ${recipient} - ${new Date().toISOString()}`,
      description: "Verified clean air milestone",
      attributes: [
        { trait_type: "AQI", value: 42 },
        { trait_type: "PM2.5", value: "28 µg/m3" },
        { trait_type: "CO2", value: "380 ppm" },
        { trait_type: "timestamp", value: new Date().toISOString() }
      ]
    };

    try {
      const res = await mint(recipient, metadata);
      console.log("Mint successful. Tx:", res.transactionHash);
    } catch (err) {
      console.error("Mint failed:", err);
    }
  })();
}

module.exports = { mint };