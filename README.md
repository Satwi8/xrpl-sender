# xrpl-sender

A simple library to send XRP via XRPL testnet. Ideal for testing, demos, or blockchain-based app development.

## Installation

```bash
npm install xrpl-sender

USAGE

const { sendXrp } = require("xrpl-sender");

sendXrp("rpZrQpLbg1nfRVTu3BCPb6oT1vUKn11kab", 50)
  .then(result => {
    console.log("✅ Transaction successful:", result);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
  });

License
MIT License © 2025 Satwic787
