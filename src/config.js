/**
 * src/config.js
 *
 * Loads and validates environment variables. Exports a configuration object
 * that other modules can import. This ensures all sensitive data (RPC URL,
 * private key, recipient, amount) are kept in environment variables.
 */

const dotenv = require('dotenv');
const path = require('path');

// Load `.env` from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Validate required environment variables and exit if missing.
 * You can extend this to include format checks (e.g., valid address pattern).
 */
const requiredEnvVars = [
  'BSC_TESTNET_RPC_URL',
  'PRIVATE_KEY',
  'RECIPIENT_ADDRESS',
  'AMOUNT_IN_BNB',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`[ERROR] Missing required env var: ${varName}`);
    process.exit(1);
  }
});

/** @type {string} */
const BSC_TESTNET_RPC_URL = process.env.BSC_TESTNET_RPC_URL;

/** @type {string} Private key should be 0x-prefixed */
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type {string} BSC address (0x-prefixed) */
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;

/** @type {string} Decimal amount in BNB (e.g., "0.01") */
const AMOUNT_IN_BNB = process.env.AMOUNT_IN_BNB;

module.exports = {
  bscTestnetRpcUrl: BSC_TESTNET_RPC_URL,
  privateKey: PRIVATE_KEY,
  recipientAddress: RECIPIENT_ADDRESS,
  amountInBnb: AMOUNT_IN_BNB,
};
