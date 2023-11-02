import React from 'react';

const EditPopup = ({ editedEvent, handleEdit, onCancel, handleDelete, eventInfo}) => {
  return (
    <div className="overlay">
          <div className="edit-popup">
            <h3>Edit Event</h3>


            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              id="eventTitle"
              value={eventInfo.title}
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
              onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
            />

            <label htmlFor="eventLocation">Event Location:</label>
            <input
              type="text"
              id="eventLocation"             
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
            />

            <label htmlFor="eventPriority">Event Priority:</label>
            <input
              type="text"
              id="eventPriority"             
              value={editedEvent.priority}
              onChange={(e) => setEditedEvent({ ...editedEvent, subject: e.target.value })}
            />


            {/* Add more input fields for editing */}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
  );
};

export default EditPopup;




// <div className='edit-popup'>
//       <h3>Edit the Event</h3>
//       <input
//         type='text'
//         placeholder='Event Title'
//         value={editedEvent.title}
//         onChange={(e) => onEdit({ ...editedEvent, title: e.target.value })}
//       />
//       {/* Add other input fields for editing event details */}
//       <button onClick={onCancel}>Cancel</button>
//       <button onClick={onEdit}>Save</button>
//     </div>