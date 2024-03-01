import { useState, useEffect, useCallback } from 'react';
import { initNearContract } from '@/near/near-contract-helper';

export default function useNearContract(env: string) {
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize contract
  useEffect(() => {
    setLoading(true);
    initNearContract(env)
      .then(contract => setContract(contract))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [env]);

  // Wrap contract calls to handle loading and errors
  const callContract = useCallback(
    async (methodName: string | number, args = {}) => {
      if (!contract) {
        console.error('Contract is not initialized');
        return null;
      }
      try {
        if (contract[methodName]) {
          return await contract[methodName](args);
        } else {
          console.error(`Method ${methodName} does not exist on the contract`);
        }
      } catch (error) {
        console.error('Error calling contract method:', error);
      }
    },
    [contract]
  );

  return {
    loading,
    contract,
    // Contract method wrappers
    getName: () => callContract('get_name'),
    getMembers: (group: string) => callContract('get_members', { group }),
    getUnreadMessages: (account: any) =>
      callContract('unread_messages', { account }),
    getMessages: ({ accounts, group, offset, length }: { accounts: any, group: any, offset: any, length: any }) =>
      callContract('get_messages', { accounts, group, offset, length }),
    getChannelInfo: (group: string) => callContract('channel_info', { group }),
    getGroups: (account: any) => callContract('get_groups', { account }),
    getCreatedAt: () => callContract('created_at'),
    join: () => callContract('join'),
    ping: () => callContract('ping'),
    createGroup: (group: string) => callContract('create_group', { group }),
    joinGroup: (group: string) => callContract('join_group', { group }),
    leaveGroup: (group: string) => callContract('leave_group', { group }),
    groupInvite: (group: string, account: string) =>
      callContract('group_invite', { group, account }),
    sendMessage: ({ account, group, message, timestamp, parentMessage }: { account: any, group: any, message: any, timestamp: any, parentMessage: any }) =>
      callContract('send_message', {
        account,
        group,
        message,
        timestamp,
        parentMessage,
      }),
    readMessage: ({ account, group, message_id }: { account: any, group: any, message_id: any }) =>
      callContract('read_message', { account, group, message_id }),
    toggleReaction: (message_id: any, reaction: any) =>
      callContract('toggle_reaction', { message_id, reaction }),
  };
}
