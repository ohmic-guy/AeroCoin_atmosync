require('dotenv').config();
const { Web3Storage, File } = require('web3.storage');

function getAccessToken() {
  return process.env.WEB3STORAGE_API_KEY;
}

async function storeMetadata(metadataObject) {
  const token = getAccessToken();
  if (!token) throw new Error("WEB3STORAGE_API_KEY not set in .env");
  const client = new Web3Storage({ token });

  const buffer = Buffer.from(JSON.stringify(metadataObject));
  const files = [new File([buffer], 'metadata.json')];

  console.log("Uploading metadata to Web3.Storage...");
  const cid = await client.put(files);
  const uri = `ipfs://${cid}/metadata.json`;
  console.log("Stored metadata:", uri);
  return uri;
}

module.exports = { storeMetadata };
