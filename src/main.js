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

async function generateAddress() {
  const tatumSdk = await initializeTatumSdk();

  const addressFromMnemonic = await tatumSdk.walletProvider
    .use(EvmWalletProvider)
    .generateAddressFromMnemonic(MNEMONIC, 0);

  console.log({ addressFromMnemonic });
}

async function main() {
  await generatePrivateKey();

  await generateAddress();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
  });
