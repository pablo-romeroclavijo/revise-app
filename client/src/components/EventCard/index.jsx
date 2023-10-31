import React, { useState } from 'react';

export default function EventCard({ info, events, setEvents }) {
  const { event } = info;
  const { _instance } = event;
  const { range } = _instance;

  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});

  const handleEditEvent = () => {
    setIsEditing(true);
    setEditedEvent(event); 
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    
    const updatedEvents = events.map((e) =>
      e.id === editedEvent.id ? editedEvent : e
      
    );
    setEvents(updatedEvents);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((e) => e.publicId !== event.publicId);
    setEvents(updatedEvents);
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={editedEvent.title}
          onChange={(e) =>
            setEditedEvent({ ...editedEvent, title: e.target.value })
          }
        />
        <button onClick={handleSaveEdit}>Save</button>
        <button onClick={handleCancelEdit}>Cancel</button>
      </div>
    );
  } else if (range) {
    const eventStart = range.start.toLocaleTimeString();
    const eventEnd = range.end.toLocaleTimeString();
    console.log(events)
    return (
      <div>
        <p>
          {eventStart} - {eventEnd} - {event.title}
        </p>
        <button onClick={handleEditEvent}>Edit</button>
        <button onClick={handleDeleteEvent}>Delete</button>
      </div>
    );
  } 
}
