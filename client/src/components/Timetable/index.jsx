import React, { useState } from 'react';
import { EventCard } from '../index';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';

export default function Timetable() {
  const [events, setEvents] = useState([]);

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

  console.log(events);

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth timeGridWeek,timeGridDay',
        }}
        eventContent={(info) => <EventCard info={info} />}
        plugins={[daygridPlugin, interactionPlugin, timeGridPlugin]}
        views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
      />
    </div>
  );
}
