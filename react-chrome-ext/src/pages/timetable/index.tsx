import React, { useState, useEffect } from 'react';
// import { Timetable } from '../../components';
import { useNavigate } from 'react-router-dom';

const apiUrl = "https://revise-app.onrender.com"
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
      console.log(events)
  }, []);


  return (
    <>
        {console.log('aa', events)}
        {events.map(a =>
             <p>{a['description']}</p>
         )}
    </>
  );
};

export default TimetablePage;