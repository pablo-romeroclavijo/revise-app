import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {TimetablePage, LoginPage, NotFoundPage, SignUpPage, SharedPage} from './pages'
const App = () => {
  return(
  <>
    

    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/timetable" element={<TimetablePage />}/>
        <Route path="/timetable/:id" element={<SharedPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
  )
};

export default App;