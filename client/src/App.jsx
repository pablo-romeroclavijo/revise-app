import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {TimetablePage, LoginPage, NotFoundPage, SignUpPage} from './pages'
import {NavBar} from './components'
const App = () => {
  return(
  <>
    

    <Routes>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path='/timetable' element={<NavBar/>}>
          <Route index element={<TimetablePage />}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        
    </Routes>
  </>
  )
};

export default App;