import React, { useState, useEffect } from 'react';
import { Timetable } from '../../components';
import { useNavigate } from 'react-router-dom';

const apiUrl = "https://revise-app.onrender.com"
const TimetablePage = () => {
  
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (token === null) {
      navigate('/');
    } else {
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