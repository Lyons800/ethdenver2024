'use client';

import EventsNearMe from '@/lib/components/events-near-me';
import MapComponent from '@/lib/components/map';

const eventsNearMe = [
  {
    id: '1',
    name: 'Crypto Art Expo',
    dateTime: '2024-02-28T18:30:00',
    image: 'https://images.unsplash.com/photo-1528696892704-5e1122852276?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Denver, Colorado',
  },
  {
    id: '2',
    name: 'Blockchain Developers Meetup',
    dateTime: '2024-03-15T18:30:00',
    image: 'https://images.unsplash.com/photo-1642784352859-fcae4af12c8c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Denver, Colorado',
  },
  {
    id: '3',
    name: 'NFT Launch Party',
    dateTime: '2024-03-15T18:30:00',
    image: 'https://images.unsplash.com/photo-1496637721836-f46d116e6d34?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Denver, Colorado',
  },
  {
    id: '4',
    name: 'Virtual Reality Concert',
    dateTime: '2024-06-10T19:00:00',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Denver, Colorado',
  },
];

const DiscoverPage = () => {
  // Assuming you have a function to get the user's location and fetch events based on that location
  // const {
  //   data: eventsNearMe,
  //   isLoading,
  //   error,
  // } = useQuery(['eventsNearMe'], fetchEventsNearMe);

  const isLoading = false;
  const error = false;
  // Component content, including error handling and loading state
  return (
    <div className="p-4">
      <div className="mb-4 h-[100px] overflow-hidden rounded-lg">
        <MapComponent latitude={null} longitude={null} />
      </div>

      {!isLoading && !error && <EventsNearMe events={eventsNearMe || []} />}
    </div>
  );
};

export default DiscoverPage;
