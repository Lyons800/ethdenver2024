'use client';

import PassCard from './pass-card';

const passes = [
  // Example passes data
  {
    id: 1,
    title: 'Event 1',
    date: '2024-03-01',
    description: 'This is your pass for Event 1.',
    logo: '/path/to/event1/logo.png',
    index: 1,
  },
  {
    id: 2,
    title: 'Event 1',
    date: '2024-03-01',
    description: 'This is your pass for Event 1.',
    logo: '/path/to/event1/logo.png',
    index: 2,
  },

  {
    id: 3,
    title: 'Event 1',
    date: '2024-03-01',
    description: 'This is your pass for Event 1.',
    logo: '/path/to/event1/logo.png',
    index: 3,
  },
  {
    id: 4,
    title: 'Event 1',
    date: '2024-03-01',
    description: 'This is your pass for Event 1.',
    logo: '/path/to/event1/logo.png',
    index: 4,
  },
  {
    id: 1,
    title: 'Event 1',
    date: '2024-03-01',
    description: 'This is your pass for Event 1.',
    logo: '/path/to/event1/logo.png',
  },
  // Add more passes as needed
];

const MyPassesPage = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <h1 className="absolute top-0 w-full text-center text-2xl font-bold">
        My Passes
      </h1>
      {passes.map((pass, index) => (
        <PassCard key={pass.id} pass={{ ...pass, index }} />
      ))}
    </div>
  );
};

export default MyPassesPage;
