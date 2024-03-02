const development = {
    networkId: 'default',
    nodeUrl: 'http://localhost:3030',
    contractName: 'dev-1699477717061-85460506735763',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  
  const testnet = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: 'ethprince.testnet',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  
  const mainnet = {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    contractName: 'dev-1699477717061-85460506735763',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
  };
  
  const getConfig = (env) => {
    switch (env) {
      case 'production':
      case 'mainnet':
        return mainnet;
      case 'development':
      case 'testnet':
        return testnet;
      default:
        return development;
    }
  };
  
  module.exports = getConfig;
  