'use client';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { ScrollArea } from './ui/scroll-area';

export function LocationSelectSheet() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Current Location</Button>
      </DrawerTrigger>

      <DrawerContent className="flex w-full flex-col p-4">
        {/* Adjust the bottom padding/margin to ensure content does not get hidden behind the button */}
        <ScrollArea className="h-auto overflow-y-auto">Locations</ScrollArea>
        {/* Button is positioned absolutely at the bottom of the DrawerContent */}
        <div className="flex w-full justify-center">
          <Button className="absolute bottom-4 w-[300px] justify-center">
            Register
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
