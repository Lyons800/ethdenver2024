import { useState, useEffect, useCallback } from 'react';
import { initNearContract } from '@/near/near-contract-helper';

export default function useNearContract(env) {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize contract
  useEffect(() => {
    setLoading(true);
    initNearContract(env)
      .then(setContract)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [env]);

  // Wrap contract calls to handle loading and errors
  const callContract = useCallback(
    async (methodName, args = {}) => {
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
    getMembers: (group) => callContract('get_members', { group }),
    getUnreadMessages: (account) =>
      callContract('unread_messages', { account }),
    getMessages: ({ accounts, group, offset, length }) =>
      callContract('get_messages', { accounts, group, offset, length }),
    getChannelInfo: (group) => callContract('channel_info', { group }),
    getGroups: (account) => callContract('get_groups', { account }),
    getCreatedAt: () => callContract('created_at'),
    join: () => callContract('join'),
    ping: () => callContract('ping'),
    createGroup: (group) => callContract('create_group', { group }),
    joinGroup: (group) => callContract('join_group', { group }),
    leaveGroup: (group) => callContract('leave_group', { group }),
    groupInvite: (group, account) =>
      callContract('group_invite', { group, account }),
    sendMessage: ({ account, group, message, timestamp, parentMessage }) =>
      callContract('send_message', {
        account,
        group,
        message,
        timestamp,
        parentMessage,
      }),
    readMessage: ({ account, group, message_id }) =>
      callContract('read_message', { account, group, message_id }),
    toggleReaction: (message_id, reaction) =>
      callContract('toggle_reaction', { message_id, reaction }),
  };
}
