export default function EditEvent({ event, onEdit, onClose }) {
    const [updatedEvent, setUpdatedEvent] = useState(event);
  
    const handleSave = () => {
      onEdit(updatedEvent);
    };
  
    return (
      <div className="modal">
        <h2>Edit Event</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={updatedEvent.title}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, title: e.target.value })}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={updatedEvent.start.toISOString().slice(0, 16)}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, start: new Date(e.target.value) })}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={updatedEvent.end.toISOString().slice(0, 16)}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, end: new Date(e.target.value) })}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  }