const { PrivateKey } = require("bitcore-lib");
const { mainnet, testnet } = require("bitcore-lib/lib/networks");

const Mnemonic = require("bitcore-mnemonic");

const createWallet = (network = mainnet) => {
  var privateKey = new PrivateKey();
  var address = privateKey.toAddress(network);
  return {
    privateKey: privateKey.toString(),
    address: address.toString(),
  };
};

/**
 * Hierachical Determinstic wallet (HD wallet)
 */
const createHDWallet = (network = mainnet) => {
  let passPharse = new Mnemonic(Mnemonic.Words.KOREAN);
  let xpriv = passPharse.toHDPrivateKey(passPharse.toString(), network);

  return {
    xpub: xpriv.xpubkey,
    privateKey: xpriv.privateKey.toString(),
    address: xpriv.publicKey.toAddress().toString(),
    mnemonic: passPharse.toString(),
  };
};

module.exports = {
  createWallet: createWallet,
  createHDWallet: createHDWallet,
};
