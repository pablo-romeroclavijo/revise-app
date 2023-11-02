import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


import { v4 as uuid } from 'uuid';
import {EventCard, FilterTheme, FilterSubject} from '../index'

import { Theme } from '@fullcalendar/core/internal';
import '../../themes/default.css'



function Timetable() {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState('default')
  const subjectsDef = ['Maths', 'History', 'English', 'Science', 'Physics']
  const [subjects, setSubjects] = useState(subjectsDef)
  const [activeSubjects, setActive] = useState(subjectsDef)
  const [filteredEvents, setFiltered] = useState(events)

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const subjects = events.map(event => event.subject)
    const uniq = [...new Set(subjects)];
    setSubjects(uniq)
  }, [events]);

  useEffect(() => {
    setActive(subjects)
  }, [subjects]);

  useEffect(() => {
    console.log('5',activeSubjects)
    const filtered = events.filter(event=> activeSubjects.includes(event.subject))
    setFiltered(filtered)
  }, [activeSubjects]);

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
    //console.log(formattedStart, formattedEnd)
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
    //console.log(eventData);
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



async function updateTime(event){    //event = {event_id, end_date, start_date}
  const options  = {
    method: "PATCH",
    headers : {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  }

  const response = await fetch(apiUrl +'/event/time', options)
  const data = await response.json()
  if(response.status == 200){
    //console.log("yhyhyh", data);
    // setEvents(data);
    // await fetchEvents();
  }else{
    alert('Unable to delete events')
  }
}

// updateTime({
//   event_id: event.event_id,
//   start_date: start,
//   end_date: end
// });


  useEffect(() => {
    const handleEventChange = (eventInfo) => {
      const updatedEvents = events.map((event) => {
        if (event.event_id === eventInfo.event.extendedProps.event_id) {
          // Update the event's start and end dates
          console.log("2222222", event);
          event.start = eventInfo.event._instance.range.start;
          event.end = eventInfo.event._instance.range.end;
          
    
          // Call updateTime with the updated event data
          updateTime({
            event_id: event.event_id,
            start_date: event.start, // Use the updated start date
            end_date: event.end,     // Use the updated end date
          });
        }
    
        return event;
      });
      setEvents(updatedEvents);

      console.log("asdasdasdasd", updatedEvents);
      
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

    
      
    calendarRef.current.getApi().on('eventDrop', handleEventChange);
    calendarRef.current.getApi().on('view', handleViewChange);
    
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
      await fetchEvents();
    } else {
      alert('Unable to update event');
    }
  }
  //console.log(events)


let themeImport
const themes = {
  default:'default',
  theme1: 'theme1',
  theme2:'theme2',
  theme3: 'theme3'
}
//

useEffect( ()=>{
  
  const style = document.getElementsByTagName('style')

  if(style[2]){
    console.log(style[2])
    style[2].remove()
    console.log('style removed')}

  async function changeTheme(){
    // const path = style[1].getAttribute('data-vite-dev-id')
    // const newPath = path.substring(0, path.lastIndexOf('/')) + '/' + themes[theme] + '.css';
    // const documentStyles = fs.readFileSync(newPath)
    // console.log(documentStyles)
    // console.log(theme)
    // style[1].innerHTML = ''
    // const path = style[1].getAttribute('data-vite-dev-id')
    // console.log('path:',path)
    // const newPath = path.substring(0, path.lastIndexOf('/')) + '/' + themes[theme] + '.css';
    // console.log('path2:', newPath)
    // await style[1].setAttribute('data-vite-dev-id', newPath)
    await import (`../../themes/${themes[theme]}.css`)
   
  }
  changeTheme()
},[theme])

useEffect(()=>{console.log(subjects)},[subjects])


  return (
    <div className='timetable-container'>
      <div className='side-bar'>
        <FilterTheme theme = {theme} setTheme = {setTheme}/>
        <FilterSubject subjects={subjects} setActive={setActive}/>
      </div>
      <div className="calendar">
        <FullCalendar 
          editable
          selectable
          ref={calendarRef}
          select={handleSelect}
          events={filteredEvents}
          headerToolbar={{
            start: 'today prev next',
            end: 'dayGridMonth timeGridWeek timeGridDay',
          }}
          initialView="dayGridMonth"
          eventContent={({ event }) => (
            <EventCard
              eventInfo={event}
              onDelete={deleteEvent}
              onEdit={update}
            />
          )}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrap5Plugin]}
          themeSystem='default'
          views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
        />
      </div>
    </div>
  );
}

export default Timetable;

