import React, { useState } from 'react';
//import EditPopup from '../EditPopup';
const styles = ({ paddingLeft: 10, paddingRight: 0});

const EventCard = ({ eventInfo, onDelete, onEdit, isUser }) => {
  //console.log(eventInfo.extendedProps) 
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ title: eventInfo.title, ...eventInfo.extendedProps });
  const start = new Date(eventInfo.extendedProps.start_date);
  const end = new Date(eventInfo.extendedProps.end_date);

  const handleEdit = () => {
    const elements = document.querySelectorAll('.test');
    const elementsEvents = document.querySelectorAll('element');
    
    

    elements.forEach(element => {
    element.classList.add('hideEvent');
    });

    elementsEvents.forEach(element => {
      element.classList.add('hideEvent');
      });

    

    



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

  function onCancel() {
    //document.body.style.backgroundColor = "#7F0909";
    const elements = document.querySelectorAll('.test');
    elements.forEach(element => {
      element.classList.remove('hideEvent');
      });
    setIsEditing(false);
    
    
  }

  return (
    <div className='event-card'>
      <div onClick={handleEdit} className='test' style={styles}>
        <h3>{eventInfo.title}</h3>
        {/* <p>Subject: {eventInfo.extendedProps.subject}</p>
        <p>Description: {eventInfo.extendedProps.description}</p>
        <p>Location: {eventInfo.extendedProps.location}</p>
        <p>Priority: {eventInfo.extendedProps.priority}</p>
        <p>Start: {start.toLocaleString()}</p>
        <p>End: {end.toLocaleString()}</p> */}
        
        
      </div>
      {isEditing && isUser && (
        <div className="overlay">
          <div className="edit-popup">
            <h3>Edit Event</h3>


            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              id="eventTitle"
              value={editedEvent.title}
              onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            />


            <label htmlFor="eventSubject">Event Subject:</label>
            <input
              type="text"
              id="eventSubject"             
              value={editedEvent.subject}
              onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
            />

            <label htmlFor="eventDescription">Event Description:</label>
            <input
              type="text"
              id="eventDescription"             
              value={editedEvent.description}
              onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
            />

            <label htmlFor="eventLocation">Event Location:</label>
            <input
              type="text"
              id="eventLocation"             
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
            />

            <label htmlFor="eventPriority">Event Priority:</label>
            <input
              type="text"
              id="eventPriority"             
              value={editedEvent.priority}
              onChange={(e) => setEditedEvent({ ...editedEvent, priority: e.target.value })}
            />


            {/* Add more input fields for editing */}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )}
      {isEditing && !isUser && (
        <div className="overlay">
          <div className="edit-popup">
            <h3>Event Details</h3>


            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              id="eventTitle"
              value={editedEvent.title}
              onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
              readOnly
            />


            <label htmlFor="eventSubject">Event Subject:</label>
            <input
              type="text"
              id="eventSubject"             
              value={editedEvent.subject}
              onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
              readOnly
            />

            <label htmlFor="eventDescription">Event Description:</label>
            <input
              type="text"
              id="eventDescription"             
              value={editedEvent.description}
              onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
              readOnly
            />

            <label htmlFor="eventLocation">Event Location:</label>
            <input
              type="text"
              id="eventLocation"             
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
              readOnly
            />

            <label htmlFor="eventPriority">Event Priority:</label>
            <input
              type="text"
              id="eventPriority"             
              value={editedEvent.priority}
              onChange={(e) => setEditedEvent({ ...editedEvent, priority: e.target.value })}
              readOnly
            />


            {/* Add more input fields for editing */}
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;

