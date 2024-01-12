const { TatumSDK, Network, ApiVersion } = require("@tatumio/tatum");

async function initialize() {
  return await TatumSDK.init({
    network: Network.ETHEREUM,
    version: ApiVersion.V4,
  });
}

async function getEstimateFee() {
  const tatum = await initialize();

  return tatum.fee.getCurrentFee();
}

getEstimateFee();
