import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {TimetablePage, LoginPage, NotFoundPage} from './pages'
import {NavBar} from './components'
const App = () => {
  return(
  <>
    

    <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path='/timetable' element={<NavBar/>}>
          <Route index element={<TimetablePage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
    </Routes>
  </>
  )
};

export default App;