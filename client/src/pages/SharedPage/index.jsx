import React, { useState, useEffect } from 'react';
import { Timetable, FilterTheme } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = "https://revise-app.onrender.com"
const SharedPage = () => {
  
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  const {id} = useParams();
  
  
  
//console.log(events)
  return (
    <>

      <Timetable events={events} setEvents={setEvents} linkCode={id}/>
    </>
  );
};

export default SharedPage;