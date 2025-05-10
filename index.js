const xrpl = require("xrpl");

/**
 * Send XRP on XRPL testnet.
 */
async function sendXrp(destinationAddress, amountXrp, options = {}) {
  const server = options.server || "wss://s.altnet.rippletest.net:51233";
  const client = new xrpl.Client(server);
  await client.connect();

  const wallet = xrpl.Wallet.generate();

  console.log(`🔑 Wallet created: ${wallet.classicAddress}`);
  console.log(`👉 Fund it at https://xrpl.org/xrp-testnet-faucet.html`);
  await new Promise(resolve => setTimeout(resolve, 15000));

  const balance = await client.getXrpBalance(wallet.classicAddress);
  if (balance === "0") {
    await client.disconnect();
    throw new Error("Wallet not funded.");
  }

  const tx = {
    TransactionType: "Payment",
    Account: wallet.classicAddress,
    Amount: xrpl.xrpToDrops(amountXrp),
    Destination: destinationAddress,
  };

  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  await client.disconnect();
  return result;
}

module.exports = { sendXrp };
