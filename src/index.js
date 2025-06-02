/**
 * src/index.js
 *
 * Entry point of the application. Imports the `sendBnb` function from
 * transfer.service.js, calls it, and handles success/error logging.
 */

'use strict';

const { sendBnb } = require('./transfer.service');

/**
 * Main runner. Calls `sendBnb()` and handles errors.
 */
async function main() {
  console.info('[INFO] Starting BNB transfer process...');
  try {
    const receipt = await sendBnb();
    console.info(
      `[SUCCESS] Transfer complete. Tx Hash: ${receipt.transactionHash}`
    );
    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Transfer failed:', error.message);
    process.exit(1);
  }
}

// Invoke main
main();
