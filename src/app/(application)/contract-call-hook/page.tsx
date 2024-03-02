'use client';

import { Button } from '@/lib/components/ui/button';
import { toast } from '@/lib/components/ui/use-toast';
import useNearContract from '@/hooks/use-near-contract';

export default function InitContractButton() {
  const env = 'testnet';
  const { contract, getName } = useNearContract(env);

  
  const handleClick = async () => {
    try {

      // const name = await contract.get_name();
      const name = await getName();
      console.log('contract name', name);

      // Assuming initNearContract() resolves with some contract instance or similar
      toast({
        title: 'Contract initialized successfully with name:',
        description: `The contract is now ready for interaction. Name: ${name}`,
      });
      console.log('Contract initialized:', contract);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast({
        title: 'Error initializing contract',
        description: `An error occurred: ${errorMessage}`,
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
