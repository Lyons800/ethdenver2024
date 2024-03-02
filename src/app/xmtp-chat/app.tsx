'use client';
import Head from 'next/head';
import { NavigationView, ConversationView } from '../../components/Views';
import { RecipientControl } from '../../components/Conversation';
// import NewMessageButton from './NewMessageButton'
// import NavigationPanel from './NavigationPanel'
import XmtpInfoPanel from '../../components/XmtpInfoPanel';
// import UserMenu from './UserMenu'
import React, { useCallback } from 'react';
import { useAppStore } from '../../components/store/app';
import useInitXmtpClient from '../../components/hooks/useInitXmtpClient';
import useListConversations from '../../components/hooks/useListConversations';
import useWalletProvider from '../../components/hooks/useWalletProvider';

export const dynamic = 'force-dynamic';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const client = useAppStore((state) => state.client);
  const { initClient } = useInitXmtpClient();
  useListConversations();
  const walletAddress = useAppStore((state) => state.address);
  const signer = useAppStore((state) => state.signer);

  const { connect: connectWallet, disconnect: disconnectWallet } =
    useWalletProvider();

  const handleDisconnect = useCallback(async () => {
    await disconnectWallet();
  }, [disconnectWallet]);

  const handleConnect = useCallback(async () => {
    await connectWallet();
    signer && (await initClient(signer));
  }, [connectWallet, initClient, signer]);

  return (
    <>
      <Head>
        <title>Chat via XMTP</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div>
        {/* <NavigationView>
          <aside className="flex w-full md:w-84 flex-col flex-grow fixed inset-y-0">
            <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto">
              <div className="max-h-16 min-h-[4rem] bg-p-600 flex items-center justify-between flex-shrink-0 px-4">
                <Link href="/" passHref={true}>
                  <img className="h-8 w-auto" src="/xmtp-icon.png" alt="XMTP" />
                </Link>
                {walletAddress && client && <NewMessageButton />}
              </div>
              <NavigationPanel onConnect={handleConnect} />
              <UserMenu
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            </div>
          </aside>
        </NavigationView> */}
        <ConversationView>
          {walletAddress && client ? (
            <>
              <div className="flex max-h-16 min-h-[4rem] border-b border-gray-200 bg-zinc-50 md:border-0 md:bg-white">
                <RecipientControl />
              </div>
              {children}
            </>
          ) : (
            <XmtpInfoPanel onConnect={handleConnect} />
          )}
        </ConversationView>
      </div>
    </>
  );
};

export default App;
