'use client';

import { Button } from '@/lib/components/ui/button';
import { toast } from '@/lib/components/ui/use-toast';
import { initNearContract } from '@/near/near-contract-helper';

import { useWallet } from '@/context/wallet-context'; // Adjust the import path as needed

import { useNearContract } from '@/hooks/use-near-contract'; // Adjust the import path as needed

interface Contract {
  get_name(): Promise<string>;
}

export default function InitContractButton() {
  const { wallet, setWallet, isSignedIn, setIsSignedIn } = useWallet();
  const contractId = 'ethprince.testnet'; // Replace with your contract ID
  const { nftTotalSupply, nftSupplyForOwner, nftToken, nftMint, nftTokens} =
    useNearContract(contractId, wallet);

  const handleClick = async () => {
    try {
      console.log('wallet', wallet);
      // const env = 'testnet';

      // debugger;
      // const accountId = wallet.accountId;
      // const result = await nftSupplyForOwner(accountId);

      // const result = await nftToken('1')

      // const metadata = {
      //   token_id: '0',
      //   receiver_id: "'$ID'",
      //   token_metadata: {
      //     title: 'Some Art',
      //     description: 'My NFT media',
      //     media:
      //       'https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/',
      //     copies: 1,
      //   },
      // };

      // const result = await nftMint('3', metadata, wallet.accountId);

      const result = await nftTokens('1');

      console.log('result', result);

      toast({
        title: 'Contract initialized successfully with name:',
        description: `The contract is now ready for interaction. `,
      });
      // console.log('Contract initialized:', contract);
    } catch (error: any) {
      toast({
        title: 'Error initializing contract',
        description: `An error occurred: ${error.message}`,
      });
      console.error('Error initializing contract:', error);
    }
  };

  // if wallet is not signed in, return null
  if (!isSignedIn) {
    return <div>Waallet Not signed in</div>;
  }
  return (
    <Button onClick={handleClick} variant="outline" size="default">
      Initialize NEAR Contract
    </Button>
  );
}
