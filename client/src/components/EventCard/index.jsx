import React from 'react';

export default function EventCard({ info }) {
  const { event } = info;
  const { _instance } = event;
  const { range } = _instance;

  if (range) {
    const eventStart = range.start.toLocaleTimeString();
    const eventEnd = range.end.toLocaleTimeString();

    return (
      <div>
        <p>
          {eventStart} - {eventEnd} - {event.title}
        </p>
      </div>
    );
  } else {
    // Handle cases where range is not available
    return (
      <div>
        <p>Event details not available</p>
      </div>
    );
  }
}
