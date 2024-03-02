/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { toast } from 'sonner';

import { useWallet } from '@/context/wallet-context';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

export const StakeAndMintSheet = () => {
  const { wallet, setWallet, isSignedIn, setIsSignedIn } = useWallet();

  // Dummy function for slide end handling. Replace with your actual logic.
  // const handleSlideEnd = () => {
  //   // console.log('Slide action confirmed');
  //   // Here, you can call onConfirm or any function to handle the confirmation and staking logic.
  // };

  const createPass = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000);
      const result = await wallet
        .callMethod({
          contractId: 'ethprince.testnet',
          method: 'nft_mint',
          args: {
            token_id: randomNumber.toString(),
            metadata: {
              title: 'Event Pass',
              description: 'Pass to access the event',
              media: 'https://example.com/image.jpg',
            },
            receiver_id: wallet.accountId,
            perpetual_royalties: {
              'ethprince.testnet': 1000,
            },
          },
          deposit: '6770000000000000000000000',
        })
        .toString();

      console.log('result', result);

      // //@ts-ignore
      // const result = await contract.nft_mint({
      //   token_id,
      //   metadata,
      //   receiver_id,
      //   perpetual_royalties:
      //     Object.keys(perpetual_royalties).length > 0
      //       ? perpetual_royalties
      //       : null,
      // });

      toast('Contract initialized successfully with name:', {
        description: `The contract is now ready for interaction. `,
      });
      // console.log('Contract initialized:', contract);
    } catch (error: any) {
      toast('Error initializing contract', {
        description: `An error occurred: ${error.message}`,
      });
      console.error('Error initializing contract:', error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="absolute bottom-4 w-[300px] justify-center">
          Stake & Mint
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center p-4"
        style={{ height: '95vh' }}
      >
        <h2 className="text-lg font-bold">Stake & Mint Your Pass</h2>
        <p className="my-4 text-sm text-gray-600">
          To register for this event, slide to confirm your stake of{' '}
          <span className="font-semibold"> tokens</span>.
        </p>

        {/* Slider to Confirm */}
        {/* <div className="relative my-4 w-full">
          <div className="h-12 w-full rounded-full bg-gray-200" />
          <div
            className="leading-12 absolute top-0 h-12 w-24 cursor-pointer rounded-full bg-green-500 text-center text-white"
            draggable="true"
            onDragEnd={handleSlideEnd}
            style={{ left: 'calc(100% - 6rem)' }} // Starts from the right end, adjust as per your requirement
          >
            Slide
          </div>
        </div> */}
        <Button onClick={createPass} className="w-full justify-center gap-2">
          Mint Event Pass
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
