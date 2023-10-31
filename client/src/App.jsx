import React, {useState} from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import {Timetable} from './components';
const App = () => {
  const [events, setEvents] = useState([]);
  return(
  <>
    <Timetable events={events} setEvents={setEvents} />
  </>
  )
};

export default App;