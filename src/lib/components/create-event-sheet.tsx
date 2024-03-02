/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */

'use client';

import { PlusCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { initNearContract } from '@/near/near-contract-helper';

import { LocationSelectSheet } from './location-select-sheet';
import MapComponent from './map';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

async function geocodeAddress(address: string | number | boolean) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { features } = data;
    if (features && features.length > 0) {
      const { center } = features[0];
      return { longitude: center[0], latitude: center[1] };
    }
    return null;
  } catch (error) {
    console.error('Failed to geocode address', error);
    return null;
  }
}

export function CreateEventSheet() {
  // State to manage input values
  const [selectedAddress, setSelectedAddress] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  interface EventDetails {
    name: string;
    description: string;
    date: string;
    coordinates: {
      latitude: number | null;
      longitude: number | null;
    };
  }

  const createEventContract = async (eventDetails: EventDetails) => {
    try {
      const factoryContract = await initNearContract('testnet');

      // Prepare the event details as metadata
      const eventMetadata = {
        title: eventDetails.name,
        description: eventDetails.description,
        date: eventDetails.date,
        location: JSON.stringify({
          latitude: eventDetails.coordinates.latitude,
          longitude: eventDetails.coordinates.longitude,
        }),
        // Add other event details as needed
      };

      // Call the factory contract's method to deploy a new event contract
      // with the event metadata
      //@ts-ignore
      const newContractDetails = await factoryContract.new({
        owner_id: 'ethprince.testnet', // Specify the owner of the new contract
        metadata: eventMetadata, // Pass the prepared metadata
      });

      console.log(
        'New event contract deployed at:',
        newContractDetails.contractAddress
      );
    } catch (error) {
      console.error('Failed to deploy new event contract:', error);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      geocodeAddress(selectedAddress).then((coords) => {
        if (coords) {
          setCoordinates(coords);
        }
      });
    }
  }, [selectedAddress]); // Re-run this effect if selectedAddress changes

  // State to manage drawer visibility
  // Toggle drawer visibility

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="flex flex-col space-y-1 text-xs font-normal"
        >
          <PlusCircleIcon size={18} />
          <div>Create Event</div>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex h-screen w-full flex-col rounded-none p-4">
        {/* Adjust the bottom padding/margin to ensure content does not get hidden behind the button */}
        <ScrollArea className="h-auto overflow-y-auto">
          <h2 className="text-lg font-bold">Create Event</h2>
          <div className="space-y-4">
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Event Name"
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
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Event Description"
              />
            </div>
            <div>
              <LocationSelectSheet
                selectedAddress={selectedAddress}
                onAddressSelect={setSelectedAddress}
              />
              <div className="h-[250px] w-full overflow-hidden rounded-lg">
                {coordinates.latitude !== null &&
                  coordinates.longitude !== null && (
                    <MapComponent
                      latitude={coordinates.latitude}
                      longitude={coordinates.longitude}
                    />
                  )}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="w-[300px] justify-center"
                onClick={() =>
                  createEventContract({
                    name: eventName,
                    description: eventDescription,
                    date: eventDate,
                    coordinates, // Assuming this state contains the latitude and longitude
                  })
                }
              >
                Create
              </Button>
            </div>
          </div>
        </ScrollArea>
        {/* Button is positioned absolutely at the bottom of the DrawerContent */}
      </DrawerContent>
    </Drawer>
  );
}
