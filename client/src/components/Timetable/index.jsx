import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';

export default function Timetable({ events, setEvents }) {
  const calendarRef = useRef(null);

  const handleSubmit = (eventName, start, end) => {
    setEvents([
      ...events,
      {
        start,
        end,
        title: eventName,
        id: uuid(),
      },
    ]);
  };

  useEffect(() => {
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

    const calendarApi = calendarRef.current.getApi();
    calendarApi.on('eventDrop', handleEventChange);
    calendarApi.on('eventResize', handleEventChange);
    calendarApi.on('viewDidMount', handleViewChange);
  }, [events]);

  const handleSelect = (info) => {
    const { start } = info;
    const eventNamePrompt = prompt('Enter event name:');
    if (eventNamePrompt) {
      if (info.view.type === 'dayGridMonth') {
        const startTimePrompt = prompt('Enter start time (HH:mm):');
        const endTimePrompt = prompt('Enter end time (HH:mm):');

        if (startTimePrompt && endTimePrompt) {
          const [startHours, startMinutes] = startTimePrompt.split(':');
          const [endHours, endMinutes] = endTimePrompt.split(':');
          const newStart = new Date(start);
          newStart.setHours(parseInt(startHours));
          newStart.setMinutes(parseInt(startMinutes));
          const newEnd = new Date(start);
          newEnd.setHours(parseInt(endHours));
          newEnd.setMinutes(parseInt(endMinutes));

          handleSubmit(eventNamePrompt, newStart, newEnd);
        }
      } else {
        
        const durationPrompt = prompt('Enter event duration (HH:mm):');

        if (durationPrompt) {
          const [hours, minutes] = durationPrompt.split(':');
          const duration = {
            hours: parseInt(hours),
            minutes: parseInt(minutes),
          };

          const newEnd = new Date(start.getTime() + duration.hours * 60 * 60 * 1000 + duration.minutes * 60 * 1000);

          handleSubmit(eventNamePrompt, start, newEnd);
        }
      }
    }
  };

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
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
      />
    </div>
  );
}
