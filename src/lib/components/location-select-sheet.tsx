/* eslint-disable no-console */

'use client';

import type { SetStateAction } from 'react';
import { useRef } from 'react';

import AddressAutocomplete from './address-autocomplete';
import { Button } from './ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from './ui/drawer';
// import { Input } from './ui/input';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

// interface Suggestion {
//   id: string;
//   place_name: string;
//   // Include other properties as needed
// }

export function LocationSelectSheet({
  selectedAddress,
  onAddressSelect,
}: {
  selectedAddress: string;
  onAddressSelect: (address: SetStateAction<string>) => void;
}) {
  const closeButtonRef = useRef(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          // Error callback
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by your browser.');
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Input
          value={selectedAddress}
          onChange={(e) => onAddressSelect(e.target.value)}
          placeholder="Choose Location"
        />
      </DrawerTrigger>
      <DrawerContent
        style={{ height: '95vh' }}
        className="flex w-full flex-col p-4"
      >
        <AddressAutocomplete setSelectedAddress={onAddressSelect} />
        <ScrollArea className="h-auto overflow-y-auto">
          <Button onClick={handleLocationClick}>Current Location</Button>
        </ScrollArea>
      </DrawerContent>
      <DrawerClose ref={closeButtonRef} />
    </Drawer>
  );
}
