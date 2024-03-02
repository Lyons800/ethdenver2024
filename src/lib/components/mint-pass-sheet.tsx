'use client';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

export const StakeAndMintSheet = () => {
  // Dummy function for slide end handling. Replace with your actual logic.
  const handleSlideEnd = () => {
    // console.log('Slide action confirmed');
    // Here, you can call onConfirm or any function to handle the confirmation and staking logic.
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
        <div className="relative my-4 w-full">
          <div className="h-12 w-full rounded-full bg-gray-200" />
          <div
            className="leading-12 absolute top-0 h-12 w-24 cursor-pointer rounded-full bg-green-500 text-center text-white"
            draggable="true"
            onDragEnd={handleSlideEnd}
            style={{ left: 'calc(100% - 6rem)' }} // Starts from the right end, adjust as per your requirement
          >
            Slide
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
