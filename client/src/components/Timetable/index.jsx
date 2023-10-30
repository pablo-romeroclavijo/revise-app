import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';

export default function Timetable() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null); // Declare the calendar reference

  // A useEffect to set up event handling after the initial render.
  useEffect(() => {
    // Event handling for when an event is dropped or resized.
    const handleEventChange = (eventInfo) => {
      const updatedEvents = events.map((event) => {
        if (event.id === eventInfo.event.id) {
          return {
            ...event,
            start: eventInfo.event.start,
            end: eventInfo.event.end,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    };

    // Add the event handlers for event drop and resize.
    const calendarApi = calendarRef.current.getApi();
    calendarApi.on('eventDrop', handleEventChange);
    calendarApi.on('eventResize', handleEventChange);

    return () => {
      calendarApi.off('eventDrop', handleEventChange);
      calendarApi.off('eventResize', handleEventChange);
    };
  }, [events]);

  const handleSelect = (info) => {
    const { start } = info;
    const eventNamePrompt = prompt('Enter event name:');
    if (eventNamePrompt) {
      const durationPrompt = prompt('Enter event duration (HH:mm):');
      if (durationPrompt) {
        const [hours, minutes] = durationPrompt.split(':');
        const duration = {
          hours: parseInt(hours),
          minutes: parseInt(minutes),
        };
        setEvents([
          ...events,
          {
            start,
            end: new Date(start.getTime() + duration.hours * 60 * 60 * 1000 + duration.minutes * 60 * 1000),
            title: eventNamePrompt,
            id: uuid(),
          },
        ]);
      }
    }
  };
  console.log(events)
  return (
    <div>
      <FullCalendar
        editable
        selectable
        ref={calendarRef}
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth timeGridWeek,timeGridDay',
        }}
        plugins={[daygridPlugin, interactionPlugin, timeGridPlugin]}
        views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
      />
    </div>
  );
}
