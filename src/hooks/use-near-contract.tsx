import { useState, useEffect, useCallback } from 'react';
import { initNearContract } from '@/near/near-contract-helper';

import { useWallet } from '@/context/wallet-context'; // Adjust the import path as needed

export function useNearContract(contractId: string, wallet: any) {
  // const contractId = 'ethprince.testnet'; // Replace with your contract ID
  return {
    // loading,
    wallet,
    // View methods
    nftTotalSupply: () =>
      wallet.viewMethod({
        contractId,
        method: 'nft_total_supply',
        args: {},
      }),
    nftTokensDefault: () =>
      wallet.viewMethod({
        contractId,
        method: 'nft_tokens',
        args: {},
      }),
    nftTokens: (fromIndex) =>
      wallet.viewMethod({
        contractId,
        method: 'nft_tokens',
        args: { from_index: fromIndex },
      }),
    nftSupplyForOwner: (accountId) =>
      wallet.viewMethod({
        contractId,
        method: 'nft_supply_for_owner',
        args: { account_id: accountId },
      }),
    nftTokensForOwner: (accountId, fromIndex, limit) =>
      wallet.viewMethod({
        contractId,
        method: 'nft_tokens_for_owner',
        args: { account_id: accountId, from_index: fromIndex, limit: limit },
      }),
    nftMetadata: () =>
      wallet.viewMethod({
        contractId,
        method: 'nft_metadata',
        args: {},
      }),
    nftToken: (tokenId) =>
      wallet.viewMethod({
        contractId,
        method: 'nft_token',
        args: { token_id: tokenId },
      }),

    // Call methods
    nftMint: (tokenId, metadata, receiverId) =>
      wallet.callMethod({
        contractId,
        method: 'nft_mint',
        args: {
          token_id: tokenId,
          metadata: metadata,
          receiver_id: receiverId,
        },
        deposit: '6000000000000000000000',
      }),
    nftTransfer: (receiverId, tokenId, approvalId, memo) =>
      wallet.callMethod({
        contractId,
        method: 'nft_transfer',
        args: {
          receiver_id: receiverId,
          token_id: tokenId,
          approval_id: approvalId,
          memo: memo,
        },
      }),
    nftApprove: (tokenId, accountId, msg) =>
      wallet.callMethod({
        contractId,
        method: 'nft_approve',
        args: { token_id: tokenId, account_id: accountId, msg: msg },
      }),
    nftRevoke: (tokenId, accountId) =>
      wallet.callMethod({
        contractId,
        method: 'nft_revoke',
        args: { token_id: tokenId, account_id: accountId },
      }),
    nftRevokeAll: (tokenId) =>
      wallet.callMethod({
        contractId,
        method: 'nft_revoke_all',
        args: { token_id: tokenId },
      }),
    nftTransferCall: (receiverId, tokenId, approvalId, memo, msg) =>
      wallet.callMethod({
        contractId,
        method: 'nft_transfer_call',
        args: {
          receiver_id: receiverId,
          token_id: tokenId,
          approval_id: approvalId,
          memo: memo,
          msg: msg,
        },
      }),
  };
}
