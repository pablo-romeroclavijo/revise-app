import React from 'react'

export default function EventCard({ info }) {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
}
