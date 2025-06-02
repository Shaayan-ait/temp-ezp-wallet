## How the Script Works

1. **Configuration & Environment Setup**  
   - The script uses the `dotenv` library to load sensitive values (RPC URL, private key, recipient address, and amount) from a `.env` file.  
   - `src/config.js` validates that all required environment variables are present before proceeding.

2. **Library Used: ethers.js**  
   - Under the hood, the script relies on `ethers.js` to interact with the Binance Smart Chain (BSC) Testnet.  
   - `ethers.JsonRpcProvider` connects to the BSC Testnet RPC endpoint specified in `BSC_TESTNET_RPC_URL`.  
   - `new ethers.Wallet(privateKey, provider)` creates a wallet instance in memory, backed by the provided private key, and automatically handles transaction signing.

3. **Flow of Execution**  
   1. **Entry Point (src/index.js)**  
      - Calls `sendBnb()` and wraps it in a `try/catch` block to handle success or failure.  
      - On success, logs the transaction hash and exits with code `0`. On error, logs the error message and exits with code `1`.  

   2. **Core Logic (src/transfer.service.js)**  
      - **Address & Key Validation**  
        - Uses `ethers.getAddress()` to checksum-validate the recipient address.  
        - Checks that the private key is correctly formatted (`0x`-prefixed, 64 hex characters).  
      - **Provider & Wallet Initialization**  
        - Instantiates a `JsonRpcProvider` pointing to the BSC Testnet RPC URL.  
        - Constructs a `Wallet` object by passing the private key and provider; this wallet is able to sign transactions automatically.  
      - **Transaction Construction**  
        - Converts the decimal BNB amount (e.g., `"0.01"`) to Wei using `ethers.parseEther()`.  
        - Builds a basic transaction object:
          ```js
          {
            to: recipientAddress,
            value: <BigNumber in Wei>
          }
          ```
        - (Optionally, gas price/gas limit can be added, but ethers.js will estimate them by default on BSC Testnet.)
      - **Sending & Confirmation**  
        - Calls `wallet.sendTransaction(txObject)`, which:
          1. Signs the transaction payload with the private key.
          2. Broadcasts the signed transaction to the BSC Testnet.
        - Receives a `txResponse` containing the transaction hash.  
        - Calls `txResponse.wait()`, which polls for the transaction to be mined and returns a `receipt` once confirmed in a block.

4. **Under the Hood**  
   - **RPC Communication**  
     - Every call to `sendTransaction` and `wait()` is translated into JSON-RPC requests:
       1. `eth_sendRawTransaction` (after signing)  
       2. `eth_getTransactionReceipt` (during `wait()`)  
   - **Gas Estimation**  
     - ethers.js automatically estimates `gasLimit` and suggests a `gasPrice` by querying the BSC network, so developers do not need to manually calculate these values.  
   - **Error Handling**  
     - Common failure points include: insufficient test BNB balance, invalid private key, or network connectivity issues.  
     - All thrown errors bubble up to `src/index.js`, where they are caught and logged before exiting.

5. **Summary**  
   - **dotenv**: Loads `.env` values into `process.env`.  
   - **ethers.js**:  
     - Provides the `JsonRpcProvider` to communicate with BSC Testnet.  
     - Handles wallet creation, transaction signing, and broadcasting.  
     - Converts human-readable BNB amounts to Wei.  
   - **Script Flow**:  
     1. Load & validate config.  
     2. Initialize provider & wallet.  
     3. Build transaction object.  
     4. Send transaction & wait for confirmation.  
     5. Log results and exit.  
