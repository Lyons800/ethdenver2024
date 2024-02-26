'use client';

import { AddressAutofill } from '@mapbox/search-js-react';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

const accessToken =
  'pk.eyJ1IjoibHlvbnM4MDAiLCJhIjoiY2x0M2N0emt0MDJhdzJrcGM2Ynk1ejV3cSJ9.oJibrgjTlCheNzN2XKS46Q';

export function LocationSelectSheet() {
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          // You can also do something with these coordinates, like setting them to state or sending them to an API.
        },
        (error) => {
          // Error callback
          console.error('Error getting location:', error);
          // You can handle errors here, for example, by showing an alert or a message to the user.
        }
      );
    } else {
      // Geolocation is not supported by this browser
      console.log('Geolocation is not supported by your browser.');
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Current Location</Button>
      </DrawerTrigger>

      <DrawerContent
        style={{ height: '95vh' }}
        className="flex w-full flex-col p-4"
      >
        {/* <Input className="my-2" placeholder="Search for a location" /> */}
        <AddressAutofill accessToken={accessToken}>
          <input type="text" name="address" autoComplete="street-address" />
        </AddressAutofill>
        {/* Adjust the bottom padding/margin to ensure content does not get hidden behind the button */}
        <ScrollArea className="h-auto overflow-y-auto">
          <Button onClick={handleLocationClick}>Current Location</Button>
        </ScrollArea>
        {/* Button is positioned absolutely at the bottom of the DrawerContent */}
      </DrawerContent>
    </Drawer>
  );
}
