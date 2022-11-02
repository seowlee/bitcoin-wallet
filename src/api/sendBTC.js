const axios = require("axios");
const bitcore = require("bitcore-lib");

const sendBitcoin = async (recieverAddress, amountToSend) => {
  try {
    const sochain_network = "BTCTEST";
    const privateKey =
      "5d264784f587621ffae7013405b2ffb862b9115c0839dc1844263243c800538d";
    const sourceAddress = "mngfToQdYLdetGDoZDHmYCzECitg9yxbPt";
    const satoshiToSend = amountToSend * 100000000;
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;

    const response = await axios.get(
      `https://chain.so/api/v2/get_tx_unspent/${sochain_network}/${sourceAddress}`
    );

    const recommededFee = await axios.get(
      "https://bitcoinfees.earn.com/api/v1/fees/recommended"
    );

    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;

    let inputs = [];
    let utxos = response.data.data.txs;

    console.log("sendBitcoin");
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendBitcoin: sendBitcoin,
};
