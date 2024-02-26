'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { setCookie, deleteCookie } from 'cookies-next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';

import { Wallet } from '../../../../near/near-wallet'; // Adjust the import path according to your project structure
import getConfig from '../../../config'; // Adjust the import path as needed

const SignInButton = () => {
  const [wallet, setWallet] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const config = getConfig(process.env.NODE_ENV);

  // Initialize the Wallet instance and check sign-in status on component mount
  useEffect(() => {
    const initWallet = async () => {
      const walletInstance = new Wallet({
        createAccessKeyFor: config.contractName,
        network: 'testnet',
      } as any); // Or 'mainnet', depending on your needs
      const signedIn = await walletInstance.startUp();
      setWallet(walletInstance as any);
      setIsSignedIn(signedIn);

      

      if (signedIn) {
        const keystore = localStorage.getItem(`near-api-js:keystore:${walletInstance.accountId}`);
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
    // @ts-expect-error
    wallet.signIn();
  };

  const handleSignOut = () => {
    // @ts-expect-error
    wallet.signOut();
    setIsSignedIn(false);
    deleteCookie('near-function-key');
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
    </div>
  );
};

export default SignInButton;
