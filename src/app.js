const { mainnet, testnet } = require("bitcore-lib/lib/networks");
const { createWallet, createHDWallet } = require("./api/wallet");
const { sendBitcoin } = require("./api/sendBTC");

sendBitcoin("mhe5hkmx26CZkbMPprQQifLLwqfb5pZUKZ", 0.0001)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(createWallet(testnet));
// console.log(createHDWallet(testnet));
