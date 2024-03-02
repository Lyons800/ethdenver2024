'use client';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Conversation } from '../../../../components/Conversation';
import useWalletProvider from '../../../../components/hooks/useWalletProvider';
import { isEns } from '../../../../components/helpers/string';

export const dynamic = 'force-dynamic';

const ConversationPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientWalletAddrQuery = searchParams.get('recipientWalletAddr');
  const params = useParams();

  const { resolveName } = useWalletProvider();
  //   const [recipientWalletAddr, setRecipientWalletAddr] = useState<string>('0x73550a2BfA78D4eb5B31F3d4ecd482f0725dc2A9')
  const [recipientWalletAddr, setRecipientWalletAddr] = useState<string>(
    params.recipientWalletAddr as string
  );

  //   useEffect(() => {
  //     const routeAddress =
  //       (Array.isArray(recipientWalletAddrQuery)
  //         ? recipientWalletAddrQuery.join('/')
  //         : recipientWalletAddrQuery) ?? ''
  //     setRecipientWalletAddr(routeAddress)
  //   }, [recipientWalletAddr])

  //   useEffect(() => {
  //     if (!recipientWalletAddr && window.location.pathname.includes('/xmtp-chat/dm')) {
  //       router.push(window.location.pathname)
  //       setRecipientWalletAddr(window.location.pathname.replace('/xmtp-chat/dm/', ''))
  //     }
  //     const checkIfEns = async () => {
  //       if (recipientWalletAddr && isEns(recipientWalletAddr)) {
  //         const address = await resolveName(recipientWalletAddr)
  //         router.push(`/xmtp-chat/dm/${address}`)
  //       }
  //     }
  //     checkIfEns()
  //   }, [recipientWalletAddr, window.location.pathname])

  return <Conversation recipientWalletAddr={recipientWalletAddr ?? ''} />;
};

export default React.memo(ConversationPage);
