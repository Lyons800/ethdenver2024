import PassCard from './pass-card';

const passes = [
  // Example passes data
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
    <div className="flex flex-wrap justify-center">
      <h1 className="my-5 w-full text-center text-2xl font-bold">My Passes</h1>
      {passes.map((pass) => (
        <PassCard key={pass.id} pass={pass} />
      ))}
    </div>
  );
};

export default MyPassesPage;
