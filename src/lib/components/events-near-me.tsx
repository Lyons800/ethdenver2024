// Assuming you're using 'use client' for TanStack Query Client or similar

'use client';

import type { Event } from '../types';

import { EventSheet } from './event-sheet';

interface EventsNearMeProps {
  events: Event[]; // This specifies that `events` is an array of Event objects
}
const EventsNearMe: React.FC<EventsNearMeProps> = ({ events }) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold">Events Near Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => <EventSheet key={event.id} event={event} />)
        ) : (
          <p>No events near you at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default EventsNearMe;
