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
    image: 'https://via.placeholder.com/150',
    location: 'Denver, Colorado',
  },
  {
    id: '2',
    name: 'Blockchain Developers Meetup',
    dateTime: '2024-03-15T18:30:00',
    image: 'https://via.placeholder.com/150',
    location: 'Denver, Colorado',
  },
  {
    id: '3',
    name: 'NFT Launch Party',
    dateTime: '2024-03-15T18:30:00',
    image: 'https://via.placeholder.com/150',
    location: 'Denver, Colorado',
  },
  {
    id: '4',
    name: 'Virtual Reality Concert',
    dateTime: '2024-06-10T19:00:00',
    image: 'https://via.placeholder.com/150',
    location: 'Denver, Colorado',
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
