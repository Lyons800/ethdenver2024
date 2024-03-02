const { Account } = require('@near-js/accounts');
const { connect, Near } = require('@near-js/wallet-account');
const { parseNearAmount } = require('@near-js/utils');
const { UnencryptedFileSystemKeyStore } = require('@near-js/keystores-node');
const keypom = require('@keypom/core');
const { initKeypom, createDrop, getEnv, createNFTSeries, formatLinkdropUrl } =
  keypom;
const path = require('path');
const homedir = require('os').homedir();

const FUNDER_ACCOUNT_ID = 'ethprince.testnet';
const NETWORK_ID = 'testnet';

async function addToKeypomBalance() {
  const CREDENTIALS_DIR = '.near-credentials';
  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);

  let keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);
  // Configure the connection to the NEAR testnet
  let nearConfig = {
    networkId: NETWORK_ID,
    keyStore: keyStore,
    nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
    walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${NETWORK_ID}.near.org`,
    explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
  };

  let near = new Near(nearConfig);
  const fundingAccount = new Account(near.connection, FUNDER_ACCOUNT_ID); // Replace with your NEAR account name

  // Specify the amount to add to your Keypom balance
  const amountToAdd = '20'; // 20 NEAR

  // Initiate Keypom using existing NEAR testnet connection
  await initKeypom({
    near,
    network: NETWORK_ID,
  });

  // Assuming `addToBalance` is a method exposed by the Keypom contract
  // and you have the correct contract name and method details
  const keypomContractName = 'nft-v2.keypom.testnet'; // Replace with the actual Keypom contract name
  await fundingAccount.functionCall({
    contractId: keypomContractName,
    methodName: 'addToBalance',
    args: {}, // Additional arguments if needed
    gas: '30000000000000', // Adjust gas accordingly
    attachedDeposit: parseNearAmount(amountToAdd),
  });

  console.log(`Added ${amountToAdd} NEAR to your Keypom balance.`);
}

addToKeypomBalance().catch(console.error);
