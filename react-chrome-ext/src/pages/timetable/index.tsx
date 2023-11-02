import React, { useState, useEffect } from 'react';

const apiUrl = "https://revise-app.onrender.com"
import EventCard from '../../components/eventcard';



const TimetablePage = () => {

  async function fetchEvents(){
    const options  = {
      method: "GET",
      headers : {
        "Authorization": localStorage.token,
        "Accept": 'application/json',
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(apiUrl +'/event', options)
    const data = await response.json()
    if(response.status == 200){
      setEvents(data)
    }else{
      alert('Unable to fetch events')
    }
  }

  const [events, setEvents] = useState([]);


  useEffect(() => {
      fetchEvents()//request event data
      //console.log(events)
  }, []);


  return (
    <>
        {console.log('aa', events)}
        <h1>Your schedule for the day:</h1>
        <div className='event-card-container'>
          {!events ? <p>Loading...</p> : events.map(event => <EventCard event={event}/>)}
        </div>
    </>
  );
};

export default TimetablePage;