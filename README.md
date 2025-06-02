# BNB Testnet Transfer Script

## Description

A Node.js script to transfer BNB on Binance Smart Chain (BSC) Testnet.

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation](#installation)  
3. [Configuration](#configuration)  
4. [Usage](#usage)  
5. [Folder Structure](#folder-structure)  
6. [Coding Conventions](#coding-conventions)  
7. [Extending the Service](#extending-the-service)  
8. [License](#license)  

---

## Prerequisites

- Node.js (LTS version, e.g., v18.x or newer)  
- npm (v8.x or newer)  
- Binance Smart Chain Testnet account(s) with test BNB balance  
- Basic familiarity with JavaScript/Node.js  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/bnb-testnet-transfer.git
   cd bnb-testnet-transfer
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```

---

## Configuration

1. **Create a `.env` file by copying `.env.example`:**  
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and provide values:**  
   ```env
   # .env
   BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
   RECIPIENT_ADDRESS=0xRECIPIENT_ADDRESS_HERE
   AMOUNT_IN_BNB=0.01
   ```

   - **BSC_TESTNET_RPC_URL**: RPC endpoint of BSC Testnet  
   - **PRIVATE_KEY**: Private key of the sender wallet (keep secure)  
   - **RECIPIENT_ADDRESS**: Address to receive BNB  
   - **AMOUNT_IN_BNB**: Amount of BNB to send (e.g., `0.01`)  

---

## Usage

Execute the transfer script:  
```bash
npm start
```

Expected console output:  
```text
[INFO] Preparing to send 0.01 BNB to 0xRecipientAddress...
[INFO] Transaction sent. Hash: 0xabc123...
[INFO] Waiting for confirmation...
[INFO] Transaction confirmed in block #XXXXX!
```

Errors (e.g., insufficient funds, invalid private key) will be logged and the script will exit.

---

## Folder Structure

```
bnb-testnet-transfer/
├── README.md
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── config.js
    ├── transfer.service.js
    └── index.js
```

- `src/config.js`: Loads and validates environment variables  
- `src/transfer.service.js`: Function `sendBnb()` to perform transfer using ethers.js  
- `src/index.js`: Entry point; calls `sendBnb()` and handles logging  

---

## Coding Conventions

- **File Names**: kebab-case (e.g., `transfer.service.js`)  
- **Environment Variables**: UPPER_SNAKE_CASE  
- **Constants**: UPPER_SNAKE_CASE  
- **Variables & Functions**: camelCase  
- **Classes**: PascalCase  
- **Indentation**: 2 spaces  
- **String Quotes**: Single quotes unless using template literals  
- **Comments**: JSDoc style for functions; `//` for inline comments  

---

## Extending the Service

- **Add More Chains**: Pass different RPC_URL values; update `config.js` for alternative networks.  
- **Logging & Monitoring**: Replace `console.log` with a logging library (e.g., Winston); integrate error tracking (e.g., Sentry).  
- **Batch Transfers**: Create `batch.transfer.service.js` to process multiple recipients from a CSV file.  
- **Unit Tests**: Use Jest or Mocha to test `transfer.service.js` by mocking `ethers.providers.JsonRpcProvider` and transaction calls.  

---

## License

MIT License

---
