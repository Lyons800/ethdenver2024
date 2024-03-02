'use client';

import { Clock, MapPinIcon, ShareIcon } from 'lucide-react';
import Image from 'next/image';

import type { Event } from '../types';

import MapComponent from './map';
import { StakeAndMintSheet } from './mint-pass-sheet';
import { PassSheet } from './pass-sheet';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { ScrollArea } from './ui/scroll-area';

export function EventSheet({ event }: { event: Event }) {
  const isAttending = true;

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
              {/* Placeholder for date formatting */}
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
        <ScrollArea className="h-auto overflow-y-auto">
          <div className="mt-4 flex w-full items-center justify-center">
            <Image
              src={event.image}
              alt={event.name}
              width={360}
              height={360}
              className="rounded-md"
            />
          </div>
          <h3 className="mt-4 font-semibold">{event.name}</h3>
          <p className="flex flex-row items-center gap-2 text-sm text-gray-600">
            Today at 20:30 - 21:30
          </p>
          <Button
            variant="outline"
            className="mt-4 w-full justify-center gap-2"
          >
            <ShareIcon size="16" />
            Share
          </Button>
          Location
          <p className="flex flex-row items-center gap-2 text-sm text-gray-600">
            {event.location}
          </p>
          <div className="mb-4 h-[100px] overflow-hidden rounded-lg">
            <MapComponent latitude={null} longitude={null} />
          </div>
          <p className="mt-4">{event.description}</p>
          <div className="space-y-4" />
        </ScrollArea>

        {/* Conditional Rendering for Registration or Ticket Link */}
        {isAttending ? (
          <div className="flex w-full justify-center">
            <PassSheet event={event} />
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <StakeAndMintSheet eventId={event.id} />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
