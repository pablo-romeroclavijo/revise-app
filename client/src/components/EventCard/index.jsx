import React, { useState } from 'react';
import EditPopup from '../EditPopup';

const EventCard = ({ eventInfo, onDelete, onEdit }) => {
  console.log(eventInfo.extendedProps) 
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...eventInfo.extendedProps });
  const start = new Date(eventInfo.extendedProps.start_date);
  const end = new Date(eventInfo.extendedProps.end_date);

  const handleEdit = () => {
    //document.body.style.backgroundColor = "#7F0909";
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
      {isEditing && (
        <div className="overlay">
          <div className="edit-popup">
            <h3>Edit Event</h3>
            <input
              type='text'
              placeholder='Event Title'
              value={editedEvent.title}
              onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            />
            {/* Add more input fields for editing */}
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;

