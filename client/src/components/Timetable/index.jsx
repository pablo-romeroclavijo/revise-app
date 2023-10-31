import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';
import {EventCard} from '../index'
const apiUrl = "https://revise-app.onrender.com"
function Timetable() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  const apiUrl = "https://revise-app.onrender.com"
  async function fetchEvents() {
    const options = {
      method: "GET",
      headers: {
        "Authorization": localStorage.token,
        "Accept": 'application/json',
        "Content-Type": "application/json"
      }
    }
  
    const response = await fetch(apiUrl + '/event', options);
    const data = await response.json();
  
    if (response.status === 200) {
      // Modify the data by renaming keys
      const modifiedData = data.map(event => ({
        ...event,
        start: event.start_date, 
        end: event.end_date,    
      }));
  
      setEvents(modifiedData);
    } else {
      alert('Unable to fetch events');
    }
  }
  const calendarRef = useRef(null);
  const handleSubmit = (eventName, start, end) => {
    // Prompt for additional data
    const formattedStart = start.toISOString();
    const formattedEnd = end.toISOString();
    const subject = prompt('Enter subject:');
    const description = prompt('Enter description:');
    const location = prompt('Enter location:');
    const priority = prompt('Enter priority (e.g., H, M, L):');
    console.log(formattedStart, formattedEnd)
    // Check if the user canceled the prompts
    if (subject === null || description === null || location === null || priority === null) {
      return;
    }
  
    // Create the event data
    const eventData = {
      title: eventName,
      start_date:formattedStart,
      end_date:formattedEnd,
      subject,
      description,
      location,
      priority,
    };
    console.log(eventData);
    // Post the event data
    postEvent(eventData);
  };
  const postEvent = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data), // Make sure to stringify the data
    };
    const response = await fetch(apiUrl + '/event', options);

  if (response.status === 201) {
    await fetchEvents();
    // Handle success, maybe refresh events or perform other actions
  } else {
    alert('Unable to post events');
  }
};

  useEffect(() => {
    const handleEventChange = (eventInfo) => {
      const updatedEvents = events.map((event) => {
        if (event.id === eventInfo.event.id) {
          return {
            ...event,
            start: eventInfo.event.start,
            end: eventInfo.event.end
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    }
    const handleViewChange = (viewInfo) => {
      const currentView = viewInfo.view.type;
      if (currentView === 'dayGridMonth') {
        const updatedEvents = events.filter((event) => {
          return (
            event.start >= viewInfo.start && event.end <= viewInfo.end
          );
        });
        setEvents(updatedEvents);
      }
    };

    if (calendarRef.current) {
      
      calendarRef.current.getApi().on('eventDrop', handleEventChange);
      calendarRef.current.getApi().on('view', handleViewChange);
    }
  }, [events]);

  const handleSelect = (info) => {
    const { start } = info;
    const eventNamePrompt = prompt('Enter event name:');
    if (eventNamePrompt) {
      if (info.view.type === 'dayGridMonth') {
        // Collect and validate start time
        let newStart;
        do {
          const startTimePrompt = prompt('Enter start time (HH:mm):');
          if (!startTimePrompt) return; // Cancelled
          const [startHours, startMinutes] = startTimePrompt.split(':');
          if (isValidTime(startHours, startMinutes)) {
            newStart = new Date(start);
            console.log(newStart);
            newStart.setHours(parseInt(startHours));
            newStart.setMinutes(parseInt(startMinutes));
          } else {
            alert('Invalid time format. Please use HH:mm format.');
          }
        } while (!newStart);
  
        // Collect and validate end time
        let newEnd;
        do {
          const endTimePrompt = prompt('Enter end time (HH:mm):');
          if (!endTimePrompt) return; // Cancelled
          const [endHours, endMinutes] = endTimePrompt.split(':');
          if (isValidTime(endHours, endMinutes)) {
            newEnd = new Date(start);
            newEnd.setHours(parseInt(endHours));
            newEnd.setMinutes(parseInt(endMinutes));
          } else {
            alert('Invalid time format. Please use HH:mm format.');
          }
        } while (!newEnd);
  
        handleSubmit(eventNamePrompt, newStart, newEnd);
      } else {
        const durationPrompt = prompt('Enter event duration (HH:mm):');
        if (durationPrompt) {
          const [hours, minutes] = durationPrompt.split(':');
          if (isValidTime(hours, minutes)) {
            const newEnd = new Date(start_date.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
            handleSubmit(eventNamePrompt, start, newEnd);
          } else {
            alert('Invalid time format. Please use HH:mm format.');
          }
        }
      }
    }
  };
  
  function isValidTime(hours, minutes) {
    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes);
    return !isNaN(hoursInt) && !isNaN(minutesInt) && hoursInt >= 0 && hoursInt < 24 && minutesInt >= 0 && minutesInt < 60;
  }
  async function deleteEvent(eventId) {
    const options = {
      method: "DELETE",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
      }
    };

    const response = await fetch(`${apiUrl}/event/${eventId}`, options);

    if (response.status === 202) {
      // Handle successful deletion
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      await fetchEvents();
    } else {
      alert('Unable to delete event');
    }
  }
  async function update(updatedEvent) {
    const options = {
      method: "PATCH",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedEvent),
    };

    const response = await fetch(`${apiUrl}/event`, options);

    if (response.status === 200) {
      // Handle successful update
      const updatedEvents = events.map(event => {
        if (event.id === updatedEvent.event_id) {
          return {
            ...event,
            ...updatedEvent,
          };
        }
        return event;
      });

      setEvents(updatedEvents);
    } else {
      alert('Unable to update event');
    }
  }
  console.log(events)
  return (
    <div>
      <FullCalendar
        editable
        selectable
        ref={calendarRef}
        select={handleSelect}
        events={events}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        eventContent={({ event }) => (
          <EventCard
            eventInfo={event}
            onDelete={deleteEvent}
            onEdit={update}
          />
        )}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
      />
    </div>
  );

  
  
}

export default Timetable;
