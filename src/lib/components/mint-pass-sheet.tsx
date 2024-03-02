'use client';

import { initNearContract } from '@/near/near-contract-helper';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

export const StakeAndMintSheet = ({ eventId }) => {
  // Dummy function for slide end handling. Replace with your actual logic.
  // const handleSlideEnd = () => {
  //   // console.log('Slide action confirmed');
  //   // Here, you can call onConfirm or any function to handle the confirmation and staking logic.
  // };

  const createPass = async () => {
    try {
      const contract = await initNearContract('testnet');

      // Assuming you have these values correctly defined elsewhere in your code
      const token_id = '21'; // Unique token ID for the NFT
      const receiver_id = 'ethprince.testnet'; // The account that will receive the NFT
      const metadata = {
        event_id: eventId, // Use eventId as the title in metadata
        title: eventName, // Use eventName as the title in metadata
        description: eventDescription, // Event description
        // Add other metadata fields as needed
      };
      const perpetual_royalties = {
        // Define perpetual royalties here, if any
        // "account_id.testnet": percentage (e.g., 500 for 5%)
      };

      // Adjust the call to match the `nft_mint` function's expected parameters
      const result = await contract.nft_mint({
        token_id,
        metadata,
        receiver_id,
        perpetual_royalties:
          Object.keys(perpetual_royalties).length > 0
            ? perpetual_royalties
            : null,
      });

      console.log('NFT minted:', result);
    } catch (error) {
      console.error('Failed to mint NFT', error);
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
