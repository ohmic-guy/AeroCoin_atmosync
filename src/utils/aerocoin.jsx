import { ethers } from "ethers";
import AeroCoinABI from "../artifacts/contracts/AeroCoin.sol/AeroCoin.json";

const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_MUMBAI_URL);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const aeroCoinContract = new ethers.Contract(contractAddress, AeroCoinABI.abi, provider);
