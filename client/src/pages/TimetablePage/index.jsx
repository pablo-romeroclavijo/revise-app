import React, { useState, useEffect } from 'react';
import { Timetable, FilterTheme } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = "https://revise-app.onrender.com"
const TimetablePage = () => {
  console.log("ok")
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  
  console.log("ok2",token)
  useEffect(() => {
    if (token === null) {
      navigate('/');
    } else {
      navigate('/timetable');
    }
  }, [token, navigate]);
//console.log(events)
  return (
    <>
      <Timetable events={events} setEvents={setEvents} />
    </>
  );
};

export default TimetablePage;