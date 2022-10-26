const { testnet } = require("bitcore-lib/lib/networks");
const { createWallet } = require("./wallet");
const sendBitcoin = require("./sendBitcoin");

console.log(createWallet(testnet));
