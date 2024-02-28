'use client';

import { formatDate } from 'date-fns';
import { Clock, MapPinIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { ScrollArea } from './ui/scroll-area';

export function EventSheet({ event }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          key={event.id}
          className="flex flex-row items-start rounded-lg border p-4"
        >
          <Image
            src={event.image}
            alt={event.name}
            width={60}
            height={60}
            className="rounded-md"
          />
          <div className="ml-4 flex flex-col items-start">
            <h3 className="mt-0 font-semibold">{event.name}</h3>
            <p className="flex flex-row items-center gap-2 text-sm text-gray-600">
              <Clock size="16" />
              {/* {formatDate(event.dateTime)} */}
            </p>
            <p className="flex flex-row items-center gap-2 text-sm text-gray-600">
              <MapPinIcon size="16" />
              {event.location}
            </p>
          </div>
        </button>
      </DrawerTrigger>

      <DrawerContent
        className="flex w-full flex-col p-4"
        style={{ height: '95vh' }}
      >
        {/* Adjust the bottom padding/margin to ensure content does not get hidden behind the button */}
        <ScrollArea className="h-auto overflow-y-auto">
          <h2 className="text-lg font-bold">Event Details</h2>
          <div className="space-y-4" />
        </ScrollArea>
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
