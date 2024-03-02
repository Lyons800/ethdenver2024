'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { setCookie, deleteCookie } from 'cookies-next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';

import getConfig from '../../config'; // Adjust the import path as needed
import { Wallet } from '../../near/near-wallet'; // Adjust the import path according to your project structure

import { useWallet } from '@/context/wallet-context'; // Adjust the import path as needed

const SignInButton = () => {
  // const [wallet, setWallet] = useState(null);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  const { wallet, setWallet, isSignedIn, setIsSignedIn } = useWallet();

  const config = getConfig('testnet');

  // Initialize the Wallet instance and check sign-in status on component mount
  useEffect(() => {
    const initWallet = async () => {
      const walletInstance = new Wallet({
        createAccessKeyFor: config.contractName,
        network: 'testnet',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any); // Or 'mainnet', depending on your needs
      const signedIn = await walletInstance.startUp();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setWallet(walletInstance as any);
      setIsSignedIn(signedIn);
      console.log('wallet', walletInstance);

      if (signedIn) {
        const keystore = localStorage.getItem(
          `near-api-js:keystore:${walletInstance.accountId}`
        );
        if (keystore) {
          setCookie('near-function-key', keystore, {
            maxAge: 60 * 60 * 24 * 7,
          }); // 7 days expiration
        }
      }
    };

    initWallet();
  }, []);

  const handleSignIn = () => {
    // @ts-ignore
    wallet.signIn();
  };

  const handleSignOut = () => {
    // @ts-ignore
    wallet.signOut();
    setIsSignedIn(false);
    deleteCookie('near-function-key');
  };

  // Function to log the wallet state
  const logWalletState = () => {
    console.log(wallet);
  };

  return (
    <div>
      {isSignedIn ? (
        // eslint-disable-next-line react/button-has-type
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        // eslint-disable-next-line react/button-has-type
        <button onClick={handleSignIn}>Sign In with NEAR Wallet</button>
      )}
      {/* Button to log the wallet state */}
      <button onClick={logWalletState}>Log Wallet State</button>
    </div>
  );
};

export default SignInButton;
