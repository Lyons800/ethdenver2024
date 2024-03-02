'use client';

import { Button } from '@/lib/components/ui/button';
import { toast } from '@/lib/components/ui/use-toast';
import { initNearContract } from '@/near/near-contract-helper';

import { useWallet } from '@/context/wallet-context'; // Adjust the import path as needed

interface Contract {
  get_name(): Promise<string>;
}

export default function InitContractButton() {
  const { wallet, setWallet, isSignedIn, setIsSignedIn } = useWallet();

  const handleClick = async () => {
    try {
      console.log('wallet', wallet);
      // const env = 'testnet';
      // debugger;
      // const contract = await initNearContract('testnet', wallet);

     const result = await wallet.viewMethod({contractId: 'ethprince.testnet', method: 'nft_total_supply', args: {}})

     console.log('result', result);

    //  const result =  await contract.nft_total_supply()
    //   console.log('result', result);

      // const name = await contract.get_name()
      // console.log('contract name', name);

      // Assuming initNearContract() resolves with some contract instance or similar
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

  return (
    <Button onClick={handleClick} variant="outline" size="default">
      Initialize NEAR Contract
    </Button>
  );
}
