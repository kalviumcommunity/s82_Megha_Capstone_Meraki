import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  return (
    <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-[#0D7377] mb-4">Upcoming Events</h2>
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-[#B0BEC5] text-center">No events available at the moment.</p>
      )}
    </div>
  );
};

export default EventList;
