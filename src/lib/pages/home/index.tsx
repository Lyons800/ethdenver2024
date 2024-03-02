/* eslint-disable sonarjs/no-duplicate-string */
// pages/index.js
// import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import UpcomingEvents from '@/lib/components/upcoming-events';


// import { fetchEvents } from '@/lib/api';

const eventsData = [
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
  {
    id: '5',
    name: 'Nearcon 2024',
    dateTime: '2024-06-10T19:00:00',
    image: '/public/nearcon-2024.webp',
    location: 'Lisbon, Portugal',
  },
];

const Home = () => {
  // const { isLoading, error } = useQuery(['events'], fetchEvents);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
      {/* <SomeText />
      <CTASection /> */}
      <UpcomingEvents events={eventsData} />
      <Link
        href="/events/all"
        passHref
        className="text-blue-500 hover:text-blue-700"
      >
        View all events
      </Link>
    </div>
  );
};

export default Home;
