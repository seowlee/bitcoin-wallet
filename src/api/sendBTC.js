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

    for (const element of utxos) {
      let utxo = {};
      utxo.satoshis = Math.floor(Number(element.value) * 100000000);
      utxo.script = element.script_hex;
      utxo.address = response.data.data.address;
      utxo.txId = element.txid;
      utxo.outputIndex = element.output_no;
      totalAmountAvailable += utxo.satoshis;
      inputCount += 1;
      inputs.push(utxo);
    }

    const transactionSize =
      inputCount * 180 + outputCount * 34 + 10 - inputCount;

    fee = (transactionSize * recommededFee.data.hourFee) / 3;

    // Balance check
    if (totalAmountAvailable - satoshiToSend - fee < 0) {
      throw new Error("Balance is too low for this transaction");
    }

    // Set transaction input
    transaction.from(inputs);

    // Set recieverAddress and amountToSend
    transaction.to(recieverAddress, satoshiToSend);

    // Update sender Address (receive the left over funds after transfer)
    transaction.change(sourceAddress);
    console.log(satoshiToSend, fee);

    // manually set transaction fees - 20 satoshis per byte
    transaction.fee(Math.round(fee));

    // Sign transaction with sender privateKey
    transaction.sign(privateKey);

    // serialize transactions
    console.log(transaction.serialize());
    const serializedTransaction = transaction.serialize();

    // Send transaction
    const result = await axios({
      method: "POST",
      url: `https://chain.so/api/v2/send_tx/${sochain_network}`,
      data: {
        tx_hex: serializedTransaction,
      },
    });

    return result.data.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendBitcoin: sendBitcoin,
};
