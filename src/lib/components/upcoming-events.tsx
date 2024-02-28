'use client';

/* eslint-disable no-nested-ternary */

import { EventSheet } from './event-sheet';

const UpcomingEvents = ({ events }) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold">My Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {events.map((event) => (
          <EventSheet event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
