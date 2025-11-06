# 🚀 AtmoSync: Blockchain + IoT Security Platform

AtmoSync is a decentralized framework that leverages **Blockchain** and **IoT** for enhanced data integrity, transparency, and trust across connected devices.  
This project ensures **secure IoT data transmission** using **smart contracts** on the **Polygon Amoy Testnet**, enabling token-based authentication and tamper-proof logs.

---

## 🧩 Project Overview

AtmoSync integrates:
- **IoT sensors** transmitting data securely to blockchain nodes.
- **Smart Contracts** for managing authentication and access control.
- **Blockchain Tokens** for transaction verification and incentive distribution.
- **AES encryption** for local IoT data confidentiality before blockchain upload.
- **Hardhat** and **Ethers.js** for deployment, testing, and interaction.

This setup ensures a **trustless**, **transparent**, and **secure** IoT data ecosystem.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Smart Contract | Solidity |
| Blockchain Framework | Hardhat |
| Interaction Library | Ethers.js |
| Test Framework | Mocha |
| Network | Polygon Amoy Testnet |
| IoT Device Layer | ESP32 / Raspberry Pi (HTTP or MQTT interface) |
| Encryption | AES + SHA256 |

---

## 🧠 Features

- **Decentralized Data Logging:** IoT sensor data stored immutably on-chain.
- **Tokenized Access Control:** Verified entities use AeroTokens for interaction.
- **Tamper Detection:** Blockchain ensures no modification in stored IoT logs.
- **Secure Transmission:** AES + SHA256 layer secures local communication.
- **Cross-Device Validation:** Each device registered via blockchain identity.

---

## 🧪 Running Tests

Run all unit tests:

```bash
npx hardhat test

Or specifically run Solidity or Mocha tests

npx hardhat test solidity
npx hardhat test mocha

```

## 🚀 Deployment

### 🧪 Local Deployment

```bash
npx hardhat ignition deploy ignition/modules/AeroChain.ts
```