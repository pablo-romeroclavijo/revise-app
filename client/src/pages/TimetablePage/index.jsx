import React, { useState, useEffect } from 'react';
import { Timetable } from '../../components';
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
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate('/');
    } else {
      fetchEvents()//request event data
      navigate('/timetable');
    }
  }, [token, navigate]);
console.log(events)
  return (
    <>
      <Timetable events={events} setEvents={setEvents} />
    </>
  );
};

export default TimetablePage;