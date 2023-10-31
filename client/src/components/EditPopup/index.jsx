import React from 'react';

const EditPopup = ({ editedEvent, onEdit, onCancel }) => {
  return (
    <div className='edit-popup'>
      <h3>Edit the Event</h3>
      <input
        type='text'
        placeholder='Event Title'
        value={editedEvent.title}
        onChange={(e) => onEdit({ ...editedEvent, title: e.target.value })}
      />
      {/* Add other input fields for editing event details */}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onEdit}>Save</button>
    </div>
  );
};

export default EditPopup;