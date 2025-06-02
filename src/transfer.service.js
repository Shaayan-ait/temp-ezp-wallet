/**
 * src/transfer.service.js
 *
 * Contains the core logic for sending BNB from one wallet to another
 * on BSC Testnet. Uses ethers.js to build, sign, and broadcast the transaction.
 */

const { ethers } = require('ethers');
const {
  bscTestnetRpcUrl,
  privateKey,
  recipientAddress,
  amountInBnb,
} = require('./config');

/**
 * Validates that a string is a valid Ethereum‐style address (0x-prefixed, 40 hex chars).
 * @param {string} address
 * @returns {boolean}
 */
function isValidAddress(address) {
  try {
    // ethers.js provides getAddress to checksum and validate
    ethers.utils.getAddress(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Core function to send BNB on BSC Testnet.
 * 
 * Steps:
 * 1. Create a JsonRpcProvider pointing at BSC Testnet.
 * 2. Instantiate a Wallet from the private key and connect it to the provider.
 * 3. Build a transaction: to, value, gasPrice (optional), gasLimit (optional).
 * 4. Send the transaction, await the transaction hash, then wait for confirmation.
 * 5. Return the transaction receipt.
 * 
 * @async
 * @returns {Object} The transaction receipt once confirmed.
 */
async function sendBnb() {
  // Validate recipient address
//   if (!isValidAddress(recipientAddress)) {
//     throw new Error(
//       `[InvalidAddress] Recipient address "${recipientAddress}" is not a valid BSC address.`
//     );
//   }

  // Validate private key format
  if (!privateKey.startsWith('0x') || privateKey.length !== 66) {
    throw new Error(
      `[InvalidPrivateKey] PRIVATE_KEY must be 0x-prefixed and 64 hex characters long.`
    );
  }

  // Instantiate provider
  const provider = new ethers.JsonRpcProvider(bscTestnetRpcUrl);

  // Instantiate wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Convert amount in BNB (string) to wei (BigNumber)
  const value = ethers.parseEther(amountInBnb);

  // Build transaction object
  const txObject = {
    to: recipientAddress,
    value,
    // OPTIONAL: You can explicitly set gasPrice and gasLimit here.
    // gasPrice: ethers.utils.parseUnits('10', 'gwei'),
    // gasLimit: 21000,
  };

  console.info(
    `[INFO] Preparing transaction: Send ${amountInBnb} BNB to ${recipientAddress}`
  );

  // Send transaction
  const txResponse = await wallet.sendTransaction(txObject);
  console.info(`[INFO] Transaction sent. Hash: ${txResponse.hash}`);

  // Wait for confirmation (1 block)
  const receipt = await txResponse.wait();
  console.info(
    `[INFO] Transaction confirmed in block ${receipt.blockNumber}.`
  );

  return receipt;
}

module.exports = {
  sendBnb,
};
