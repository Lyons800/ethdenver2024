// lib/near.js
import * as nearAPI from 'near-api-js';
import getConfig from '@/config';

export async function initNearContract(env) {
  const config = getConfig(env);

  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  const privateKey = process.env.NEXT_PUBLIC_NEAR_PRIVATE_KEY;
  const keyPair = nearAPI.utils.KeyPair.fromString(privateKey);

  await keyStore.setKey(config.networkId, config.contractName, keyPair);

  const near = await nearAPI.connect({ keyStore, ...config });

  const contract = new nearAPI.Contract(
    await near.account(config.contractName),
    config.contractName,
    {
      viewMethods: [
        'get_name',
        'get_members',
        'unread_messages',
        'get_messages',
        'channel_info',
        'get_groups',
        'created_at',
      ],
      changeMethods: [
        'join',
        'ping',
        'create_group',
        'join_group',
        'leave_group',
        'group_invite',
        'send_message',
        'read_message',
        'toggle_reaction',
      ],
    }
  );

  return contract;
}
