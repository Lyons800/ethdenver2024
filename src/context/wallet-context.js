'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import getConfig from '../config'; // Adjust the import path as needed
import { Wallet } from '../near/near-wallet'; // Adjust the import path according to your project structure

// Create a Context
const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

// Provider Component
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const config = getConfig('testnet');


  useEffect(() => {
    const initWallet = async () => {
      const walletInstance = new Wallet({
        createAccessKeyFor: config.contractName,
        network: 'testnet',
      });
      const signedIn = await walletInstance.startUp();

      setWallet(walletInstance);
      setIsSignedIn(signedIn);
    };

    initWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet,setWallet, isSignedIn, setIsSignedIn }}>
      {children}
    </WalletContext.Provider>
  );
};
