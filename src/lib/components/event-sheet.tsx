'use client';

import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

export function EventSheet() {
  // State to manage input values
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  // State to manage drawer visibility
  // Toggle drawer visibility

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircleIcon size={18} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex h-screen w-full flex-col p-4">
        {/* Adjust the bottom padding/margin to ensure content does not get hidden behind the button */}
        <ScrollArea className="h-auto overflow-y-auto">
          <h2 className="text-lg font-bold">Create Event</h2>
          <div className="space-y-4">
            <div>
              <Label>Event Banner</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Date and Time</Label>
              <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Description</Label>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Banner</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Date and Time</Label>
              <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Description</Label>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Banner</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Date and Time</Label>
              <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Event Description</Label>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
          </div>
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
