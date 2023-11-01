import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {TimetablePage, LoginPage, NotFoundPage} from './pages'
const App = () => {
  return(
  <>
    

    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />}/>
        <Route path="/timetable" element={<TimetablePage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
  )
};

export default App;