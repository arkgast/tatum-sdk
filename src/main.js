import { config } from "dotenv";
import { TatumSDK, Network } from "@tatumio/tatum";
import { EvmWalletProvider } from "@tatumio/evm-wallet-provider";

config();

const MNEMONIC = process.env.MNEMONIC;
const XPUB = process.env.XPUB;
const TATUM_API_KEY = process.env.TATUM_API_KEY;

const TO_ADDRESS = "0x5014E84d22D69e1607cA5eE6F3DB57E2Cb442843";

const initializeTatumSdk = async () => {
  return await TatumSDK.init({
    network: Network.ETHEREUM_SEPOLIA,
    configureWalletProviders: [EvmWalletProvider],
    apiKey: {
      v4: TATUM_API_KEY,
    },
  });
};

async function generatePrivateKey() {
  const tatumSdk = await initializeTatumSdk();

  const privateKey = await tatumSdk.walletProvider
    .use(EvmWalletProvider)
    .generatePrivateKeyFromMnemonic(MNEMONIC, 1);

  console.log({ privateKey });

  return privateKey;
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

async function signAndBroadcastTransaction() {
  const tatumSdk = await initializeTatumSdk();

  const privateKey = await generatePrivateKey();

  const payload = {
    privateKey,
    to: TO_ADDRESS,
    value: "0.01",
  };

  const txHash = await tatumSdk.walletProvider
    .use(EvmWalletProvider)
    .signAndBroadcast(payload);

  console.log({ txHash });
}

async function main() {
  await generatePrivateKey();

  await generateAddress();

  await signAndBroadcastTransaction();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
