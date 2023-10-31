import React, { useState } from 'react';

const EventCard = ({ eventInfo, onDelete, onEdit }) => {
  console.log(eventInfo.extendedProps) 
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...eventInfo.extendedProps });
  const start = new Date(eventInfo.extendedProps.start_date);
  const end = new Date(eventInfo.extendedProps.end_date);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // You can add validation here to ensure data is correctly formatted
    onEdit(editedEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(eventInfo.extendedProps.event_id);
  };

  return (
    <div className='event-card'>
      {isEditing ? (
        <div>
          <h3>Edit Event</h3>
          <input
            type='text'
            placeholder='Event Title'
            value={editedEvent.title}
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
          />
          <input
            type='text'
            placeholder='Subject'
            value={editedEvent.subject}
            onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
          />
          <input
            type='text'
            placeholder='Description'
            value={editedEvent.description}
            onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
          />
          <input
            type='text'
            placeholder='Location'
            value={editedEvent.location}
            onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
          />
          <input
            type='text'
            placeholder='Priority'
            value={editedEvent.priority}
            onChange={(e) => setEditedEvent({ ...editedEvent, priority: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{eventInfo.extendedProps.title}</h3>
          <p>Subject: {eventInfo.extendedProps.subject}</p>
          <p>Description: {eventInfo.extendedProps.description}</p>
          <p>Location: {eventInfo.extendedProps.location}</p>
          <p>Priority: {eventInfo.extendedProps.priority}</p>
          <p>Start: {start.toLocaleString()}</p>
          <p>End: {end.toLocaleString()}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default EventCard;

