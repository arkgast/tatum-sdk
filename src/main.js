const { config } = require("dotenv");
const { TatumSDK, Network } = require("@tatumio/tatum");
const { EvmWalletProvider } = require("@tatumio/evm-wallet-provider");

config();

const MNEMONIC = process.env.MNEMONIC;

const initializeTatumSdk = async () => {
  return await TatumSDK.init({
    network: Network.POLYGON,
    configureWalletProviders: [EvmWalletProvider],
  });
};

async function generatePrivateKey() {
  const tatumSdk = await initializeTatumSdk();

  const privateKey = await tatumSdk.walletProvider
    .use(EvmWalletProvider)
    .generatePrivateKeyFromMnemonic(MNEMONIC, 1);

  console.log({ privateKey });
}

generatePrivateKey().then(() => process.exit(0));
