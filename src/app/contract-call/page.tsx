'use client';

import { Button } from '@/lib/components/ui/button';
import { toast } from '@/lib/components/ui/use-toast';
import { initNearContract } from '@/near/near-contract-helper';

export default function InitContractButton() {
  const handleClick = async () => {
    try {
      const env = 'testnet';
      const contract = await initNearContract(env);

      const name = await contract.get_name();
      console.log('contract name', name);

      // Assuming initNearContract() resolves with some contract instance or similar
      toast({
        title: 'Contract initialized successfully with name:',
        description: `The contract is now ready for interaction. Name: ${name}`,
      });
      console.log('Contract initialized:', contract);
    } catch (error) {
      toast({
        title: 'Error initializing contract',
        description: `An error occurred: ${error.message}`,
      });
      console.error('Error initializing contract:', error);
    }
  };

  return (
    <Button onClick={handleClick} variant="outline" size="md">
      Initialize NEAR Contract
    </Button>
  );
}
