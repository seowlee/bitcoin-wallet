const axios = require("axios");
const bitcore = require("bitcore-lib");

const sendBitcoin = async (recieverAddress, amountToSend) => {
  try {
    console.log("sendBitcoin");
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendBitcoin: sendBitcoin,
};
