const keypom = require('@keypom/core');
const {
  initKeypom,
  addToBalance,
  createDrop,
  getEnv,
  createNFTSeries,
  formatLinkdropUrl,
} = keypom;

// Imports used in the NEAR-API-JS method:
const { parseNearAmount } = require('@near-js/utils');
const { UnencryptedFileSystemKeyStore } = require('@near-js/keystores-node');
const { connect, Near } = require('@near-js/wallet-account');
var assert = require('assert');
const { Account } = require('@near-js/accounts');
// const { getRecentDropId } = require('../utils/general.js');
const path = require('path');
const homedir = require('os').homedir();

// Change this to your account ID
const FUNDER_ACCOUNT_ID = 'ethprince.testnet';
const NETWORK_ID = 'testnet';

async function createTicketNft() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = '.near-credentials';
  // const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const credentialsPath =
    '/Users/Kriskate/.near-credentials/testnet/ethprince.testnet.json';
  let keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);

  let nearConfig = {
    networkId: NETWORK_ID,
    keyStore: keyStore,
    nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
    walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${NETWORK_ID}.near.org`,
    explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
  };

  let near = new Near(nearConfig);
  const fundingAccount = new Account(near.connection, FUNDER_ACCOUNT_ID);

  // Initiate Keypom using existing NEAR testnet connection
  await initKeypom({
    near,
    network: NETWORK_ID,
  });

  await addToBalance({
    account: fundingAccount,
    amountNear: '20',
  });

  //      STEP 3: Create NFT drop
  // Create drop with 10 keys and 2 key uses each
  let { keys, dropId } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
      usesPerKey: 2,
    },
    depositPerUseNEAR: '0.00001',
    basePassword: 'event-password',
    passwordProtectedUses: [1],
    fcData: {
      methods: [
        null,
        [
          {
            receiverId: `nft-v2.keypom.${NETWORK_ID == 'mainnet' ? 'near' : 'testnet'}`,
            methodName: 'nft_mint',
            args: '',
            dropIdField: 'mint_id',
            accountIdField: 'receiver_id',
            attachedDeposit: parseNearAmount('0.00001'),
          },
        ],
      ],
    },
    useBalance: true,
  });

  await createNFTSeries({
    account: fundingAccount,
    dropId,
    metadata: {
      title: 'ethDenver NFT Ticket!',
      description: 'An ethDenver NFT POAP for the best BUIDLer in the world.',
      media: 'bafybeibwhlfvlytmttpcofahkukuzh24ckcamklia3vimzd4vkgnydy7nq',
      copies: 30,
    },
  });

  const { contractId: KEYPOM_CONTRACT } = getEnv();
  let tickets = formatLinkdropUrl({
    customURL: 'http://localhost:1234/CONTRACT_ID/SECRET_KEY',
    secretKeys: keys.secretKeys,
    contractId: KEYPOM_CONTRACT,
  });
  console.log(`

Ticket Links: 

${tickets}

`);

  return keys;
}

createTicketNft();

module.exports = {
  createTicketNft,
};
