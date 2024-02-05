const { config } = require("dotenv");
const { TatumSDK, Network } = require("@tatumio/tatum");
const { EvmWalletProvider } = require("@tatumio/evm-wallet-provider");

config();

const MNEMONIC = process.env.MNEMONIC;
const XPUB = process.env.XPUB;

const initializeTatumSdk = async () => {
  return await TatumSDK.init({
    network: Network.ETHEREUM_SEPOLIA,
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
    .generateAddressFromMnemonic(MNEMONIC, 1);

  const addressFromXpub = await tatumSdk.walletProvider
    .use(EvmWalletProvider)
    .generateAddressFromXpub(XPUB, 1);

  console.log({ addressFromMnemonic, addressFromXpub });
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
